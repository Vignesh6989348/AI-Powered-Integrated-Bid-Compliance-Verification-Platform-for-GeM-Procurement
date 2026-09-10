import React from "react";
import { cn } from "../lib/cn";
import type { ResultStatus, RiskLevel, VerifyLabel } from "../data/demo";
import { ShieldCheck, AlertTriangle, ScanSearch, Scale, UserCheck } from "lucide-react";

export function resultBadge(r: ResultStatus) {
  if (r === "COMPLIANT") return "bg-emerald-50 text-emerald-800 border-emerald-300";
  if (r === "NON-COMPLIANT") return "bg-red-50 text-red-800 border-red-300";
  return "bg-amber-50 text-amber-900 border-amber-300";
}
export function resultDot(r: ResultStatus) {
  if (r === "COMPLIANT") return "bg-emerald-500";
  if (r === "NON-COMPLIANT") return "bg-red-500";
  return "bg-amber-500";
}
export function riskBadge(r: RiskLevel) {
  if (r === "LOW") return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (r === "MEDIUM") return "bg-amber-50 text-amber-900 border-amber-300";
  return "bg-red-50 text-red-800 border-red-300";
}

export function StatusBadge({ result }: { result: ResultStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide border whitespace-nowrap", resultBadge(result))}>
      <span className={cn("w-1.5 h-1.5 rounded-full", resultDot(result))} />
      {result}
    </span>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border", riskBadge(level))}>
      {level}
    </span>
  );
}

export function ChainTag({ label }: { label: VerifyLabel }) {
  const map: Record<string, { cls: string; Icon: React.ElementType }> = {
    "AI Extracted": { cls: "bg-sky-50 text-sky-800 border-sky-200", Icon: ScanSearch },
    "Rule Verified": { cls: "bg-violet-50 text-violet-800 border-violet-200", Icon: Scale },
    "Externally Verified": { cls: "bg-emerald-50 text-emerald-800 border-emerald-200", Icon: ShieldCheck },
    "Human Reviewed": { cls: "bg-amber-50 text-amber-900 border-amber-300", Icon: UserCheck },
  };
  const m = map[label];
  const Icon = m.Icon;
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold border whitespace-nowrap", m.cls)}>
      <Icon size={11} strokeWidth={2.5} /> {label}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,.06)]", className)}>{children}</div>;
}

export function SectionHead({ kicker, title, desc, right }: { kicker?: string; title: string; desc?: string; right?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
      <div>
        {kicker && <div className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase mb-1">{kicker}</div>}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {desc && <p className="text-[13px] text-slate-500 mt-1 max-w-2xl">{desc}</p>}
      </div>
      {right && <div className="flex items-center gap-2 flex-wrap">{right}</div>}
    </div>
  );
}

export function ProgressBar({ value, tone = "navy", className }: { value: number; tone?: "navy" | "emerald" | "red" | "amber"; className?: string }) {
  const bg = tone === "emerald" ? "bg-emerald-500" : tone === "red" ? "bg-red-500" : tone === "amber" ? "bg-amber-500" : "bg-[#0f2d52]";
  return (
    <div className={cn("h-2 rounded-full bg-slate-100 overflow-hidden", className)}>
      <div className={cn("h-full rounded-full transition-all duration-700", bg)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function SimLabel() {
  return (
    <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">
      <AlertTriangle size={10} /> Demo / Simulated
    </span>
  );
}
