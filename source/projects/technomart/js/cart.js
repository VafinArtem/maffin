let cartButtons = document.querySelectorAll(".btn-cart")
let cartPopup = document.querySelector(".add-cart-popup")
let cartClose = cartPopup.querySelector(".close-btn")
let cartContinue = cartPopup.querySelector(".continue")

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

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        if (cartPopup.classList.contains("popup")) {
            evt.preventDefault();
            cartPopup.classList.remove("popup");
        }
    }
});