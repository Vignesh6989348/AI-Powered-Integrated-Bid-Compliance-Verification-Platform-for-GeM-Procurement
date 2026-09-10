import { ShieldCheck, FileCheck2, ArrowRight, Landmark, Building2, ScanSearch, GitBranch, Gauge, Wrench, Users, ScrollText, Lock, UploadCloud } from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { useManual } from "../state/ManualContext";
import { TENDER } from "../data/demo";

const PILLARS = [
  { Icon: GitBranch, title: "Evidence Chain", desc: "Requirement → Evidence → Verification → Decision" },
  { Icon: ScanSearch, title: "Contradiction Radar", desc: "Detects inconsistent information automatically" },
  { Icon: Gauge, title: "Compliance ≠ Confidence", desc: "High-confidence evidence can still be non-compliant" },
  { Icon: Wrench, title: "Remediation Intelligence", desc: "Explains what must be fixed, not just FAILED" },
  { Icon: Users, title: "Human-in-the-Loop", desc: "Ambiguous cases go to procurement officers" },
  { Icon: ScrollText, title: "Auditability", desc: "Every AI action is recorded with evidence" },
];

export default function Login() {
  const { setEntered, setView, resetDemo } = useDemo();
  const { setActiveMode } = useManual();
  const enter = () => {
    resetDemo();
    setEntered(true);
    setView("dashboard");
  };
  const enterManual = () => {
    setActiveMode("manual");
    setEntered(true);
    setView("dashboard");
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0b2547]">
      {/* Left — brand panel */}
      <div className="flex-1 relative overflow-hidden text-white p-8 lg:p-12 flex flex-col justify-between min-h-[60vh]">
        <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #7dd3fc 0, transparent 40%), radial-gradient(circle at 85% 15%, #f59e0b 0, transparent 35%), radial-gradient(circle at 60% 90%, #34d399 0, transparent 40%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1.5 flex"><div className="flex-1 bg-orange-500" /><div className="flex-1 bg-white" /><div className="flex-1 bg-green-600" /></div>
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
              <Landmark className="text-[#0b2547]" size={26} />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.2em] text-sky-300 uppercase">Ministry of Petroleum & Natural Gas · CPCL</div>
              <div className="text-2xl font-extrabold tracking-tight">GeM Compliance Intelligence</div>
              <div className="text-[13px] text-slate-300">AI-Powered Bid Compliance Verification Platform</div>
            </div>
          </div>
          <div className="mt-8 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold bg-amber-400/15 border border-amber-300/40 text-amber-200 rounded-full px-3 py-1">
              <Lock size={12} /> DEMO ENVIRONMENT · SIH 2026 · PROBLEM ID SIH26100
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-[1.05] mt-4">Every requirement.<br />Every evidence.<br /><span className="text-amber-300">Every decision explained.</span></h1>
            <p className="text-slate-300 text-[14px] mt-4 leading-relaxed">Takes a government tender + bidder documents, checks every requirement, detects missing / expired / inconsistent evidence, performs simulated cross-verification, calculates compliance and risk, and gives officers an explainable decision with an audit trail.</p>
            <div className="mt-5 flex flex-wrap gap-2 text-[12px] mono">
              <span className="bg-white/10 border border-white/15 rounded-lg px-3 py-2">Tender <b className="text-white">{TENDER.id}</b></span>
              <span className="bg-white/10 border border-white/15 rounded-lg px-3 py-2">Value <b className="text-white">₹12.5 Crore</b></span>
              <span className="bg-white/10 border border-white/15 rounded-lg px-3 py-2">Bidder <b className="text-white">ABC Industrial Solutions</b></span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 max-w-2xl">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-white/[0.07] border border-white/10 rounded-xl p-3 backdrop-blur">
                <p.Icon size={18} className="text-sky-300 mb-1.5" />
                <div className="text-[13px] font-bold">{p.title}</div>
                <div className="text-[11.5px] text-slate-300 leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-[11px] text-slate-400 mt-8 flex flex-wrap gap-x-4 gap-y-1">
          <span>Smart Automation · Chennai Petroleum Corporation Ltd.</span>
          <span>Simulated registries — no live GeM / GSTN / MCA access</span>
        </div>
      </div>

      {/* Right — login card */}
      <div className="w-full lg:w-[440px] bg-[#eef2f7] p-6 lg:p-10 flex items-center shrink-0">
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-7">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <Building2 size={14} /> Procurement Officer Access
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mt-2">Demo Environment</h2>
          <p className="text-[13px] text-slate-500 mt-1">No credentials needed. A deterministic demo scenario loads instantly for judges.</p>

          <div className="mt-5 space-y-3">
            <label className="block">
              <div className="text-[12px] font-semibold text-slate-600 mb-1">Officer ID</div>
              <input defaultValue="R. Menon · Materials & Contracts, CPCL" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-[13px] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0f2d52]" />
            </label>
            <label className="block">
              <div className="text-[12px] font-semibold text-slate-600 mb-1">Role</div>
              <input defaultValue="Tender Evaluation Committee — Reviewer" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-[13px] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0f2d52]" />
            </label>
          </div>

          <button onClick={enter} className="mt-5 w-full bg-[#0b2547] hover:bg-[#12325e] text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 transition shadow-lg">
            Enter Demo Model <ArrowRight size={17} />
          </button>
          <button onClick={enterManual} className="mt-2 w-full bg-white hover:bg-cyan-50 text-[#0b2547] border border-[#0b2547]/25 font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition">
            Open Manual Model <UploadCloud size={16} />
          </button>
          <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5">
            <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
            All external checks are <b>clearly labelled simulated</b>. Nothing claims live gov-API access.
          </div>
          <div className="mt-4 space-y-2 text-[12.5px]">
            {[
              "3–5 min judge flow: Tender → AI Analysis → Matrix → Radar → Risk → Remediation → Review → Report",
              "Live demo path: 62% compliance · HIGH risk · 91% confidence",
              "Every button works — evidence, compare, review, report, print",
            ].map((t) => (
              <div key={t} className="flex gap-2 text-slate-600"><FileCheck2 size={14} className="mt-0.5 text-[#0f2d52] shrink-0" />{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
