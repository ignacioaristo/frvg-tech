import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@react-navigation/native", () => ({
  ...(jest.requireActual("@react-navigation/native") as any),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {},
  })),
}));
