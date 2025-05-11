import { renderHook, act, waitFor } from "@testing-library/react";
import { useCache } from "../useCache";

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

// Mock do fetch
global.fetch = jest.fn();

describe("useCache", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  it("deve invalidar o cache corretamente", () => {
    const mockData = { test: "data" };
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        data: mockData,
        timestamp: Date.now(),
      })
    );

    const { result } = renderHook(() =>
      useCache({
        key: "test-key",
        fetchFn: () => Promise.resolve(mockData),
      })
    );

    act(() => {
      result.current.invalidateCache();
    });

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("test-key");
  });
});
