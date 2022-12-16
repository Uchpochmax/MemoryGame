// создание функции, принимающую название неперевернутой и перевернутой иконки, 
// и создающей элемент div для карты в котором два значения элемента i с 
// исходной картинкой и перевернутой

export const createGameCard = (defaultIcon, flippedIcon) => {
    const card = document.createElement('div');
    card.classList.add('game-card');

    const notFlippedCardI = document.createElement('i');
    const flippedCardI = document.createElement('i');


    notFlippedCardI.classList.add('fa', `fa-${defaultIcon}`);  
    flippedCardI.classList.add('fa', `fa-${flippedIcon}`);
    
    card.append(flippedCardI, notFlippedCardI);

    return card;
}