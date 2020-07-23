let cartButtons = document.querySelectorAll(".btn-cart");
let cartPopup = document.querySelector(".add-cart-popup");
let cartClose = cartPopup.querySelector(".close-btn");
let cartContinue = cartPopup.querySelector(".continue");

for (let cartButton of cartButtons) {
    cartButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        cartPopup.classList.add("popup");
    });
};

cartClose.addEventListener("click", function() {
    cartPopup.classList.remove("popup");
});

cartContinue.addEventListener("click", function() {
    cartPopup.classList.remove("popup");
});

let writeUsButton = document.querySelector(".writeus-btn");
let writeUsPopup = document.querySelector(".popup-writeus");
let writeUsClose = writeUsPopup.querySelector(".close-btn");
let writeUsForm = writeUsPopup.querySelector(".write-us-form");
let writeUsName = writeUsPopup.querySelector(".write-us-name");
let writeUsEmail = writeUsPopup.querySelector(".writeus-email");
let writeUsMessage = writeUsPopup.querySelector(".write-us-message");
let mapButton = document.querySelector(".map-link");
let mapPopup = document.querySelector(".popup-map");
let mapClose = mapPopup.querySelector(".close-btn");

let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

try {
    storageName = localStorage.getItem("userName");
} catch (err) {
    isStorageSupport = false;
};

try {
    storageEmail = localStorage.getItem("userEmail");
} catch (err) {
    isStorageSupport = false;
};

writeUsButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    writeUsPopup.classList.add("popup");

    if (storageName && storageEmail) {
        writeUsName.value = storageName;
        writeUsEmail.value = storageEmail;
        writeUsMessage.focus();
    } else {
        writeUsName.focus();
    };
});

writeUsClose.addEventListener("click", function() {
    writeUsPopup.classList.remove("popup");
    writeUsPopup.classList.remove("write-us-error");
});

writeUsForm.addEventListener("submit", function(evt) {
    if (!writeUsName.value || !writeUsEmail.value || !writeUsMessage.value) {
        evt.preventDefault();
        writeUsPopup.classList.remove("write-us-error");
        writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
        writeUsPopup.classList.add("write-us-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("userName", writeUsName.value);
            localStorage.setItem("userEmail", writeUsEmail.value);
        };
    };
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        if (writeUsPopup.classList.contains("popup") || mapPopup.classList.contains("popup") || cartPopup.classList.contains("popup")) {
            evt.preventDefault();
            writeUsPopup.classList.remove("popup");
            writeUsPopup.classList.remove("write-us-error");
            mapPopup.classList.remove("popup");
            cartPopup.classList.remove("popup");
        };
    };
});

mapButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopup.classList.add("popup");
});

mapClose.addEventListener("click", function() {
    mapPopup.classList.remove("popup");
});