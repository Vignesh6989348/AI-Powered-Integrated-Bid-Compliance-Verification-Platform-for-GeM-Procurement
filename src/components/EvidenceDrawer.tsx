import { X, FileText, ShieldCheck, ArrowRight, Send } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { REQUIREMENTS } from "../data/demo";
import { StatusBadge, RiskBadge, ChainTag, SimLabel } from "./ui";

function DocPreview({ reqId }: { reqId: string }) {
  const bodies: Record<string, { title: string; lines: React.ReactNode; stamp: string }> = {
    r001: {
      title: "Turnover_Certificate.pdf — p.2 · Chartered Accountant certificate",
      stamp: "UDIN verified (sim) · CA Firm Reg. 004512S",
      lines: (
        <>
          <p>TO WHOM IT MAY CONCERN — This is to certify that <b>M/s ABC Industrial Solutions Pvt. Ltd.</b> (PAN: ABCDE1234F) has achieved the following turnover from valve & industrial equipment supply:</p>
          <p className="mt-2">FY 2022-23 …… ₹7.80 Cr<br />FY 2023-24 …… ₹8.10 Cr<br />FY 2024-25 …… ₹9.30 Cr (provisional, audited)</p>
          <p className="mt-2">Average annual turnover (3 yrs): <mark className="evidence-mark red">₹8.40 Crore</mark></p>
          <p className="mt-2 text-slate-500">Tender floor: ≥ ₹10.00 Cr → shortfall ₹1.60 Cr (16%)</p>
        </>
      ),
    },
    r002: {
      title: "GST_Certificate.pdf — REG-06 snapshot (simulated registry echo)",
      stamp: "GSTN Active · GSTR-1 Aug-2026 filed 09-Sep-2026",
      lines: (
        <>
          <p>Legal name: <b>ABC INDUSTRIAL SOLUTIONS PRIVATE LIMITED</b></p>
          <p className="mt-2">GSTIN: <mark className="evidence-mark green">33ABCDE1234F1Z5</mark> · Constitution: Private Limited</p>
          <p className="mt-2">Status: <mark className="evidence-mark green">Active</mark> · Jurisdiction: Chennai North · Returns compliant till Aug 2026</p>
        </>
      ),
    },
    r003: {
      title: "Udyam_Registration.pdf — Udyam snapshot (simulated)",
      stamp: "MSME Small · Manufacturing · Active",
      lines: (
        <>
          <p>Udyam Registration Number: <mark className="evidence-mark green">UDYAM-TN-12-0012345</mark></p>
          <p className="mt-2">Enterprise type: <b>Small</b> · Major activity: Manufacturing (NIC 2813 — valves)</p>
          <p className="mt-2">Status: <mark className="evidence-mark green">Active</mark> · Consistent with turnover band</p>
        </>
      ),
    },
    r004: {
      title: "ISO_9001_Certificate.pdf — QMS certificate",
      stamp: "Cert No. QMS/2023/88412 · Accredited body (sim check)",
      lines: (
        <>
          <p>This is to certify that the Quality Management System of <b>ABC Industrial Solutions Pvt. Ltd.</b> conforms to <b>ISO 9001:2015</b> for “design support, supply & servicing of industrial valves”.</p>
          <p className="mt-2">Valid from 16-Jan-2023 to <mark className="evidence-mark red">15-Jan-2026</mark></p>
          <p className="mt-2">Bid submission: <b>10-Sep-2026</b> → certificate lapsed <b>238 days</b> before submission. Fails “valid at submission”.</p>
        </>
      ),
    },
    r005: {
      title: "OEM_Authorization_Letter.pdf — classifier output",
      stamp: "Template match 31% · Below 70% acceptance floor",
      lines: (
        <>
          <p>[Scan quality: poor — skew + shadow. OCR recovered fragments:] “…authorised dealer… 2024… FlowMax Valves…”</p>
          <p className="mt-2">Missing: <mark className="evidence-mark red">tender number CPCL/PROC/2026/VALVE-042</mark> · validity covering bid date · authorised signatory + seal.</p>
          <p className="mt-2 text-slate-500">Verdict: <b>No valid OEM authorization detected</b> — HIGH risk, mandatory clause.</p>
        </>
      ),
    },
    r006: {
      title: "Address_Proof.pdf — p.1 vs registry snapshot",
      stamp: "Fuzzy match 82% · Locality token differs",
      lines: (
        <>
          <p>Registered office (bid document): <mark className="evidence-mark amber">No. 42, Industrial Estate, Chennai — 600058</mark></p>
          <p className="mt-2">Registry snapshot (MCA/GST, simulated): <mark className="evidence-mark amber">No. 42, Industrial Estate, Ambattur, Chennai — 600058</mark></p>
          <p className="mt-2">Only the locality token <b>“Ambattur”</b> differs — typical short-form addressing. <b>Not auto-fraud. Officer review required.</b></p>
        </>
      ),
    },
    r007: {
      title: "Experience_Certificate.pdf — completion summary",
      stamp: "5 references · All with completion certificates",
      lines: (
        <>
          <p>Completed industrial supply contracts (2021–2025): <mark className="evidence-mark green">5 contracts</mark></p>
          <p className="mt-2">1. IOCL valve supply — ₹4.20 Cr (2024) ✓ · 2. HPCL instrumentation — ₹1.80 Cr ✓ · 3. TN Water Board — ₹0.95 Cr ✓ · 4. Private refinery spares — ₹1.10 Cr ✓ · 5. CPCL-enlisted vendor trial — ₹0.60 Cr ✓</p>
          <p className="mt-2">Minimum required: 3 → <b>exceeded</b>. Value-weighted relevance 78%.</p>
        </>
      ),
    },
    r008: {
      title: "Technical_Compliance_Certificate.pdf — BOQ compliance sheet",
      stamp: "14/14 mandatory parameters matched",
      lines: (
        <>
          <p>Pressure class: <mark className="evidence-mark green">Class 150 ✓</mark> · Temp range: <mark className="evidence-mark green">−29°C to 250°C ✓</mark> · Hydro/pneumatic per <b>API 598 ✓</b></p>
          <p className="mt-2">Body: ASTM A216 WCB ✓ · Fire-safe API 607 (exceeds) ✓ · Fugitive emission ISO 15848 (exceeds) ✓ · Warranty: <b>24 months ✓</b></p>
        </>
      ),
    },
  };
  const b = bodies[reqId] ?? bodies.r001;
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
        <FileText size={15} className="text-[#0b2547]" />
        <span className="text-[11.5px] font-bold mono truncate">{b.title}</span>
        <span className="ml-auto relative flex w-2.5 h-2.5 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" /></span>
      </div>
      {/* scanline effect */}
      <div className="relative flex-1 doc-paper">
        <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-sky-400/20 to-transparent pointer-events-none" style={{ animation: "scanline 4s linear infinite alternate" }} />
        <div className="p-5 text-[13px] leading-relaxed text-slate-700 min-h-[280px]">
          <div className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Mock document preview · extracted evidence highlighted</div>
          {b.lines}
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-2.5 text-[11.5px] text-slate-500 flex items-center gap-1.5 bg-slate-50">
        <ShieldCheck size={13} className="text-emerald-600" /> {b.stamp}
      </div>
    </div>
  );
}

export default function EvidenceDrawer() {
  const { evidenceId, setEvidenceId, requestDoc, requestedDocs, addAudit, setView, setCompareId } = useDemo();
  const r = REQUIREMENTS.find((x) => x.id === evidenceId);
  if (!r) return null;
  const sent = !!requestedDocs[r.id];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-[#0b2547]/50 backdrop-blur-[2px]" onClick={() => setEvidenceId(null)} />
      <div className="relative w-full max-w-[980px] bg-[#eef2f7] h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-[#0b2547] text-white px-5 py-3.5 flex items-center gap-3">
          <span className="mono text-[12px] font-bold bg-white/10 border border-white/20 rounded px-2 py-1">{r.code}</span>
          <div className="font-extrabold text-[15px]">{r.title}</div>
          <StatusBadge result={r.result} />
          <button onClick={() => setEvidenceId(null)} className="ml-auto bg-white/10 hover:bg-white/20 rounded-lg p-2 transition"><X size={18} /></button>
        </div>
        {/* evidence chain strip */}
        <div className="px-5 pt-4 flex items-center gap-1.5 flex-wrap text-[12px] font-bold">
          {["Requirement", "Evidence", "Verification", "Decision"].map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5">{i + 1}. {s}</span>
              {i < 3 && <ArrowRight size={13} className="text-slate-400" />}
            </span>
          ))}
          <span className="ml-auto"><SimLabel /></span>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 p-5">
          <div className="space-y-3">
            {[
              ["Requirement", `${r.description} (${r.clause})`],
              ["Source Document", `${r.evidenceFile} · ${r.evidenceDoc}`],
              ["Extracted Evidence", r.extractedDetail],
              ["Expected", r.expected],
              ["Verification", `${r.verificationDetail} — ${r.verificationSource}`],
              ["Decision", r.result],
              ["Explanation", r.explanation],
              ["Recommended Action", r.recommendedAction],
            ].map(([k, v]) => (
              <div key={k} className="bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">{k}</div>
                <div className="text-[13px] font-medium mt-1 leading-relaxed">
                  {k === "Decision" ? <StatusBadge result={r.result} /> : k === "Extracted Evidence" ? <span className="bg-yellow-100 border border-yellow-400 rounded px-1.5 py-0.5 font-bold">{v}</span> : v}
                </div>
                {k === "Verification" && <div className="flex gap-1.5 mt-2 flex-wrap">{r.chain.map((c) => <ChainTag key={c} label={c} />)}<RiskBadge level={r.risk} /><span className="text-[11px] font-bold text-slate-500">confidence {r.confidence}%</span></div>}
                {k === "Explanation" && <div className="text-[12px] text-slate-500 mt-1.5 italic">Officer note: {r.officerNote}</div>}
              </div>
            ))}
            <div className="flex gap-2 flex-wrap">
              {r.result === "NON-COMPLIANT" && (
                <button onClick={() => { requestDoc(r.id); addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: `Clarification requested from evidence — ${r.code}`, result: "Sent to bidder", reference: `CLF/VALVE-042/${r.code}` }); }} disabled={sent} className={sent ? "bg-emerald-50 text-emerald-700 border border-emerald-300 text-[13px] font-bold rounded-lg px-4 py-2.5" : "bg-[#0b2547] text-white text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 hover:bg-[#14315c]"}>
                  <Send size={14} /> {sent ? "Requested ✓" : "Request Clarification"}
                </button>
              )}
              {r.id === "r006" && <button onClick={() => { setEvidenceId(null); setCompareId("c1"); setView("radar"); }} className="bg-amber-400 hover:bg-amber-300 text-[#0b2547] text-[13px] font-extrabold rounded-lg px-4 py-2.5 transition">Compare Evidence</button>}
              {r.id === "r006" && <button onClick={() => { setEvidenceId(null); setView("review"); }} className="bg-white border border-slate-300 text-[13px] font-bold rounded-lg px-4 py-2.5">Open Human Review</button>}
            </div>
          </div>
          <div><DocPreview reqId={r.id} /></div>
        </div>
      </div>
    </div>
  );
}
