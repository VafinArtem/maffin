const PopUp = () => {
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
}

export default PopUp;
