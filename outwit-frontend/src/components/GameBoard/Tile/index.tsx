import { Square } from 'components';

import {
  GameTileProps,
  BrownTileProps,
  OrangeTileProps,
  YellowTileProps,
} from './interface';

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
