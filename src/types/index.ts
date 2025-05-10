export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}
