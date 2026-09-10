import { AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { RISKS } from "../data/demo";
import { Card, SectionHead, RiskBadge } from "../components/ui";
import { cn } from "../lib/cn";

const COLORS: Record<string, string> = { HIGH: "#dc2626", MEDIUM: "#d97706", LOW: "#059669" };

export default function Risk() {
  const pie = [
    { name: "Financial (82)", value: 82, level: "HIGH" },
    { name: "Documentation (78)", value: 78, level: "HIGH" },
    { name: "Certification (85)", value: 85, level: "HIGH" },
    { name: "Identity (48)", value: 48, level: "MEDIUM" },
    { name: "Technical (18)", value: 18, level: "LOW" },
  ];
  const bars = RISKS.map((r) => ({ name: r.label.replace(" / Data Consistency", "").replace(" Risk", ""), score: r.score, level: r.level }));
  return (
    <div>
      <SectionHead kicker="Risk intelligence" title="Risk Center"
        desc="Overall bid risk aggregates five scored categories. Scores are deterministic demo outputs with visible drivers — officers can see exactly what pushes risk up."
        right={<span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[13px] font-extrabold rounded-lg px-3.5 py-2"><AlertTriangle size={15} /> OVERALL RISK: HIGH</span>} />
      <div className="grid lg:grid-cols-3 gap-3">
        <Card className="p-5">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Risk composition</div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {pie.map((p) => <Cell key={p.name} fill={COLORS[p.level]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-3 text-[11.5px] font-bold">
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> HIGH</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> MEDIUM</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> LOW</span>
          </div>
        </Card>
        <Card className="p-5 lg:col-span-2">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">Category scores (0–100)</div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} layout="vertical" margin={{ left: 90, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11.5, fontWeight: 700 }} width={110} />
                <Tooltip />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {bars.map((b) => <Cell key={b.name} fill={COLORS[b.level]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-3">
        {RISKS.map((r) => (
          <Card key={r.id} className={cn("p-4 border-t-4", r.level === "HIGH" ? "border-t-red-500" : r.level === "MEDIUM" ? "border-t-amber-400" : "border-t-emerald-500")}>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[13.5px] flex-1">{r.label}</h3>
              <RiskBadge level={r.level} />
              <span className="mono font-extrabold text-[15px]">{r.score}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${r.score}%`, background: COLORS[r.level] }} /></div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mt-3">Risk drivers</div>
            <ul className="text-[12.5px] text-slate-600 space-y-1 mt-1">
              {r.drivers.map((d) => <li key={d} className="flex gap-1.5"><span className="text-slate-300">•</span>{d}</li>)}
            </ul>
            <div className="text-[12px] bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-2.5"><b>Mitigation:</b> {r.mitigation}</div>
          </Card>
        ))}
        <Card className="p-4 bg-[#0b2547] !border-[#0b2547] text-white flex flex-col justify-center">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-sky-300">How overall HIGH is derived</div>
          <p className="text-[13px] mt-1.5 leading-relaxed">3 of 5 categories score HIGH (certification 85, financial 82, documentation 78). Any single <b>mandatory-clause HIGH</b> caps the bid at HIGH — a deliberate conservative rule so officers never miss a disqualifier hiding inside an average.</p>
        </Card>
      </div>
    </div>
  );
}
