const ScrollUp = () => {
  const upButton = document.querySelector(".page-up");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 200) {
      upButton.classList.add("page-up--active");
    }
    else {
      upButton.classList.remove("page-up--active");
    }
  });

  upButton.addEventListener("click", function () {
    window.scrollTo(0, 0)
  });
}

export default ScrollUp;
