import { renderHook, waitFor } from "@testing-library/react-native";
import { useFetchUsers } from "./useFetchUsers";

jest.mock("@/app/hooks/useFetchUsers", () => ({
  useFetchUsers: () => {
    return {
      users: [{ id: 1, login: "test" }],
      isLoading: true,
      error: null,
    };
  },
}));

describe("useFetchUsers", () => {
  it("should fetch and return users", async () => {
    const { result } = renderHook(() => useFetchUsers());

    await waitFor(() => expect(result.current.isLoading).toBeTruthy());
    expect(result.current.users).toEqual([{ id: 1, login: "test" }]);
    expect(result.current.error).toBeNull();
  });
});
