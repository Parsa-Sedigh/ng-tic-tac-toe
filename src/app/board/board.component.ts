import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  /* The squares prop, represents the 9 moves on the game board.
  xIsNext prop, helps us to determine the current player and winner prop would be x or o.
  We could also check o is next with oIsNext prop I mentioned!

  When a user clicks on a square, the values of squares prop will splice with either x or o.

  Learn: Now when working with data on a component, you may want to COMPUTE a property which that property is based on one of the
   main pieces of data that changes. So in our case, we want to compute player prop which this prop is based on the xIsNext
   prop(main piece of data which itself also changes- So in this case, the xIsNext prop itself also changes, but we also want to compute
   the value of player prop too, which is based on value of xIsNext prop which itself changes too!). So we need to define a getter for
   the value which is based on another data which that data changes. So I defined a getter for player prop. So the getter of player prop,
   will give us the value of player prop, by computing that player prop based on another piece of data which is xIsNext prop which itself
   changes too. In other words, we created a computed property by using a ts getter and we called that computed prop, player and if
   xIsNext is true, then the next player is x otherwise it would be o. Now anytime the xIsNext value changes that computed prop will also
   be changed and reflected in the UI as well.
   In other words, anytime that pieces of data that the computed prop depends on them, change, that computed value will also be changed.
  xIsNext prop determines which player is currently using the game board? */
  squares: string[];
  xIsNext: boolean;
  winner: string;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  /* This method serves as an event handler for when user clicks on of the squares to make a move. When that click event happens, we check
  the index of that clicked square in the array of squares which the square  that they clicked on is a square in that array and we check if
  that square is already being clicked, then we don't do anything. But if it's empty or null, then we will splice in with the index of the
  square that the user clicked on with the current player which we computed in this component. So we delete the square that the user clicked
  on which is the squares[index] and then replace the place which that square where there before, with the player that was clicked on that
  square. So if the user clicks on square[2], then we delete that square[2] but then place the X or O in that deleted place.*/
  makeMove(index): void {
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return null;
  }

}
