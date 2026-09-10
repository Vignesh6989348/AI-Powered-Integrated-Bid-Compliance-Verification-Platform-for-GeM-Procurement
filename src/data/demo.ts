export type ResultStatus = "COMPLIANT" | "NON-COMPLIANT" | "REVIEW";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type VerifyLabel =
  | "AI Extracted"
  | "Rule Verified"
  | "Externally Verified"
  | "Human Reviewed";

export interface TenderRequirement {
  id: string;
  code: string;
  title: string;
  category: string;
  clause: string;
  description: string;
  expected: string;
  mandatory: boolean;
  weight: number;
  evidenceDoc: string;
  evidenceFile: string;
  extracted: string;
  extractedDetail: string;
  verification: string;
  verificationDetail: string;
  verificationSource: string;
  simulated: boolean;
  result: ResultStatus;
  risk: RiskLevel;
  confidence: number;
  explanation: string;
  recommendedAction: string;
  chain: VerifyLabel[];
  officerNote: string;
}

export interface BidderDoc {
  id: string;
  name: string;
  file: string;
  pages: number;
  size: string;
  status: "EXTRACTED" | "MISSING" | "FLAGGED";
  extractedFields: { label: string; value: string; highlight?: boolean }[];
  note: string;
}

export interface VerificationCard {
  id: string;
  registry: string;
  fullName: string;
  status: "VERIFIED" | "SIMULATED" | "FAILED";
  headline: string;
  detail: string;
  fields: { k: string; v: string }[];
  method: string;
  checkedAt: string;
  simulated: boolean;
}

export interface Contradiction {
  id: string;
  title: string;
  requirementId: string;
  severity: RiskLevel;
  status: "Confirmed" | "Requires Human Review";
  docSide: { label: string; value: string };
  registrySide: { label: string; value: string };
  explanation: string;
  implication: string;
}

export interface RiskCategory {
  id: string;
  label: string;
  level: RiskLevel;
  score: number;
  drivers: string[];
  mitigation: string;
}

export interface AuditEvent {
  id: string;
  time: string;
  actor: string;
  actorType: "AI Engine" | "System" | "Officer";
  action: string;
  result: string;
  reference: string;
  hash?: string;
}

export const TENDER = {
  id: "CPCL/PROC/2026/VALVE-042",
  title: "Supply, Installation & Commissioning of Industrial Valves and Petroleum Equipment — Manali Refinery",
  organisation: "Chennai Petroleum Corporation Limited (CPCL)",
  department: "Materials & Contracts Department",
  ministry: "Ministry of Petroleum & Natural Gas",
  category: "Industrial Valves & Petroleum Equipment",
  value: "₹12.5 Crore",
  emd: "₹25,00,000",
  published: "20 Aug 2026",
  bidDue: "15 Sep 2026 · 15:00 IST",
  bidOpen: "10 Sep 2026 · 10:30 IST",
  bidSubmissionDate: "10 Sep 2026",
  requirements: 8,
  bidsReceived: 6,
  mode: "GeM Open Tender · Two-Bid System",
  location: "Manali, Chennai — Tamil Nadu",
};

export const BIDDER = {
  name: "ABC Industrial Solutions Pvt. Ltd.",
  cin: "U29120TN2014PTC095678",
  pan: "ABCDE1234F",
  gstin: "33ABCDE1234F1Z5",
  udyam: "UDYAM-TN-12-0012345",
  constitution: "Private Limited · Small Enterprise (MSME)",
  incorp: "14 Mar 2014",
  directors: "2 Directors · Active compliant",
  employees: "47 (EPFO, simulated)",
  addressDoc: "No. 42, Industrial Estate, Chennai — 600058",
  addressRegistry: "No. 42, Industrial Estate, Ambattur, Chennai — 600058",
  contact: "bids@abcindustrial.in · +91-44-4290 1100",
  bidValue: "₹11.86 Crore (quoted)",
  submittedAt: "10 Sep 2026 · 10:31 IST",
};

export const REQUIREMENTS: TenderRequirement[] = [
  {
    id: "r001", code: "R001", title: "Minimum Average Turnover", category: "Financial",
    clause: "Clause 4.2(a) — Financial Eligibility",
    description: "Average annual turnover must be at least ₹10 Crore during the previous 3 financial years.",
    expected: "≥ ₹10.00 Cr average (FY 2022-23 to 2024-25)", mandatory: true, weight: 20,
    evidenceDoc: "Turnover Certificate", evidenceFile: "Turnover_Certificate.pdf",
    extracted: "₹8.4 Cr extracted",
    extractedDetail: "Average annual turnover: ₹8.40 Cr (FY22-23: ₹7.8 Cr · FY23-24: ₹8.1 Cr · FY24-25: ₹9.3 Cr)",
    verification: "Rule evaluation",
    verificationDetail: "Document extraction: CONFIRMED · Rule check: 8.40 < 10.00 → FAIL",
    verificationSource: "Chartered Accountant certificate + ITR cross-check (simulated)",
    simulated: true, result: "NON-COMPLIANT", risk: "HIGH", confidence: 96,
    explanation: "The extracted turnover value (₹8.4 Cr) is below the mandatory ₹10 Cr threshold specified in the tender. Shortfall of ₹1.6 Cr (16%).",
    recommendedAction: "Request clarification / audited statements; consider JV/consortium route or reject subject to procurement rules. MSE relaxation not applicable to this tender clause.",
    chain: ["AI Extracted", "Rule Verified"],
    officerNote: "Financial capacity risk for a ₹12.5 Cr contract.",
  },
  {
    id: "r002", code: "R002", title: "GST Registration", category: "Statutory",
    clause: "Clause 3.1 — Statutory Registrations",
    description: "Valid GST registration is mandatory.",
    expected: "Active GSTIN on bid date", mandatory: true, weight: 10,
    evidenceDoc: "GST Certificate", evidenceFile: "GST_Certificate.pdf",
    extracted: "Active",
    extractedDetail: "GSTIN: 33ABCDE1234F1Z5 · Status: Active · Filing: GSTR-1 Aug 2026 filed",
    verification: "GSTN registry check",
    verificationDetail: "GST registration status: Active (simulated registry lookup)",
    verificationSource: "GSTN portal — simulated verification",
    simulated: true, result: "COMPLIANT", risk: "LOW", confidence: 98,
    explanation: "GSTIN format valid, registration found Active with recent filing compliance.",
    recommendedAction: "No action required.",
    chain: ["AI Extracted", "Externally Verified"],
    officerNote: "Clean statutory record.",
  },
  {
    id: "r003", code: "R003", title: "Udyam / MSME Registration", category: "Statutory",
    clause: "Clause 3.4 — MSME Provisions",
    description: "Valid Udyam/MSME registration required where applicable.",
    expected: "Active Udyam registration", mandatory: true, weight: 5,
    evidenceDoc: "Udyam Certificate", evidenceFile: "Udyam_Registration.pdf",
    extracted: "Active",
    extractedDetail: "UDYAM-TN-12-0012345 · Category: Small Enterprise · Status: Active",
    verification: "Udyam registry check",
    verificationDetail: "Registration found and active — simulated verification",
    verificationSource: "Udyam portal — simulated verification",
    simulated: true, result: "COMPLIANT", risk: "LOW", confidence: 97,
    explanation: "Udyam number valid and active; enterprise class consistent with turnover band.",
    recommendedAction: "No action required.",
    chain: ["AI Extracted", "Externally Verified"],
    officerNote: "Supports MSE purchase-preference tracking.",
  },
  {
    id: "r004", code: "R004", title: "ISO 9001 Certification", category: "Certification",
    clause: "Clause 5.3 — Quality Certification",
    description: "Valid ISO 9001 certification required at the time of bid submission.",
    expected: "ISO 9001 valid on 10 Sep 2026", mandatory: true, weight: 15,
    evidenceDoc: "ISO Certificate", evidenceFile: "ISO_9001_Certificate.pdf",
    extracted: "Expired",
    extractedDetail: "ISO 9001:2015 · Cert No: QMS/2023/88412 · Expiry: 15 Jan 2026 · Bid date: 10 Sep 2026 (238 days expired)",
    verification: "Date-rule evaluation",
    verificationDetail: "Certificate expired before bid submission — date comparison confirmed",
    verificationSource: "Document dates + bid submission timestamp",
    simulated: false, result: "NON-COMPLIANT", risk: "HIGH", confidence: 99,
    explanation: "ISO certificate expired on 15 Jan 2026, nearly 8 months before the 10 Sep 2026 bid submission. Fails the 'valid at submission' condition.",
    recommendedAction: "Request renewed ISO 9001 certificate from an accredited body; verify accreditation and scope covers valve manufacturing/supply.",
    chain: ["AI Extracted", "Rule Verified"],
    officerNote: "Quality-assurance gap; renewal is usually fast to remediate.",
  },
  {
    id: "r005", code: "R005", title: "OEM Authorization", category: "Documentation",
    clause: "Clause 6.1 — Authorisation",
    description: "OEM authorization letter is mandatory.",
    expected: "Valid OEM letter referencing tender + OEM GST/PAN", mandatory: true, weight: 15,
    evidenceDoc: "OEM Authorization", evidenceFile: "OEM_Authorization_Letter.pdf",
    extracted: "Missing",
    extractedDetail: "No valid OEM authorization document detected — uploaded scan illegible / expired 2024 reference, no tender number",
    verification: "Presence + content check",
    verificationDetail: "Mandatory document absent or invalid — flagged HIGH risk",
    verificationSource: "Document classifier + template matcher",
    simulated: false, result: "NON-COMPLIANT", risk: "HIGH", confidence: 93,
    explanation: "No OEM letter meeting tender format was found. Without OEM backing, supply authenticity and warranty chain cannot be established.",
    recommendedAction: "Request valid OEM authorization on OEM letterhead with tender ID, validity, and authorised signatory within clarification window.",
    chain: ["AI Extracted", "Rule Verified"],
    officerNote: "Single biggest disqualification driver if unresolved.",
  },
  {
    id: "r006", code: "R006", title: "Registered Address Consistency", category: "Identity",
    clause: "Clause 3.2 — Bidder Identity",
    description: "Bidder address must match official registration records.",
    expected: "Document address = registry address", mandatory: false, weight: 10,
    evidenceDoc: "Address Proof", evidenceFile: "Address_Proof.pdf",
    extracted: "Mismatch detected",
    extractedDetail: "Document: No. 42, Industrial Estate, Chennai · Registry (simulated): No. 42, Industrial Estate, Ambattur, Chennai",
    verification: "Cross-registry comparison",
    verificationDetail: "Address differs from external registry data — fuzzy match 82%, locality token 'Ambattur' missing",
    verificationSource: "MCA / GST registry snapshot — simulated verification",
    simulated: true, result: "REVIEW", risk: "MEDIUM", confidence: 84,
    explanation: "Minor locality-level difference detected. This is common (short-form vs full address) and must NOT be auto-marked as fraud. Requires human review with address proof.",
    recommendedAction: "Request clarification: latest utility bill / MCA master data / GST address amendment proof. Officer to accept or escalate.",
    chain: ["AI Extracted", "Externally Verified", "Human Reviewed"],
    officerNote: "Do not auto-reject — ambiguous case for officer.",
  },
  {
    id: "r007", code: "R007", title: "Previous Experience", category: "Technical",
    clause: "Clause 4.3 — Past Performance",
    description: "Bidder must demonstrate at least 3 completed industrial supply contracts.",
    expected: "≥ 3 completed contracts with completion certs", mandatory: true, weight: 10,
    evidenceDoc: "Experience Certificate", evidenceFile: "Experience_Certificate.pdf",
    extracted: "5 contracts",
    extractedDetail: "5 completed contracts (2021-2025) · Largest: ₹4.2 Cr valve supply — IOCL · All with completion certificates",
    verification: "Count + reference check",
    verificationDetail: "5 verifiable references exceed minimum of 3 — value-weighted relevance 78%",
    verificationSource: "Completion certificates + work-order numbers",
    simulated: false, result: "COMPLIANT", risk: "LOW", confidence: 89,
    explanation: "Bidder exceeds the experience threshold with relevant petroleum-sector supplies.",
    recommendedAction: "No action required. Optionally sample-verify one reference.",
    chain: ["AI Extracted", "Rule Verified"],
    officerNote: "Strongest section of this bid.",
  },
  {
    id: "r008", code: "R008", title: "Technical Specification", category: "Technical",
    clause: "Section VII — Technical Parameters",
    description: "Valve specifications must satisfy tender technical parameters.",
    expected: "Class 150 · -29°C to 250°C · API 598 tested · 24-month warranty", mandatory: true, weight: 15,
    evidenceDoc: "Technical Certificate", evidenceFile: "Technical_Compliance_Certificate.pdf",
    extracted: "Parameters matched",
    extractedDetail: "Pressure Class 150 ✓ · Temp -29 to 250°C ✓ · API 598 hydro/pneumatic ✓ · Warranty 24 mo ✓ · Material ASTM A216 WCB ✓",
    verification: "Parameter-by-parameter match",
    verificationDetail: "Submitted specifications satisfy all 14 mandatory parameters (14/14)",
    verificationSource: "BOQ compliance sheet + test certificates",
    simulated: false, result: "COMPLIANT", risk: "LOW", confidence: 92,
    explanation: "All mandatory technical parameters match; 2 desirable parameters exceeded (fire-safe, fugitive emission).",
    recommendedAction: "No action required. Forward to technical committee for endorsement.",
    chain: ["AI Extracted", "Rule Verified"],
    officerNote: "Technically sound bid.",
  },
];

export const BIDDER_DOCS: BidderDoc[] = [
  { id: "d1", name: "Company Registration Certificate", file: "Company_Registration_Certificate.pdf", pages: 3, size: "1.2 MB", status: "EXTRACTED", extractedFields: [{ label: "CIN", value: "U29120TN2014PTC095678", highlight: true }, { label: "Incorporation", value: "14 Mar 2014" }, { label: "Status", value: "Active" }], note: "MCA master data matched (simulated)." },
  { id: "d2", name: "PAN Card", file: "PAN_Card.pdf", pages: 1, size: "0.4 MB", status: "EXTRACTED", extractedFields: [{ label: "PAN", value: "ABCDE1234F", highlight: true }, { label: "Name match", value: "ABC Industrial Solutions Pvt. Ltd. ✓" }], note: "PAN operative (simulated)." },
  { id: "d3", name: "GST Certificate", file: "GST_Certificate.pdf", pages: 2, size: "0.8 MB", status: "EXTRACTED", extractedFields: [{ label: "GSTIN", value: "33ABCDE1234F1Z5", highlight: true }, { label: "Status", value: "Active · Returns filed till Aug 2026" }], note: "GSTN Active (simulated)." },
  { id: "d4", name: "Udyam Registration", file: "Udyam_Registration.pdf", pages: 2, size: "0.6 MB", status: "EXTRACTED", extractedFields: [{ label: "Udyam No.", value: "UDYAM-TN-12-0012345", highlight: true }, { label: "Enterprise", value: "Small · Manufacturing" }], note: "Udyam Active (simulated)." },
  { id: "d5", name: "Income / Turnover Certificate", file: "Turnover_Certificate.pdf", pages: 4, size: "1.1 MB", status: "FLAGGED", extractedFields: [{ label: "Avg turnover", value: "₹8.40 Cr", highlight: true }, { label: "FY 22-23 / 23-24 / 24-25", value: "₹7.8 / ₹8.1 / ₹9.3 Cr" }], note: "Below ₹10 Cr threshold — flagged." },
  { id: "d6", name: "ISO Certificate", file: "ISO_9001_Certificate.pdf", pages: 1, size: "0.5 MB", status: "FLAGGED", extractedFields: [{ label: "Standard", value: "ISO 9001:2015" }, { label: "Expiry", value: "15 Jan 2026", highlight: true }], note: "Expired 238 days before bid date." },
  { id: "d7", name: "OEM Authorization Letter", file: "OEM_Authorization_Letter.pdf", pages: 1, size: "0.3 MB", status: "MISSING", extractedFields: [{ label: "Detection", value: "No valid letter detected", highlight: true }], note: "Illegible scan, 2024 ref, no tender ID." },
  { id: "d8", name: "Address Proof", file: "Address_Proof.pdf", pages: 2, size: "0.9 MB", status: "FLAGGED", extractedFields: [{ label: "Document address", value: "No. 42, Industrial Estate, Chennai", highlight: true }, { label: "Registry address", value: "No. 42, Industrial Estate, Ambattur, Chennai" }], note: "Locality token mismatch — needs review." },
  { id: "d9", name: "Technical Compliance Certificate", file: "Technical_Compliance_Certificate.pdf", pages: 6, size: "2.4 MB", status: "EXTRACTED", extractedFields: [{ label: "Parameters", value: "14/14 mandatory matched", highlight: true }, { label: "Test std", value: "API 598 · Fire-safe API 607" }], note: "All mandatory params satisfied." },
  { id: "d10", name: "Previous Experience Certificate", file: "Experience_Certificate.pdf", pages: 5, size: "1.8 MB", status: "EXTRACTED", extractedFields: [{ label: "Contracts", value: "5 completed (2021-2025)", highlight: true }, { label: "Largest", value: "₹4.2 Cr — IOCL valve supply" }], note: "Exceeds 3-contract minimum." },
];

export const VERIFICATIONS: VerificationCard[] = [
  { id: "gstn", registry: "GSTN", fullName: "Goods & Services Tax Network", status: "VERIFIED", headline: "GST Registration Active", detail: "GSTIN 33ABCDE1234F1Z5 found Active. Last return GSTR-1 Aug 2026 filed 09 Sep 2026. No cancellation proceedings.", fields: [{ k: "GSTIN", v: "33ABCDE1234F1Z5" }, { k: "Status", v: "Active" }, { k: "Last filing", v: "Aug 2026" }], method: "Simulated GSTN lookup · format + status + filing recency", checkedAt: "10 Sep 2026 · 10:31:31", simulated: true },
  { id: "udyam", registry: "Udyam", fullName: "Udyam / MSME Registry", status: "VERIFIED", headline: "MSME Registration Active", detail: "UDYAM-TN-12-0012345 · Small enterprise (manufacturing). Registration active, NIC consistent with valves.", fields: [{ k: "Udyam No.", v: "UDYAM-TN-12-0012345" }, { k: "Class", v: "Small" }, { k: "Status", v: "Active" }], method: "Simulated Udyam lookup", checkedAt: "10 Sep 2026 · 10:31:32", simulated: true },
  { id: "pan", registry: "PAN", fullName: "Income Tax — PAN Verification", status: "VERIFIED", headline: "PAN Valid & Name Matched", detail: "ABCDE1234F · Name matches MCA record. PAN operative, e-KYC compliant.", fields: [{ k: "PAN", v: "ABCDE1234F" }, { k: "Name match", v: "100%" }], method: "Simulated NSDL PAN check", checkedAt: "10 Sep 2026 · 10:31:33", simulated: true },
  { id: "mca", registry: "MCA", fullName: "Ministry of Corporate Affairs", status: "VERIFIED", headline: "Company Active & Compliant", detail: "CIN U29120TN2014PTC095678 · Active, 2 directors, last AGM filed. No strike-off flag.", fields: [{ k: "CIN", v: "U29120TN2014PTC095678" }, { k: "Status", v: "Active" }, { k: "Directors", v: "2" }], method: "Simulated MCA21 master-data check", checkedAt: "10 Sep 2026 · 10:31:33", simulated: true },
  { id: "itd", registry: "Income Tax", fullName: "Income Tax Dept. (ITR Cross-check)", status: "SIMULATED", headline: "Turnover Cross-check Consistent", detail: "Simulated ITR turnover band aligns with CA certificate (~₹8.4 Cr avg). No inflation signal. Demo stub — no live ITD access.", fields: [{ k: "ITR band", v: "₹8–9 Cr" }, { k: "Inflation signal", v: "None" }], method: "Simulated ITR insight (demo stub)", checkedAt: "10 Sep 2026 · 10:31:34", simulated: true },
  { id: "epfo", registry: "EPFO", fullName: "Employees' Provident Fund Org.", status: "SIMULATED", headline: "Establishment Snapshot (Simulated)", detail: "Simulated ECR: 47 active members, contributions regular. Capacity signal only — no live EPFO access.", fields: [{ k: "Members", v: "47" }, { k: "Compliance", v: "Regular (sim)" }], method: "Simulated EPFO stub", checkedAt: "10 Sep 2026 · 10:31:34", simulated: true },
];

export const CONTRADICTIONS: Contradiction[] = [
  { id: "c1", title: "Address mismatch — locality token missing", requirementId: "r006", severity: "MEDIUM", status: "Requires Human Review", docSide: { label: "Document (Address_Proof.pdf)", value: "No. 42, Industrial Estate, Chennai — 600058" }, registrySide: { label: "External Registry (MCA/GST snapshot — simulated)", value: "No. 42, Industrial Estate, Ambattur, Chennai — 600058" }, explanation: "Fuzzy match 82%. Only the locality token 'Ambattur' differs — typical of short-form addressing. AI does not infer fraud.", implication: "Officer must confirm whether this is a formatting variance or an un-updated registry record." },
  { id: "c2", title: "Expired certification used as valid evidence", requirementId: "r004", severity: "HIGH", status: "Confirmed", docSide: { label: "Document (ISO_9001_Certificate.pdf)", value: "ISO 9001 · Expiry 15 Jan 2026" }, registrySide: { label: "Bid timeline", value: "Bid submitted 10 Sep 2026 — 238 days after expiry" }, explanation: "Date arithmetic is deterministic: expiry precedes submission. No ambiguity on the fact itself.", implication: "Bid fails R004 unless a renewed certificate is produced in clarification." },
  { id: "c3", title: "Turnover threshold breach", requirementId: "r001", severity: "HIGH", status: "Confirmed", docSide: { label: "Document (Turnover_Certificate.pdf)", value: "Avg ₹8.40 Cr (7.8 / 8.1 / 9.3)" }, registrySide: { label: "Tender rule (Clause 4.2a)", value: "Minimum ₹10.00 Cr average — shortfall ₹1.60 Cr (16%)" }, explanation: "Extraction confidence 96%. Trend is positive (+19% over 3 yrs) but absolute level still below floor.", implication: "Financial capacity risk for a ₹12.5 Cr contract; needs officer decision on relaxation/JV/reject." },
  { id: "c4", title: "Mandatory OEM letter absent", requirementId: "r005", severity: "HIGH", status: "Confirmed", docSide: { label: "Document (OEM_Authorization_Letter.pdf)", value: "No valid letter — illegible scan, 2024 ref, no tender ID" }, registrySide: { label: "Tender rule (Clause 6.1)", value: "OEM letter mandatory with tender reference" }, explanation: "Classifier confidence 93% that no conforming OEM letter exists in the package.", implication: "Authenticity / warranty chain unverifiable until remediated." },
];

export const RISKS: RiskCategory[] = [
  { id: "fin", label: "Financial Risk", level: "HIGH", score: 82, drivers: ["Avg turnover ₹8.4 Cr vs ₹10 Cr floor (−16%)", "Quoted ₹11.86 Cr ≈ 141% of avg turnover — stretched capacity", "Positive trend (+19%) only partly mitigates"], mitigation: "Request audited FY24-25 statements + banker certificate; evaluate JV/consortium option." },
  { id: "doc", label: "Documentation Risk", level: "HIGH", score: 78, drivers: ["1 mandatory document missing (OEM auth)", "1 flagged proof (address) needs clarification"], mitigation: "5-day clarification window for OEM letter + address proof." },
  { id: "cert", label: "Certification Risk", level: "HIGH", score: 85, drivers: ["ISO 9001 expired 238 days before submission", "No renewed certificate in package"], mitigation: "Require accredited renewal with valve scope before technical opening." },
  { id: "id", label: "Identity / Data Consistency", level: "MEDIUM", score: 48, drivers: ["Locality token 'Ambattur' missing in document address", "PAN/CIN/GSTIN mutually consistent — limits fraud signal"], mitigation: "Human review with utility bill / MCA master print." },
  { id: "tech", label: "Technical Risk", level: "LOW", score: 18, drivers: ["14/14 mandatory params matched", "5 relevant past contracts incl. ₹4.2 Cr IOCL supply"], mitigation: "Routine technical-committee endorsement." },
];

export const INITIAL_AUDIT: AuditEvent[] = [
  { id: "a1", time: "10:31:04", actor: "Officer · R. Menon", actorType: "Officer", action: "Bid uploaded", result: "10 documents received", reference: "PKG/VALVE-042/ABC-011", hash: "sha256:9f2c…a41d" },
  { id: "a2", time: "10:31:08", actor: "Doc Intelligence", actorType: "AI Engine", action: "10 documents detected & classified", result: "7 extracted · 2 flagged · 1 missing", reference: "OCR + classifier v4.2 · conf 94%" },
  { id: "a3", time: "10:31:15", actor: "Rule Engine", actorType: "AI Engine", action: "Requirements extracted from tender", result: "8 requirements · 6 mandatory", reference: "CPCL/PROC/2026/VALVE-042" },
  { id: "a4", time: "10:31:22", actor: "Evidence Mapper", actorType: "AI Engine", action: "Evidence mapped to requirements", result: "8/8 mapped · R005 empty slot", reference: "Semantic match avg 91%" },
  { id: "a5", time: "10:31:31", actor: "Registry Gateway (sim)", actorType: "System", action: "GST verification completed", result: "VERIFIED · Active", reference: "GSTN sim · 33ABCDE1234F1Z5" },
  { id: "a6", time: "10:31:35", actor: "Contradiction Radar", actorType: "AI Engine", action: "Contradiction detected", result: "4 signals · 3 confirmed · 1 needs review", reference: "C1–C4 · see Radar" },
  { id: "a7", time: "10:31:42", actor: "Risk & Scoring Engine", actorType: "AI Engine", action: "Compliance score calculated", result: "62% compliance · 91% confidence · HIGH risk", reference: "Weighted by clause criticality" },
  { id: "a8", time: "10:31:46", actor: "Orchestrator", actorType: "System", action: "Human review requested", result: "R006 queued for officer", reference: "Queue HQ-042-06" },
];

export const PROCESS_STAGES = [
  "Reading tender requirements...",
  "Extracting bidder documents...",
  "Mapping evidence...",
  "Running compliance rules...",
  "Cross-checking registry data...",
  "Detecting contradictions...",
  "Calculating risk...",
  "Generating audit trail...",
];

export const SCORE = { compliance: 62, confidence: 91, passed: 4, failed: 3, review: 1, total: 8, risk: "HIGH" as RiskLevel };

export const REMEDIATION = [
  { id: "r005", n: 1, title: "Provide valid OEM authorization letter", current: "Missing / invalid scan (2024 ref, no tender ID)", required: "OEM letter on OEM letterhead quoting CPCL/PROC/2026/VALVE-042 with validity + signatory", action: "Issue clarification to bidder — 5 working days; auto-reject R005 if unresolved.", effort: "Low effort · 2–3 days", impact: "Unblocks authenticity chain", priority: "CRITICAL" },
  { id: "r001", n: 2, title: "Resolve turnover shortfall", current: "₹8.40 Cr avg (shortfall ₹1.60 Cr / 16%)", required: "≥ ₹10.00 Cr avg or approved relaxation / JV / consortium", action: "Request audited statements + banker certificate; place MSE-relaxation decision on record.", effort: "Medium effort · officer discretion", impact: "Decides financial eligibility", priority: "CRITICAL" },
  { id: "r004", n: 3, title: "Submit valid ISO 9001 certification", current: "ISO 9001 expired 15 Jan 2026 (238 days lapsed)", required: "ISO 9001:2015 valid on 10 Sep 2026 from accredited body, scope covers valves", action: "Request renewed certificate + accreditation proof; verify on IAF CertSearch equivalent.", effort: "Low–Medium · renewal typically 1–2 weeks", impact: "Clears quality gate", priority: "CRITICAL" },
  { id: "r006", n: 4, title: "Clarify registered address mismatch", current: "'Ambattur' missing in document address (match 82%)", required: "Single consistent address across bid + MCA/GST records (or amendment proof)", action: "Request utility bill / MCA master / GST amendment; officer Accept or Escalate.", effort: "Low effort · 1–2 days", impact: "Closes identity consistency flag", priority: "REVIEW" },
];
