# Memory Game Project

## Table of Contents

* [Objective of the game](#instructions)
* [Known bugs](#known-bugs)
* [Dependencies](#dependencies)

## Objective of the Game

The game randomly shuffles the cards. A user wins once all cards have successfully been matched.

When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.

The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1).
 
 *  5 stars - 10 moves or less
 *  4 stars - more than 10 moves
 *  3 stars - more than 20 moves
 *  2 stars - more than 25 moves
 *  1 star  - more than 30 moves

A restart button allows the player to reset the game board, the timer, and the star rating.

When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.

Game displays the current number of moves a user has made.

## Known bugs

* If you click on two cards and don't wait until they're hidden to click on another one it gets a bit stuck.

## Dependencies

* Icons provided by [Font Awesome](http://www.fontawesome.com)
