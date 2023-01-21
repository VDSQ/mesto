import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: 'Зеленоград',
    link: 'https://images.unsplash.com/photo-1536577722576-fcfdbcad17e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Красноярск',
    link: 'https://images.unsplash.com/photo-1587451152235-05466c2fc532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Иркутск',
    link: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1557094005-176cbfe3554d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
  },
  {
    name: 'Республика Коми',
    link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1588698947572-5563eed6d86a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
];

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileButtonAdd = document.querySelector(".profile__button-add");

const cardElements = document.querySelector(".elements");

const popups = document.querySelectorAll(".popup");

const popupEdit = document.querySelector("#popup-edit");
const popupEditForm = document.querySelector("#popup-edit-form");
const popupEditTitle = popupEdit.querySelector(".popup__input_value_title");
const popupEditSubtitle = popupEdit.querySelector(".popup__input_value_subtitle");

const popupAdd = document.querySelector("#popup-add");
const popupAddForm = document.querySelector("#popup-add-form");

const popupImage = document.querySelector("#popup-image");
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageText = popupImage.querySelector(".popup__text");

const validationConfigPopup = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button_submit-invalid",
  inputErrorClass: "popup__input_state_invalid"
};

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function pressingOnImg(name, link) {
  popupImageImg.src = link;
  popupImageText.textContent = name;

  openPopup(popupImage);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener('keydown', closePopupByEscape);
}

function creationCardOnPage(data) {
  const card = new Card(data, "#element");
  const cardElement = card.generateCard();

  return cardElement;
}

function additionCardOnPage(container, cardElement) {
  container.prepend(cardElement);
}

initialCards.forEach(item => {
  additionCardOnPage(cardElements, creationCardOnPage(item));
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

popupEditForm.addEventListener('submit', evt => {
  evt.preventDefault();

  profileTitle.textContent = popupEditTitle.value;
  profileSubtitle.textContent = popupEditSubtitle.value;

  closePopup(popupEdit);
  popupAddForm.reset();
});

popupAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popupAddForm["popup-input-name"].value;
  newCard.link = popupAddForm["popup-input-image"].value;

  additionCardOnPage(cardElements, creationCardOnPage(newCard));

  closePopup(popupAdd);
  popupAddForm.reset();
});

profileButtonEdit.addEventListener('click', () => {

  popupEditTitle.value = profileTitle.textContent;
  popupEditSubtitle.value = profileSubtitle.textContent;

  openPopup(popupEdit);
});

profileButtonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

const ValidationEditPopup = new FormValidator(validationConfigPopup, popupEditForm);
ValidationEditPopup.enableValidation();

const ValidationAddPopup = new FormValidator(validationConfigPopup, popupAddForm);
ValidationAddPopup.enableValidation();