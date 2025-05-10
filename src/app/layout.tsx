"use client";

import type React from "react";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "styled-components";
import StyledComponentsRegistry from "@/lib/registry";
import { AuthProvider } from "@/contexts/auth-context";
import { FilterProvider } from "@/contexts/filter-context";
import GlobalStyles from "@/styles/global-styles";
import { theme } from "@/styles/theme";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AuthProvider>
              <FilterProvider>{children}</FilterProvider>
            </AuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
