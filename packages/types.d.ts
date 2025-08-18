import 'temporal-polyfill/global';

declare global {
  var Temporal: typeof import('temporal-polyfill').Temporal;
}

export {}; 