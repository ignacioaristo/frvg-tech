module.exports = {
  setupFiles: ['./jest.setup.js'],
  // other configurations...
};

module.exports = {
  preset: "jest-expo",
  verbose: true,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
  ],
   testPathIgnorePatterns: [
    `[/\\\\](["node_modules"])[/\\\\]`,
    "\\.web\\.(spec|test)\\.(js|jsx|ts|tsx)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
}