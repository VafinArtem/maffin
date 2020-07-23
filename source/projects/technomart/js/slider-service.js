let servicesButtons = document.querySelectorAll(".services-btn");
let descriptionServ = document.querySelectorAll(".item-desc")

for (let i = 0; i < servicesButtons.length; i++) {
    servicesButtons[i].addEventListener("click", function() {
        let currentButton = document.querySelector('.current-btn');
        currentButton.disabled = false;
        servicesButtons[i].disabled = true;
        currentButton.classList.remove('current-btn');
        servicesButtons[i].classList.add('current-btn');

        let currentSlide = document.querySelector(".serv-item-active")
        currentSlide.classList.remove("serv-item-active")
        descriptionServ[i].classList.add("serv-item-active")
    });
}