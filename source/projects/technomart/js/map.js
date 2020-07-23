let mapButton = document.querySelector(".map-link")
let mapPopup = document.querySelector(".popup-map")
let mapClose = mapPopup.querySelector(".close-btn")

mapButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopup.classList.add("popup");
});

mapClose.addEventListener("click", function() {
    mapPopup.classList.remove("popup");
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        if (mapPopup.classList.contains("popup")) {
            evt.preventDefault();
            mapPopup.classList.remove("popup");
        }
    }
});