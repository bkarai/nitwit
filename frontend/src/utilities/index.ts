interface NavigatorIe10AndBelow extends Navigator  {
  msMaxTouchPoints: number;
}

export function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     ((navigator as NavigatorIe10AndBelow).msMaxTouchPoints > 0));
}
