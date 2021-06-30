const button = document.querySelectorAll('overlays-button');
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// function startGame() {
//     button.classList.remove('visible');
// }


function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

    } else{
        hasFlippedCard = false;
        secondCard =this;

        checkForMatch();
    }

}

        // console.log(firstCard.dataset.value);
        // console.log(secondCard.dataset.value);

function checkForMatch() {
        if(firstCard.dataset.value === secondCard.dataset.value){
           disableCards();
        } else{
            unflipCards();

    
    }
    

} 


//if match
function disableCards(){
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);


    resetBoard();

}

//if not a match
function unflipCards(){
    lockBoard =true;
    setTimeout(() => {
                
           
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 500);

    resetBoard();


}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 21);
        card.style.order = randomPos;

    });
}) ();


cards.forEach(card => card.addEventListener('click', flipCard));
button.forEach(button => button.addEventListener('click', () => {
    button.classList.remove('visible');

});