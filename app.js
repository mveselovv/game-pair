const app = document.querySelector('.app'); // Находим наш блок, где будет весь код генерироваться.

// Данные наших карточек.
const data = [{
    data_card: 'pumpkin',
    src_backface: 'img/image_1.svg',
    alt_backface: 'card_1',
  },
  {
    data_card: 'umbrella',
    src_backface: 'img/image_2.svg',
    alt_backface: 'card_2',
  },
  {
    data_card: 'coffe',
    src_backface: 'img/image_3.svg',
    alt_backface: 'card_3',
  },
  {
    data_card: 'nuts',
    src_backface: 'img/image_4.svg',
    alt_backface: 'card_4',
  },
  {
    data_card: 'cake',
    src_backface: 'img/image_5.svg',
    alt_backface: 'card_5',
  },
  {
    data_card: 'mushrooms',
    src_backface: 'img/image_6.svg',
    alt_backface: 'card_6',
  },
  {
    data_card: 'lifejacket',
    src_backface: 'img/image_9.svg',
    alt_backface: 'card_9',
  },
  {
    data_card: 'basket',
    src_backface: 'img/image_10.svg',
    alt_backface: 'card_10',
  },
];

// Создаём игру.
const gamePair = document.createElement('div'); // Создаём оболочку для нашей игры
gamePair.classList.add('game__pair'); // Добавляем класс нашей оболочки для игры

function appTitle(title) {
  const text = document.createElement('h1'); // Создаём заголовок на странице.
  text.classList.add('app__title'); // Добавляем класс к нашему заголовоку.
  text.innerText = title; // Добавляем ему текст.
  return text;
}

const span = document.createElement('span'); // Создаём тэг span для нашего счётчика
span.classList.add('count__span'); // Добавляем класс для нашего span-счётчика
gamePair.append(span); // Присоединяем наш спан к игровой доске
app.append(appTitle('Игра в пары')); // Добавляем и вызываем функцию с параметром нашего заголовка
app.append(gamePair); // Добавляем нашу игру к div.app

// Отрисовка игры из массива объектов. Выбирались только те данные, которые чаще всего повторялись.
for (let i = 0; i < data.length; i++) {
  gamePair.insertAdjacentHTML("afterbegin", `
	<div class="game__card" data-card="${data[i].data_card}">
		<img class="game__backface" src="${data[i].src_backface}" alt="${data[i].alt_backface}">
		<img class="game__face" src="img/main.svg" alt="face_card">
	</div>
	<div class="game__card" data-card="${data[i].data_card}">
		<img class="game__backface" src="${data[i].src_backface}" alt="${data[i].alt_backface}">
		<img class="game__face" src="img/main.svg" alt="face_card">
	</div>
`)
}


const cards = document.querySelectorAll('.game__card'); // Находим наши игровые карточки.
let hasFlippedCard = false; // Состояние переворота карты.
let lockBoard = false; // Нажатие второй карты
let firstCard, secondCard; // Первая и вторая карта
let currentFoundCard = []; // Сюда ложим все удачные нахождения пар.


function flipCard() {
  if (lockBoard) return; // Предотвращение любого переворачивания карты до того, как карты будут спрятаны или совпадают.
  if (this === firstCard) return;

  this.classList.add('transform');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkCards();
}

function checkCards() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  if (isMatch) {
    let count = currentFoundCard.push(isMatch);
    if (count >= 8) {
      restartGame();
    }
    span.innerText = `Найдено пар: ${count} / 8`;
  }

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('transform');
    secondCard.classList.remove('transform');

    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartGame() {
  const button = document.createElement('button');
  button.classList.add('button__restart');
  button.innerText = 'Сыграем ещё?';
  gamePair.append(button);

  button.addEventListener('click', function () {
    window.location.reload(1000);
  });
}

(function randomCard() {
  cards.forEach(card => {
    let randomCards = Math.floor(Math.random() * 12);
    card.style.order = randomCards;
  })
})();

cards.forEach(card => {
  card.addEventListener('click', flipCard)
})
