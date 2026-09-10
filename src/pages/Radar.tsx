import { useState } from "react";
import { Radar as RadarIcon, ArrowLeftRight, Scale, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { CONTRADICTIONS, REQUIREMENTS } from "../data/demo";
import { Card, SectionHead, RiskBadge, ChainTag } from "../components/ui";
import { cn } from "../lib/cn";

export function ContradictionCards({ onCompare }: { onCompare?: (id: string) => void }) {
  const { compareId, setCompareId } = useDemo();
  const activeId = compareId;
  const setActive = (id: string | null) => { setCompareId(id); onCompare?.(id ?? ""); };
  return (
    <div className="grid lg:grid-cols-2 gap-3">
      {CONTRADICTIONS.map((c) => {
        const req = REQUIREMENTS.find((r) => r.id === c.requirementId);
        const open = activeId === c.id;
        return (
          <Card key={c.id} className={cn("p-4 border-l-4", c.severity === "HIGH" ? "border-l-red-500" : "border-l-amber-400")}>
            <div className="flex items-start gap-2 flex-wrap">
              <span className="mono text-[11px] font-bold bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">{req?.code}</span>
              <h3 className="font-bold text-[13.5px] flex-1 min-w-[180px]">{c.title}</h3>
              <RiskBadge level={c.severity} />
            </div>
            <div className="mt-2 grid sm:grid-cols-2 gap-2 text-[12px]">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-2.5"><div className="text-[10.5px] font-bold uppercase tracking-wider text-sky-700">{c.docSide.label}</div><div className="font-semibold mt-0.5">{c.docSide.value}</div></div>
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-2.5"><div className="text-[10.5px] font-bold uppercase tracking-wider text-violet-700">{c.registrySide.label}</div><div className="font-semibold mt-0.5">{c.registrySide.value}</div></div>
            </div>
            <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{c.explanation}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={cn("text-[11px] font-bold rounded px-2 py-1 inline-flex items-center gap-1", c.status === "Confirmed" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-800 border border-amber-300")}>
                {c.status === "Confirmed" ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} {c.status}
              </span>
              <button onClick={() => setActive(open ? null : c.id)} className="text-[12px] font-bold text-[#0b2547] border border-slate-300 hover:border-[#0b2547] rounded-lg px-2.5 py-1.5 inline-flex items-center gap-1.5 bg-white transition">
                <ArrowLeftRight size={13} /> {open ? "Hide comparison" : "Compare Evidence"}
              </button>
            </div>
            {open && <CompareView c={c} onClose={() => setActive(null)} />}
          </Card>
        );
      })}
    </div>
  );
}

function CompareView({ c, onClose }: { c: (typeof CONTRADICTIONS)[number]; onClose: () => void }) {
  const { addAudit } = useDemo();
  const [verdict, setVerdict] = useState<string | null>(null);
  return (
    <div className="mt-3 border border-[#0b2547]/30 rounded-xl overflow-hidden">
      <div className="bg-[#0b2547] text-white px-3 py-2 flex items-center gap-2 text-[12px] font-bold">
        <Scale size={14} className="text-amber-300" /> Side-by-side evidence comparison
        <button onClick={onClose} className="ml-auto hover:text-amber-300"><X size={15} /></button>
      </div>
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-2 p-3 bg-slate-50 text-[12px] items-stretch">
        <div className="bg-white border border-slate-200 rounded-lg p-3">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-sky-700 mb-1">A · Bidder document</div>
          <div className="font-bold">{c.docSide.label}</div>
          <div className="mono bg-yellow-100 border border-yellow-400 rounded px-2 py-1.5 mt-2 font-bold text-[12px]">{c.docSide.value}</div>
          <div className="mt-2 flex gap-1"><ChainTag label="AI Extracted" /></div>
        </div>
        <div className="flex sm:flex-col items-center justify-center gap-1 text-slate-400 font-black text-lg px-1">⇄</div>
        <div className="bg-white border border-slate-200 rounded-lg p-3">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-violet-700 mb-1">B · Registry / tender rule</div>
          <div className="font-bold">{c.registrySide.label}</div>
          <div className="mono bg-violet-100 border border-violet-300 rounded px-2 py-1.5 mt-2 font-bold text-[12px]">{c.registrySide.value}</div>
          <div className="mt-2 flex gap-1 flex-wrap"><ChainTag label="Rule Verified" /><ChainTag label="Externally Verified" /></div>
        </div>
      </div>
      <div className="px-3 pb-3 bg-slate-50">
        <div className="bg-white border border-slate-200 rounded-lg p-3 text-[12px]">
          <b>Analyst note:</b> {c.implication}
          <div className="flex gap-2 mt-2 flex-wrap">
            {["Agree with AI", "Needs officer review", "Dismiss"].map((v) => (
              <button key={v} onClick={() => { setVerdict(v); addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: `Compared evidence — ${c.id.toUpperCase()}`, result: `Officer verdict: ${v}`, reference: c.requirementId.toUpperCase() }); }} className={cn("text-[11.5px] font-bold rounded-lg px-2.5 py-1.5 border transition", verdict === v ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-slate-300 hover:border-[#0b2547]")}>{v}</button>
            ))}
            {verdict && <span className="text-[11.5px] font-bold text-emerald-700 self-center">Recorded in audit trail ✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RadarPage() {
  const [ack, setAck] = useState(false);
  const { addAudit } = useDemo();
  return (
    <div>
      <SectionHead kicker="Contradiction Radar · 4 signals" title="The system detects contradictions — it doesn't blindly reject"
        desc="Cross-source inconsistencies surfaced with both sides of evidence. Ambiguous cases (C1) are routed to humans; deterministic facts (C2–C4) are confirmed with reasons."
        right={<span className="text-[11px] font-bold bg-red-50 text-red-700 border border-red-200 rounded-lg px-2.5 py-1.5 inline-flex items-center gap-1.5"><RadarIcon size={13} /> 3 confirmed · 1 needs review</span>} />
      <Card className="p-4 mb-3 bg-[#0b2547] !border-[#0b2547] text-white flex flex-wrap items-center gap-3">
        <RadarIcon size={26} className="text-amber-300 shrink-0" />
        <p className="text-[13px] leading-relaxed flex-1 min-w-[240px]">Radar compares <b>document extractions</b> against <b>simulated registry snapshots</b> and <b>tender rules</b>. Severity reflects procurement impact, not an accusation — the address flag explicitly <b>must not be auto-marked as fraud</b>.</p>
        <button onClick={() => { setAck(true); addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: "Acknowledged radar findings", result: "4 signals reviewed", reference: "RADAR/VALVE-042" }); }} className={ack ? "bg-emerald-400 text-[#0b2547] text-[12.5px] font-extrabold rounded-lg px-3 py-2" : "bg-amber-400 hover:bg-amber-300 text-[#0b2547] text-[12.5px] font-extrabold rounded-lg px-3 py-2 transition"}>{ack ? "Acknowledged ✓" : "Acknowledge findings"}</button>
      </Card>
      <ContradictionCards />
    </div>
  );
}
