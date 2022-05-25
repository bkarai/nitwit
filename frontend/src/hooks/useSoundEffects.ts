import { useClickEffect } from "./useClickEffect";
import click from 'assets/click.wav';

function playClickSound() {
  new Audio(click).play();
}

export function useSoundEffects() {
  useClickEffect(playClickSound);
}
