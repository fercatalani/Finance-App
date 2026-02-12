import FinancesClient from './FinancesClient';

export default function FinancesPage() {
  return (
    <div className="min-h-[60vh] flex items-start flex-col">
      <h1 className="text-2xl font-semibold text-[var(--pure-white)]">Finances</h1>
      <FinancesClient />
    </div>
  );
}
