"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  createdAt: string;
};

export default function FinancesClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/finances");
      const json = await res.json();
      setItems(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = { description: desc, amount: Number(amount), type };
      const res = await fetch("/api/finances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      const newItem = await res.json();
      setItems((s) => [newItem, ...s]);
      setDesc("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to add");
    }
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleAdd} className="flex gap-2 items-center">
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          className="text-black px-2 py-1 rounded"
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          type="number"
          className="text-black px-2 py-1 rounded w-24"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="text-black  px-2 py-1 rounded"
        >
          <option value="expense">expense</option>
          <option value="income">income</option>
        </select>
        <button
          type="submit"
          className="px-3 py-1 bg-primary text-primary-foreground rounded"
        >
          Add
        </button>
      </form>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Recent</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="text-black mt-2 space-y-2">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex justify-between bg-[var(--neutral-surface)] p-2 rounded"
              >
                <div>
                  <div className="font-medium">{it.description}</div>
                  <div className="text-sm text-[var(--neutral-muted)]">
                    {new Date(it.createdAt).toLocaleString()}
                  </div>
                </div>
                <div
                  className={
                    it.type === "income" ? "text-green-500" : "text-red-400"
                  }
                >
                  {it.amount}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
