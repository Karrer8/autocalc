"use client";

interface BarItem {
  label: string;
  value: number;
  color: string;
}

const fmt = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

export default function HorizontalBar({ items }: { items: BarItem[] }) {
  const max = Math.max(...items.map((i) => Math.abs(i.value)));

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 font-medium">{item.label}</span>
            <span className="text-slate-900 font-semibold tabular-nums">{fmt(item.value)}</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(Math.abs(item.value) / max) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
