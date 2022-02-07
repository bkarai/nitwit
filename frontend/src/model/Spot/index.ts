import { Coordinate } from '../Coordinate';
import { Piece } from '../Piece';

export class Spot {
  static BLACK_GOAL_HIGHEST_ROW = 2;
  static BLACK_GOAL_HIGHEST_COLUMN = 2;

  static WHITE_GOAL_LOWEST_ROW = 6;
  static WHITE_GOAL_LOWEST_COLUMN = 7;

  readonly location: Readonly<Coordinate>;
  piece: Piece | null;

  constructor(row: number, column: number) {
    this.location = { row, column };
    this.piece = null;
  }

  getLocation(): Coordinate {
    return {...this.location};
  }

  isOccupied() {
    return !!this.piece;
  }

  isEmpty(): boolean {
    return !this.isOccupied();
  }

  getPiece(): Piece | null {
    return this.piece;
  }

  setPiece(piece: Piece): void {
    this.piece = piece;
    if (this.piece.getSpot() !== this) {
      this.piece.setSpot(this);
    }
  }

  removePiece(): void {
    this.piece = null;
  }

  isPartOfBlackGoal(): boolean {
    return (this.location.row <= Spot.BLACK_GOAL_HIGHEST_ROW) && (this.location.column <= Spot.BLACK_GOAL_HIGHEST_COLUMN);
  }

  isPartOfWhiteGoal(): boolean {
    return (this.location.row >= Spot.WHITE_GOAL_LOWEST_ROW) && (this.location.column >= Spot.WHITE_GOAL_LOWEST_COLUMN);
  }

  isPartOfGoal(): boolean {
    return this.isPartOfWhiteGoal() || this.isPartOfBlackGoal();
  }

  serialize(): string {
   if (this.piece) {
     return this.piece.serialize();
   } else {
     return 'x';
   }
  }
}
