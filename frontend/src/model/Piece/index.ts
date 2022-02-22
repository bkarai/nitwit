import { Player, Spot } from 'model';

export enum PieceType {
  STANDARD,
  POWER,
};

export enum PieceColor {
  WHITE = 'white',
  BLACK = 'black',
};

export class BasePiece {
  readonly type: PieceType;
  readonly color: PieceColor | null;

  constructor(type: PieceType, color: PieceColor | null = null) {
    this.type = type;
    this.color = color;
  }

  isStandard(): boolean {
    return this.type === PieceType.STANDARD;
  }

  isPower(): boolean {
    return this.type === PieceType.POWER;
  }

  isWhite(): boolean {
    return this.color === PieceColor.WHITE;
  }

  isBlack(): boolean {
    return this.color === PieceColor.BLACK;
  }

  serialize(): string {
    if (this.isWhite()) {
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

  static deserialize(data: string): BasePiece | null {
    switch(data) {
      case 'w':
        return new BasePiece(PieceType.STANDARD, PieceColor.WHITE);
      case 'W':
        return new BasePiece(PieceType.POWER, PieceColor.WHITE);
      case 'b':
        return new BasePiece(PieceType.STANDARD, PieceColor.BLACK);
      case 'B':
        return new BasePiece(PieceType.POWER, PieceColor.BLACK);
      default:
        return null;
    }
  }
};

export class Piece extends BasePiece {
  player: Player | null;
  spot: Spot;

  constructor(type: PieceType, spot: Spot, color: PieceColor | null = null) {
    super(type, color);
    this.setSpot(spot);
    this.player = null;
  }

  setSpot(spot: Spot): void {
    this.spot?.removePiece();
    this.spot = spot;
    this.spot.setPiece(this);
  }

  getSpot(): Spot {
    return this.spot;
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  getPlayer(): Player | null {
    return this.player;
  }

  destroy(): void {
    this.spot.removePiece();
  }
};
