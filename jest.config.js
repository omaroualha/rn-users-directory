module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    "^expo/src/winter(.*)$": "<rootDir>/src/__mocks__/emptyMock.js",
  },
};
