Hi,

This is the final code with comments on certain lines for the REACT tic-tac-toe tutorial.

The app is organized in three core peices: Game, Board, and sqaure. 

The tic tac toe grid is created first by the Square function. The Board function prints the 9 squares using formating from the style.css file. 

The board function also handles moves (clicks) on the board and calls the Calculate Winner function. Using the helper function, the Board function tracks if someone has won, prints the winner on screen and stops the game. 

All functions are ultimately run through the Game function. This function tracks all instancs of a particular game, and allows you to revist them using a list of links on the right of the game.

It also keeps track internally of the current state of the board and keeps track of which symbols turn it is. 

The tutorial builds the app in peices, and explains them but I made this avaliable to help alleviate any misunderstandings at the final state of the app. 
