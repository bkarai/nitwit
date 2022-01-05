export const MOVE = 'm';
export const EMPTY = 'x';
export const WHITE_STANDARD = 'w';
export const WHITE_POWER = 'W';
export const BLACK_STANDARD = 'b';
export const BLACK_POWER = 'B';

export type PieceString = typeof MOVE | typeof EMPTY | typeof WHITE_STANDARD | typeof WHITE_POWER | typeof BLACK_STANDARD | typeof BLACK_POWER;

export class Piece {
  type: PieceString;
  selected?: boolean;
  hovered?: boolean;
  row?: number;
  column?: number;

  constructor(type: PieceString, {
    selected,
    hovered,
    row,
    column,
  }: {
    selected?: boolean;
    hovered?: boolean;
    row?: number;
    column?: number;
  } = {}) {
    this.type = type;
    this.selected = selected;
    this.hovered = hovered;
    this.row = row;
    this.column = column;
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

  isHovered(): boolean {
    if (this.hovered === undefined) {
      throw new Error('Attempting to check hovered state of piece but a hovered state was not provided');
    }
    return this.hovered;
  }

  isSelected(): boolean {
    if (this.selected === undefined) {
      throw new Error('Attempting to check selected state of piece but a selected state was not provided');
    }
    return this.selected;
  };

  getType(): string {
    return this.type;
  }
}

export const MOVE_PIECE = new Piece(MOVE);
export const EMPTY_PIECE = new Piece(EMPTY);
export const WHITE_STANDARD_PIECE = new Piece(WHITE_STANDARD);
export const WHITE_POWER_PIECE = new Piece(WHITE_POWER);
export const BLACK_STANDARD_PIECE = new Piece(BLACK_STANDARD);
export const BLACK_POWER_PIECE = new Piece(BLACK_POWER);
