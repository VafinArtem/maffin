let upButton = document.querySelector(".page-up");


window.addEventListener("scroll", function (evt) {
  if (window.pageYOffset > 200) {
    upButton.classList.add("page-up--active");
  }
  else {
    upButton.classList.remove("page-up--active");
  }
});

upButton.addEventListener("click", function (evt) {
  window.scrollTo(0, 0)
});
