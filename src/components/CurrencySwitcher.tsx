import { useState, useEffect } from "react";

type Currency = "BRL" | "EUR" | "USD";

interface CurrencyConfig {
  label: string;
  symbol: string;
  rate: number; // divide BRL by this
}

const currencies: Record<Currency, CurrencyConfig> = {
  BRL: { label: "R$", symbol: "R$", rate: 1 },
  EUR: { label: "EUR", symbol: "€", rate: 6 },
  USD: { label: "USD", symbol: "$", rate: 5.5 },
};

const STORAGE_KEY = "lipe-currency";

export const useCurrency = () => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Currency) || "BRL";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const formatPrice = (brlValue: number): string => {
    const config = currencies[currency];
    const converted = brlValue / config.rate;

    if (currency === "BRL") {
      return `R$ ${converted.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    if (currency === "EUR") {
      return `€${converted.toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$${converted.toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return { currency, setCurrency, formatPrice };
};

interface CurrencySwitcherProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencySwitcher = ({ currency, setCurrency }: CurrencySwitcherProps) => {
  const options: Currency[] = ["BRL", "EUR", "USD"];

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border/50">
      {options.map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
            currency === c
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {currencies[c].label}
        </button>
      ))}
    </div>
  );
};

export default CurrencySwitcher;
