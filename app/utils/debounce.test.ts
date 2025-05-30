import { debounce } from "./debounce";

describe("debounce", () => {
  it("should call the function only once when debounce is called multiple times with an interval less than 500", async () => {
    const func = jest.fn();
    const debouncedFunc = () => debounce(func);

    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(0);

    await new Promise((r) => setTimeout(r, 900));
    debouncedFunc();

    expect(func).toHaveBeenCalledTimes(0);

    await new Promise((r) => setTimeout(r, 1000));
    expect(func).toHaveBeenCalledTimes(1);
  });
});
