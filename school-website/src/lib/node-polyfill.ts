// Polyfills for Node.js v25+ compatibility
if (typeof global !== "undefined") {
  // Fix Node v25+ broken/experimental localStorage
  try {
    const isLocalStorageBroken = !(global as any).localStorage || !(global as any).localStorage.getItem;
    if (isLocalStorageBroken) {
      const mockStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      };
      (global as any).localStorage = mockStorage;
    }
  } catch (e) {
    // If accessing localStorage throws, provide a mock
    const mockStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };
    (global as any).localStorage = mockStorage;
  }

  // Fix Node v25+ removed SlowBuffer (breaks legacy JWT libs like buffer-equal-constant-time)
  const buffer = require("buffer");
  if (typeof buffer.SlowBuffer === "undefined") {
    buffer.SlowBuffer = function (size: number) {
      return Buffer.allocUnsafe(size);
    };
    buffer.SlowBuffer.prototype = Buffer.prototype;
  }
}

export {};
