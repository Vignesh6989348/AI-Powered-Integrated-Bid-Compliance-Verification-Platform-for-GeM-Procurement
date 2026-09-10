import React, { createContext, useContext, useMemo, useState } from "react";

export type Mode = "demo" | "manual";
type DocStatus = "UPLOADED" | "PROCESSED" | "NEEDS ATTENTION" | "FAILED";
export type ManualResult = "COMPLIANT" | "NON-COMPLIANT" | "REVIEW REQUIRED" | "MISSING";
export type ManualDoc = { id: string; name: string; kind: "TENDER" | "BIDDER"; size: string; type: string; status: DocStatus; pages?: number; text: string; addedAt: string };
export type ManualRequirement = { id: string; title: string; category: string; mandatory: boolean; expected: string; rule: string; source: string; page: string; evidence: string; actual: string; result: ManualResult; confidence: number; risk: "LOW" | "MEDIUM" | "HIGH"; action: string };
export type ManualAudit = { id: string; time: string; action: string; actor: string; result: string; reference: string };

type ManualState = {
  activeMode: Mode; setActiveMode: (m: Mode) => void;
  tender: ManualDoc | null; bidderDocs: ManualDoc[]; requirements: ManualRequirement[];
  audit: ManualAudit[]; review: Record<string, string>; decision: "PENDING" | "PROCEED" | "CLARIFICATION" | "REJECT";
  addTender: (file: File) => void; addBidderDocs: (files: FileList | File[]) => void; removeDoc: (id: string) => void;
  process: () => void; clear: () => void; resolveReview: (id: string, decision: string) => void; setDecision: (d: ManualState["decision"]) => void;
};
const Ctx = createContext<ManualState | null>(null);
const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const readFile = (file: File) => new Promise<string>((resolve) => { if (file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt")) { const r = new FileReader(); r.onload = () => resolve(String(r.result ?? "")); r.onerror = () => resolve(""); r.readAsText(file); } else resolve(""); });
const doc = async (file: File, kind: ManualDoc["kind"]): Promise<ManualDoc> => ({ id: `${file.name}-${file.size}-${file.lastModified}`, name: file.name, kind, size: `${Math.max(1, file.size / 1024).toFixed(1)} KB`, type: file.type || file.name.split(".").pop()?.toUpperCase() || "FILE", status: file.type === "text/plain" || file.name.endsWith(".txt") ? "PROCESSED" : "NEEDS ATTENTION", text: await readFile(file), pages: 1, addedAt: now() });

function extractRequirements(tender: ManualDoc, docs: ManualDoc[]): ManualRequirement[] {
  const text = tender.text;
  if (!text.trim()) return [];
  const out: ManualRequirement[] = [];
  const add = (title: string, category: string, expected: string, rule: string, rx: RegExp, action: string) => { const m = text.match(rx); if (m) out.push({ id: `R${String(out.length + 1).padStart(3, "0")}`, title, category, mandatory: true, expected, rule, source: tender.name, page: "1", evidence: "Not yet mapped", actual: "Not found", result: "MISSING", confidence: 82, risk: "HIGH", action }); };
  add("Minimum turnover", "Financial", `≥ ₹${text.match(/turnover[^\d₹]*(?:₹\s*)?([\d.]+)\s*(?:crore|cr)/i)?.[1] ?? "—"} Cr`, "turnover >= threshold", /turnover[^\n]*(?:₹\s*)?[\d.]+\s*(?:crore|cr)/i, "Provide qualifying audited financial evidence, if permitted.");
  add("GST registration", "Statutory", "Active GST registration", "certificate_present = true", /GST[^\n]*(?:active|registration|GSTIN)/i, "Provide a valid GST certificate or official registration evidence.");
  add("Certification validity", "Certification", "Valid certificate on bid date", "expiry_date >= bid_date", /(?:ISO|BIS|license|certification)[^\n]*(?:valid|expiry|certificate)/i, "Provide a current certificate whose validity covers the bid date.");
  add("OEM authorization", "Technical", "Valid OEM authorization", "certificate_present = true", /OEM[^\n]*(?:authorization|authorisation|letter)/i, "Request the required OEM authorization document.");
  add("Relevant experience", "Technical", "Experience meeting tender clause", "experience_count >= required_count", /experience[^\n]*(?:year|project|similar|require)/i, "Provide qualifying work orders and completion evidence.");
  const bidderText = docs.map((d) => d.text).join("\n");
  return out.map((r) => {
    const source = docs.find((d) => d.text && new RegExp(r.title.split(" ")[0], "i").test(d.text));
    const line = bidderText.split(/\n/).find((l) => new RegExp(r.title.split(" ")[0], "i").test(l));
    const actual = line?.trim() || "No matching evidence found";
    let result: ManualResult = source ? "REVIEW REQUIRED" : "MISSING";
    if (r.title.toLowerCase().includes("turnover")) { const n = actual.match(/(?:₹\s*)?([\d.]+)\s*(?:crore|cr)/i)?.[1]; const threshold = r.expected.match(/[\d.]+/)?.[0]; if (n && threshold) result = Number(n) >= Number(threshold) ? "COMPLIANT" : "NON-COMPLIANT"; }
    if (r.title.toLowerCase().includes("gst") && /active/i.test(actual)) result = "COMPLIANT";
    return { ...r, evidence: source ? `${source.name} · page 1` : "No source document", actual, result, confidence: source ? 91 : 64, risk: result === "COMPLIANT" ? "LOW" : result === "REVIEW REQUIRED" ? "MEDIUM" : "HIGH" };
  });
}

export function ManualProvider({ children }: { children: React.ReactNode }) {
  const [activeMode, setActiveMode] = useState<Mode>("demo"); const [tender, setTender] = useState<ManualDoc | null>(null); const [bidderDocs, setBidderDocs] = useState<ManualDoc[]>([]); const [requirements, setRequirements] = useState<ManualRequirement[]>([]); const [audit, setAudit] = useState<ManualAudit[]>([]); const [review, setReview] = useState<Record<string, string>>({}); const [decision, setDecision] = useState<ManualState["decision"]>("PENDING");
  const event = (action: string, result: string, reference: string) => setAudit((a) => [...a, { id: `${Date.now()}-${a.length}`, time: now(), action, actor: "System", result, reference }]);
  const addTender = async (file: File) => { const d = await doc(file, "TENDER"); setTender(d); setRequirements([]); event("Tender uploaded", d.status, d.name); };
  const addBidderDocs = async (files: FileList | File[]) => { const incoming = await Promise.all(Array.from(files).map((f) => doc(f, "BIDDER"))); setBidderDocs((d) => { const next = [...d, ...incoming.filter((x) => !d.some((old) => old.name === x.name && old.size === x.size))]; return next; }); incoming.forEach((d) => event("Bidder document uploaded", d.status, d.name)); };
  const removeDoc = (id: string) => { setBidderDocs((d) => d.filter((x) => x.id !== id)); };
  const process = () => { if (!tender) return; const reqs = extractRequirements(tender, bidderDocs); setRequirements(reqs); event("Requirement extraction and deterministic rule evaluation", `${reqs.length} requirements`, tender.name); };
  const clear = () => { setTender(null); setBidderDocs([]); setRequirements([]); setAudit([]); setReview({}); setDecision("PENDING"); };
  const resolveReview = (id: string, d: string) => { setReview((r) => ({ ...r, [id]: d })); event("Human review action", d, id); };
  const value = useMemo(() => ({ activeMode, setActiveMode, tender, bidderDocs, requirements, audit, review, decision, addTender, addBidderDocs, removeDoc, process, clear, resolveReview, setDecision }), [activeMode, tender, bidderDocs, requirements, audit, review, decision]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useManual() { const v = useContext(Ctx); if (!v) throw new Error("useManual outside provider"); return v; }
