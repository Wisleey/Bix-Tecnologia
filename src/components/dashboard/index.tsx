"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import SummaryCards from "@/components/dashboard/summary-cards";
import FilterPanel from "@/components/dashboard/filter-painel";
import ChartSection from "@/components/dashboard/chart-section";
import { useFilter } from "@/contexts/filter-context";
import type { Transaction } from "@/types";
import transactionsData from "@/data/transactions.json";
import Footer from "../footer/index";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  margin-left: 260px; // largura do sidebar
  padding: 2rem;
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

type RawTransaction = {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { filters } = useFilter();

  useEffect(() => {
    // Analisar e transformar os dados de transação
    const parsedTransactions: Transaction[] = (
      transactionsData as RawTransaction[]
    ).map((item) => ({
      id: crypto.randomUUID(), // ou algum outro ID
      date: new Date(Number(item.date)),
      amount: Number(item.amount) / 100,
      transaction_type: item.transaction_type,
      currency: item.currency,
      account: item.account,
      industry: item.industry,
      state: item.state,
    }));
    setTransactions(parsedTransactions);
  }, []);

  // Aplicar filtros às transações
  const filteredTransactions = transactions.filter((transaction) => {
    // Filtro de intervalo de datas
    if (filters.startDate && transaction.date < filters.startDate) {
      return false;
    }
    if (filters.endDate) {
      const endOfDay = new Date(filters.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (transaction.date > endOfDay) {
        return false;
      }
    }

    // Filtro de conta
    if (
      filters.account &&
      filters.account !== "all" &&
      transaction.account !== filters.account
    ) {
      return false;
    }

    // Filtro de indústria
    if (
      filters.industry &&
      filters.industry !== "all" &&
      transaction.industry !== filters.industry
    ) {
      return false;
    }

    // Filtro de estado
    if (
      filters.state &&
      filters.state !== "all" &&
      transaction.state !== filters.state
    ) {
      return false;
    }

    return true;
  });

  return (
    <MainContent>
      <DashboardContainer>
        <Sidebar />

        <ContentWrapper>
          <DashboardHeader />
          <FilterPanel transactions={transactions} />
          <SummaryCards transactions={filteredTransactions} />
          <ChartSection transactions={filteredTransactions} />
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
    </MainContent>
  );
}
