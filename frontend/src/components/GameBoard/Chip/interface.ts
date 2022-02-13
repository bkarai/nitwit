import React from "react";

type onMouseEvent = (event: React.MouseEvent<HTMLElement>) => void;

export interface ChipWrapperProps {
  pieces: string,
  rowIndex: number,
  columnIndex: number,
  selectedPiece: { row: number | null, column: number | null },
  dispatch: any
};

export enum ChipVariant {
  WHITE,
  BLACK,
  MOVE,
};

export interface StandardChipProps {
  variant: ChipVariant,
  isSelected: boolean,
};

export type PowerChipProps = StandardChipProps;

export interface ChipProps {
  pieceCharacter: string,
  isSelected: boolean,
  selectedPiece: null | string,
  onClick: onMouseEvent,
  onHover: onMouseEvent,
};

export interface OuterCircleProps {
  background: string;
  opacity: string;
};
