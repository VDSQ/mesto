import "./index.css"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// ----- Api -----
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '415dbb41-8dbe-4370-9d0f-59650845b88a',
    'Content-Type': 'application/json',
  },
  endpoints: {
    users: "/users/me",
    avatar: "/users/me/avatar",
    cards: "/cards",
    likes: "/cards/likes"
  }
}

const api = new Api(apiConfig);

// ----- Profile -----
const profileConfig = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
  buttonSelector: ".profile__button",
  cardButtonSelector: ".profile__button-card",
  avatarButtonSelector: ".profile__photo",
}

const profile = new UserInfo(profileConfig, api);
await profile.getUserInfo();

// ----- Card -----
const cardConfig = {
  templateSelector: "#template",
  cardSelector: ".card",
  titleSelector: ".card__scription-title",
  imageSelector: ".card__image",
  deleteButtonSelector: ".card__button-remove",
  likeButtonSelector: ".card__button-like",
  likeAmountSelector: ".card__like-amount",
  activeLikeButtonClass: "card__button-like_active"
};

function confirm() {
  popupConfirm.open();

  return new Promise(function (resolve, reject) {
    popupConfirm
      .popup
      .querySelector(popupFormConfig.submitButtonSelector)
      .addEventListener("click", () => {
        resolve(true);
      })
  })
    .finally(() => popupConfirm.close());
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function createCard(data) {
  return new Card(
    profile.id,
    data,
    cardConfig,
    handleCardClick,
    confirm,
    api
  ).card;
}

// ----- Section -----
const sectionSelector = ".cards";

const section = new Section(
  createCard,
  sectionSelector,
  api
);
section.render();

// ----- Popup -----
const popupSelectors = {
  profile: ".popup_profile",
  avatar: ".popup_avatar",
  card: ".popup_card",
  confirm: ".popup_confirm",
  image: ".popup_image"
}
const popupConfig = {
  closeButtonClass: "popup__button-close",
  openedClass: "popup_opened",
  overlayClass: "popup"
}

const popupConfirm = new Popup(
  popupSelectors.confirm,
  popupConfig
);

// ----- PopupWithImage -----
const popupImageConfig = {
  ...popupConfig,
  ...{
    imageSelector: ".popup__image-img",
    textSelector: ".popup__image-text"
  }
};

const popupImage = new PopupWithImage(
  popupSelectors.image,
  popupImageConfig
);

// ----- PopupWithForm -----
const popupFormConfig = {
  ...popupConfig,
  ...{
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-submit"
  }
};

function setUserInfo(data) {
  popupProfile.submitButton.textContent = "Сохранение...";
  profile.setUserInfo(data)
    .finally(() => popupProfile.submitButton.textContent = "Сохранить");
}

const popupProfile = new PopupWithForm(
  popupSelectors.profile,
  popupFormConfig,
  setUserInfo
);

function setUserAvatar(data) {
  popupAvatar.submitButton.textContent = "Сохранение...";
  profile.setUserAvatar(data)
    .finally(() => popupAvatar.submitButton.textContent = "Сохранить");
}

const popupAvatar = new PopupWithForm(
  popupSelectors.avatar,
  popupFormConfig,
  setUserAvatar
);

function addItem(data) {
  popupCard.submitButton.textContent = "Сохранение...";
  section.addItem(data)
    .finally(() => popupCard.submitButton.textContent = "Создать");
}

const popupCard = new PopupWithForm(
  popupSelectors.card,
  popupFormConfig,
  addItem
);

// ----- FormValidator -----
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  errorSelector: ".popup__error",
  inactiveButtonClass: "popup__button-submit_invalid",
  inputErrorClass: "popup__input_state_invalid"
};

const profileValidator = new FormValidator(validationConfig, popupProfile.form);
profileValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, popupAvatar.form);
avatarValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, popupCard.form);
cardValidator.enableValidation();

// ----- Listeners -----
profile.button.addEventListener("click", () => {
  popupProfile.form["name"].value = profile.name.textContent;
  popupProfile.form["about"].value = profile.about.textContent;

  popupProfile.open();
});

profile.avatarButton.addEventListener("click", () => {
  popupAvatar.form["avatar"].value = profile.avatar.src;

  popupAvatar.open();
});

profile.cardButton.addEventListener("click", () => {
  popupCard.open();
});

