import { ScrollText, ShieldCheck, Cpu, User, Download } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { Card, SectionHead } from "../components/ui";
import { cn } from "../lib/cn";

export default function Audit() {
  const { audit } = useDemo();
  const icon = (t: string) => t === "AI Engine" ? <Cpu size={15} className="text-violet-600" /> : t === "Officer" ? <User size={15} className="text-sky-700" /> : <ShieldCheck size={15} className="text-emerald-600" />;
  return (
    <div>
      <SectionHead kicker="Auditability" title="AI Decision Audit Trail"
        desc="Every material AI action is timestamped with actor, action, result and evidence reference — hash-chained for tamper-evidence in production."
        right={<button onClick={() => window.print()} className="text-[12.5px] font-bold border border-slate-300 bg-white hover:border-[#0b2547] rounded-lg px-3 py-2 inline-flex items-center gap-1.5"><Download size={14} /> Print trail</button>} />
      <Card className="p-5">
        <div className="relative pl-8">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#0b2547] via-sky-300 to-emerald-400" />
          <div className="space-y-3">
            {audit.map((a) => (
              <div key={a.id} className="relative">
                <span className={cn("absolute -left-8 w-6 h-6 rounded-full border-2 border-white shadow flex items-center justify-center bg-white", "")}>
                  <span className={cn("w-2.5 h-2.5 rounded-full", a.actorType === "AI Engine" ? "bg-violet-500" : a.actorType === "Officer" ? "bg-sky-600" : "bg-emerald-500")} />
                </span>
                <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#0b2547]/40 rounded-xl px-4 py-3 transition">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mono text-[12px] font-bold text-[#0b2547]">{a.time}</span>
                    <span className="text-[12px] font-bold flex items-center gap-1">{icon(a.actorType)} {a.actor}</span>
                    <span className={cn("text-[10px] font-extrabold uppercase tracking-wider rounded px-1.5 py-0.5 border", a.actorType === "AI Engine" ? "bg-violet-50 text-violet-700 border-violet-200" : a.actorType === "Officer" ? "bg-sky-50 text-sky-700 border-sky-200" : "bg-emerald-50 text-emerald-700 border-emerald-200")}>{a.actorType}</span>
                    <span className="ml-auto mono text-[10.5px] text-slate-400">{a.hash}</span>
                  </div>
                  <div className="text-[13.5px] font-bold mt-1">{a.action}</div>
                  <div className="text-[12.5px] text-slate-600">Result: <b>{a.result}</b> · Ref: <span className="mono">{a.reference}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5">
          <ScrollText size={15} /> New officer actions (evidence views, comparisons, review decisions, clarifications) append here live during the demo.
        </div>
      </Card>
    </div>
  );
}
