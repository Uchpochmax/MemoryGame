import { confetti } from "./confetti.js";
import { createGameCard } from "./game-card.js";
import { createGameMenu } from "./game-menu.js";
import { createIconArray, duplicateArray, shuffle } from "./utils.js";

export const startGame = (difficult) => {

    // переменные для карточки (обратная и лицевая сторона), возможность кликать по карте
    let firstCard = null;
    let secondCard = null;
    let clickable = true;

    // доска с картами
    const gameSection = document.querySelector('.game-section__container');
    const gameTable = document.createElement('div');
    const cardsArray = createIconArray(difficult);
    const duplicatedCardsIcons = duplicateArray(cardsArray);
    const restartBtn = document.createElement('button');

    gameSection.innerHTML = '';
    restartBtn.textContent = 'Рестарт';
    gameTable.classList.add('game-table');
    restartBtn.classList.add('restart-btn')

    shuffle(duplicatedCardsIcons);

    // для каждого элемента дублированного массива создается div с классом .game-card
    // с двумя элементами i
    duplicatedCardsIcons.forEach(element => gameTable.append(createGameCard('question-circle', element)));

    // добавление в секцию игры игрового стола и кнопки рестарт
    gameSection.append(gameTable, restartBtn);

    restartBtn.addEventListener('click', createGameMenu)

    // константа с элементами div и классом .game-card
    const cards = document.querySelectorAll('.game-card');
    console.log(cards);
    // функция переворота карточек
    cards.forEach((card, index) => card.addEventListener('click', () => {
        if (clickable == true && !card.classList.contains('successfully')) {
            card.classList.add('flip');

            // запрет переворота больше двух карточек
            if (firstCard == null) {
                firstCard = index;
            }
            else {
                if (index != firstCard) {
                    secondCard = index;
                    clickable = false;
                }
            }

            if (firstCard != null && secondCard != null && firstCard != secondCard) {
                if (
                    cards[firstCard].firstElementChild.className ===
                    cards[secondCard].firstElementChild.className
                ) {
                    setTimeout(() => {
                        cards[firstCard].classList.add('successfully');
                        cards[secondCard].classList.add('successfully');

                        firstCard = null;
                        secondCard = null;
                        clickable = true;
                    }, 500)
                }
                else {
                    setTimeout(() => {
                        cards[firstCard].classList.remove('flip');
                        cards[secondCard].classList.remove('flip');

                        firstCard = null;
                        secondCard = null;
                        clickable = true;
                    }, 500);
                }
            }

            if (Array.from(cards).every(card => card.className.includes('flip'))) {
                document.querySelector('.salut').innerHTML = confetti;
            }
        }
    }))
}