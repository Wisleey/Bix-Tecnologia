"use client";

import { useMemo } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { Calendar, TrendingUp, Info } from "react-feather";
import type { Transaction } from "@/types";
import type { TooltipProps } from "recharts";

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
  margin-bottom: 1.75rem;
`;

const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ChartTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const ChartTitleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ChartDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0.25rem 0 0 0;
`;

const ChartInfoButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
  margin-top: 1rem;
`;

const CustomTooltipContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TooltipTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
`;

const TooltipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const TooltipColor = styled.div<{ color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2px;
  background-color: ${({ color }) => color};
`;

const TooltipLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const TooltipValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-left: auto;
`;

interface ChartSectionProps {
  transactions: Transaction[];
}
type TooltipEntry = {
  name: string;
  value: number;
  color: string;
};
// Componente de tooltip personalizado para o gráfico de barras
const CustomBarTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <TooltipTitle>{label}</TooltipTitle>
        {payload.map((entry, index) => {
          if (!entry || entry.value === undefined) return null;

          const typedEntry = entry as TooltipEntry;

          return (
            <TooltipItem key={`item-${index}`}>
              <TooltipColor color={typedEntry.color} />
              <TooltipLabel>
                {typedEntry.name === "deposits" ? "Receitas" : "Despesas"}
              </TooltipLabel>
              <TooltipValue>
                {typedEntry.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TooltipValue>
            </TooltipItem>
          );
        })}
      </CustomTooltipContainer>
    );
  }

  return null;
};

// Componente de tooltip personalizado para o gráfico de linha
const CustomLineTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const entry = payload[0];

    if (!entry || entry.value === undefined) return null;

    return (
      <CustomTooltipContainer>
        <TooltipTitle>{label}</TooltipTitle>
        <TooltipItem>
          <TooltipColor color="#2196F3" />
          <TooltipLabel>Saldo</TooltipLabel>
          <TooltipValue>
            {entry.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </TooltipValue>
        </TooltipItem>
      </CustomTooltipContainer>
    );
  }

  return null;
};

export default function ChartSection({ transactions }: ChartSectionProps) {
  // Preparar dados para o gráfico de receitas/despesas mensais
  const monthlyData = useMemo(() => {
    const months: Record<
      string,
      { month: string; deposits: number; withdrawals: number }
    > = {};

    transactions.forEach((transaction: Transaction) => {
      const date = transaction.date;
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      // Traduzir nomes dos meses para português
      const monthNames = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const monthName = monthNames[date.getMonth()];

      if (!months[monthKey]) {
        months[monthKey] = {
          month: `${monthName} ${date.getFullYear()}`,
          deposits: 0,
          withdrawals: 0,
        };
      }

      if (transaction.transaction_type === "deposit") {
        months[monthKey].deposits += transaction.amount;
      } else {
        months[monthKey].withdrawals += transaction.amount;
      }
    });

    return Object.values(months).sort((a, b) => {
      return a.month.localeCompare(b.month);
    });
  }, [transactions]);

  // Preparar dados para o gráfico de saldo ao longo do tempo
  const balanceData = useMemo(() => {
    // Agrupar transações por dia
    const days: Record<string, { date: string; balance: number }> = {};
    let runningBalance = 0;

    // Ordenar transações por data
    const sortedTransactions = [...transactions].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    sortedTransactions.forEach((transaction) => {
      const date = transaction.date;
      const dayKey = date.toISOString().split("T")[0];

      // Formatar data para exibição em português
      const formattedDate = new Date(dayKey).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

      if (transaction.transaction_type === "deposit") {
        runningBalance += transaction.amount;
      } else {
        runningBalance -= transaction.amount;
      }

      days[dayKey] = {
        date: formattedDate,
        balance: runningBalance,
      };
    });

    return Object.values(days).sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
  }, [transactions]);

  return (
    <ChartsContainer>
      <ChartCard>
        <ChartHeader>
          <ChartTitleGroup>
            <IconWrapper>
              <Calendar size={20} />
            </IconWrapper>
            <ChartTitleContent>
              <ChartTitle>Receitas e Despesas Mensais</ChartTitle>
              <ChartDescription>
                Comparação de receitas e despesas por mês
              </ChartDescription>
            </ChartTitleContent>
          </ChartTitleGroup>
          <ChartInfoButton>
            <Info size={18} />
          </ChartInfoButton>
        </ChartHeader>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#eaeaea" }}
              />
              <YAxis
                tickFormatter={(value) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: "compact",
                    maximumFractionDigits: 1,
                  })
                }
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#eaeaea" }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend
                formatter={(value) =>
                  value === "deposits" ? "Receitas" : "Despesas"
                }
                iconType="circle"
                wrapperStyle={{ paddingTop: 0 }}
              />
              <Bar
                dataKey="deposits"
                name="deposits"
                fill="#4CAF50"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="withdrawals"
                name="withdrawals"
                fill="#F44336"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartCard>

      <ChartCard>
        <ChartHeader>
          <ChartTitleGroup>
            <IconWrapper>
              <TrendingUp size={20} />
            </IconWrapper>
            <ChartTitleContent>
              <ChartTitle>Evolução do Saldo</ChartTitle>
              <ChartDescription>
                Evolução do seu saldo ao longo do período selecionado
              </ChartDescription>
            </ChartTitleContent>
          </ChartTitleGroup>
          <ChartInfoButton>
            <Info size={18} />
          </ChartInfoButton>
        </ChartHeader>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={balanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#eaeaea" }}
              />
              <YAxis
                tickFormatter={(value) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: "compact",
                    maximumFractionDigits: 1,
                  })
                }
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#eaeaea" }}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <ReferenceLine y={0} stroke="#ccc" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="balance"
                name="Saldo"
                stroke="#2196F3"
                fillOpacity={1}
                fill="url(#colorBalance)"
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartCard>
    </ChartsContainer>
  );
}
