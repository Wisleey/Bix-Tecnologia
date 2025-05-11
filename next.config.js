/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // ativa styled-components no SWC
    styledComponents: true,
  },
  reactStrictMode: true,
  // swcMinify é true por padrão em Next 15, mas você pode explicitar:
  swcMinify: true,
  // Configurações de cache
  experimental: {
    // Habilita o cache de imagens
    images: {
      allowFutureImage: true,
    },
  },
  // Configurações de cache para páginas estáticas
  onDemandEntries: {
    // período de tempo em ms que o servidor manterá as páginas em memória
    maxInactiveAge: 25 * 1000,
    // número de páginas que devem ser mantidas em memória
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
