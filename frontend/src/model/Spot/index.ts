import { Coordinate, Piece } from "model";

export enum SerializedSpot {
  POTENTIAL_MOVE = 'm',
  EMPTY = 'x',
};

export class BaseSpot {
  potentialMove: boolean;

  constructor(isPotentialMove: boolean = false) {
    this.potentialMove = isPotentialMove;
  }

  static deserialize(data: string): BaseSpot | null {
    if (data === SerializedSpot.POTENTIAL_MOVE) {
      return new BaseSpot(true);
    } else if (data === SerializedSpot.EMPTY) {
      return new BaseSpot(false);
    } else {
      return null;
    }
  }

  setIsPotentialMove(): void {
    this.potentialMove = true;
  }

  clearIsPotentialMove(): void {
    this.potentialMove = false;
  }

  isPotentialMove(): boolean {
    return this.potentialMove;
  }


  serialize(): string {
    if (this.potentialMove) {
      return 'm';
    } else {
      return 'x';
    }
  }
}

export class Spot extends BaseSpot {
  static BLACK_GOAL_HIGHEST_ROW = 2;
  static BLACK_GOAL_HIGHEST_COLUMN = 2;

  static WHITE_GOAL_LOWEST_ROW = 6;
  static WHITE_GOAL_LOWEST_COLUMN = 7;

  readonly location: Readonly<Coordinate>;
  piece: Piece | null;

  constructor(row: number, column: number) {
    super(false);
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
      return super.serialize();
    }
  }
}
