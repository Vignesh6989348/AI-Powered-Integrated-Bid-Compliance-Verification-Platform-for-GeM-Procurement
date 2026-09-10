import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Play, FileText, FolderOpen, Cpu, Flag, ArrowRight, RotateCcw } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { BIDDER_DOCS, PROCESS_STAGES, REQUIREMENTS, TENDER, BIDDER } from "../data/demo";
import { Card, SectionHead, StatusBadge } from "../components/ui";
import { cn } from "../lib/cn";

const STEPS = ["Tender Requirements", "Bidder Documents", "AI Verification", "Compliance Decision"];

export default function Wizard() {
  const { analysis, setAnalysis, stageIdx, setStageIdx, setView, addAudit } = useDemo();
  const [wizardStep, setWizardStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) clearInterval(timer.current);
    setAnalysis("running");
    setStageIdx(0);
    addAudit({ actor: "Officer · R. Menon", actorType: "Officer", action: "AI analysis started", result: "8 stages · deterministic demo engine", reference: "RUN/VALVE-042/07" });
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      if (i >= PROCESS_STAGES.length) {
        if (timer.current) clearInterval(timer.current);
        setAnalysis("complete");
        setStageIdx(PROCESS_STAGES.length - 1);
        addAudit({ actor: "Risk & Scoring Engine", actorType: "AI Engine", action: "Analysis complete", result: "62% compliance · HIGH risk · 91% confidence", reference: "RUN/VALVE-042/07" });
      } else {
        setStageIdx(i);
      }
    }, 950);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const running = analysis === "running";
  const complete = analysis === "complete";

  return (
    <div>
      <SectionHead kicker="Bid Analysis Wizard · 4 steps" title="ABC Industrial Solutions → VALVE-042"
        desc="Deterministic demo engine — same inputs always reproduce 62% compliance, HIGH risk, 91% confidence. No API keys, no live registries."
        right={
          <>
            {analysis !== "running" && <button onClick={start} className="bg-[#0b2547] hover:bg-[#14315c] text-white text-[13px] font-bold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition"><Play size={15} /> {complete ? "Re-run AI Analysis" : "Start AI Analysis"}</button>}
            {complete && !running && <button onClick={() => setView("matrix")} className="bg-amber-400 hover:bg-amber-300 text-[#0b2547] text-[13px] font-extrabold rounded-lg px-4 py-2.5 inline-flex items-center gap-2 transition">View Compliance Matrix <ArrowRight size={15} /></button>}
          </>
        } />

      {/* Stepper */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {STEPS.map((s, i) => {
          const active = wizardStep === i;
          const done = complete || wizardStep > i;
          return (
            <button key={s} onClick={() => setWizardStep(i)} className={cn("rounded-xl border p-3 text-left transition", active ? "bg-[#0b2547] text-white border-[#0b2547] shadow-lg" : "bg-white border-slate-200 hover:border-[#0b2547]")}>
              <div className="flex items-center gap-2">
                <span className={cn("w-6 h-6 rounded-full text-[11px] font-extrabold flex items-center justify-center", active ? "bg-amber-400 text-[#0b2547]" : done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500")}>{done && !active ? <CheckCircle2 size={14} /> : i + 1}</span>
                <span className="text-[12.5px] font-bold">Step {i + 1}</span>
              </div>
              <div className={cn("text-[13px] font-bold mt-1", active ? "text-white" : "text-slate-800")}>{s}</div>
            </button>
          );
        })}
      </div>

      {/* Step content */}
      {wizardStep === 0 && (
        <Card className="p-5">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3">Step 1 · Tender Requirements — {TENDER.id}</div>
          <div className="grid md:grid-cols-2 gap-2">
            {REQUIREMENTS.map((r) => (
              <div key={r.id} className="border border-slate-200 rounded-lg p-3 flex gap-2.5">
                <FileText size={17} className="text-[#0b2547] shrink-0 mt-0.5" />
                <div><div className="text-[13px] font-bold"><span className="mono">{r.code}</span> · {r.title}</div>
                <div className="text-[12px] text-slate-500">{r.description}</div>
                <div className="text-[11.5px] mt-1"><span className="font-bold">Expected:</span> {r.expected}</div></div>
              </div>
            ))}
          </div>
          <button onClick={() => setWizardStep(1)} className="mt-4 text-[13px] font-bold text-[#0b2547] hover:underline">Continue to bidder documents →</button>
        </Card>
      )}
      {wizardStep === 1 && (
        <Card className="p-5">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3">Step 2 · Bidder Documents — {BIDDER.name} · 10 files</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {BIDDER_DOCS.map((d) => (
              <div key={d.id} className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2"><FolderOpen size={15} className="text-[#0b2547]" /><div className="text-[13px] font-bold">{d.name}</div></div>
                <div className="text-[11px] mono text-slate-500">{d.file} · {d.pages}p · {d.size}</div>
                <div className="mt-1.5 space-y-1">{d.extractedFields.map((f) => (<div key={f.label} className="text-[12px] flex gap-2"><span className="text-slate-500">{f.label}:</span><b className={f.highlight ? "text-[#0b2547] bg-yellow-100 px-1 rounded" : ""}>{f.value}</b></div>))}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setWizardStep(2)} className="mt-4 text-[13px] font-bold text-[#0b2547] hover:underline">Continue to AI verification →</button>
        </Card>
      )}
      {wizardStep === 2 && (
        <div>
          <Card className="p-0 overflow-hidden">
            <div className="bg-[#0b2547] text-white px-5 py-4 flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center ${running ? "pulse-ring" : ""}`}>
                {running ? <Loader2 size={22} className="animate-spin text-amber-300" /> : <Cpu size={22} className="text-amber-300" />}
              </div>
              <div>
                <div className="font-extrabold">{running ? "AI Engine Running — deterministic demo pipeline" : complete ? "Analysis Complete" : "Ready to run the verification pipeline"}</div>
                <div className="text-[12px] text-slate-300">Document ingestion → Requirement extraction → Evidence mapping → Rule evaluation → Simulated registry checks → Contradiction detection → Risk scoring → Audit trail</div>
              </div>
              <div className="ml-auto hidden sm:block">{complete && !running ? <span className="bg-emerald-400 text-[#0b2547] text-[12px] font-extrabold rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5"><CheckCircle2 size={15} /> Analysis Complete</span> : null}</div>
            </div>
            <div className="p-5">
              {/* pipeline visual */}
              <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-3">
                {["Ingest", "Extract", "Map", "Rules", "Verify", "Radar", "Risk", "Audit"].map((p, i) => {
                  const done = complete || (running && i < stageIdx) || (!running && !complete && false);
                  const active = running && i === stageIdx;
                  return (
                    <span key={p} className="flex items-center gap-1 shrink-0">
                      <span className={cn("text-[11px] font-bold px-2.5 py-1.5 rounded-lg border whitespace-nowrap", active ? "bg-[#0b2547] text-white border-[#0b2547]" : done ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-400 border-slate-200")}>
                        {done && !active ? "✓ " : ""}{p}
                      </span>
                      {i < 7 && <span className="text-slate-300 text-xs">→</span>}
                    </span>
                  );
                })}
              </div>
              <div className="space-y-2">
                {PROCESS_STAGES.map((s, i) => {
                  const done = complete || (running && i < stageIdx);
                  const active = running && i === stageIdx;
                  const pending = !done && !active;
                  return (
                    <div key={s} className={cn("flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-[13px]", active ? "border-[#0b2547] bg-[#0b2547]/[.04]" : done ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white")}>
                      <span className="w-6 flex justify-center shrink-0">
                        {done ? <CheckCircle2 size={17} className="text-emerald-600" /> : active ? <Loader2 size={17} className="animate-spin text-[#0b2547]" /> : <span className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                      </span>
                      <span className={cn("font-medium", active ? "font-bold text-slate-900" : done ? "text-slate-700" : "text-slate-400")}>{s}</span>
                      {active && <span className="ml-auto text-[11px] font-bold text-[#0b2547] bg-sky-100 rounded px-2 py-0.5">PROCESSING</span>}
                      {done && <span className="ml-auto text-[11px] font-bold text-emerald-700">DONE</span>}
                      {pending && <span className="ml-auto text-[11px] text-slate-300 mono">QUEUED</span>}
                    </div>
                  );
                })}
              </div>
              {/* progress bar */}
              <div className="mt-4 h-2.5 rounded-full bg-slate-100 overflow-hidden relative">
                <div className="h-full bg-[#0b2547] transition-all duration-700" style={{ width: `${complete ? 100 : running ? ((stageIdx + 1) / PROCESS_STAGES.length) * 100 : 4}%` }} />
                {running && <div className="absolute inset-y-0 w-1/3 bg-white/40 animate-shimmer" />}
              </div>
              {!running && !complete && (
                <button onClick={start} className="mt-4 w-full bg-[#0b2547] hover:bg-[#14315c] text-white font-extrabold rounded-xl py-3.5 flex items-center justify-center gap-2 transition text-[15px]"><Play size={18} /> Start AI Analysis</button>
              )}
              {complete && !running && (
                <div className="mt-4 grid sm:grid-cols-4 gap-2 text-center">
                  {[["62%", "Compliance"], ["91%", "Confidence"], ["HIGH", "Risk"], ["4", "Contradictions"]].map(([v, k]) => (
                    <div key={k} className="bg-slate-50 border border-slate-200 rounded-xl py-3"><div className="text-xl font-extrabold">{v}</div><div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{k}</div></div>
                  ))}
                </div>
              )}
            </div>
          </Card>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setWizardStep(3)} className="text-[13px] font-bold text-[#0b2547] hover:underline">Continue to compliance decision →</button>
          </div>
        </div>
      )}
      {wizardStep === 3 && (
        <Card className="p-5">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3">Step 4 · Compliance Decision preview</div>
          {!complete && !running ? (
            <div className="text-center py-8">
              <RotateCcw size={28} className="mx-auto text-slate-300 mb-2" />
              <div className="font-bold">Run the analysis first</div>
              <p className="text-[13px] text-slate-500">Go to Step 3 and click Start AI Analysis.</p>
              <button onClick={() => setWizardStep(2)} className="mt-3 bg-[#0b2547] text-white text-[13px] font-bold rounded-lg px-4 py-2">Go to AI Verification</button>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Flag size={18} className="text-amber-600" />
                <span className="text-lg font-extrabold">AI Recommendation: REQUIRES HUMAN REVIEW</span>
                <StatusBadge result="REVIEW" />
              </div>
              <p className="text-[13px] text-slate-600 mt-2">62% compliance · 4 passed · 3 failed · 1 review · HIGH risk · 91% confidence. The engine does not auto-reject — ambiguous evidence (R006) is queued for the officer.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button onClick={() => setView("matrix")} className="bg-[#0b2547] text-white text-[13px] font-bold rounded-lg px-4 py-2.5">Open Compliance Matrix <ArrowRight size={14} className="inline" /></button>
                <button onClick={() => setView("decision")} className="bg-white border border-slate-300 text-[13px] font-bold rounded-lg px-4 py-2.5">Go to Final Decision</button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
