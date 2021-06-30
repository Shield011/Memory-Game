const startbtn = document.getElementsByClassName('overlays-button')[0].getElementsByTagName('button')[0];

const restartbtn = document.getElementsByClassName('game-result')[0].getElementsByTagName('button')[0];
// console.log(restartbtn)

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let noOfFlips = 0;
let counter = 0;

function startTimer(){
    var todayDate = new Date();
    var timeR = todayDate.getSeconds();
    var startTime = 0;
    
    console.log(timeR);

}

// let flips = document.getElementById('moves-made')

// function startGame() {
//     button.classList.remove('visible');
// }


function startGame (){
    document.getElementsByClassName('overlays-button')[0].style.display= 'none';
    shuffle();
    startTimer();


}


function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    noOfFlips = noOfFlips + 1;
    // console.log(noOfFlips)
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



        // console.log(firstCard.dataset.value);
        // console.log(secondCard.dataset.value);

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
            }, 500);

            }


            // endGame();

            
            
        }
        else{
            unflipCards();

    
    }
    

} 


//if match
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);


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

function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;

    });
};

// function endGame(){

//     document.getElementsByClassName('game-result')[0].style.display='block';
//     document.getElementsByClassName('blur')[0].style.display='block';
//     document.getElementById('total-flips').innerHTML = noOfFlips;

//     restartGame();

    


// }


function reset(){

    cards.forEach(card=>{
    card.classList.remove('flip');
    });
}


function restartGame(){


    
    
    document.getElementsByClassName('game-result')[0].style.display='none';
    document.getElementsByClassName('blur')[0].style.display='none';
    noOfFlips = 0;
    document.getElementById('moves-made').innerHTML = noOfFlips;

    // document.getElementsByClassName('overlays-button')[0].style.display= 'block';
   

    reset();
    console.log("card reset done");
    shuffle();
    console.log("card shuffled");
    flipCard();
    console.log("card will be flipable");
    

    


}


cards.forEach(card => card.addEventListener('click', flipCard));
startbtn.addEventListener('click', startGame);
restartbtn.addEventListener('click', restartGame);
