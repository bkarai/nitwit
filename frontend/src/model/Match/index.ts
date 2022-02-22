import {
  Board,
  Player
} from 'model';

export class Match {
  localGame: boolean;
  matchAccessKey: string;
  board: Board;
  players: [Player, Player];
  currentTurn: Player;

  constructor(localGame = true, matchAccessKey = 'local') {
    this.localGame = localGame;
    this.matchAccessKey = matchAccessKey;
    this.board = new Board();
    this.players = [new Player(), new Player()];

    this.players[0].setPieces(this.board.getWhitePieces());
    this.players[1].setPieces(this.board.getBlackPieces());
    this.currentTurn = this.players[0];
  }

  getBoard() {
    return this.board;
  }

  pull() {

  }

  push() {

  }
};
