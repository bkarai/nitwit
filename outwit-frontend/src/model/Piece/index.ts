export const MOVE = 'm';
export const EMPTY = 'x';
export const WHITE_STANDARD = 'w';
export const WHITE_POWER = 'W';
export const BLACK_STANDARD = 'b';
export const BLACK_POWER = 'B';

export type PieceString = typeof MOVE | typeof EMPTY | typeof WHITE_STANDARD | typeof WHITE_POWER | typeof BLACK_STANDARD | typeof BLACK_POWER;

export class Piece {

  type: PieceString;

  constructor(type: PieceString) {
    this.type = type;
  }

  isWhite(): boolean {
    return ((this.type === WHITE_STANDARD) || (this.type === WHITE_POWER));
  }

  isBlack(): boolean {
    return ((this.type === BLACK_STANDARD) || (this.type === BLACK_POWER));
  }

  isMove(): boolean {
    return this.type === MOVE;
  }

  isEmpty(): boolean {
    return this.type === EMPTY;
  }

  isStandard(): boolean {
    return ((this.type === WHITE_STANDARD) || (this.type === BLACK_STANDARD));
  }

  isPower(): boolean {
    return ((this.type === WHITE_POWER) || (this.type === BLACK_POWER));
  }

  serialize(): string {
    return this.type;
  }
}

export const MOVE_PIECE = new Piece(MOVE);
export const EMPTY_PIECE = new Piece(EMPTY);
export const WHITE_STANDARD_PIECE = new Piece(WHITE_STANDARD);
export const WHITE_POWER_PIECE = new Piece(WHITE_POWER);
export const BLACK_STANDARD_PIECE = new Piece(BLACK_STANDARD);
export const BLACK_POWER_PIECE = new Piece(BLACK_POWER);

export function getPieceSingleton(type: PieceString): Piece {
  switch(type){
    case WHITE_STANDARD:
      return WHITE_STANDARD_PIECE;
    case WHITE_POWER:
      return WHITE_POWER_PIECE;
    case BLACK_STANDARD:
      return BLACK_STANDARD_PIECE;
    case BLACK_POWER:
      return BLACK_POWER_PIECE;
    case MOVE:
      return MOVE_PIECE;
    case EMPTY:
      return EMPTY_PIECE;
    default:
      throw new Error(`Invalid piece: ${type}`);
  }
}
