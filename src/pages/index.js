import "./index.css"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { 
  apiConfig, profileConfig, cardConfig,
  sectionSelector, popupSelectors, popupConfig,
  popupImageConfig, popupFormConfig, popupConfirmConfig, validationConfig
} from "../utils/config.js";

// ----- Api -----
const api = new Api(apiConfig);

// ----- Profile -----
const profile = new UserInfo(profileConfig);

// ----- Card -----
function deleteLike(id, setLikeButtonStateCallback) {
  api.deleteLike(id)
    .then((result) => setLikeButtonStateCallback(result.likes.length))
    .catch((error) => console.error(error));
}

function setLike(id, setLikeButtonStateCallback) {
  api.setLike(id)
    .then((result) => setLikeButtonStateCallback(result.likes.length))
    .catch((error) => console.error(error));
}

function deleteCard(id, card) {
  api.deleteCard(id)
    .then((result) => {
      card.remove();
      popupConfirm.close();
    })
    .catch((error) => console.error(error));
}

function confirm(id, card) {  
  popupConfirm.open(id, card, deleteCard);
}

function openImage(name, link) {
  popupImage.open(name, link);
}

function createCard(data) {
  return new Card(
    profile.id, 
    data, 
    cardConfig,
    openImage, 
    confirm,
    setLike,
    deleteLike
  ).card;
}

// ----- Section -----
const section = new Section(
  createCard,
  sectionSelector
);

// ----- Server data -----
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((result) => {
    profile.updateUserInfo(result[0]);
    section.render(result[1]);
  })
  .catch((error) => console.error(error));

// ----- Popup -----

// ----- PopupWithImage -----
const popupImage = new PopupWithImage(
  popupSelectors.image,
  popupImageConfig
);

// ----- PopupWithForm -----
function updateUserInfo(data) {
  popupProfile.submitButton.textContent = "Сохранение...";

  api.updateUserInfo(data)
    .then((result) => {
      profile.updateUserInfo(result);
      popupProfile.close();
      popupProfile.submitButton.textContent = "Сохранить";
    })
    .catch((error) => console.error(error));
}

const popupProfile = new PopupWithForm(
  popupSelectors.profile, 
  popupFormConfig,
  updateUserInfo
);

function updateUserAvatar(data) {
  popupAvatar.submitButton.textContent = "Сохранение...";

  api.updateUserAvatar(data)
    .then((result) => {
      profile.updateUserAvatar(result);
      popupAvatar.close();
      popupAvatar.submitButton.textContent = "Сохранить";
    })
    .catch((error) => console.error(error));
}

const popupAvatar = new PopupWithForm(
  popupSelectors.avatar, 
  popupFormConfig,
  updateUserAvatar
);

function setCard(data) {
  popupCard.submitButton.textContent = "Сохранение...";

  api.setCard(data)
    .then((result) => {
      section.addItem(result);
      popupCard.close();
      popupCard.submitButton.textContent = "Создать";
    })
    .catch((error) => console.error(error));
}

const popupCard = new PopupWithForm(
  popupSelectors.card, 
  popupFormConfig,
  setCard
);

// ----- PopupWithConfirm -----
const popupConfirm = new PopupWithConfirm(
  popupSelectors.confirm,
  popupConfirmConfig
);

// ----- FormValidator -----
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

