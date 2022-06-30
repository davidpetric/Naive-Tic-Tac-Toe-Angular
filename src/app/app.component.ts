import { Component } from '@angular/core';
import { PlayerType } from '../app/playerType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public matrix: number[] = [];

  private readonly firstLineIndexes: number[] = [0, 1, 2];
  private readonly firstColIndexes: number[] = [0, 3, 6];

  private readonly secondLineIndexes: number[] = [3, 4, 5];
  private readonly thirdLineIndexes: number[] = [6, 7, 8];

  private readonly secondColIndexes: number[] = [1, 4, 7];
  private readonly thirdColIndexes: number[] = [2, 5, 8];

  private readonly leftDiagonalIndexes: number[] = [0, 4, 8];
  private readonly rightDiagonalIndexes: number[] = [2, 4, 6];

  public readonly playerXVal: number = 1;
  public readonly player0Val: number = 0;

  private readonly maxTurns: number = 9;
  private currentTurns: number = 0;

  public currentPlayer: PlayerType = PlayerType.X;

  public onClick = (index: number) => {
    const theGameEnded = this.currentTurns >= this.maxTurns;
    if (theGameEnded) {
      alert('Game ended.');
      return;
    }

    const indexHasAlreadyValue = this.matrix[index] != undefined;
    const aPlayerMadeAMove = this.currentTurns > 1;

    if (indexHasAlreadyValue && aPlayerMadeAMove) {
      return;
    }

    this.matrix[index] = this.currentPlayer == PlayerType.X
      ? this.playerXVal
      : this.player0Val;

    this.currentPlayer = this.currentPlayer == PlayerType.X
      ? PlayerType.O
      : PlayerType.X;

    const winnerOnFirstLine = this.getWinnerFromIndexes(this.firstLineIndexes);
    this.playerXWon(winnerOnFirstLine);

    const winnerOnSecondLine = this.getWinnerFromIndexes(this.secondLineIndexes);
    this.playerXWon(winnerOnSecondLine);

    const winnerOnThirdLine = this.getWinnerFromIndexes(this.thirdLineIndexes);
    this.playerXWon(winnerOnThirdLine);

    const winnerOnFirstCol = this.getWinnerFromIndexes(this.firstColIndexes);
    this.playerXWon(winnerOnFirstCol);

    const winnerOnSecondCol = this.getWinnerFromIndexes(this.secondColIndexes);
    this.playerXWon(winnerOnSecondCol);

    const winnerOnThirdCol = this.getWinnerFromIndexes(this.thirdColIndexes);
    this.playerXWon(winnerOnThirdCol);

    const winnerOnLeftDiagonal = this.getWinnerFromIndexes(this.leftDiagonalIndexes);
    this.playerXWon(winnerOnLeftDiagonal);

    const winnerOnRightDiagonal = this.getWinnerFromIndexes(this.rightDiagonalIndexes);
    this.playerXWon(winnerOnRightDiagonal);

    this.currentTurns++;

    if (this.currentTurns == this.maxTurns) {
      alert('Tie');
    }
  };

  private getWinnerFromIndexes(indexes: number[]): (number | null) {
    let winner = null;
    if (indexes.every(f => this.matrix[f] == this.playerXVal)) {
      winner = this.playerXVal;
    }

    if (indexes.every(f => this.matrix[f] == this.player0Val)) {
      winner = this.player0Val;
    }

    return winner;
  }

  private playerXWon = (whoWon: number | null) => {
    if (whoWon == null) {
      return;
    }

    if (whoWon === this.playerXVal) {
      alert('Player X won');
    } else {
      alert('Player 0 won');
    }

    this.currentTurns = this.maxTurns;
  }

  public restartGame = () => {
    this.matrix = [];
    this.currentPlayer = PlayerType.X;
    this.currentTurns = 0;
  }
}
