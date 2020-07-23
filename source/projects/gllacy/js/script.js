let writeUsButton = document.querySelector(".address-btn");
let writeUsPopupWrap = document.querySelector(".writeus-popup-wrapper");
let writeUsPopup = writeUsPopupWrap.querySelector(".writeus-popup");
let writeUsClose = writeUsPopup.querySelector(".writeus-btn-close");
let writeUsForm = writeUsPopup.querySelector(".writeus-form");
let writeUsName = writeUsPopup.querySelector(".writeus-name");
let writeUsEmail = writeUsPopup.querySelector(".writeus-email");
let writeUsMessage = writeUsPopup.querySelector(".writeus-text");

let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

try {
    storageName = localStorage.getItem("userName");
} catch (err) {
    isStorageSupport = false;
}

try {
    storageEmail = localStorage.getItem("userEmail");
} catch (err) {
    isStorageSupport = false;
}

writeUsButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    writeUsPopupWrap.classList.add("popup-wrap");
    writeUsPopup.classList.add("popup");

    if (storageName && storageEmail) {
        writeUsName.value = storageName;
        writeUsEmail.value = storageEmail;
        writeUsMessage.focus();
    } else {
        writeUsName.focus();
    }
});

writeUsClose.addEventListener("click", function() {
    writeUsPopup.classList.remove("popup");
    writeUsPopup.classList.remove("writeus-error");
    writeUsPopupWrap.classList.remove("popup-wrap");
});

writeUsForm.addEventListener("submit", function(evt) {
    if (!writeUsName.value || !writeUsEmail.value || !writeUsMessage.value) {
        evt.preventDefault();
        writeUsPopup.classList.remove("writeus-error");
        writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
        writeUsPopup.classList.add("writeus-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("userName", writeUsName.value);
            localStorage.setItem("userEmail", writeUsEmail.value);
        }
    }
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        if (writeUsPopup.classList.contains("popup")) {
            evt.preventDefault();
            writeUsPopup.classList.remove("popup");
            writeUsPopup.classList.remove("write-us-error");
            writeUsPopupWrap.classList.remove("popup-wrap");
        }
    }
});

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