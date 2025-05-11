import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cache em memória para as respostas da API
const cache = new Map<string, { data: string; timestamp: number }>();

export function middleware(request: NextRequest) {
  // Verifica se é uma rota de API
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const url = request.nextUrl.toString();
    const cachedResponse = cache.get(url);

    // Se existe cache e não expirou (5 minutos)
    if (
      cachedResponse &&
      Date.now() - cachedResponse.timestamp < 5 * 60 * 1000
    ) {
      return new NextResponse(cachedResponse.data, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300", // 5 minutos
        },
      });
    }
  }

  return NextResponse.next();
}

// Função para armazenar resposta no cache
export function cacheResponse(url: string, data: any) {
  cache.set(url, {
    data: JSON.stringify(data),
    timestamp: Date.now(),
  });
}

// Configurar quais rotas o middleware deve interceptar
export const config = {
  matcher: "/api/:path*",
};
