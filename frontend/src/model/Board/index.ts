import {
  BasePiece,
  BaseSpot,
  Piece,
  PieceColor,
  PieceType,
  Spot,
} from '..';

enum Direction {
  UP,
  UP_RIGHT,
  RIGHT,
  DOWN_RIGHT,
  DOWN,
  DOWN_LEFT,
  LEFT,
  UP_LEFT,
};

const ROW_MOVEMENT_DIRECTIONS = [Direction.UP, Direction.DOWN, Direction.UP_LEFT, Direction.UP_RIGHT, Direction.DOWN_LEFT, Direction.DOWN_RIGHT];
const COLUMN_MOVEMENT_DIRECTIONS = [Direction.LEFT, Direction.RIGHT, Direction.UP_LEFT, Direction.UP_RIGHT, Direction.DOWN_LEFT, Direction.DOWN_RIGHT];
const DOWN_DIRECTIONS = [Direction.DOWN_LEFT, Direction.DOWN, Direction.DOWN_RIGHT];
const RIGHT_DIRECTIONS = [Direction.UP_RIGHT, Direction.RIGHT, Direction.DOWN_RIGHT];
const NON_DIAGONAL_DIRECTIONS = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
const DIAGONAL_DIRECTIONS = [Direction.UP_RIGHT, Direction.DOWN_RIGHT, Direction.DOWN_LEFT, Direction.UP_LEFT];

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

export class Board {
  spots: Spot[][];
  pieces: Piece[];

  static NUMBER_OF_PIECES = 18;

  static NUMBER_OF_COLUMNS = 10;
  static NUMBER_OF_ROWS = 9;

  static MAX_ROW_INDEX = Board.NUMBER_OF_ROWS - 1;
  static MAX_COLUMN_INDEX = Board.NUMBER_OF_COLUMNS - 1;

  constructor(serializedBoardState: string = INITIAL_BOARD_STATE) {
    const pieces = new Array<Piece>();
    const spots = new Array<Spot[]>(Board.NUMBER_OF_ROWS);
    for (let row = 0; row < Board.NUMBER_OF_ROWS; row++) {
      spots[row] = new Array<Spot>(Board.NUMBER_OF_COLUMNS);
    }

    this.pieces = pieces;
    this.spots = spots;

    serializedBoardState.split('').forEach((pieceCharacter, index) => {
      const row = Math.floor(index / Board.NUMBER_OF_COLUMNS);
      const column = index % Board.NUMBER_OF_COLUMNS;
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
    return row >= 0 && row <= Board.MAX_ROW_INDEX && column >= 0 && column <= Board.MAX_COLUMN_INDEX;
  }

  findMove(row: number, column: number, direction: Direction): void {
    let moveRow = null;
    let moveColumn = null;
    const pieceMovingFrom = this.getPiece(row, column);

    if (!pieceMovingFrom) {
      return;
    }

    const pieceMovingFromInGoal = pieceMovingFrom.getSpot().isPartOfGoal();

    const isMovingRow = ROW_MOVEMENT_DIRECTIONS.includes(direction);
    const isMovingColumn = COLUMN_MOVEMENT_DIRECTIONS.includes(direction);
    const rowVector = isMovingRow ? (DOWN_DIRECTIONS.includes(direction) ? 1 : -1) : 0;
    const columnVector = isMovingColumn ? (RIGHT_DIRECTIONS.includes(direction) ? 1 : -1) : 0;

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
    for (let row = Spot.WHITE_GOAL_LOWEST_ROW; row <= Board.MAX_ROW_INDEX; row++) {
      for (let column = Spot.WHITE_GOAL_LOWEST_COLUMN; column <= Board.MAX_COLUMN_INDEX; column++) {
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

  getSpots() {
    return this.spots;
  }

  forEachSpot(callbackFn: (spot: Spot) => void) {
    this.spots.forEach((spotRow) => spotRow.forEach(callbackFn));
  }

  // Public Methods
  getPiece(row: number, column: number): Piece | null {
    return this.getSpot(row, column).getPiece();
  }

  getWhitePieces(): Piece[] {
    return this.pieces.filter((p) => p.isWhite());
  }

  getBlackPieces(): Piece[] {
    return this.pieces.filter((p) => p.isBlack());
  }

  findMoves(row: number, column: number): void {
    NON_DIAGONAL_DIRECTIONS.forEach((direction) => this.findMove(row, column, direction));
    if (this.isPowerPiece(row, column)) {
      DIAGONAL_DIRECTIONS.forEach((direction) => this.findMove(row, column, direction));
    }
  }

  clearMoves(): void {
    this.forEachSpot((spot) => spot.clearIsPotentialMove());
  }

  serialize(): string {
    return this.spots.reduce((acc, row) => {
      return acc + row.reduce((acc, spot) => acc + spot.serialize(), '');
    }, '');
  }

  getWinner(): PieceColor | null {
    if (this.didWhiteWin()) {
      return PieceColor.WHITE;
    } else if (this.didBlackWin()) {
      return PieceColor.BLACK;
    } else {
      return null;
    }
  }

  prettyPrint(): void {
    const serializedBoard = this.serialize();
    let prettyString = '';
    for (let row = 0; row < Board.NUMBER_OF_COLUMNS; row++) {
      prettyString = prettyString + serializedBoard.substring(row * Board.NUMBER_OF_COLUMNS, (row + 1)* Board.NUMBER_OF_COLUMNS) + "\n";
    }

    console.log(prettyString);
  }

  static deserializeCharacter(data: string): BasePiece | BaseSpot | null {
    return BasePiece.deserialize(data) || BaseSpot.deserialize(data);
  }
};
