import { CalendarClock, IndianRupee, Users, FileCheck2, ArrowRight, Building2, Landmark } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { TENDER, BIDDER, BIDDER_DOCS, REQUIREMENTS } from "../data/demo";
import { Card, SectionHead, StatusBadge, RiskBadge } from "../components/ui";

export default function Tender() {
  const { setView, addAudit } = useDemo();
  return (
    <div>
      <SectionHead kicker="Tender Dossier" title={TENDER.title}
        desc={`${TENDER.organisation} · ${TENDER.department} · ${TENDER.ministry}`}
        right={<button onClick={() => { addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: "Started new bid analysis", result: "Wizard opened · ABC Industrial", reference: "PKG/VALVE-042/ABC-011" }); setView("wizard"); }} className="bg-[#0b2547] hover:bg-[#14315c] text-white text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition">Analyze New Bid <ArrowRight size={15} /></button>} />

      <div className="grid lg:grid-cols-3 gap-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
            <span className="mono font-bold bg-[#0b2547] text-white rounded px-2 py-1">{TENDER.id}</span>
            <span className="bg-slate-100 border border-slate-200 rounded px-2 py-1 font-semibold">{TENDER.mode}</span>
            <span className="bg-slate-100 border border-slate-200 rounded px-2 py-1 font-semibold">{TENDER.category}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-4 text-[13px]">
            {[
              ["Procuring entity", TENDER.organisation],
              ["Department", TENDER.department],
              ["Tender value", `${TENDER.value} · EMD ${TENDER.emd}`],
              ["Submission deadline", TENDER.bidDue],
              ["Bid opening", TENDER.bidOpen],
              ["Delivery site", TENDER.location],
              ["Requirements in scope", `${TENDER.requirements} clauses (6 mandatory + 2 evaluated)`],
              ["Bids received", `${TENDER.bidsReceived} · ABC Industrial under AI review`],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 border-b border-slate-100 pb-2"><span className="text-slate-500 w-36 shrink-0">{k}</span><b>{v}</b></div>
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-4 gap-2">
            {[
              { Icon: IndianRupee, k: "Tender value", v: "₹12.5 Cr" },
              { Icon: CalendarClock, k: "Due", v: "15 Sep 2026" },
              { Icon: FileCheck2, k: "Requirements", v: "8 clauses" },
              { Icon: Users, k: "Bids", v: "6 received" },
            ].map((s) => (
              <div key={s.k} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                <s.Icon size={18} className="mx-auto text-[#0b2547]" />
                <div className="font-extrabold mt-1">{s.v}</div>
                <div className="text-[11px] text-slate-500">{s.k}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 bg-[#0b2547] !border-[#0b2547] text-white">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-sky-300 uppercase"><Building2 size={14} /> Bidder under review</div>
          <div className="text-lg font-extrabold mt-1">{BIDDER.name}</div>
          <div className="text-[12px] text-slate-300 mono mt-1">CIN {BIDDER.cin} · PAN {BIDDER.pan}</div>
          <div className="flex gap-2 mt-3"><StatusBadge result="REVIEW" /><RiskBadge level="HIGH" /></div>
          <div className="mt-3 text-[12.5px] text-slate-200 space-y-1.5">
            <div>Quoted value: <b>{BIDDER.bidValue}</b></div>
            <div>Submitted: <b>{BIDDER.submittedAt}</b></div>
            <div>Documents: <b>10 files · 28 pages</b></div>
          </div>
          <button onClick={() => setView("wizard")} className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-[#0b2547] font-extrabold rounded-lg py-2.5 text-[13.5px] transition">Open ABC Industrial bid →</button>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5"><Landmark size={12} /> Demo / Simulated external verification</div>
        </Card>
      </div>

      <SectionHead kicker="Scope" title="8 tender requirements in scope" desc="Each row maps to one evidence document and one verification method. Click Analyze New Bid to run the engine." />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px] min-w-[760px]">
            <thead><tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-4 py-2.5">Code</th><th className="px-4 py-2.5">Requirement</th><th className="px-4 py-2.5">Evidence expected</th><th className="px-4 py-2.5">Mandatory</th><th className="px-4 py-2.5">Weight</th>
            </tr></thead>
            <tbody>
              {REQUIREMENTS.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 mono font-bold">{r.code}</td>
                  <td className="px-4 py-2.5"><b>{r.title}</b><div className="text-slate-500 text-[11.5px]">{r.description}</div></td>
                  <td className="px-4 py-2.5">{r.evidenceDoc}</td>
                  <td className="px-4 py-2.5">{r.mandatory ? <span className="text-[11px] font-bold bg-red-50 text-red-700 border border-red-200 rounded px-2 py-0.5">MANDATORY</span> : <span className="text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200 rounded px-2 py-0.5">EVALUATED</span>}</td>
                  <td className="px-4 py-2.5 font-bold">{r.weight}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionHead kicker="Submission package" title={`10 bidder documents detected`} desc="Classification preview — full extraction happens in the wizard." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {BIDDER_DOCS.map((d) => (
          <Card key={d.id} className="p-3">
            <div className="text-[12.5px] font-bold leading-snug">{d.name}</div>
            <div className="text-[11px] text-slate-500 mono truncate">{d.file}</div>
            <div className="text-[11px] text-slate-500 mt-1">{d.pages} pages · {d.size}</div>
            <span className={`inline-block mt-2 text-[10.5px] font-extrabold rounded px-2 py-0.5 border ${d.status === "EXTRACTED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : d.status === "FLAGGED" ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-red-50 text-red-700 border-red-300"}`}>{d.status}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
