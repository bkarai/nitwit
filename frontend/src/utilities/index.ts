interface NavigatorIe10AndBelow extends Navigator  {
  msMaxTouchPoints: number;
}

export function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     ((navigator as NavigatorIe10AndBelow).msMaxTouchPoints > 0));
}

export const LOCAL_STORAGE_KEY = 'local-game';
