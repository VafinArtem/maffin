let siteWrapper = document.querySelector(".site-wrapper")
let sliderItems = document.querySelectorAll(".slider-item")
let sliderButtons = document.querySelectorAll(".slider-toggle")

for (let i = 0; i < sliderButtons.length; i++) {
    sliderButtons[i].addEventListener('click', function() {
        let currentButton = document.querySelector(".active-toggle");
        currentButton.classList.remove("active-toggle");
        sliderButtons[i].classList.add("active-toggle");

        let currentSlider = document.querySelector(".slider-active")
        currentSlider.classList.remove("slider-active");
        sliderItems[i].classList.add("slider-active");

        for (let n = 1; n <= sliderButtons.length; n++) {
            if (siteWrapper.classList.contains("site-wrapper-" + n)) {
                siteWrapper.classList.remove("site-wrapper-" + n);
            };
            siteWrapper.classList.add("site-wrapper-" + (i + 1));
        };
    });
};