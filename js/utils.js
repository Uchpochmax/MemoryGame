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
        'star',
        'bus',
        'car-side',
        'ghost',
        'chess',
        'house',
        'cloud',
        'bell',
        'hippo',
        'paperclip',
        'pen',
        'bolt',
        'plane',
        'lemon',
        'truck',
        'anchor',
        'fish',
        'landmark',
        'shirt',
        'cable-car',
        'clock',
        'calendar',
        'moon',
        'crown',
        'face-smile',
        'umbrella',
        'camera',
        'paper-plane',
        'gamepad',
        'bug',
        'volleyball',
        'skull',
        'peace'
    ];


    switch (initialCount) {
        case 10:
            return shuffle(cardsIcons).slice(0, 5);
        case 12:
            return shuffle(cardsIcons).slice(0, 6);
        case 14:
            return shuffle(cardsIcons).slice(0, 7);
        case 16:
            return shuffle(cardsIcons).slice(0, 8);
        case 18:
            return shuffle(cardsIcons).slice(0, 9);
        case 20:
            return shuffle(cardsIcons).slice(0, 10);
        default:
            break;
    }
}