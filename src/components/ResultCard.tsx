interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
  sublabel?: string;
  icon?: React.ReactNode;
}

export default function ResultCard({
  label,
  value,
  highlight,
  sublabel,
  icon,
}: ResultCardProps) {
  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        highlight
          ? "bg-gradient-to-br from-brand-50 to-white border-brand-200 shadow-sm shadow-brand-100"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p
            className={`text-2xl font-bold mt-1 tracking-tight ${
              highlight ? "text-brand-700" : "text-slate-900"
            }`}
          >
            {value}
          </p>
          {sublabel && (
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{sublabel}</p>
          )}
        </div>
        {icon && (
          <div className="text-slate-300 ml-3 flex-shrink-0">{icon}</div>
        )}
      </div>
    </div>
  );
}
