import { useClickEffect } from "./useClickEffect";
import { useMoveEffect } from "./useMoveEffect";
import click from 'assets/click.wav';
import slide from 'assets/slide.mp3';

function playClickSound() {
  new Audio(click).play();
}

function playMoveSound() {
  new Audio(slide).play();
}

export function useSoundEffects() {
  useClickEffect(playClickSound);
  useMoveEffect(playMoveSound);
}
