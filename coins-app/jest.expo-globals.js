/**
 * Pre-define Expo winter globals before expo's winter runtime loads.
 * Expo's installGlobal will skip overwriting if the property is non-configurable.
 * Uses Node built-ins where available to avoid "import outside scope" errors in Jest.
 * !!!!!!!!!!!!!!!! GitHub: Expo + Jest issues !!!!!!!!!!!!!!!!!!!
 * expo/expo#36831 – “Broken Tests In SDK 53 Which Passed in SDK 52”
 * expo/expo#37261 – “jest-expo is failing due to import syntax”
 * These confirm Jest/expo compatibility problems across SDK 52–54.
 */
const obj = typeof global !== 'undefined' ? global : globalThis;
const { TextDecoder: NodeTextDecoder } = require('util');

const globals = {
  __ExpoImportMetaRegistry: { url: 'file:///jest-test' },
  TextDecoder: obj.TextDecoder || NodeTextDecoder,
  TextDecoderStream: obj.TextDecoderStream,
  TextEncoderStream: obj.TextEncoderStream,
  URL: obj.URL,
  URLSearchParams: obj.URLSearchParams,
  structuredClone: obj.structuredClone,
};

for (const [name, value] of Object.entries(globals)) {
  if (value !== undefined) {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    if (!desc || desc.configurable !== false) {
      try {
        Object.defineProperty(obj, name, {
          value,
          configurable: false,
          enumerable: true,
          writable: false,
        });
      } catch (_) {}
    }
  }
}
