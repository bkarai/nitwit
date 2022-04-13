import {
  Board,
  Player,
  PieceColor,
  Coordinate
} from 'model';

const LOCAL_GAME = 'local';

export class Match {
  local: boolean;
  matchAccessKey: string;
  board: Board;
  firstPlayer: Player | null;
  secondPlayer: Player | null;
  currentTurn: PieceColor;

  constructor(local = true, matchAccessKey = LOCAL_GAME) {
    this.local = local;
    this.matchAccessKey = matchAccessKey;
    this.board = new Board();
    this.firstPlayer = null;
    this.secondPlayer = null;
    this.currentTurn = PieceColor.WHITE;
  }

  isLocalMatch(): boolean {
    return this.local;
  }

  isNetworkGame(): boolean {
    return !this.isLocalMatch();
  }

  addPlayer(isControllingWhite: boolean, isLocalPlayer: boolean) {
    const player = new Player(isLocalPlayer);
    if (!this.firstPlayer) {
      this.firstPlayer = player;
    } else if (!this.secondPlayer) {
      this.secondPlayer = player;

      if (isControllingWhite === this.firstPlayer.isWhite()) {
        console.error('Attempting to play a game with two players of the same color');
      }
    } else {
      console.error('Attempting to add more than one player to the game');
    }

    player.setPieces(isControllingWhite ? this.board.getWhitePieces() : this.board.getBlackPieces());
  }

  isWhiteTurn(): boolean {
    return this.currentTurn === PieceColor.WHITE;
  }

  isBlackTurn(): boolean {
    return !this.isWhiteTurn();
  }

  configureBoard(positions: string): void {
    this.board.configure(positions);
  }

  selectPieceAt(coordinate: Coordinate): void {
    // TODO
  }

  serialize() {
    return {
      isLocalMatch: this.isLocalMatch,
      matchAccessKey: this.matchAccessKey,
      board: this.board.serialize(),
      isWhiteTurn: this.currentTurn === PieceColor.WHITE,
    }
  }
};
