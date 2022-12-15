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

const cardElements = document.querySelector('.elements');
const cardTemplate = document.querySelector("#element");
const cardTemplateTitle = cardTemplate.content.querySelector('.element__scription-title');
const cardTemplateImg = cardTemplate.content.querySelector('.element__image');

const popupImage = document.querySelector('#popup-image');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__text');

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('#popup-edit');
const popupEditTitle = popupEdit.querySelector('.popup__input_value_title');
const popupEditSubtitle = popupEdit.querySelector('.popup__input_value_subtitle');
const popupEditForm = popupEdit.querySelector('.popup__form');

const popupAdd = document.querySelector('#popup-add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddFormName = popupAddForm.querySelector('.popup__input_value_name');
const popupAddFormImg = popupAddForm.querySelector('.popup__input_value_image');

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEscape);
}

function createCard(name, link) {
  cardTemplateTitle.textContent = name;
  cardTemplateImg.src = link;
  cardTemplateImg.alt = name;

  const cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector('.element__bin-button').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  cardElement.querySelector(".element__scription-button").addEventListener('click', evt => {
    evt.target.classList.toggle("element__scription-button_active");
  });

  cardElement.querySelector('.element__image').addEventListener('click', evt => {
    popupImageImg.src = evt.target.src;
    popupImageImg.alt = name;
    popupImageText.textContent = name;
    openPopup(popupImage);
  });

  return cardElement;
}

function createCards() {
  const cards = [];
  for (let card of initialCards) {
    cards.push(createCard(card.name, card.link));
  }

  cardElements.append.apply(cardElements, cards);
}

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

profileButtonEdit.addEventListener('click', () => {
  popupEditTitle.value = profileTitle.textContent;
  popupEditSubtitle.value = profileSubtitle.textContent;    
  openPopup(popupEdit);
});


popupEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileTitle.textContent = popupEditTitle.value;
  profileSubtitle.textContent = popupEditSubtitle.value;
  closePopup(popupEdit);
  evt.target.reset();
});

profileButtonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddForm.addEventListener("submit", evt => {
  evt.preventDefault();
  cardElements.prepend(createCard(popupAddFormName.value, popupAddFormImg.value));
  closePopup(popupAdd);
  evt.target.reset();
});

createCards();