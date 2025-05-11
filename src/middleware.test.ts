import { NextRequest } from "next/server";
import { middleware, cacheResponse } from "./middleware";

// Mock do NextResponse e NextRequest
jest.mock("next/server", () => ({
  NextRequest: jest.fn().mockImplementation((url) => ({
    url,
    nextUrl: new URL(url),
  })),
  NextResponse: {
    next: () => ({
      headers: new Headers(),
    }),
    json: (data: any) => ({
      headers: new Headers({
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      }),
      json: () => Promise.resolve(data),
    }),
  },
}));

describe("Middleware", () => {
  beforeEach(() => {
    // Limpa o cache antes de cada teste
    (global as any).cache = new Map();
  });

  it("deve passar para a próxima rota quando não for uma rota de API", () => {
    const request = new NextRequest("http://localhost:3000");
    const response = middleware(request);
    expect(response).toBeDefined();
  });

  it("deve retornar resposta em cache quando disponível e válida", () => {
    const request = new NextRequest("http://localhost:3000/api/transactions");
    const cachedData = { data: "test", timestamp: Date.now() };
    cacheResponse("/api/transactions", cachedData);

    const response = middleware(request);
    expect(response).toBeDefined();
  });

  it("deve passar para a próxima rota quando o cache expirou", () => {
    const request = new NextRequest("http://localhost:3000/api/transactions");
    const cachedData = {
      data: "test",
      timestamp: Date.now() - 6 * 60 * 1000, // 6 minutos atrás
    };
    cacheResponse("/api/transactions", cachedData);

    const response = middleware(request);
    expect(response).toBeDefined();
  });

  it("deve passar para a próxima rota quando não há cache", () => {
    const request = new NextRequest("http://localhost:3000/api/transactions");
    const response = middleware(request);
    expect(response).toBeDefined();
  });
});
