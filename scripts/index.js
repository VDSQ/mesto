import { initialCards } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// ----- Profile -----
const profileDomElements = {
  name: document.querySelector(".profile__name"),
  job: document.querySelector(".profile__job"),
  editButton: document.querySelector(".profile__button-edit"),
  addButton: document.querySelector(".profile__button-add")
};

// ----- Popup -----
const popupDomElements = {
  profile: document.querySelector(".popup_profile-edit"),
  card: document.querySelector(".popup_card-add"),
  image: document.querySelector(".popup_image")
};

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupByEscape);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupByEscape);
}

// ----- Card -----
const cards = document.querySelector(".cards");
const imgPopupImage = document.querySelector(".popup__image-img");
const textPopupImage = document.querySelector(".popup__image-text");
const cardConfig = {
  templateSelector: "template",
  cardSelector: "card",
  titleSelector: "card__scription-title",
  imageSelector: "card__image",
  deleteButtonSelector: "card__button-remove",
  likeButtonSelector: "card__button-like",
  activeLikeButtonSelector: "card__button-like_active"
};

function openPopupImage(name, link) {
  imgPopupImage.alt = name;
  imgPopupImage.src = link;
  textPopupImage.textContent = name;
  openPopup(popupDomElements.image);
}

function createCard(name, link) {
  const card = new Card(name, link, cardConfig, openPopupImage).create();

  return card;
}

function createCards() {
  const cardList = [];
  for (let card of initialCards) {
    cardList.push(createCard(card.name, card.link));
  }

  cards.append.apply(cards, cardList);
}

createCards();

// ----- FormValidator -----
const validationConfig = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__button-submit",
  inactiveButtonClass: "popup__button-submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
  errorSelector: "popup__error"
};

const formDomElements = {
  profile: popupDomElements.profile.querySelector(".popup__form_profile"),
  card: popupDomElements.card.querySelector(".popup__form_card")
};

const profileValidator = new FormValidator(validationConfig, formDomElements.profile);
const cardValidator = new FormValidator(validationConfig, formDomElements.card);

profileValidator.enableValidation();
cardValidator.enableValidation();

// ----- Listeners -----
profileDomElements.editButton.addEventListener("click", () => {
  formDomElements.profile["name"].value = profileDomElements.name.textContent;
  formDomElements.profile["job"].value = profileDomElements.job.textContent;
  openPopup(popupDomElements.profile);
});

profileDomElements.addButton.addEventListener("click", () => {
  openPopup(popupDomElements.card);
});

formDomElements.profile.addEventListener("submit", evt => {
  evt.preventDefault();
  profileDomElements.name.textContent = formDomElements.profile["name"].value;
  profileDomElements.job.textContent = formDomElements.profile["job"].value;
  closePopup(popupDomElements.profile);
  evt.target.reset();
});

formDomElements.card.addEventListener("submit", evt => {
  evt.preventDefault();
  cards.prepend(createCard(formDomElements.card["name"].value, formDomElements.card["image"].value));
  closePopup(popupDomElements.card);
  evt.target.reset();
});

const popups = document.querySelectorAll(".popup");
popups.forEach(popup => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});