import {
  Piece,
  PieceString,
  MOVE_PIECE,
  EMPTY_PIECE
} from '../Piece';

export class Board {
  board: string;

  static NUMBER_OF_COLUMNS = 10;
  static NUMBER_OF_ROWS = 9;

  static MAX_ROW_INDEX = Board.NUMBER_OF_ROWS - 1;
  static MAX_COLUMN_INDEX = Board.NUMBER_OF_COLUMNS - 1;

  static BLACK_GOAL_HIGHEST_ROW_INDEX = 2;
  static BLACK_GOAL_HIGHEST_COLUMN_INDEX = 2;

  static WHITE_GOAL_LOWEST_ROW_INDEX = 6;
  static WHITE_GOAL_LOWEST_COLUMN_INDEX = 7;

  constructor(board: string) {
    this.board = board;
  };

  // Private Methods
  getIndex(row: number, column: number): number {
    return (row * Board.NUMBER_OF_COLUMNS) + column;
  }

  isPartOfBlackGoal(row: number, column: number): boolean {
    return (row <= Board.BLACK_GOAL_HIGHEST_ROW_INDEX && column <= Board.BLACK_GOAL_HIGHEST_COLUMN_INDEX);
  }

  isPartOfWhiteGoal(row: number, column: number): boolean {
    return (row >= Board.WHITE_GOAL_LOWEST_ROW_INDEX && column >= Board.WHITE_GOAL_LOWEST_COLUMN_INDEX);
  }

  isPowerPiece(row: number, column: number): boolean {
    return this.getPiece(row, column).isPower();
  }

  canBePlacedOnTile(row: number, column: number, piece: Piece): boolean {
    if (piece.isWhite()) {
      return !this.isPartOfBlackGoal(row, column);
    } else {
      return !this.isPartOfWhiteGoal(row, column);
    }
  }

  isValidIndex(row: number, column: number): boolean {
    return row >= 0 && row <= Board.MAX_ROW_INDEX && column >= 0 && column <= Board.MAX_COLUMN_INDEX;
  }

  findMove(row: number, column: number, direction: 'u' | 'd' | 'l' | 'r' | 'ul' | 'ur' | 'dl' | 'dr'): void {
    let moveRow = null;
    let moveColumn = null;
    const pieceMovingFrom = this.getPiece(row, column);
    const pieceMovingFromInGoal = this.isPartOfWhiteGoal(row, column) || this.isPartOfBlackGoal(row, column);

    const isMovingRow = ['u', 'd', 'ul', 'ur', 'dl', 'dr'].includes(direction);
    const isMovingColumn = ['l', 'r', 'ul', 'ur', 'dl', 'dr'].includes(direction);
    const rowVector = isMovingRow ? (['d', 'dl', 'dr'].includes(direction) ? 1 : -1) : 0;
    const columnVector = isMovingColumn ? (['r', 'ur', 'dr'].includes(direction) ? 1 : -1) : 0;

    let potentialRow = row + rowVector;
    let potentialColumn = column + columnVector;

    while (this.isValidIndex(potentialRow, potentialColumn)) {
      const pieceMovingTo = this.getPiece(potentialRow, potentialColumn);
      const pieceMovingToNotInGoal = !(this.isPartOfWhiteGoal(potentialRow, potentialColumn) || this.isPartOfBlackGoal(potentialRow, potentialColumn));
      const movingOutOfGoal = pieceMovingFromInGoal && pieceMovingToNotInGoal;
      if (!pieceMovingTo.isEmpty() || !this.canBePlacedOnTile(potentialRow, potentialColumn, pieceMovingFrom) || movingOutOfGoal) {
        break;
      } else {
        moveRow = potentialRow;
        moveColumn = potentialColumn;
        potentialRow = potentialRow + rowVector;
        potentialColumn = potentialColumn + columnVector;
        if (pieceMovingFrom.isPower()) {
          this.setPiece(moveRow, moveColumn, MOVE_PIECE);
        }
      }
    }

    if ((moveRow !== null) && (moveColumn !== null)) {
      this.setPiece(moveRow, moveColumn, MOVE_PIECE);
    }
  }

  didWhiteWin(): boolean {
    for (let row = Board.WHITE_GOAL_LOWEST_ROW_INDEX; row <= Board.MAX_ROW_INDEX; row++) {
      for (let column = Board.WHITE_GOAL_LOWEST_COLUMN_INDEX; column <= Board.MAX_COLUMN_INDEX; column++) {
        const piece = this.getPiece(row, column);
        if (!piece.isWhite()) {
          return false;
        }
      }
    }

    return true;
  }

  didBlackWin(): boolean {
    for (let row = 0; row <= Board.BLACK_GOAL_HIGHEST_ROW_INDEX; row++) {
      for (let column = 0; column <= Board.BLACK_GOAL_HIGHEST_COLUMN_INDEX; column++) {
        const piece = this.getPiece(row, column);
        if (!piece.isBlack()) {
          return false;
        }
      }
    }

    return true;
  }

  // Public Methods
  setPiece(row: number, column: number, piece: Piece): void {
    const index = this.getIndex(row, column);
    this.board = this.board.substring(0,index) + piece.getType() + this.board.substring(index+1);
  }

  getPiece(row: number, column: number): Piece {
    return new Piece(this.board[this.getIndex(row, column)] as PieceString);
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
    this.board = this.board.replaceAll(MOVE_PIECE.getType(), EMPTY_PIECE.getType());
  }

  getWinner(): null | 'white' | 'black' {
    if (this.didWhiteWin()) {
      return 'white';
    } else if (this.didBlackWin()) {
      return 'black';
    } else {
      return null;
    }
  }

  serialize(): string {
   return this.board; 
  }
};
