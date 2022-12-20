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
    const gameTimerHeader = document.createElement('h2');
    const timerCount = document.createElement('div');
    let interval;

    // Создание таймера
    const gameTimer = (time) => {
        // Создание переменных по именам классов 
        timerCount.classList.add('game-timer');

        // Функция, которая уменьшает значение таймера
        function timerStart() {
            if (timerCount.innerHTML > 0) {
                timerCount.innerHTML--;
            }
            if (timerCount.innerHTML <= 10) {
                timerCount.classList.remove(`last-${Number(timerCount.innerHTML)+1}-seconds`);
                timerCount.classList.add(`last-${timerCount.innerHTML}-seconds`);
            }
            if (timerCount.innerHTML == 0) {
                clearInterval(interval);
                gameTable.remove();
                timerCount.remove();
                gameTimerHeader.innerHTML = 'Попробуйте снова!';
                const loseGame = document.createElement('div');
                loseGame.innerHTML = '';
                gameTimerHeader.before(loseGame);
                loseGame.classList.add('game-over');
                setTimeout(() => {
                    loseGame.innerHTML = 'Game Over';
                    loseGame.classList.add('move');
                }, 100);
            };
        };

        // Функция, задающая интервал
        function countdown(time) {
            timerCount.innerHTML = time;
            clearInterval(interval);
            interval = setInterval(timerStart, 1000);
        }

        countdown(time);

    }

    gameSection.innerHTML = '';
    restartBtn.textContent = 'Рестарт';
    gameTimerHeader.textContent = 'У вас есть ровно 30 секунд:';
    gameTable.classList.add('game-table');
    restartBtn.classList.add('restart-btn');
    gameTimerHeader.classList.add('header-timer');

    shuffle(duplicatedCardsIcons);
    gameTimer(30);

    // для каждого элемента дублированного массива создается div с классом .game-card
    // с двумя элементами i
    duplicatedCardsIcons.forEach(element => gameTable.append(createGameCard('question-circle', element)));

    // добавление в секцию игры игрового стола и кнопки рестарт
    gameSection.append(gameTable, gameTimerHeader, timerCount, restartBtn);

    restartBtn.addEventListener('click', createGameMenu);


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
                clearInterval(interval);
                gameTimerHeader.innerHTML = 'Это было просто потрясающе! Вы уложились всего за';
                const winTime = 30 - Number(timerCount.innerHTML);
                timerCount.innerHTML = winTime;
                const winGame = document.createElement('h2');
                if (String(winTime)[0] != 1 && String(winTime)[1] == 1) {
                    winGame.innerHTML = 'секунду. Юхууу!';
                };
                if (String(winTime)[0] != 1 && (String(winTime)[1] == 2 || String(winTime)[1] == 3 || String(winTime)[1] == 4)) {
                    winGame.innerHTML = 'секунды. Юхууу!';
                }
                else winGame.innerHTML = 'секунд. Юхууу!';
                restartBtn.before(winGame);
                winGame.classList.add('header-timer');  
            }
        }
    }))
}