"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Dashboard from "@/components/dashboard";
import Head from "next/head";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard Financeiro | BIX Tecnologia</title>
        <meta
          name="description"
          content="Gerencie suas finanças com dashboards, relatórios e insights inteligentes. Visualize receitas, despesas, saldo e muito mais!"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Dashboard Financeiro | BIX Tecnologia"
        />
        <meta
          property="og:description"
          content="Gerencie suas finanças com dashboards, relatórios e insights inteligentes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bix-tecnologia.webp" />
        <meta
          property="og:url"
          content="https://bix-tecnologia-tau.vercel.app/dashboard"
        />
      </Head>
      <Dashboard />
    </>
  );
}
