import { pressingOnImg } from "./index.js";

export default class Card {
	constructor(data, templateSelector) {
		this._link = data.link;
		this._name = data.name;
		this._templateSelector = templateSelector;
	}

	_takeTemplate() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector(".element")
			.cloneNode(true);

		return cardElement;
	}

	_pressingDeleteCardFromPage = () => {
		this._element.remove();
	}

	_pressingLikeCardFromPage = () => {
		this._elementButtonLike.classList.toggle("element__scription-button_active");
	};

	_setEventListeners = () => {
		this._elemenButtonDelete.addEventListener('click', this._pressingDeleteCardFromPage);
		this._elementButtonLike.addEventListener('click', this._pressingLikeCardFromPage);
		this._elementImage.addEventListener('click', () => {
			pressingOnImg(this._name, this._link);
		});
	};

	generateCard = () => {
		this._element = this._takeTemplate();
		this._elementImage = this._element.querySelector(".element__image");
		this._elementTitle = this._element.querySelector(".element__scription-title");
		this._elementButtonLike = this._element.querySelector(".element__scription-button");
		this._elemenButtonDelete = this._element.querySelector(".element__bin-button");
		this._setEventListeners();

		this._elementTitle.textContent = this._name;
		this._elementImage.src = this._link;
		this._elementImage.alt = "Фотография местности " + this._name;

		return this._element;
	};
}