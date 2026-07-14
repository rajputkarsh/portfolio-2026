declare interface Window {
  dataLayer: Array<unknown>;
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
  hj?: (...args: unknown[]) => void;
}
