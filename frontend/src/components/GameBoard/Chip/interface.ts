import React from "react";

type onClickHandler = (event: React.MouseEvent<HTMLElement>) => void;

export interface ChipWrapperProps {
  pieces: string,
  rowIndex: number,
  columnIndex: number,
  selectedPiece: { row: number | null, column: number | null },
  dispatch: any
};

export interface StandardChipProps {
  variant: 'white' | 'black' | 'move',
  onClick: onClickHandler,
  isSelected: boolean,
};

export type PowerChipProps = StandardChipProps;

export interface ChipProps {
  pieceCharacter: string,
  isSelected: boolean,
  selectedPiece: null | string,
  onClick: onClickHandler,
};

export interface OuterCircleProps {
  background: string;
  opacity: string;
};
