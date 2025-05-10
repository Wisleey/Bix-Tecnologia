"use client";

import type React from "react";

import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Filter, ChevronDown } from "react-feather";
import { useFilter } from "@/contexts/filter-context";
import type { Transaction } from "@/types";

const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.75rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const FilterTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
  pointer-events: none;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

interface FilterPanelProps {
  transactions: Transaction[];
}

export default function FilterPanel({ transactions }: FilterPanelProps) {
  const { filters, setFilters } = useFilter();

  // Extrair valores únicos para opções de filtro
  const accounts = useMemo(() => {
    const uniqueAccounts = new Set(transactions.map((t) => t.account));
    return Array.from(uniqueAccounts).sort();
  }, [transactions]);

  const industries = useMemo(() => {
    const uniqueIndustries = new Set(transactions.map((t) => t.industry));
    return Array.from(uniqueIndustries).sort();
  }, [transactions]);

  const states = useMemo(() => {
    const uniqueStates = new Set(transactions.map((t) => t.state));
    return Array.from(uniqueStates).sort();
  }, [transactions]);

  // Definir intervalo de datas padrão se ainda não estiver definido
  useEffect(() => {
    if (!filters.startDate && transactions.length > 0) {
      // Encontrar datas mais antigas e mais recentes
      const dates = transactions.map((t) => t.date);
      const earliestDate = new Date(Math.min(...dates.map((d) => d.getTime())));
      const latestDate = new Date(Math.max(...dates.map((d) => d.getTime())));

      // Formatar datas para input
      const formatDate = (date: Date) => {
        return date.toISOString().split("T")[0];
      };

      setFilters({
        ...filters,
        startDate: earliestDate,
        endDate: latestDate,
        startDateString: formatDate(earliestDate),
        endDateString: formatDate(latestDate),
      });
    }
  }, [transactions, filters, setFilters]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const date = dateString ? new Date(dateString) : null;
    setFilters({
      ...filters,
      startDate: date,
      startDateString: dateString,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const date = dateString ? new Date(dateString) : null;
    setFilters({
      ...filters,
      endDate: date,
      endDateString: dateString,
    });
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      account: e.target.value,
    });
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      industry: e.target.value,
    });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      state: e.target.value,
    });
  };

  // Traduzir nomes de indústrias para português
  const translateIndustry = (industry: string) => {
    const translations: Record<string, string> = {
      Technology: "Tecnologia",
      Manufacturing: "Manufatura",
      Finance: "Finanças",
      Healthcare: "Saúde",
    };
    return translations[industry] || industry;
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <Filter size={18} />
        <FilterTitle>Filtros</FilterTitle>
      </FilterHeader>
      <FilterGrid>
        <FilterGroup>
          <FilterLabel htmlFor="start-date">Data Inicial</FilterLabel>
          <DateInput
            id="start-date"
            type="date"
            value={filters.startDateString || ""}
            onChange={handleStartDateChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="end-date">Data Final</FilterLabel>
          <DateInput
            id="end-date"
            type="date"
            value={filters.endDateString || ""}
            onChange={handleEndDateChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="account">Conta</FilterLabel>
          <SelectWrapper>
            <Select
              id="account"
              value={filters.account || "all"}
              onChange={handleAccountChange}
            >
              <option value="all">Todas as Contas</option>
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </Select>
            <SelectIcon>
              <ChevronDown size={16} />
            </SelectIcon>
          </SelectWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="industry">Indústria</FilterLabel>
          <SelectWrapper>
            <Select
              id="industry"
              value={filters.industry || "all"}
              onChange={handleIndustryChange}
            >
              <option value="all">Todas as Indústrias</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {translateIndustry(industry)}
                </option>
              ))}
            </Select>
            <SelectIcon>
              <ChevronDown size={16} />
            </SelectIcon>
          </SelectWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="state">Estado</FilterLabel>
          <SelectWrapper>
            <Select
              id="state"
              value={filters.state || "all"}
              onChange={handleStateChange}
            >
              <option value="all">Todos os Estados</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
            <SelectIcon>
              <ChevronDown size={16} />
            </SelectIcon>
          </SelectWrapper>
        </FilterGroup>
      </FilterGrid>
    </FilterContainer>
  );
}
