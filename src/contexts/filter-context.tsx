"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface Filters {
  startDate: Date | null;
  endDate: Date | null;
  startDateString: string | null;
  endDateString: string | null;
  account: string | null;
  industry: string | null;
  state: string | null;
}

interface FilterContextType {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<Filters>({
    startDate: null,
    endDate: null,
    startDateString: null,
    endDateString: null,
    account: null,
    industry: null,
    state: null,
  });

  // Carregar filtros do localStorage na renderização inicial
  useEffect(() => {
    const storedFilters = localStorage.getItem("dashboard:filters");
    if (storedFilters) {
      try {
        const parsedFilters = JSON.parse(storedFilters);

        // Converter strings de data de volta para objetos Date
        if (parsedFilters.startDateString) {
          parsedFilters.startDate = new Date(parsedFilters.startDateString);
        }
        if (parsedFilters.endDateString) {
          parsedFilters.endDate = new Date(parsedFilters.endDateString);
        }

        setFiltersState(parsedFilters);
      } catch (error) {
        console.error("Falha ao analisar filtros armazenados:", error);
        localStorage.removeItem("dashboard:filters");
      }
    }
  }, []);

  const setFilters = (newFilters: Filters) => {
    setFiltersState(newFilters);
    localStorage.setItem("dashboard:filters", JSON.stringify(newFilters));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter deve ser usado dentro de um FilterProvider");
  }
  return context;
}
