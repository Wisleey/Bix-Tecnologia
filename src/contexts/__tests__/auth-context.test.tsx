import { act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../auth-context";
import { renderHook } from "@testing-library/react";

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve fornecer o contexto de autenticação corretamente", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(typeof result.current.login).toBe("function");
    expect(typeof result.current.logout).toBe("function");
  });

  it("deve fazer login corretamente", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    const userData = {
      name: "João Silva",
      email: "joao@exemplo.com",
    };

    act(() => {
      result.current.login(userData);
    });

    expect(result.current.user).toEqual(userData);
    expect(result.current.isAuthenticated).toBe(true);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(userData)
    );
  });

  it("deve fazer logout corretamente", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Primeiro faz login
    const userData = {
      name: "João Silva",
      email: "joao@exemplo.com",
    };

    act(() => {
      result.current.login(userData);
    });

    // Depois faz logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("user");
  });

  it("deve carregar usuário do localStorage na inicialização", () => {
    const storedUser = {
      name: "João Silva",
      email: "joao@exemplo.com",
    };

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedUser));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual(storedUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("deve lidar com erro ao carregar usuário do localStorage", () => {
    mockLocalStorage.getItem.mockReturnValue("invalid-json");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("user");
  });

  it("deve lançar erro quando useAuth é usado fora do AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth deve ser usado dentro de um AuthProvider");
  });
});
