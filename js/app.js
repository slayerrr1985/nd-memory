/*************************************************
 *  MATCHING GAME - Udacity Nanodegree Project   *
 *  Paula Rubiera 2018                           *
 *************************************************/

let moveCount = 0;
let starCount = 0;
let timeCount = 0;
let matchCount = 0;
let timerId = 0;
let cardTypes = ["fa-diamond","fa-bicycle","fa-bolt","fa-paper-plane-o","fa-cube","fa-bomb","fa-anchor","fa-leaf"];
let deck = newDeck(cardTypes);
document.querySelector(".restart").addEventListener('click', startGame);

startGame();




/*
 * Create a new deck of cards
 * cardTypes is an array with the different symbols/classes
 */

function newDeck(cardTypes){
    let deck=[];
    /* Create a pair of cards for each card type */
    for(i=0; i<cardTypes.length; i++){
        deck.push(`<li class="card"><i class="fa ${cardTypes[i]}"></i></li>`);
        deck.push(`<li class="card"><i class="fa ${cardTypes[i]}"></i></li>`);
    }
    return deck;
}

/*
 * Display a deck of cards
 */

function displayDeck(deck){
    let deckContainer = document.querySelector(".deck");
    let deckHTML = "";
    for(let i=0; i<deck.length; i++){
        deckHTML += deck[i];
    }
    deckContainer.innerHTML = deckHTML;
    /* Set the event listener for each card */
    let cards = document.querySelectorAll(".card");
    for (const card of cards){
        card.addEventListener('click', cardClick);
    }
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * Start and stop the time counters
 */

function startTimeCounter() {
    console.log("START THE CLOCKS!!!");
    timeCount = 0;
    let timerId = setInterval(function() {
        timeCount++;
        document.querySelector(".timer").innerHTML = timeCount;
    }, 1000);
    return timerId;
}

function stopTimeCounter(timerId) {
    console.log("STOP THE CLOCKS!!!");
    clearInterval(timerId);
}

/*
 * Add and reset the number of moves and display in score panel
 */

function updateMoves(){
    let moveContainer = document.querySelector(".moves");
    moveCount ++;
    moveContainer.innerHTML = moveCount;
}

function resetMoves(){
    let moveContainer = document.querySelector(".moves");
    moveCount = 0;
    moveContainer.innerHTML = moveCount;
}

/*
 * Add and reset the number of matches and display in score panel
 */

function updateMatches(){
    let matchContainer = document.querySelector(".matches");
    matchCount ++;
    matchContainer.innerHTML = matchCount;
}

function resetMatches(){
    let matchContainer = document.querySelector(".matches");
    matchCount = 0;
    matchContainer.innerHTML = matchCount;
}

/*
 * Manage what happens when we win the game
 */

function checkEndGame(){
    if (matchCount == 8){ 
        console.log("YOU WON!!!");
        stopTimeCounter(timerId);
    }
}


/*
 * Start a new game
 */

function startGame(){
    console.log("A NEW GAME HAS STARTED! Dum dum duuuum...");
    resetMoves();
    resetMatches();
    if (timerId==null){
        timerId = startTimeCounter();
    }
    else{
        stopTimeCounter(timerId);
        timerId = startTimeCounter();
    }
    /*shuffle(deck);*/
    displayDeck(deck);
}



/*
 * Function to run if a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function cardClick(e){
    /* Check if the card is not already a match */
    if (!e.target.classList.contains("match"))
    {
        /* Show card */
        e.target.classList.add("show","open");
        /* Look for open cards */
        openCards = document.querySelectorAll(".open");
        console.log(openCards.length + " card(s) open.");

        /* When we have 2 cards showing */
        if (openCards.length === 2){
            updateMoves();
            /* If there's a match */
            if (openCards[0].isEqualNode(openCards[1])){
                console.log("There's a match!");
                openCards[0].classList.replace("open","match");
                openCards[1].classList.replace("open","match");
                updateMatches();
                checkEndGame();
            }
            else{
                /* If there's no match */
                console.log("No match :(");
                setTimeout(function(){
                    openCards[0].classList.remove("show","open");
                    openCards[1].classList.remove("show","open");
                },1000);
            }
        }
    }
}




