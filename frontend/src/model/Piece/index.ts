import { v4 as uuidv4 } from 'uuid';
import { Player, Spot } from 'model';

export enum PieceType {
  STANDARD,
  POWER,
};

export enum PieceColor {
  WHITE = 'white',
  BLACK = 'black',
};

export enum SerializedPiece {
  WHITE_STANDARD = 'w',
  WHITE_POWER = 'W',
  BLACK_STANDARD = 'b',
  BLACK_POWER = 'B',
};

export class BasePiece {
  readonly type: PieceType;
  readonly color: PieceColor;

  constructor(type: PieceType, color: PieceColor) {
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
        return SerializedPiece.WHITE_STANDARD;
      } else {
        return SerializedPiece.WHITE_POWER;
      }
    } else {
      if (this.isStandard()) {
        return SerializedPiece.BLACK_STANDARD;
      } else {
        return SerializedPiece.BLACK_POWER;
      }
    }
  }

  static deserialize(data: string): BasePiece | null {
    switch(data) {
      case SerializedPiece.WHITE_STANDARD:
        return new BasePiece(PieceType.STANDARD, PieceColor.WHITE);
      case SerializedPiece.WHITE_POWER:
        return new BasePiece(PieceType.POWER, PieceColor.WHITE);
      case SerializedPiece.BLACK_STANDARD:
        return new BasePiece(PieceType.STANDARD, PieceColor.BLACK);
      case SerializedPiece.BLACK_POWER:
        return new BasePiece(PieceType.POWER, PieceColor.BLACK);
      default:
        return null;
    }
  }
};

export class Piece extends BasePiece {
  player: Player | null;
  spot: Spot;
  readonly id: string;

  constructor(type: PieceType, color: PieceColor, spot: Spot = new Spot(-1, -1)) {
    super(type, color);
    this.spot = spot;
    this.setSpot(spot);
    this.player = null;
    this.id = uuidv4();
  }

  setSpot(spot: Spot): void {
    this.spot.removePiece();
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

  getId(): string {
    return this.id;
  }
};
