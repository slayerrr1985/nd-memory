/*************************************************
 *  MATCHING GAME - Udacity Nanodegree Project   *
 *  Paula Rubiera 2018                           *
 *************************************************/

let moveCount = 0;
let starCount = 5;
let timeCount = 0;
let matchCount = 0;
let timerId = 0;
let cardTypes = ["fa-diamond","fa-bicycle","fa-bolt","fa-paper-plane-o","fa-cube","fa-bomb","fa-anchor","fa-leaf"];
let openCards = [];
let deck = newDeck(cardTypes);

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
    let deckHTML = "";
    for(let i=0; i<deck.length; i++){
        deckHTML += deck[i];
    }
    document.querySelector(".deck").innerHTML = deckHTML;
    /* Set the event listener and id for each card */
    let cards = document.querySelectorAll(".card");
    for(let i=0; i<cards.length; i++){
        cards[i].setAttribute("id",i);
        cards[i].addEventListener('click', cardClick);
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
    moveCount ++;
    document.querySelector(".moves").innerHTML = moveCount;
}

function resetMoves(){
    moveCount = 0;
    document.querySelector(".moves").innerHTML = moveCount;
}

/*
 * Add and reset the number of matches and display in score panel
 */

function updateMatches(){
    matchCount ++;
    document.querySelector(".matches").innerHTML = matchCount;
}

function resetMatches(){
    matchCount = 0;
    document.querySelector(".matches").innerHTML = matchCount;
}

/*
 *  Star Rating
 *  
 *  5 stars - 10 moves or less
 *  4 stars - more than 10 moves
 *  3 stars - more than 20 moves
 *  2 stars - more than 25 moves
 *  1 star  - more than 30 moves
 * 
 */

function updateStars(){
    let starsContainer = document.querySelector(".stars");
    let stars = starsContainer.querySelectorAll("li");
    if (moveCount === 10){
        stars[4].classList.remove("light");
        starCount--;
    }
    if (moveCount === 20){
        stars[3].classList.remove("light");
        starCount--;
    }
    if (moveCount === 25){
        stars[2].classList.remove("light");
        starCount--;
    }
    if (moveCount === 30){
        stars[1].classList.remove("light");
        starCount--;
    }
}

function resetStars(starsContainerTarget){
    let starsContainer = document.querySelector("." + starsContainerTarget);
    let stars = starsContainer.querySelectorAll("li");
    for (i=0; i<stars.length; i++){
        stars[i].classList.add("light");
    }
}

/*
 * Manage what happens when we win the game
 */

function checkEndGame(){
    if (matchCount == 8){ 
        console.log("YOU WON!!!");
        stopTimeCounter(timerId);
        showResults();
    }
}

function showResults() {
    let modal = document.querySelector(".modal");
    modal.classList.add("showModal");
    let starsContainer = document.querySelector(".final-stars");
    let stars = starsContainer.querySelectorAll("li");
    for (i=0; i<starCount; i++){
        stars[i].classList.add("light");
    }
    document.querySelector(".final-moves").innerHTML = moveCount;
    document.querySelector(".final-timer").innerHTML = timeCount;
}

/*
 * Start a new game
 */

function startGame(){
    console.log("A NEW GAME HAS STARTED! Dum dum duuuum...");
    /* Reset all counters */
    resetMoves();
    resetMatches();
    resetStars("stars");
    /* Stop the existing counters and start a new one */
    if (!timerId){
        timerId = startTimeCounter();
    }
    else{
        stopTimeCounter(timerId);
        timerId = startTimeCounter();
    }
    /* Hide modal */
    document.querySelector(".modal").classList.remove("showModal");
    /* Activate restart buttons */
    for (const restartbutton of document.querySelectorAll(".restart")){
        restartbutton.addEventListener('click', startGame);
    }
    shuffle(deck);
    displayDeck(deck);
}

/*
 * Function to run when we click on a card
 */

function cardClick(e){
    /* Check if the card is not already a match */
    if (!e.target.classList.contains("match")&&(e.target.id != ""))
    {
        /* Show card */
        console.log("target: " + e.target.id);
        console.log(openCards.length + " card(s) open ANTES.");

        if (openCards.length < 2){
            e.target.classList.add("show","open");
        }
        /* Look for open cards */
        openCards = document.querySelectorAll(".open");
        console.log(openCards.length + " card(s) open.");

        /* When we have 2 cards showing */
        if (openCards.length === 2){
            updateMoves();
            updateStars();
            /* If there's a match */
            if (openCards[0].innerHTML === openCards[1].innerHTML){
                console.log(openCards[0].id);
                console.log(openCards[1].id);
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