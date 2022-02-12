import { Square } from 'components';

interface GameTileProps {
  color: string,
  children: React.ReactNode,
};

function GameTile({
  color,
  children
}: GameTileProps) {
  return (
    <Square $size={50} $color={color}>
      {children}
    </Square>
  );
}

interface ColorTileProps {
  children: React.ReactNode,
};

type BrownTileProps = ColorTileProps;
type OrangeTileProps = ColorTileProps;
type YellowTileProps = ColorTileProps;

export function BrownTile({
  children
}: BrownTileProps) {
  return <GameTile color="#543014" children={children}/>
};

export function OrangeTile({
  children
}: OrangeTileProps) {
  return <GameTile color="#eb7507" children={children}/>
}

export function YellowTile({
  children
}: YellowTileProps) {
  return <GameTile color="#fae607" children={children}/>
}
