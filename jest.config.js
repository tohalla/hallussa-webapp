module.exports = {
  roots: [
    "<rootDir>/src",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.svg": "<rootDir>/src/__mocks__/file.mock.ts",
  },
  setupFiles: [
    "dotenv/config",
    "<rootDir>/src/__mocks__/i18n.ts",
    "<rootDir>/src/__mocks__/runtime.tsx",
  ],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
    }
  },
};
