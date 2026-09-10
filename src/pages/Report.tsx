import { Printer, Download, Landmark, CheckCircle2 } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { TENDER, BIDDER, REQUIREMENTS, VERIFICATIONS, CONTRADICTIONS, RISKS, REMEDIATION, SCORE } from "../data/demo";
import { Card, SectionHead, StatusBadge, RiskBadge, SimLabel } from "../components/ui";

export default function Report() {
  const { audit, finalDecision, reviewState } = useDemo();
  const print = () => window.print();

  return (
    <div>
      <SectionHead kicker="Report generation" title="Bid Compliance Audit Report"
        desc="Professional, printable officer report. Use Export PDF (browser print → Save as PDF) for the judge handout."
        right={
          <>
            <button onClick={print} className="bg-white border border-slate-300 hover:border-[#0b2547] text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition"><Printer size={15} /> Print</button>
            <button onClick={print} className="bg-[#0b2547] hover:bg-[#14315c] text-white text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition"><Download size={15} /> Export PDF</button>
          </>
        } />
      <Card className="print-area overflow-hidden">
        {/* letterhead */}
        <div className="border-b-4 border-double border-[#0b2547] px-6 py-5 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-[#0b2547] flex items-center justify-center shrink-0"><Landmark className="text-amber-300" size={24} /></div>
          <div className="flex-1">
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{TENDER.ministry} · {TENDER.organisation}</div>
            <h2 className="text-xl font-extrabold tracking-tight">Bid Compliance Verification Report</h2>
            <div className="text-[12px] text-slate-500 mono">{TENDER.id} · Generated 09 Sep 2026 · GeM Compliance Intelligence (Demo)</div>
          </div>
          <div className="text-right text-[12px]">
            <div className="font-extrabold text-lg">62% <span className="text-[11px] font-bold text-slate-500">COMPLIANCE</span></div>
            <div className="font-bold text-red-700">HIGH RISK · 91% confidence</div>
            <div className="mt-1"><SimLabel /></div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5 text-[13px]">
          <section>
            <h3 className="font-extrabold text-[14px] border-l-4 border-[#0b2547] pl-2 mb-2">1 · Tender & bidder information</h3>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
              {[
                ["Tender ID", TENDER.id], ["Tender title", TENDER.title], ["Organisation", TENDER.organisation],
                ["Tender value", `${TENDER.value} · EMD ${TENDER.emd}`], ["Bid deadline", TENDER.bidDue],
                ["Bidder", BIDDER.name], ["CIN / PAN", `${BIDDER.cin} / ${BIDDER.pan}`],
                ["GSTIN / Udyam", `${BIDDER.gstin} / ${BIDDER.udyam}`], ["Quoted value", BIDDER.bidValue],
                ["Submitted", BIDDER.submittedAt],
              ].map(([k, v]) => (<div key={k} className="flex gap-2 border-b border-slate-100 py-1"><span className="text-slate-500 w-32 shrink-0">{k}</span><b>{v}</b></div>))}
            </div>
          </section>

          <section>
            <h3 className="font-extrabold text-[14px] border-l-4 border-[#0b2547] pl-2 mb-2">2 · Compliance matrix (Requirement → Evidence → Verification → Decision)</h3>
            <table className="w-full text-[12px] border border-slate-200">
              <thead><tr className="bg-slate-100 text-left"><th className="p-2 border">Req</th><th className="p-2 border">Evidence</th><th className="p-2 border">Verification</th><th className="p-2 border">Result</th><th className="p-2 border">Risk</th></tr></thead>
              <tbody>
                {REQUIREMENTS.map((r) => (
                  <tr key={r.id}>
                    <td className="p-2 border"><b className="mono">{r.code}</b> {r.title}</td>
                    <td className="p-2 border">{r.extractedDetail}</td>
                    <td className="p-2 border">{r.verificationDetail}</td>
                    <td className="p-2 border font-bold">{r.result}</td>
                    <td className="p-2 border font-bold">{r.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[12px] mt-1.5"><b>Failed requirements:</b> R001 turnover shortfall (₹8.4 vs ₹10 Cr) · R004 ISO expired 15 Jan 2026 · R005 OEM letter missing. <b>Review:</b> R006 address variance.</p>
          </section>

          <section>
            <h3 className="font-extrabold text-[14px] border-l-4 border-[#0b2547] pl-2 mb-2">3 · Verification results (simulated)</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {VERIFICATIONS.map((v) => (<div key={v.id} className="border border-slate-200 rounded-lg p-2.5"><b>{v.registry}</b> — {v.headline} <span className="text-slate-500">({v.status}, simulated)</span><div className="text-slate-600 text-[12px]">{v.detail}</div></div>))}
            </div>
          </section>

          <section>
            <h3 className="font-extrabold text-[14px] border-l-4 border-[#0b2547] pl-2 mb-2">4 · Risk assessment & contradictions</h3>
            <div className="flex flex-wrap gap-1.5 mb-2">{RISKS.map((r) => (<span key={r.id} className="text-[11.5px] font-bold border border-slate-300 rounded px-2 py-1">{r.label}: {r.level} ({r.score})</span>))}</div>
            {CONTRADICTIONS.map((c) => (<div key={c.id} className="text-[12.5px] border-b border-slate-100 py-1.5"><b>{c.title}</b> [{c.severity} · {c.status}]<br /><span className="text-slate-600">Doc: {c.docSide.value} ⇄ Registry: {c.registrySide.value}. {c.explanation}</span></div>))}
          </section>

          <section>
            <h3 className="font-extrabold text-[14px] border-l-4 border-[#0b2547] pl-2 mb-2">5 · Remediation — what would make this bid compliant</h3>
            {REMEDIATION.map((r) => (<div key={r.id} className="text-[12.5px] py-1 border-b border-slate-100"><b>{r.n}. {r.title}</b> [{r.priority}]<br />Current: {r.current}<br />Required: {r.required}<br />Action: {r.action}</div>))}
          </section>

          <section>
            <h3 className="font-extrabold text-[14px] border-l-4 border-[#0b2547] pl-2 mb-2">6 · Human decisions & audit trail ({audit.length} events)</h3>
            <div className="text-[12.5px]">R006 officer decision: <b>{reviewState["r006"] ? `${reviewState["r006"].decision} at ${reviewState["r006"].time}` : "PENDING"}</b> · Final officer decision: <b>{finalDecision}</b></div>
            <table className="w-full text-[11.5px] border border-slate-200 mt-2">
              <thead><tr className="bg-slate-100 text-left"><th className="p-1.5 border">Time</th><th className="p-1.5 border">Actor</th><th className="p-1.5 border">Action</th><th className="p-1.5 border">Result</th><th className="p-1.5 border">Reference</th></tr></thead>
              <tbody>{audit.map((a) => (<tr key={a.id}><td className="p-1.5 border mono">{a.time}</td><td className="p-1.5 border">{a.actor}</td><td className="p-1.5 border">{a.action}</td><td className="p-1.5 border">{a.result}</td><td className="p-1.5 border mono">{a.reference}</td></tr>))}</tbody>
            </table>
          </section>

          <section className="bg-[#0b2547] text-white rounded-xl p-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[220px]">
              <div className="text-[11px] font-bold tracking-widest text-amber-300 uppercase">Final recommendation</div>
              <div className="text-xl font-extrabold">REQUIRES HUMAN REVIEW — {SCORE.compliance}% compliance · HIGH risk · {SCORE.confidence}% confidence</div>
              <div className="text-[12px] text-slate-300">AI does not replace the procurement officer. It provides evidence-backed decision support. Officer decision on record: {finalDecision}.</div>
            </div>
            <CheckCircle2 size={40} className="text-emerald-300" />
          </section>

          <div className="flex items-center gap-3 no-print">
            <StatusBadge result="REVIEW" /><RiskBadge level="HIGH" />
            <span className="text-[11.5px] text-slate-500 ml-auto">Print → Save as PDF for the judge handout. All figures deterministic demo outputs.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
