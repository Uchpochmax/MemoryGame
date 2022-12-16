// функция для перемешивания массива

export const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex = null;

    while (currentIndex != 0 ) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// функция дублирующая элементы исходного массива
export const duplicateArray = (array) => array.reduce((res, current) => res.concat([current, current]), []);

// создание массива элементов, состоящего из названий иконок
export const createIconArray = (initialCount) => {
    const cardsIcons = [
        'rocket',
        'coffee',
        'dog',
        'heart',
        'dragon',
        'carrot',
        'cat',
        'star'
    ];

    switch (initialCount) {
        case 10:
            return cardsIcons.slice(0, 5);
        case 12:
            return cardsIcons.slice(0, 6);
        case 14:
            return cardsIcons.slice(0, 7);
        case 16:
            return cardsIcons;
        default:
            break;
    }
}