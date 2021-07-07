const startbtn = document.getElementsByClassName('overlays-button')[0].getElementsByTagName('button')[0];
const restartbtn = document.getElementsByClassName('game-result')[0].getElementsByTagName('button')[0];
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let noOfFlips = 0;
let counter = 0;
let seconds = 0;
function startGame (){
    document.getElementsByClassName('overlays-button')[0].style.display= 'none';
    shuffle();   
    function incrementSeconds() {
        seconds += 1;
        document.getElementById('time-taken').innerHTML = seconds;   
    }    
    var secondIncrement = setInterval(incrementSeconds, 1000);
}
function flipCard(){
    if(lockBoard) return;
    if(this == firstCard) return;
    this.classList.add('flip');
    noOfFlips = noOfFlips + 1;
    document.getElementById('moves-made').innerHTML = noOfFlips;
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else{
        hasFlippedCard = false;
        secondCard =this;
        checkForMatch();
    }
}

function checkForMatch() {
        if(firstCard.dataset.value === secondCard.dataset.value){
            disableCards();
            counter = counter + 1;
            console.log(counter);
            if (counter == 10) {
                setTimeout(() => {
                document.getElementsByClassName('game-result')[0].style.display='block';
                document.getElementsByClassName('blur')[0].style.display='block';
                document.getElementById('total-flips').innerHTML = noOfFlips;
                document.getElementById('total-time').innerHTML = seconds;
            }, 500);
            }    
        }
        else{
            unflipCards();
        }
} 
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
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
function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;
    });
};
function restartGame(){  
    document.location.href = "";
    console.log("reset done")
}
cards.forEach(card => card.addEventListener('click', flipCard));
startbtn.addEventListener('click', startGame);
restartbtn.addEventListener('click', restartGame);
