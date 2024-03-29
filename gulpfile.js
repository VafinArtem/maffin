const gulp = require("gulp");
const webpack = require("webpack-stream");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const resolveUrl = require("gulp-resolve-url");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");
const webp = require("gulp-webp");
const del = require("del");
const ftp = require("vinyl-ftp");
const security = require("./security");

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(resolveUrl())
    .pipe(rename("styles.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Images

const images = () => {
  return gulp
    .src("source/img_new/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ quality: 90, progressive: true }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }],
        }),
      ])
    )
    .pipe(gulp.dest("source/img/"));
};

exports.images = images;

// Sprite

const sprite = () => {
  return gulp
    .src("source/img_new/icon-*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      cheerio({
        run: ($) => {
          $("symbol").attr("fill", "none");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img/svg"));
};

exports.sprite = sprite;

// WebP

const iwebp = () => {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
};

exports.webp = iwebp;

// Copy

const copy = () => {
  return gulp
    .src(["source/fonts/**/*.{woff,woff2}", "source/img/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Copy Image to 11ty

const copyImg = () => {
  return gulp
    .src(["source/img/**"], {
      base: "source",
    })
    .pipe(gulp.dest("src"));
};

exports.copyImg = copyImg;

// Copy Style to 11ty

const copyStyle = () => {
  return gulp
    .src(["build/css/**"], {
      base: "build",
    })
    .pipe(gulp.dest("src"));
};

exports.copyStyle = copyStyle;

// Copy JS to 11ty

const copyJS = () => {
  return gulp
    .src(["build/js/**"], {
      base: "build",
    })
    .pipe(gulp.dest("src"));
};

exports.copyJS = copyJS;

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
};

exports.html = html;

// JS

const js = () => {
  return gulp
    .src("source/js/script.js")
    .pipe(
      webpack({
        mode: "production",
        module: {
          rules: [
            {
              test: /.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                query: {
                  presets: ["@babel/env"],
                },
              },
            },
          ],
        },
        output: {
          filename: "bundle.js",
        },
        devtool: "source-map",
      })
    )
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
};

exports.js = js;

// ftp

const deploy = () => {
  const conn = ftp.create({
    host: security.ftp.URL,
    user: security.ftp.USER,
    password: security.ftp.PASSWORD,
    parallel: 10,
  });

  const globs = ["_site/**"];

  return gulp
    .src(globs, {
      base: "./_site",
      buffer: false,
    })
    .pipe(conn.newer("/"))
    .pipe(conn.dest("/"));
};

exports.deploy = deploy;

// Delete

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Build

const build = (done) =>
  gulp.series(clean, copy, styles, html, js, sprite)(done);
exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series("js"));
  gulp.watch("source/*.html", gulp.series("html"));
};

exports.default = gulp.series(build, server, watcher);
