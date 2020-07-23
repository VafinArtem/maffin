let sliderToggle = document.querySelectorAll(".slider-toggle");
let sliderItem = document.querySelectorAll(".slider-item");
let next = document.querySelector(".next")
let prev = document.querySelector(".prev")


for (let i = 0; i < sliderToggle.length; i++) {
    sliderToggle[i].addEventListener("click", function() {
        let toggleCurrent = document.querySelector(".current");
        toggleCurrent.classList.remove("current");
        sliderToggle[i].classList.add("current");

        let sliderCurrent = document.querySelector(".slide-active");
        sliderCurrent.classList.remove("slide-active");
        sliderItem[i].classList.add("slide-active");
    });

    next.addEventListener("click", function() {
        let sliderCurrent = document.querySelector(".slide-active");
        sliderCurrent.classList.remove("slide-active");
        sliderItem[i].classList.add("slide-active");
        let toggleCurrent = document.querySelector(".current");
        toggleCurrent.classList.remove("current");
        sliderToggle[i].classList.add("current");

    });
}