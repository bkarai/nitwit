import { Player } from '../Player';
import { Spot } from '../Spot';

export enum PieceType {
  MOVE,
  STANDARD,
  POWER,
};

export enum PieceColor {
  WHITE,
  BLACK,
}

export class Piece {
  readonly type: PieceType;
  readonly color: PieceColor | null;
  player: Player | null;
  spot: Spot;

  constructor(type: PieceType, spot: Spot, color?: PieceColor) {
    this.type = type;
    this.setSpot(spot);
    this.color = color || null;
    this.player = null;
  }

  setSpot(spot: Spot): void {
    this.spot = spot;
    this.spot.setPiece(this);
  }

  getSpot(): Spot {
    return this.spot;
  }

  isMove(): boolean {
    return this.type === PieceType.MOVE;
  }

  isStandard(): boolean {
    return this.type === PieceType.STANDARD;
  }

  isPower(): boolean {
    return this.type === PieceType.POWER;
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  getPlayer(): Player | null {
    return this.player;
  }

  isWhite(): boolean {
    return this.color === PieceColor.WHITE;
  }

  isBlack(): boolean {
    return this.color === PieceColor.BLACK;
  }

  serialize(): string {
    if (this.isMove()) {
      return 'm';
    } else if (this.isWhite()) {
      if (this.isStandard()) {
        return 'w';
      } else {
        return 'W';
      }
    } else {
      if (this.isStandard()) {
        return 'b';
      } else {
        return 'B';
      }
    }
  }

  destroy(): void {
    this.spot.removePiece();
  }
};
