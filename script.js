document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game');
    const cardImages = [
        { name: 'dog', alt: 'an image of a dog' },
        { name: 'cat', alt: 'an image of a cat' },
        { name: 'bird', alt: 'an image of a bird' },
        { name: 'fish', alt: 'an image of a fish' },
        { name: 'rabbit', alt: 'an image of a rabbit' },
        { name: 'horse', alt: 'an image of a horse' },
        { name: 'sheep', alt: 'an image of a sheep' },
        { name: 'cow', alt: 'an image of a cow' }
    ];
    let cardsChosen = [];
    let cardsChosenIds = [];

    function createBoard() {
        const doubledImages = [...cardImages, ...cardImages];
        doubledImages.sort(() => 0.5 - Math.random());

        doubledImages.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);
            card.setAttribute('role', 'gridcell');
            card.setAttribute('aria-label', item.alt);
            card.setAttribute('tabindex', '0');
            const img = document.createElement('img');
            img.setAttribute('src', `${item.name}.png`);
            img.setAttribute('alt', item.alt);
            card.appendChild(img);
            card.addEventListener('click', flipCard);
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    flipCard.call(this);
                }
            });
            game.appendChild(card);
        });
    }

    function flipCard() {
        const selected = this;
        const cardId = selected.getAttribute('data-id');
        cardsChosen.push(selected.firstChild.src);
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
            cards[firstId].setAttribute('aria-hidden', 'true');
            cards[secondId].setAttribute('aria-hidden', 'true');
        } else {
            cards[firstId].firstChild.style.display = 'none';
            cards[secondId].firstChild.style.display = 'none';
        }
        cardsChosen = [];
        cardsChosenIds = [];
    }

    createBoard();
});
