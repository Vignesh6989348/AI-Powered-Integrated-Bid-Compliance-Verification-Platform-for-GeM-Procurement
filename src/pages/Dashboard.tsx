import { FileText, ArrowRight, AlertTriangle, Gauge, ShieldCheck, Activity, ChevronRight, Building2, CircleCheck, CircleX, Clock } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { REQUIREMENTS, SCORE, TENDER, BIDDER } from "../data/demo";
import { Card, StatusBadge, RiskBadge, ProgressBar, SectionHead } from "../components/ui";

export default function Dashboard() {
  const { setView, setEvidenceId, addAudit } = useDemo();

  const kpis = [
    { label: "Active Tenders", value: "24", sub: "+3 this month", Icon: FileText, tone: "text-[#0f2d52] bg-[#0f2d52]/10" },
    { label: "Bids Under Review", value: "17", sub: "6 for VALVE-042", Icon: Activity, tone: "text-sky-700 bg-sky-100" },
    { label: "Average Compliance", value: "82%", sub: "across 41 evaluated bids", Icon: Gauge, tone: "text-emerald-700 bg-emerald-100" },
    { label: "High Risk Bids", value: "5", sub: "need officer attention", Icon: AlertTriangle, tone: "text-red-700 bg-red-100" },
  ];

  const others = [
    { name: "Shree Balaji Valves & Controls", tender: "CPCL/PROC/2026/VALVE-042", comp: 91, risk: "LOW" as const, status: "COMPLIANT" as const, note: "All mandatory passed" },
    { name: "Delta Flow Systems Ltd.", tender: "CPCL/PROC/2026/VALVE-042", comp: 78, risk: "MEDIUM" as const, status: "REVIEW" as const, note: "1 clarification pending" },
    { name: "National Petro Equipments", tender: "CPCL/PROC/2026/PUMP-038", comp: 88, risk: "LOW" as const, status: "COMPLIANT" as const, note: "Ready for TEC" },
  ];

  return (
    <div>
      <SectionHead kicker="Executive Overview · 09 Sep 2026" title="Procurement Compliance Command"
        desc="Live posture across CPCL tenders. The flagged bid below is the judge demo path — open it to walk the full story."
        right={<button onClick={() => setView("tender")} className="text-[12.5px] font-bold text-[#0b2547] border border-slate-300 hover:border-[#0b2547] rounded-lg px-3 py-2 bg-white transition">View tender VALVE-042 <ChevronRight size={14} className="inline" /></button>} />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <Card key={k.label} className="p-4 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${k.tone}`}><k.Icon size={21} /></div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{k.label}</div>
              <div className="text-2xl font-extrabold tracking-tight">{k.value}</div>
              <div className="text-[11.5px] text-slate-500">{k.sub}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Hero: recent analysis */}
      <Card className="mt-4 overflow-hidden">
        <div className="bg-[#0b2547] text-white px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-sky-300 uppercase"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Recent Analysis · Requires Review</div>
          <div className="ml-auto flex items-center gap-2 text-[11px]">
            <span className="bg-white/10 border border-white/15 rounded px-2 py-1 mono">{TENDER.id}</span>
            <span className="bg-white/10 border border-white/15 rounded px-2 py-1">{TENDER.value}</span>
          </div>
        </div>
        <div className="p-5 grid lg:grid-cols-[1fr_300px] gap-5">
          <div>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0b2547]/10 flex items-center justify-center shrink-0"><Building2 className="text-[#0b2547]" size={22} /></div>
              <div className="min-w-0">
                <h3 className="text-lg font-extrabold tracking-tight">{BIDDER.name}</h3>
                <div className="text-[12.5px] text-slate-500 mono">GSTIN {BIDDER.gstin} · {BIDDER.udyam} · Quoted {BIDDER.bidValue}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <StatusBadge result="REVIEW" />
                  <RiskBadge level="HIGH" />
                  <span className="text-[11px] font-bold bg-slate-100 border border-slate-200 rounded px-2 py-1">Compliance 62%</span>
                  <span className="text-[11px] font-bold bg-slate-100 border border-slate-200 rounded px-2 py-1">Confidence 91%</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-[12px] font-bold mb-1.5"><span>Overall Compliance — 62%</span><span className="text-slate-500">4 passed · 3 failed · 1 review</span></div>
              <ProgressBar value={62} tone="amber" />
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg py-2"><div className="text-lg font-extrabold text-emerald-700">4</div><div className="text-[10.5px] font-bold text-emerald-800 uppercase">Passed</div></div>
                <div className="bg-red-50 border border-red-200 rounded-lg py-2"><div className="text-lg font-extrabold text-red-700">3</div><div className="text-[10.5px] font-bold text-red-800 uppercase">Failed</div></div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg py-2"><div className="text-lg font-extrabold text-amber-700">1</div><div className="text-[10.5px] font-bold text-amber-800 uppercase">Review</div></div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => { addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: "Opened bid analysis", result: "ABC Industrial · VALVE-042", reference: "PKG/VALVE-042/ABC-011" }); setView("wizard"); }} className="bg-[#0b2547] hover:bg-[#14315c] text-white text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition">Open Analysis <ArrowRight size={15} /></button>
              <button onClick={() => setView("matrix")} className="bg-white border border-slate-300 hover:border-[#0b2547] text-[13px] font-bold rounded-lg px-4 py-2.5 transition">Skip to Compliance Matrix</button>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">Why it needs review</div>
            <div className="space-y-2 text-[12.5px]">
              {REQUIREMENTS.filter((r) => r.result !== "COMPLIANT").slice(0, 4).map((r) => (
                <button key={r.id} onClick={() => setEvidenceId(r.id)} className="w-full text-left bg-white border border-slate-200 hover:border-[#0b2547] rounded-lg px-3 py-2 transition flex items-center gap-2">
                  {r.result === "REVIEW" ? <Clock size={14} className="text-amber-600 shrink-0" /> : <CircleX size={14} className="text-red-500 shrink-0" />}
                  <span><b className="mono">{r.code}</b> · {r.title} <span className="text-slate-400">— {r.extracted}</span></span>
                </button>
              ))}
            </div>
            <div className="mt-3 text-[11.5px] text-slate-500 flex gap-1.5"><ShieldCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" /> AI does not replace the officer — it provides evidence-backed decision support.</div>
          </div>
        </div>
      </Card>

      {/* Other bids */}
      <SectionHead kicker="Pipeline" title="Other bids in queue" desc="Shows this is a portfolio product, not a single-screen demo." />
      <div className="grid md:grid-cols-3 gap-3">
        {others.map((b) => (
          <Card key={b.name} className="p-4">
            <div className="font-bold text-[13.5px]">{b.name}</div>
            <div className="text-[11.5px] text-slate-500 mono mt-0.5">{b.tender}</div>
            <div className="flex items-center gap-2 mt-2"><StatusBadge result={b.status} /><RiskBadge level={b.risk} /></div>
            <div className="mt-2 flex justify-between text-[11.5px] font-bold"><span>Compliance</span><span>{b.comp}%</span></div>
            <ProgressBar value={b.comp} tone={b.comp >= 85 ? "emerald" : "amber"} className="mt-1" />
            <div className="text-[11.5px] text-slate-500 mt-2 flex items-center gap-1.5">{b.status === "COMPLIANT" ? <CircleCheck size={13} className="text-emerald-600" /> : <Clock size={13} className="text-amber-600" />}{b.note}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
