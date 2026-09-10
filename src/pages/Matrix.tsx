import { useState } from "react";
import { Eye, FileWarning, ArrowUpDown } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { REQUIREMENTS, SCORE } from "../data/demo";
import { Card, SectionHead, StatusBadge, RiskBadge, ChainTag, ProgressBar } from "../components/ui";
import { cn } from "../lib/cn";

export function ScorePanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("grid gap-3", compact ? "md:grid-cols-2" : "lg:grid-cols-3")}>
      <Card className="p-5 text-center relative overflow-hidden">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Overall Compliance</div>
        <div className="relative w-36 h-36 mx-auto mt-2">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="12" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#d97706" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${62 * 3.267} 326.7`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-4xl font-extrabold">62%</span><span className="text-[10.5px] font-bold text-slate-500 uppercase">4 passed · 3 failed · 1 review</span></div>
        </div>
        <ProgressBar value={62} tone="amber" className="mt-2" />
        <p className="text-[11.5px] text-slate-500 mt-2"><b>Compliance Score</b> = whether requirements are satisfied (weighted by clause criticality).</p>
      </Card>
      <Card className="p-5">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Mandatory Requirements</div>
        <div className="text-3xl font-extrabold mt-2">5 <span className="text-lg text-slate-400">/ 8</span> <span className="text-sm font-bold text-slate-500">Passed</span></div>
        <div className="mt-3 space-y-2">
          {REQUIREMENTS.map((r) => (
            <div key={r.id} className="flex items-center gap-2 text-[12px]">
              <span className="mono font-bold w-10">{r.code}</span>
              <div className="flex-1 h-1.5 rounded bg-slate-100 overflow-hidden"><div className={cn("h-full", r.result === "COMPLIANT" ? "bg-emerald-500" : r.result === "REVIEW" ? "bg-amber-500" : "bg-red-500")} style={{ width: r.result === "COMPLIANT" ? "100%" : r.result === "REVIEW" ? "55%" : "100%" }} /></div>
              <span className={cn("font-bold text-[11px]", r.result === "COMPLIANT" ? "text-emerald-700" : r.result === "REVIEW" ? "text-amber-700" : "text-red-600")}>{r.result === "COMPLIANT" ? "PASS" : r.result === "REVIEW" ? "REVIEW" : "FAIL"}</span>
            </div>
          ))}
        </div>
      </Card>
      {!compact && (
        <Card className="p-5 border-emerald-200 bg-emerald-50/40">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Verification Confidence</div>
          <div className="text-4xl font-extrabold text-emerald-700 mt-2">91%</div>
          <ProgressBar value={91} tone="emerald" className="mt-2" />
          <p className="text-[11.5px] text-slate-600 mt-2"><b>Verification Confidence</b> = confidence in the evidence & verification process (extraction quality, registry corroboration).</p>
          <div className="mt-3 bg-white border border-emerald-200 rounded-lg p-3 text-[12px] leading-relaxed">
            <b>Compliance ≠ Confidence.</b> This bid has <b>high-confidence evidence (91%)</b> that it is <b>non-compliant (62%)</b> — the engine is very sure the turnover is really ₹8.4 Cr, and ₹8.4 Cr really fails the rule.
          </div>
        </Card>
      )}
      {compact && (
        <Card className="p-5 border-emerald-200 bg-emerald-50/40">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Verification Confidence — 91%</div>
          <ProgressBar value={91} tone="emerald" className="mt-2" />
          <p className="text-[12px] text-slate-600 mt-2"><b>Compliance ≠ Confidence:</b> high-confidence evidence (91%) that the bid is non-compliant (62%).</p>
        </Card>
      )}
    </div>
  );
}

export default function Matrix() {
  const { setEvidenceId, setCompareId, setView, requestedDocs, requestDoc, addAudit, reviewState } = useDemo();
  const [filter, setFilter] = useState<"ALL" | "COMPLIANT" | "NON-COMPLIANT" | "REVIEW">("ALL");
  const [sortRisk, setSortRisk] = useState(false);

  let rows = REQUIREMENTS.filter((r) => filter === "ALL" || r.result === filter);
  if (sortRisk) {
    const w = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    rows = [...rows].sort((a, b) => w[a.risk] - w[b.risk]);
  }

  return (
    <div>
      <SectionHead kicker="Requirement → Evidence → Verification → Decision" title="Compliance Matrix"
        desc="The core judge-facing view. Every row answers: what was checked, what evidence supports it, how it was verified, why it passed or failed, and what the officer should do."
        right={
          <>
            <div className="flex gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1">
              {(["ALL", "COMPLIANT", "NON-COMPLIANT", "REVIEW"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={cn("text-[11px] font-bold rounded-md px-2.5 py-1.5", filter === f ? "bg-[#0b2547] text-white" : "text-slate-500 hover:text-slate-800")}>{f === "ALL" ? "All (8)" : f === "REVIEW" ? "Review (1)" : f === "COMPLIANT" ? "Pass (4)" : "Fail (3)"}</button>
              ))}
            </div>
            <button onClick={() => setSortRisk(!sortRisk)} className="text-[12px] font-bold border border-slate-300 bg-white rounded-lg px-3 py-2 inline-flex items-center gap-1.5"><ArrowUpDown size={13} /> {sortRisk ? "Risk-sorted" : "Sort by risk"}</button>
          </>
        } />

      <ScorePanel compact />

      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px] min-w-[1020px]">
            <thead><tr className="bg-[#0b2547] text-white text-[11px] uppercase tracking-wider text-left">
              <th className="px-4 py-3">Requirement</th><th className="px-4 py-3">Evidence</th><th className="px-4 py-3">Verification</th><th className="px-4 py-3">Result</th><th className="px-4 py-3">Risk</th><th className="px-4 py-3">Action</th>
            </tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/70 align-top">
                  <td className="px-4 py-3">
                    <div className="font-bold"><span className="mono text-[#0b2547]">{r.code}</span> · {r.title}</div>
                    <div className="text-[11.5px] text-slate-500 max-w-[240px]">{r.description}</div>
                    <div className="flex gap-1 mt-1.5 flex-wrap">{r.chain.map((c) => <ChainTag key={c} label={c} />)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-800">{r.evidenceDoc}</div>
                    <div className="text-[11.5px] mono text-slate-500">{r.evidenceFile}</div>
                    <div className="text-[12px] mt-1 font-medium">{r.extracted}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{r.verification}</div>
                    <div className="text-[11.5px] text-slate-500 max-w-[220px]">{r.verificationDetail}</div>
                    {r.simulated && <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5">Simulated</span>}
                  </td>
                  <td className="px-4 py-3"><StatusBadge result={r.result} /><div className="text-[11px] text-slate-500 mt-1">conf {r.confidence}%</div></td>
                  <td className="px-4 py-3"><RiskBadge level={r.risk} /></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5 min-w-[150px]">
                      <button onClick={() => setEvidenceId(r.id)} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0b2547] border border-slate-300 hover:border-[#0b2547] bg-white rounded-lg px-2.5 py-1.5 transition"><Eye size={13} /> View Evidence</button>
                      {r.id === "r006" && <button onClick={() => { setCompareId("c1"); setView("radar"); }} className="text-[12px] font-bold text-amber-800 bg-amber-50 border border-amber-300 hover:border-amber-500 rounded-lg px-2.5 py-1.5 transition">Compare Evidence</button>}
                      {(r.result === "NON-COMPLIANT") && (
                        <button onClick={() => { requestDoc(r.id); addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: `Clarification requested — ${r.code}`, result: `Sent to bidder · ${r.evidenceDoc}`, reference: `CLF/VALVE-042/${r.code}` }); }} disabled={!!requestedDocs[r.id]} className={cn("inline-flex items-center gap-1.5 text-[12px] font-bold rounded-lg px-2.5 py-1.5 border transition", requestedDocs[r.id] ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "text-red-700 bg-red-50 border-red-200 hover:border-red-400")}>
                          <FileWarning size={13} /> {requestedDocs[r.id] ? "Requested ✓" : r.id === "r005" ? "Request Document" : "Request Clarification"}
                        </button>
                      )}
                      {r.id === "r006" && reviewState["r006"] && <span className="text-[11px] font-bold text-emerald-700">Officer: {reviewState["r006"].decision} ✓</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-[12px] text-slate-600 flex flex-wrap gap-x-5 gap-y-1">
          <span><b>{SCORE.passed} passed</b> · <b>{SCORE.failed} failed</b> · <b>{SCORE.review} review</b></span>
          <span>Overall compliance <b>62%</b> · Verification confidence <b>91%</b> · Overall risk <b className="text-red-700">HIGH</b></span>
          <span className="ml-auto">Evidence chain labels on every row: AI Extracted · Rule Verified · Externally Verified · Human Reviewed</span>
        </div>
      </Card>
    </div>
  );
}
