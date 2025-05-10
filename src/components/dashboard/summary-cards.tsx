"use client";

import styled, { keyframes } from "styled-components";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
} from "react-feather";
import type { Transaction } from "@/types";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all 0.3s;
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const CardTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background-color: ${({ color, theme }) => theme.colors[color] + "15"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color, theme }) => theme.colors[color]};
`;

const CardValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
`;
const PercentageIndicator = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({ $isPositive, theme }) =>
    $isPositive ? theme.colors.success + "15" : theme.colors.error + "15"};
  color: ${({ $isPositive, theme }) =>
    $isPositive ? theme.colors.success : theme.colors.error};
`;

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  // Calcular total de depósitos
  const totalDeposits = transactions
    .filter((t) => t.transaction_type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular total de retiradas
  const totalWithdrawals = transactions
    .filter((t) => t.transaction_type === "withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular saldo
  const balance = totalDeposits - totalWithdrawals;

  // Simular transações pendentes (transações nas últimas 24 horas)
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const pendingTransactions = transactions.filter(
    (t) => t.date >= oneDayAgo
  ).length;

  // Simular percentuais de crescimento
  const depositGrowth = 12.8;
  const withdrawalGrowth = -5.2;
  const balanceGrowth = 8.5;
  const pendingGrowth = 15.3;

  // Formatar valor para moeda brasileira
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <CardsContainer>
      <Card>
        <CardHeader>
          <CardTitle>Receitas Totais</CardTitle>
          <IconWrapper color="success">
            <ArrowUp size={18} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{formatCurrency(totalDeposits)}</CardValue>
        <CardFooter>
          <PercentageIndicator $isPositive={depositGrowth > 0}>
            {depositGrowth > 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(depositGrowth)}%
          </PercentageIndicator>
          <span>vs. mês anterior</span>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Despesas Totais</CardTitle>
          <IconWrapper color="error">
            <ArrowDown size={18} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{formatCurrency(totalWithdrawals)}</CardValue>
        <CardFooter>
          <PercentageIndicator $isPositive={withdrawalGrowth > 0}>
            {withdrawalGrowth > 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(withdrawalGrowth)}%
          </PercentageIndicator>
          <span>vs. mês anterior</span>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saldo Atual</CardTitle>
          <IconWrapper color="primary">
            <DollarSign size={18} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{formatCurrency(balance)}</CardValue>
        <CardFooter>
          <PercentageIndicator $isPositive={balanceGrowth > 0}>
            {balanceGrowth > 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(balanceGrowth)}%
          </PercentageIndicator>
          <span>vs. mês anterior</span>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transações Pendentes</CardTitle>
          <IconWrapper color="warning">
            <Clock size={18} />
          </IconWrapper>
        </CardHeader>
        <CardValue>{pendingTransactions}</CardValue>
        <CardFooter>
          <PercentageIndicator $isPositive={pendingGrowth > 0}>
            {pendingGrowth > 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(pendingGrowth)}%
          </PercentageIndicator>
          <span>nas últimas 24 horas</span>
        </CardFooter>
      </Card>
    </CardsContainer>
  );
}
