import { LayoutDashboard, FileText, Workflow, Table2, Radar, BadgeCheck, AlertTriangle, Wrench, UserCheck, ScrollText, Gavel, FileBarChart2, RotateCcw, LogOut, Menu, X, Landmark } from "lucide-react";
import { useDemo, type ViewKey } from "../state/DemoContext";
import { cn } from "../lib/cn";
import { useState } from "react";
import { useManual } from "../state/ManualContext";

const NAV: { key: ViewKey; label: string; Icon: React.ElementType; group: string }[] = [
  { key: "dashboard", label: "Executive Dashboard", Icon: LayoutDashboard, group: "Overview" },
  { key: "tender", label: "Tender Details", Icon: FileText, group: "Overview" },
  { key: "wizard", label: "Bid Analysis Wizard", Icon: Workflow, group: "Analysis" },
  { key: "matrix", label: "Compliance Matrix", Icon: Table2, group: "Analysis" },
  { key: "radar", label: "Contradiction Radar", Icon: Radar, group: "Analysis" },
  { key: "verification", label: "Verification Center", Icon: BadgeCheck, group: "Assurance" },
  { key: "risk", label: "Risk Center", Icon: AlertTriangle, group: "Assurance" },
  { key: "remediation", label: "Make Bid Compliant", Icon: Wrench, group: "Action" },
  { key: "review", label: "Human Review Queue", Icon: UserCheck, group: "Action" },
  { key: "audit", label: "Audit Trail", Icon: ScrollText, group: "Action" },
  { key: "decision", label: "Final Decision", Icon: Gavel, group: "Action" },
  { key: "report", label: "Audit Report", Icon: FileBarChart2, group: "Action" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const { view, setView, resetDemo, setEntered, audit, reviewState, finalDecision } = useDemo();
  const { setActiveMode } = useManual();
  const [open, setOpen] = useState(false);
  const pendingReview = 1 - Object.keys(reviewState).length;

  const goto = (v: ViewKey) => { setView(v); setOpen(false); window.scrollTo({ top: 0 }); };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0"><Landmark size={19} className="text-[#0b2547]" /></div>
          <div className="min-w-0">
            <div className="text-white font-extrabold text-[13.5px] leading-tight truncate">GeM Compliance Intelligence</div>
            <div className="text-[10.5px] text-sky-300 font-medium">CPCL · MoPNG · SIH26100</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest bg-amber-400 text-[#0b2547] rounded px-2 py-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0b2547] animate-pulse" /> DEMO MODE</span>
          <button onClick={() => { resetDemo(); }} title="Reset demo to original state" className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-200 hover:text-white border border-white/20 hover:border-white/40 rounded px-2 py-1 transition">
            <RotateCcw size={11} /> Reset Demo
          </button>
        </div>
      </div>
      <div className="mx-4 mb-2 text-[11px] text-sky-200/80 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
        Tender <span className="mono font-bold text-white">VALVE-042</span> · Bidder <b className="text-white">ABC Industrial</b>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-3 dark-scroll">
        {(["Overview", "Analysis", "Assurance", "Action"] as string[]).map((g) => (
          <div key={g} className="mb-1">
            <div className="px-3 pt-3 pb-1 text-[10px] font-extrabold tracking-[0.16em] text-slate-400 uppercase">{g}</div>
            {NAV.filter((n) => n.group === g).map((n) => {
              const active = view === n.key;
              return (
                <button key={n.key} onClick={() => goto(n.key)}
                  className={cn("w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition text-left",
                    active ? "bg-white text-[#0b2547] font-bold shadow" : "text-slate-300 hover:bg-white/10 hover:text-white")}>
                  <n.Icon size={16} className={active ? "text-[#0b2547]" : "text-sky-300"} />
                  <span className="flex-1">{n.label}</span>
                  {n.key === "review" && pendingReview > 0 && <span className="bg-amber-400 text-[#0b2547] text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center">{pendingReview}</span>}
                  {n.key === "decision" && finalDecision !== "PENDING" && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <div className="text-[10.5px] text-slate-400 px-1 mb-2 mono">{audit.length} audit events recorded</div>
          <button onClick={() => { setActiveMode("manual"); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-cyan-200 hover:bg-white/10 hover:text-white">
            <Workflow size={15} /> Open Manual Model
          </button>
          <button onClick={() => { setEntered(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-slate-300 hover:bg-white/10 hover:text-white">
            <LogOut size={15} /> Exit Demo
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      {/* top strip */}
      <div className="h-1.5 flex no-print"><div className="flex-1 bg-orange-500" /><div className="flex-1 bg-white border-y border-slate-200" /><div className="flex-1 bg-green-600" /></div>
      <div className="flex">
        <aside className="hidden lg:flex w-[264px] shrink-0 bg-[#0b2547] min-h-[calc(100vh-6px)] sticky top-0 h-[calc(100vh-6px)] flex-col">{sidebar}</aside>
        {/* mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0b2547] overflow-y-auto">{sidebar}</aside>
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 bg-white rounded-full p-2"><X size={18} /></button>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
            <div className="flex items-center gap-3 px-4 lg:px-7 py-3">
              <button className="lg:hidden p-2 -m-1" onClick={() => setOpen(true)}><Menu size={20} /></button>
              <div className="min-w-0">
                <div className="text-[15px] font-extrabold text-slate-900 truncate">CPCL Industrial Valve Procurement — <span className="mono">CPCL/PROC/2026/VALVE-042</span></div>
                <div className="text-[11.5px] text-slate-500">Officer: R. Menon · Materials & Contracts · Bid opened 10 Sep 2026</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest bg-amber-100 text-amber-900 border border-amber-300 rounded px-2 py-1">DEMO MODE</span>
                <button onClick={() => goto("decision")} className="bg-[#0b2547] hover:bg-[#14315c] text-white text-[12.5px] font-bold rounded-lg px-3.5 py-2 transition">Officer Decision</button>
              </div>
            </div>
            {/* judge flow stepper */}
            <div className="px-4 lg:px-7 pb-2.5 flex items-center gap-1 overflow-x-auto text-[11px] font-semibold">
              {(["wizard", "matrix", "radar", "verification", "risk", "remediation", "review", "report"] as ViewKey[]).map((k, i, arr) => {
                const labels: Record<string, string> = { wizard: "Analyze", matrix: "Matrix", radar: "Radar", verification: "Verify", risk: "Risk", remediation: "Remediate", review: "Review", report: "Report" };
                const idx = arr.indexOf(view as ViewKey);
                const done = idx > i;
                return (
                  <span key={k} className="flex items-center gap-1 shrink-0">
                    <button onClick={() => goto(k)} className={cn("px-2 py-1 rounded-md border", view === k ? "bg-[#0b2547] text-white border-[#0b2547]" : done ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300")}>
                      {i + 1}. {labels[k]}
                    </button>
                    {i < arr.length - 1 && <span className="text-slate-300">→</span>}
                  </span>
                );
              })}
            </div>
          </header>
          <main className="px-4 lg:px-7 py-6 max-w-[1280px] mx-auto">{children}</main>
          <footer className="px-4 lg:px-7 pb-8 max-w-[1280px] mx-auto no-print">
            <div className="text-[11px] text-slate-400 border-t border-slate-200 pt-3 flex flex-wrap gap-x-4 gap-y-1">
              <span>GeM Compliance Intelligence · SIH26100 · CPCL demo prototype</span>
              <span>Simulated registries — no live government API access. For demonstration only.</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
