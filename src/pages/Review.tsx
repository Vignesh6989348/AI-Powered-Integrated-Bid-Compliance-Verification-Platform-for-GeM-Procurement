import { useState } from "react";
import { UserCheck, Send, XCircle, Flag, CheckCircle2 } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { REQUIREMENTS } from "../data/demo";
import { Card, SectionHead, StatusBadge, RiskBadge, ChainTag } from "../components/ui";
import { cn } from "../lib/cn";

const DECISIONS = [
  { key: "Accepted", Icon: CheckCircle2, cls: "bg-emerald-600 text-white border-emerald-600", desc: "Variance accepted as formatting" },
  { key: "Clarification", Icon: Send, cls: "bg-sky-600 text-white border-sky-600", desc: "Ask bidder for proof" },
  { key: "Rejected", Icon: XCircle, cls: "bg-red-600 text-white border-red-600", desc: "Treat as non-compliant" },
  { key: "Escalated", Icon: Flag, cls: "bg-amber-500 text-white border-amber-500", desc: "Send to committee" },
];

export default function Review() {
  const { reviewState, resolveReview, addAudit } = useDemo();
  const [note, setNote] = useState("Verified against MCA master print dated 08-Sep-2026; 'Ambattur' is the locality of the same Industrial Estate plot. No fraud signal — PAN/CIN/GSTIN consistent.");
  const [picked, setPicked] = useState<string | null>(null);
  const r = REQUIREMENTS.find((x) => x.id === "r006")!;
  const done = reviewState["r006"];

  const decide = (d: string) => {
    setPicked(d);
    resolveReview("r006", d, note);
    addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: `Human review decision — R006 address mismatch`, result: d.toUpperCase(), reference: "HQ-042-06" });
  };

  return (
    <div>
      <SectionHead kicker="Human-in-the-loop" title="Human Review Required"
        desc="Issues the AI cannot safely decide alone. The address mismatch is a textbook ambiguous case — the engine flags it, the officer decides, and the decision becomes part of the audit trail."
        right={<span className="text-[12px] font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-lg px-3 py-2 inline-flex items-center gap-1.5"><UserCheck size={14} /> {done ? "Queue cleared (1/1 resolved)" : "1 item in queue"}</span>} />
      <Card className="p-5 border-l-4 border-l-amber-400">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono font-bold text-[12px] bg-slate-100 rounded px-2 py-1">R006</span>
          <h3 className="font-extrabold text-[16px] flex-1 min-w-[200px]">Address mismatch — potential inconsistency detected</h3>
          <StatusBadge result="REVIEW" /><RiskBadge level="MEDIUM" />
        </div>
        <div className="grid md:grid-cols-2 gap-2 mt-3 text-[12.5px]">
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3"><div className="text-[10.5px] font-bold uppercase tracking-wider text-sky-700">Bidder document</div><div className="font-bold mt-0.5">No. 42, Industrial Estate, Chennai — 600058</div><div className="text-slate-500">Address_Proof.pdf · AI Extracted · conf 88%</div></div>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-3"><div className="text-[10.5px] font-bold uppercase tracking-wider text-violet-700">Registry snapshot (simulated)</div><div className="font-bold mt-0.5">No. 42, Industrial Estate, Ambattur, Chennai — 600058</div><div className="text-slate-500">MCA/GST snapshot · Externally Verified · match 82%</div></div>
        </div>
        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-[12.5px]">
          <b>Why a human must decide:</b> {r.explanation}
          <div className="flex gap-1 mt-2 flex-wrap"><ChainTag label="AI Extracted" /><ChainTag label="Externally Verified" /><ChainTag label="Human Reviewed" /></div>
        </div>
        <div className="mt-3">
          <label className="text-[12px] font-bold text-slate-600">Officer note (recorded in audit trail)</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0b2547]" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3">
          {DECISIONS.map((d) => (
            <button key={d.key} onClick={() => decide(d.key)} className={cn("rounded-xl border-2 p-3 text-left transition", picked === d.key || done?.decision === d.key ? d.cls : "bg-white border-slate-200 hover:border-slate-400")}>
              <d.Icon size={18} className="mb-1" />
              <div className="font-extrabold text-[13.5px]">{d.key === "Clarification" ? "Request Clarification" : d.key === "Escalated" ? "Escalate" : d.key === "Accepted" ? "Accept" : "Reject"}</div>
              <div className={cn("text-[11.5px]", picked === d.key || done?.decision === d.key ? "text-white/85" : "text-slate-500")}>{d.desc}</div>
            </button>
          ))}
        </div>
        {done && (
          <div className="mt-3 bg-emerald-50 border border-emerald-300 rounded-lg p-3 text-[13px] text-emerald-900 flex gap-2">
            <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
            <span><b>Decision recorded at {done.time}:</b> {done.decision} — “{done.note.slice(0, 140)}{done.note.length > 140 ? "…" : ""}” · An audit event was created and the matrix row now shows officer sign-off.</span>
          </div>
        )}
      </Card>
      <Card className="mt-3 p-4">
        <div className="text-[12px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">Queue policy (for judges)</div>
        <div className="grid sm:grid-cols-3 gap-2 text-[12.5px]">
          {[["Auto-decide", "Deterministic facts: expired dates, missing files, threshold arithmetic (C2–C4)."], ["Human review", "Ambiguous matches 70–90%, identity variance, borderline values (C1)."], ["Never auto-fraud", "No bidder is labelled fraudulent by AI — only flagged for officer review."]].map(([t, d]) => (
            <div key={t} className="bg-slate-50 border border-slate-200 rounded-lg p-3"><b>{t}:</b> {d}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}
