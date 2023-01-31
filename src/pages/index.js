import './index.css'
import { initialCards } from "../components/Cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// ----- Profile -----
const profileConfig = {
  nameSelector: "profile__name",
  jobSelector: "profile__job"
}

const profileDomElements = {
  editButton: document.querySelector(".profile__button-edit"),
  addButton: document.querySelector(".profile__button-add")
};

const profile = new UserInfo(profileConfig);

// ----- Card -----
const cards = document.querySelector(".cards");
const cardConfig = {
  templateSelector: "template",
  cardSelector: "card",
  titleSelector: "card__scription-title",
  imageSelector: "card__image",
  deleteButtonSelector: "card__button-remove",
  likeButtonSelector: "card__button-like",
  activeLikeButtonSelector: "card__button-like_active"
};

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function createCard(name, link) {
  const card = new Card(name, link, cardConfig, handleCardClick).create();

  return card;
}

// ----- Section -----
const section = new Section(
  {
    "items": initialCards,
    "renderer": createCard
  },
  "cards",
  cards
);
section.render();

// ----- Popup -----
const popupSelectors = {
  profile: "popup_profile-edit",
  card: "popup_card-add",
  image: "popup_image"
}
const popupConfig = {
  overlaySelector: "popup",
  closeButtonSelector: "popup__button-close",
  openedSelector: "popup_opened",
  imageSelector: "popup__image-img", 
  textSelector: "popup__image-text",
  inputSelector: "popup__input"
}

const popupDomElements = {
  profile: document.querySelector(`.${popupSelectors.profile}`),
  card: document.querySelector(`.${popupSelectors.card}`),
  image: document.querySelector(`.${popupSelectors.image}`)
};

// ----- PopupWithImage -----
const popupImage = new PopupWithImage(
  popupSelectors.image, 
  popupDomElements.image, 
  popupConfig
);

// ----- PopupWithForm -----
const formDomElements = {
  profile: popupDomElements.profile.querySelector(".popup__form_profile"),
  card: popupDomElements.card.querySelector(".popup__form_card")
};

const popupProfile = new PopupWithForm(
  popupSelectors.profile, 
  popupDomElements.profile,
  popupConfig,
  formDomElements.profile,
  profile.setUserInfo
);

const popupCard = new PopupWithForm(
  popupSelectors.card, 
  popupDomElements.card,
  popupConfig,
  formDomElements.card,
  section.addItem
);

// ----- FormValidator -----
const validationConfig = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__button-submit",
  inactiveButtonClass: "popup__button-submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
  errorSelector: "popup__error"
};

const profileValidator = new FormValidator(validationConfig, formDomElements.profile);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, formDomElements.card);
cardValidator.enableValidation();

// ----- Listeners -----
profileDomElements.editButton.addEventListener("click", () => {
  const user = profile.getUserInfo();

  formDomElements.profile["name"].value = user.name;
  formDomElements.profile["job"].value = user.job;

  popupProfile.open();
});

profileDomElements.addButton.addEventListener("click", () => {
  popupCard.open();
});