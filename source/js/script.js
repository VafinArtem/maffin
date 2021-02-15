"use strict";

// Scroll Up

(() => {
  let upButton = document.querySelector(".page-up");

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
})();


// Open & Close Popup

(() => {
  const ACTIVE_CLASS = `show`
  const BODY_OVERFLOW_CLASS = `overflow-h`

  const popupElement = document.querySelector(`.js-popup`);
  if (popupElement) {
    const openPopupButtonElement = document.querySelector(`.js-open-popup`);
    const closePopupButtonElement = popupElement.querySelector(`.js-close-popup`);

    const closePopup = (evt) => {
      evt.preventDefault()
      document.body.classList.remove(BODY_OVERFLOW_CLASS)
      popupElement.classList.remove(ACTIVE_CLASS)

      closePopupButtonElement.removeEventListener(`click`, closePopup)
    }

    const openPopup = (evt) => {
      evt.preventDefault()
      document.body.classList.add(BODY_OVERFLOW_CLASS)
      popupElement.classList.add(ACTIVE_CLASS)

      closePopupButtonElement.addEventListener(`click`, closePopup)
    }

    openPopupButtonElement.addEventListener(`click`, openPopup)
  }
})();

// Galery

(() => {
  const sliderNode = document.querySelector(`.js-slider`);

  const iterating = (items, direction, buttonPrev, buttonNext) => {
    let nextSlide = null;
    let nextSlideClass = null;
    let prevSlideClass = null;

    for (let i = 0; i < items.length; i++) {
      if (items[i].classList.contains(`js-slide-active`)) {

        if (direction === `right`) {
          nextSlide = i + 1;
          nextSlideClass = `js-slide-next`;
          prevSlideClass = `js-slide-prev`;
        } else if (direction === `left`) {
          nextSlide = i - 1;
          nextSlideClass = `js-slide-prev`;
          prevSlideClass = `js-slide-next`;
        }

        if (direction === `left`) {
          items[nextSlide+2] !== undefined ? items[nextSlide+2].classList.toggle(prevSlideClass) : enabledButton(buttonNext);
        } else {
          items[nextSlide-2] !== undefined ? items[nextSlide-2].classList.toggle(prevSlideClass) : enabledButton(buttonPrev);
        }

        items[i].classList.remove(`js-slide-active`);
        items[i].classList.add(prevSlideClass);

        items[nextSlide].classList.remove(nextSlideClass);
        items[nextSlide].classList.add(`js-slide-active`);

        if (direction === `left`) {
          items[nextSlide-1] === undefined ? disabledButton(buttonPrev) : items[nextSlide-1].classList.add(nextSlideClass);
        } else {
          items[nextSlide+1] === undefined ? disabledButton(buttonNext) : items[nextSlide+1].classList.add(nextSlideClass);
        }
        break;
      }
    }
  };

  const disabledButton = (buttonElement) => {
    buttonElement.setAttribute(`disabled`, `disabled`);
  };

  const enabledButton = (buttonElement) => {
    buttonElement.removeAttribute(`disabled`);
  };

  if (sliderNode) {
    const sliderItemsNode = sliderNode.querySelectorAll(`.js-slide`);
    const sliderArrowPrev = sliderNode.querySelector(`.js-slider-arr-prev`);
    const sliderArrowNext = sliderNode.querySelector(`.js-slider-arr-next`);

    sliderArrowNext.addEventListener(`click`, () => {
      iterating(sliderItemsNode, `right`, sliderArrowPrev, sliderArrowNext);
    });

    sliderArrowPrev.addEventListener(`click`, () => {
      iterating(sliderItemsNode, `left`, sliderArrowPrev, sliderArrowNext);
    });
  }
})()
