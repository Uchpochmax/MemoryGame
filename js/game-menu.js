import { startGame } from "./start-game.js";

export const createGameMenu = () => {
    const title = document.createElement('h2');
    const gameSection = document.querySelector('.game-section__container');

    // очистка страницы после рестарт
    gameSection.innerHTML = '';
    title.textContent = 'Выбор сложности';
    title.classList.add('game-menu__title');
    document.querySelectorAll('.salut').innerHTML = '';

    const createDifficultButton = (difficult) => {
        const btn = document.createElement('button');

        btn.classList.add('game-menu__difficult-btn');
        btn.textContent = `${difficult} карт`

        btn.addEventListener('click', () => startGame(difficult))

        return btn;
    }

    gameSection.append(
        title,
        createDifficultButton(10),
        createDifficultButton(12),
        createDifficultButton(14),
        createDifficultButton(16),
    )
    document.querySelector('.salut').innerHTML = '';
}