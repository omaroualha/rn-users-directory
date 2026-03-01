module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    "^expo/src/winter(.*)$": "<rootDir>/src/__mocks__/emptyMock.js",
  },
};
