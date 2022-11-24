let popup = document.querySelector('.popup');
let popupButtonClose = document.querySelector('.popup__button-close');
let popupForm = document.querySelector('.popup__form');
let popupTitlePlace = popupForm.querySelector('.popup__input_value_title');
let popupSubtitlePlace = popupForm.querySelector('.popup__input_value_subtitle');

let profileButtonEdit = document.querySelector('.profile__button-edit');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupOpen() {
    popup.classList.add('popup_opened');

    popupTitlePlace.value = profileTitle.textContent;
    popupSubtitlePlace.value = profileSubtitle.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
  
    profileTitle.textContent = popupTitlePlace.value;
    profileSubtitle.textContent = popupSubtitlePlace.value;
  
    popupClose();
  }

profileButtonEdit.addEventListener('click', popupOpen);
popupButtonClose.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);
