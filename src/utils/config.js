// ----- Api -----
export const apiConfig = {
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

// ----- Profile -----
export const profileConfig = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
  buttonSelector: ".profile__button",
  cardButtonSelector: ".profile__button-card",
  avatarButtonSelector: ".profile__photo",
}

// ----- Card -----
export const cardConfig = {
  templateSelector: "#template",
  cardSelector: ".card",
  titleSelector: ".card__scription-title",
  imageSelector: ".card__image",
  deleteButtonSelector: ".card__button-remove",
  likeButtonSelector: ".card__button-like",
  likeAmountSelector: ".card__like-amount",
  activeLikeButtonClass: "card__button-like_active"
};

// ----- Section -----
export const sectionSelector = ".cards";

// ----- Popup -----
export const popupSelectors = {
  profile: ".popup_profile",
  avatar: ".popup_avatar",
  card: ".popup_card",
  confirm: ".popup_confirm",
  image: ".popup_image"
}
export const popupConfig = {
  closeButtonClass: "popup__button-close",
  openedClass: "popup_opened",
  overlayClass: "popup"
}

// ----- PopupWithImage -----
export const popupImageConfig = {
  ...popupConfig,
  ...{
    imageSelector: ".popup__image-img",
    textSelector: ".popup__image-text"
  }
};

// ----- PopupWithForm -----
export const popupFormConfig = {
  ...popupConfig,
  ...{
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-submit"
  }
};

// ----- FormValidator -----
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  errorSelector: ".popup__error",
  inactiveButtonClass: "popup__button-submit_invalid",
  inputErrorClass: "popup__input_state_invalid"
};