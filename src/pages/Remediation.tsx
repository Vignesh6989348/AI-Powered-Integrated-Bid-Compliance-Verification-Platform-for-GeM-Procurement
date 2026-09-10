import { ArrowRight, Wrench, Send } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { REMEDIATION } from "../data/demo";
import { Card, SectionHead } from "../components/ui";
import { cn } from "../lib/cn";

export default function Remediation() {
  const { requestedDocs, requestDoc, addAudit, setView } = useDemo();
  const sendAll = () => {
    REMEDIATION.forEach((r) => requestDoc(r.id));
    addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: "Remediation pack sent to bidder", result: "4 corrective actions · 5-day window", reference: "CLF/VALVE-042/PACK-01" });
  };
  return (
    <div>
      <SectionHead kicker="Remediation intelligence · standout feature" title="What would make this bid compliant?"
        desc="Instead of only saying FAILED, the engine maps every gap from Current State → Required State → Recommended Action, so the bidder gets a fixable path and the officer gets a defensible clarification."
        right={<button onClick={sendAll} className="bg-[#0b2547] hover:bg-[#14315c] text-white text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition"><Send size={14} /> Send all clarifications</button>} />
      <div className="space-y-3">
        {REMEDIATION.map((r) => {
          const sent = !!requestedDocs[r.id];
          return (
            <Card key={r.id} className="p-0 overflow-hidden">
              <div className="p-4 flex flex-wrap items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#0b2547] text-white font-extrabold flex items-center justify-center text-[14px]">{r.n}</span>
                <h3 className="font-extrabold text-[15px] flex-1 min-w-[220px]">{r.title}</h3>
                <span className={cn("text-[10.5px] font-extrabold rounded px-2 py-1 border", r.priority === "CRITICAL" ? "bg-red-50 text-red-700 border-red-300" : "bg-amber-50 text-amber-800 border-amber-300")}>{r.priority}</span>
                <span className="text-[11px] font-semibold text-slate-500">{r.effort} · {r.impact}</span>
              </div>
              <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 px-4 pb-2 items-stretch text-[12.5px]">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3"><div className="text-[10.5px] font-extrabold uppercase tracking-wider text-red-600">Current state</div><div className="font-semibold mt-1">{r.current}</div></div>
                <div className="hidden md:flex items-center text-slate-300 font-black">→</div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3"><div className="text-[10.5px] font-extrabold uppercase tracking-wider text-emerald-600">Required state</div><div className="font-semibold mt-1">{r.required}</div></div>
                <div className="hidden md:flex items-center text-slate-300 font-black">→</div>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-3"><div className="text-[10.5px] font-extrabold uppercase tracking-wider text-sky-700">Recommended action</div><div className="font-semibold mt-1">{r.action}</div></div>
              </div>
              <div className="px-4 pb-4 flex gap-2 flex-wrap">
                <button onClick={() => { requestDoc(r.id); addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: `Remediation requested — ${r.title}`, result: "Sent to bidder", reference: `CLF/VALVE-042/${r.id.toUpperCase()}` }); }} disabled={sent} className={cn("text-[12.5px] font-bold rounded-lg px-3.5 py-2 border transition", sent ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-white border-slate-300 hover:border-[#0b2547] text-[#0b2547]")}>
                  {sent ? "Clarification sent ✓" : "Request this document"}
                </button>
                <button onClick={() => setView("review")} className="text-[12.5px] font-bold text-slate-500 hover:text-[#0b2547] inline-flex items-center gap-1">Open in Human Review <ArrowRight size={13} /></button>
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="mt-3 p-4 bg-emerald-50/60 border-emerald-200 flex gap-3">
        <Wrench size={20} className="text-emerald-700 shrink-0" />
        <p className="text-[13px] text-slate-700"><b>If all 4 remediations land:</b> projected compliance rises from <b>62% → ~94%</b> and overall risk drops <b>HIGH → LOW</b> (address accepted + OEM valid + ISO renewed + turnover clarified/relaxed). The engine recomputes instantly when new evidence uploads — architected for the resubmission loop.</p>
      </Card>
    </div>
  );
}
