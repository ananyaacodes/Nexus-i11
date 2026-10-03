import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, Lenis };

export function initSmoothScroll(): (() => void) {
  if (typeof window === 'undefined') return () => {};

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  const scrollHandler = () => {
    ScrollTrigger.update();
  };

  lenis.on('scroll', scrollHandler);

  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);

  return () => {
    lenis.off('scroll', scrollHandler);
    gsap.ticker.remove(tickerCallback);
    lenis.destroy();
  };
}
