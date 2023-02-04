import "./index.css"
import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// ----- Profile -----
const profileConfig = {
	nameSelector: ".profile__name",
	jobSelector: ".profile__job",
	editButtonSelector: ".profile__button-edit",
	addButtonSelector: ".profile__button-add"
}

const profile = new UserInfo(profileConfig);

// ----- Card -----
const cardConfig = {
	templateSelector: "#template",
	cardSelector: ".card",
	titleSelector: ".card__scription-title",
	imageSelector: ".card__image",
	deleteButtonSelector: ".card__button-remove",
	likeButtonSelector: ".card__button-like",
	activeLikeButtonClass: "card__button-like_active"
};

function handleCardClick(name, link) {
	popupImage.open(name, link);
}

function createCard(name, link) {
	return new Card(name, link, cardConfig, handleCardClick).card;
}

// ----- Section -----
const sectionSelector = ".cards";

const section = new Section(
	{
		"items": initialCards,
		"renderer": createCard
	},
	sectionSelector
);
section.render();

// ----- Popup -----
const popupSelectors = {
	profile: ".popup_profile-edit",
	card: ".popup_card-add",
	image: ".popup_image"
}
const popupConfig = {
	closeButtonClass: "popup__button-close",
	openedClass: "popup_opened",
	overlayClass: "popup"
}

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
		inputSelector: ".popup__input"
	}
};

const popupProfile = new PopupWithForm(
	popupSelectors.profile,
	popupFormConfig,
	profile.setUserInfo
);

const popupCard = new PopupWithForm(
	popupSelectors.card,
	popupFormConfig,
	section.addItem
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

const cardValidator = new FormValidator(validationConfig, popupCard.form);
cardValidator.enableValidation();

// ----- Listeners -----
profile.editButton.addEventListener("click", () => {
	const user = profile.getUserInfo();

	popupProfile.form["name"].value = user.name;
	popupProfile.form["job"].value = user.job;

	popupProfile.open();
});

profile.addButton.addEventListener("click", () => {
	popupCard.open();
});