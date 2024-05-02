document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game');
    const cardImages = ['dog', 'cat', 'bird', 'fish', 'rabbit', 'horse', 'sheep', 'cow'];
    let cardsChosen = [];
    let cardsChosenIds = [];

    function createBoard() {
        const doubledImages = [...cardImages, ...cardImages];
        doubledImages.sort(() => 0.5 - Math.random());

        doubledImages.forEach((name, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);
            const img = document.createElement('img');
            img.setAttribute('src', `${name}.png`);
            img.setAttribute('alt', name);
            card.appendChild(img);
            card.addEventListener('click', flipCard);
            game.appendChild(card);
        });
    }

    function flipCard() {
        const selected = this;
        const cardId = selected.getAttribute('data-id');
        cardsChosen.push(selected.firstChild.getAttribute('src'));
        cardsChosenIds.push(cardId);
        selected.firstChild.style.display = 'block';

        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const cards = document.querySelectorAll('.card');
        const [firstId, secondId] = cardsChosenIds;
        if (cardsChosen[0] === cardsChosen[1] && firstId !== secondId) {
            alert('You found a match!');
            cards[firstId].removeEventListener('click', flipCard);
            cards[secondId].removeEventListener('click', flipCard);
        } else {
            cards[firstId].firstChild.style.display = 'none';
            cards[secondId].firstChild.style.display = 'none';
        }
        cardsChosen = [];
        cardsChosenIds = [];
    }

    createBoard();
});