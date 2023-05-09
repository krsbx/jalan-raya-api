declare module 'node:console' {
  global {
    interface Console {
      mock: {
        log(message?: unknown, ...optionalParams: unknown[]): void;
      };
    }
  }
}
