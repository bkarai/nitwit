
export interface GameTileProps {
  color: string,
  children: React.ReactNode,
};

interface ColorTileProps {
  children: React.ReactNode,
};

export type BrownTileProps = ColorTileProps;
export type OrangeTileProps = ColorTileProps;
export type YellowTileProps = ColorTileProps;
