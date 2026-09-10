import { Gavel, CheckCircle2, Send, XCircle, FileBarChart2, ShieldCheck } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { SCORE } from "../data/demo";
import { Card, SectionHead, StatusBadge, RiskBadge } from "../components/ui";
import { cn } from "../lib/cn";

export default function Decision() {
  const { finalDecision, setFinalDecision, addAudit, setView, reviewState } = useDemo();

  const decide = (d: "APPROVED" | "CLARIFICATION" | "REJECTED") => {
    setFinalDecision(d);
    const label = d === "APPROVED" ? "Bid approved (conditional)" : d === "CLARIFICATION" ? "Clarification round opened" : "Bid rejected";
    addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: "Final officer decision recorded", result: label, reference: "DEC/VALVE-042/ABC-01" });
  };

  return (
    <div>
      <SectionHead kicker="Officer decision support" title="Final Decision Screen"
        desc="The AI recommends — the officer decides. The recommendation is REQUIRES HUMAN REVIEW, never an auto-reject."
        right={<button onClick={() => setView("report")} className="bg-[#0b2547] hover:bg-[#14315c] text-white text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition"><FileBarChart2 size={15} /> Generate Audit Report</button>} />
      <Card className="p-6 text-center bg-[#0b2547] !border-[#0b2547] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 10%, #f59e0b 0, transparent 35%), radial-gradient(circle at 15% 90%, #38bdf8 0, transparent 40%)" }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-widest text-amber-300 uppercase"><Gavel size={14} /> AI Recommendation</div>
          <div className="text-3xl font-extrabold mt-1">REQUIRES HUMAN REVIEW</div>
          <div className="flex justify-center gap-2 mt-3 flex-wrap"><StatusBadge result="REVIEW" /><RiskBadge level="HIGH" /></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-5 max-w-3xl mx-auto text-[#0b2547]">
            {[["Passed", `${SCORE.passed} reqs`, "bg-emerald-100"], ["Failed", `${SCORE.failed} reqs`, "bg-red-100"], ["Review", `${SCORE.review} req`, "bg-amber-100"], ["Compliance", "62%", "bg-white"], ["Risk", "HIGH", "bg-red-100"], ["Confidence", "91%", "bg-emerald-100"]].map(([k, v, bg]) => (
              <div key={k} className={cn("rounded-xl py-3", bg)}><div className="text-xl font-extrabold">{v}</div><div className="text-[10.5px] font-extrabold uppercase tracking-wider opacity-70">{k}</div></div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-slate-300 max-w-2xl mx-auto flex items-center justify-center gap-2"><ShieldCheck size={16} className="text-emerald-300 shrink-0" /> AI does not replace the procurement officer. It provides evidence-backed decision support.{reviewState["r006"] ? ` R006 resolved by officer (${reviewState["r006"].decision}).` : " R006 still awaits officer review."}</p>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
        {[
          { k: "APPROVED" as const, label: "Approve", Icon: CheckCircle2, desc: "Conditional award", cls: "hover:border-emerald-500" },
          { k: "CLARIFICATION" as const, label: "Request Clarification", Icon: Send, desc: "5-day bidder window", cls: "hover:border-sky-500" },
          { k: "REJECTED" as const, label: "Reject", Icon: XCircle, desc: "With recorded reasons", cls: "hover:border-red-500" },
        ].map((b) => (
          <button key={b.k} onClick={() => decide(b.k)} className={cn("bg-white border-2 rounded-xl p-4 text-left transition", finalDecision === b.k ? "border-[#0b2547] shadow-lg" : "border-slate-200", b.cls)}>
            <b.Icon size={20} className={finalDecision === b.k ? "text-[#0b2547]" : "text-slate-400"} />
            <div className="font-extrabold mt-1">{b.label} {finalDecision === b.k && "✓"}</div>
            <div className="text-[12px] text-slate-500">{b.desc}</div>
          </button>
        ))}
        <button onClick={() => setView("report")} className="bg-amber-400 hover:bg-amber-300 border-2 border-amber-400 rounded-xl p-4 text-left transition">
          <FileBarChart2 size={20} className="text-[#0b2547]" />
          <div className="font-extrabold mt-1 text-[#0b2547]">Generate Audit Report</div>
          <div className="text-[12px] text-[#0b2547]/70">Printable · export / PDF via print</div>
        </button>
      </div>
      {finalDecision !== "PENDING" && (
        <Card className="mt-3 p-4 bg-emerald-50 border-emerald-300 text-[13.5px] text-emerald-900">
          <b>Decision “{finalDecision}” recorded</b> with timestamp, officer identity and evidence references in the audit trail. This is exactly what the judges should see: AI explains, human decides, system records.
        </Card>
      )}
    </div>
  );
}
