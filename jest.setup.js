import "@testing-library/jest-dom";

// Mock do next/router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Mock do styled-components
jest.mock("styled-components", () => {
  const styled = new Proxy(() => ({}), {
    get:
      (target, prop) =>
      (...args) =>
        args[0] || `${String(prop)}-mocked`,
  });
  return { __esModule: true, default: styled, ...styled };
});

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock do fetch
global.fetch = jest.fn();

// Mock do Headers
global.Headers = class Headers {
  constructor(init) {
    this.headers = new Map();
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this.headers.set(key, value);
      });
    }
  }

  get(name) {
    return this.headers.get(name);
  }

  set(name, value) {
    this.headers.set(name, value);
  }
};
