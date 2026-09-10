import { ShieldCheck, FlaskConical, CheckCircle2, Clock3 } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { VERIFICATIONS } from "../data/demo";
import { Card, SectionHead, SimLabel } from "../components/ui";
import { cn } from "../lib/cn";

export default function Verification() {
  const { addAudit } = useDemo();
  return (
    <div>
      <SectionHead kicker="Registry cross-checks" title="Verification Center"
        desc="Every external check is a realistic simulated lookup for the demo. Nothing here claims live government-API access."
        right={<SimLabel />} />
      <Card className="p-4 mb-3 border-amber-300 bg-amber-50 flex gap-3 items-start">
        <FlaskConical size={20} className="text-amber-700 shrink-0 mt-0.5" />
        <p className="text-[13px] text-amber-900 leading-relaxed"><b>Demo / Simulated External Verification.</b> GSTN, Udyam, PAN, MCA, Income-Tax and EPFO cards below use deterministic mock data shaped like real registry responses. In production each card maps 1:1 to an API adapter (GSTN public search, MCA21, NSDL PAN, Udyam, ITD Insight, EPFO ECR) behind the Registry Gateway — see README for the integration design.</p>
      </Card>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {VERIFICATIONS.map((v) => (
          <Card key={v.id} className="p-4 flex flex-col">
            <div className="flex items-center gap-2">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-[13px]", v.status === "VERIFIED" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                {v.registry.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-extrabold text-[14px]">{v.registry} <span className="font-medium text-slate-400 text-[11.5px]">· {v.fullName}</span></div>
                <div className="text-[11px] text-slate-500 mono">{v.checkedAt}</div>
              </div>
              <span className={cn("ml-auto text-[10.5px] font-extrabold rounded px-2 py-1 border inline-flex items-center gap-1", v.status === "VERIFIED" ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-slate-100 text-slate-600 border-slate-300")}>
                {v.status === "VERIFIED" ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}{v.status}
              </span>
            </div>
            <div className="mt-2 font-bold text-[13px] flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-600" />{v.headline}</div>
            <p className="text-[12.5px] text-slate-600 mt-1 leading-relaxed flex-1">{v.detail}</p>
            <div className="mt-2 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[12px] space-y-1">
              {v.fields.map((f) => (<div key={f.k} className="flex gap-2"><span className="text-slate-500 w-24 shrink-0">{f.k}</span><b className="mono">{f.v}</b></div>))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">Method</span>
              <span className="text-[11px] text-slate-600">{v.method}</span>
            </div>
            <button onClick={() => addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: `Re-verified ${v.registry}`, result: `${v.status} · ${v.headline}`, reference: `${v.registry}/VALVE-042` })} className="mt-2.5 text-[12px] font-bold border border-slate-300 hover:border-[#0b2547] rounded-lg py-1.5 transition bg-white">Re-run check</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
