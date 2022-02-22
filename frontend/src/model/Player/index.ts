import { Piece } from 'model';

export class Player {
  pieces: Piece[] | null;

  constructor() {
    this.pieces = null;
  }

  getPieces(): Piece[] | null {
    return this.pieces;
  }

  setPieces(pieces: Piece[]): void {
    this.pieces = pieces;
    this.pieces.forEach((piece) => {
      piece.setPlayer(this);
    });
  }

  getFirstPiece(): Piece | null {
    if (this.pieces?.length) {
      return this.pieces[0];
    } else {
      return null;
    }
  }

  isWhite(): boolean {
    return !!this.getFirstPiece()?.isWhite();
  }

  isBlack(): boolean {
    return !!this.getFirstPiece()?.isBlack();
  }
}
