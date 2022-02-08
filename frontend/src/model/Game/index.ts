import {
  BasePiece,
  BaseSpot,
  Piece,
  PieceColor,
  PieceType,
  Player,
  Spot
} from '../';

const INITIAL_BOARD_STATE =
`\
xxxxxxxxwb\
xxxxxxxwbx\
xxxxxxwbxx\
xxxxxwbxxx\
xxxxWBxxxx\
xxxwbxxxxx\
xxwbxxxxxx\
xwbxxxxxxx\
wbxxxxxxxx\
`;

export class Game {
  spots: Spot[][];
  pieces: Piece[];
  players: [Player, Player];

  static NUMBER_OF_PIECES = 18;

  static NUMBER_OF_COLUMNS = 10;
  static NUMBER_OF_ROWS = 9;

  static MAX_ROW_INDEX = Game.NUMBER_OF_ROWS - 1;
  static MAX_COLUMN_INDEX = Game.NUMBER_OF_COLUMNS - 1;

  constructor(serializedBoardState: string = INITIAL_BOARD_STATE) {
    const pieces = new Array<Piece>();
    const spots = new Array<Spot[]>(Game.NUMBER_OF_ROWS);
    for (let row = 0; row < Game.NUMBER_OF_ROWS; row++) {
      spots[row] = new Array<Spot>(Game.NUMBER_OF_COLUMNS);
    }

    this.pieces = pieces;
    this.spots = spots;

    serializedBoardState.split('').forEach((pieceCharacter, index) => {
      const row = Math.floor(index / Game.NUMBER_OF_COLUMNS);
      const column = index % Game.NUMBER_OF_COLUMNS;
      const spot = new Spot(row, column);
      this.spots[row][column] = spot;
      let piece;
      switch(pieceCharacter) {
        case 'm':
          spot.setIsPotentialMove();
          break;
        case 'w':
          piece = new Piece(PieceType.STANDARD, spot, PieceColor.WHITE);
          break;
        case 'W':
          piece = new Piece(PieceType.POWER, spot, PieceColor.WHITE);
          break;
        case 'b':
          piece = new Piece(PieceType.STANDARD, spot, PieceColor.BLACK);
          break;
        case 'B':
          piece = new Piece(PieceType.POWER, spot, PieceColor.BLACK);
          break;
        default:
          break;
      }

      if (piece) {
        this.pieces.push(piece);
      }
    });

    const playerWithWhite = new Player();
    playerWithWhite.setPieces(this.pieces.filter((p) => p.isWhite()));
    const playerWithBlack = new Player();
    playerWithBlack.setPieces(this.pieces.filter((p) => p.isBlack()));
    this.players = [playerWithWhite, playerWithBlack];
  };

  // Private Methods
  getSpot(row: number, column: number): Spot {
    return this.spots[row][column];
  };

  isPowerPiece(row: number, column: number): boolean {
    return !!this.getSpot(row, column).getPiece()?.isPower();
  }

  canMoveToSpot(piece: Piece, spot: Spot): boolean {
    if (piece.isWhite()) {
      return !spot.isPartOfBlackGoal();
    } else {
      return !spot.isPartOfWhiteGoal();
    }
  }

  isValidIndex(row: number, column: number): boolean {
    return row >= 0 && row <= Game.MAX_ROW_INDEX && column >= 0 && column <= Game.MAX_COLUMN_INDEX;
  }

  findMove(row: number, column: number, direction: 'u' | 'd' | 'l' | 'r' | 'ul' | 'ur' | 'dl' | 'dr'): void {
    let moveRow = null;
    let moveColumn = null;
    const pieceMovingFrom = this.getPiece(row, column);

    if (!pieceMovingFrom) {
      return;
    }

    const pieceMovingFromInGoal = pieceMovingFrom.getSpot().isPartOfGoal();

    const isMovingRow = ['u', 'd', 'ul', 'ur', 'dl', 'dr'].includes(direction);
    const isMovingColumn = ['l', 'r', 'ul', 'ur', 'dl', 'dr'].includes(direction);
    const rowVector = isMovingRow ? (['d', 'dl', 'dr'].includes(direction) ? 1 : -1) : 0;
    const columnVector = isMovingColumn ? (['r', 'ur', 'dr'].includes(direction) ? 1 : -1) : 0;

    let potentialRow = row + rowVector;
    let potentialColumn = column + columnVector;

    while (this.isValidIndex(potentialRow, potentialColumn)) {
      const spotMovingTo = this.getSpot(potentialRow, potentialColumn);
      const pieceMovingToNotInGoal = !spotMovingTo.isPartOfGoal();
      const movingOutOfGoal = pieceMovingFromInGoal && pieceMovingToNotInGoal;

      if (!spotMovingTo.isEmpty() || !this.canMoveToSpot(pieceMovingFrom, spotMovingTo) || movingOutOfGoal) {
        break;
      } else {
        moveRow = potentialRow;
        moveColumn = potentialColumn;
        potentialRow = potentialRow + rowVector;
        potentialColumn = potentialColumn + columnVector;
        if (pieceMovingFrom.isPower()) {
          spotMovingTo.setIsPotentialMove();
        }
      }
    }

    if ((moveRow !== null) && (moveColumn !== null) && !pieceMovingFrom.isPower()) {
      this.getSpot(moveRow, moveColumn).setIsPotentialMove();
    }
  }

  didWhiteWin(): boolean {
    for (let row = Spot.WHITE_GOAL_LOWEST_ROW; row <= Game.MAX_ROW_INDEX; row++) {
      for (let column = Spot.WHITE_GOAL_LOWEST_COLUMN; column <= Game.MAX_COLUMN_INDEX; column++) {
        const piece = this.getPiece(row, column);
        if (!piece?.isWhite()) {
          return false;
        }
      }
    }

    return true;
  }

  didBlackWin(): boolean {
    for (let row = 0; row <= Spot.BLACK_GOAL_HIGHEST_ROW; row++) {
      for (let column = 0; column <= Spot.BLACK_GOAL_HIGHEST_COLUMN; column++) {
        const piece = this.getPiece(row, column);
        if (!piece?.isBlack()) {
          return false;
        }
      }
    }

    return true;
  }

  forEachSpot(callbackFn: (spot: Spot) => void) {
    this.spots.forEach((spotRow) => spotRow.forEach(callbackFn));
  }

  // Public Methods
  getPiece(row: number, column: number): Piece | null {
    return this.getSpot(row, column).getPiece();
  }

  findMoves(row: number, column: number): void {
    this.findMove(row, column, 'd');
    this.findMove(row, column, 'u');
    this.findMove(row, column, 'l');
    this.findMove(row, column, 'r');
    if (this.isPowerPiece(row, column)) {
      this.findMove(row, column, 'ul');
      this.findMove(row, column, 'ur');
      this.findMove(row, column, 'dr');
      this.findMove(row, column, 'dl');
    }
  }

  clearMoves(): void {
    this.forEachSpot((spot) => spot.clearIsPotentialMove());
  }

  getPlayerWithWhitePieces(): Player {
    return this.players.find((player) => player.isWhite()) as Player;
  }

  getPlayerWithBlackPieces(): Player {
    return this.players.find((player) => player.isBlack()) as Player;
  }

  getWinner(): null | Player {
    if (this.didWhiteWin()) {
      return this.getPlayerWithWhitePieces();
    } else if (this.didBlackWin()) {
      return this.getPlayerWithBlackPieces();
    } else {
      return null;
    }
  }

  serialize(): string {
    return this.spots.reduce((acc, row) => {
      return acc + row.reduce((acc, spot) => acc + spot.serialize(), '');
    }, '');
  }

  prettyPrint(): void {
    const serializedBoard = this.serialize();
    let prettyString = '';
    for (let row = 0; row < Game.NUMBER_OF_COLUMNS; row++) {
      prettyString = prettyString + serializedBoard.substring(row * Game.NUMBER_OF_COLUMNS, (row + 1)* Game.NUMBER_OF_COLUMNS) + "\n";
    }

    console.log(prettyString);
  }

  static deserializeCharacter(data: string): BasePiece | BaseSpot | null  {
    return BasePiece.deserialize(data) || BaseSpot.deserialize(data);
  }
};