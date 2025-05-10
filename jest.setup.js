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
