# GeM Compliance Intelligence — AI-Powered Bid Compliance Verification Platform-Neurix(Vignesh)

**SIH 2026 · Problem ID SIH26100** · Ministry of Petroleum & Natural Gas · Chennai Petroleum Corporation Limited (CPCL) · Theme: Smart Automation

>This prototype demonstrates an AI-assisted workflow that analyzes tender and bidder evidence, maps requirements to supporting documents, evaluates compliance, identifies inconsistencies, performs simulated cross-verification, assesses risk, and provides explainable decision support with human review and audit trails

## Run locally (2 commands)

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173). Click **Enter Demo**. No credentials, no API keys, no backend needed.

# GeM Compliance Intelligence

### AI-Powered Integrated Bid Compliance Verification Platform for GeM Procurement

**SIH 2026 · Problem ID: SIH26100**  
**Organization:** Ministry of Petroleum & Natural Gas  
**Department:** Chennai Petroleum Corporation Limited (CPCL)  
**Theme:** Smart Automation  
**Category:** Software  

**Developed by NEURIX — Vignesh**

---

## Overview

GeM Compliance Intelligence is an AI-assisted procurement compliance platform designed to simplify the evaluation of government tender bids.

The prototype analyzes tender requirements and bidder-submitted documents, maps evidence to requirements, evaluates compliance, identifies missing or inconsistent information, assesses risk, and provides explainable decision support for procurement officers.

The platform follows an evidence-driven workflow:

**Requirement → Evidence → Verification → Compliance → Risk → Human Review → Decision → Audit**

The goal is to transform a document-intensive procurement process into a structured, transparent, and auditable workflow.

---

## Key Features

- Tender and bidder document management
- AI-assisted requirement extraction
- Evidence mapping and traceability
- Requirement-level compliance analysis
- Compliance Matrix
- Evidence Chain
- Contradiction and inconsistency detection
- Verification workflow
- Risk assessment and prioritization
- Remediation recommendations
- Human-in-the-loop review
- Explainable final decisions
- Complete audit trail
- PDF audit report generation
- Separate Demo and Manual operating modes
- NEURIX-branded procurement workspace

---

## Compliance Intelligence

Each requirement is evaluated through an evidence-driven process.

### Requirement
Identifies what the tender requires.

### Evidence
Links the requirement to supporting bidder documentation.

### Verification
Determines whether the available evidence satisfies the requirement.

### Decision
Produces a compliance result with supporting reasoning.

This approach improves transparency by allowing procurement officers to trace a decision back to its underlying evidence.

---

## Compliance vs Verification Confidence

The platform separates two important concepts:

**Compliance Score**  
Measures whether the tender requirements are satisfied.

**Verification Confidence**  
Measures how reliable and sufficiently supported the available evidence is.

This distinction prevents high-confidence evidence from being incorrectly interpreted as compliant evidence.

---

## Risk & Human Review

The platform categorizes potential procurement risks such as:

- Financial compliance
- Documentation gaps
- Certification issues
- Identity inconsistencies
- Technical requirements
- Missing or expired evidence

Ambiguous cases are not automatically classified as fraudulent.

Instead, they are routed to **Human Review**, allowing an authorized officer to evaluate the evidence and record a decision.

All significant actions are captured in the audit trail.

---

## Demo & Manual Models

### Demo Model

Provides a deterministic CPCL procurement scenario demonstrating the complete compliance-analysis workflow.

### Manual Model

Provides a separate workspace where users can create a tender, upload tender and bidder documents, extract requirements, map evidence, perform compliance evaluation, review risks, and record decisions.

Both models maintain isolated state so that the demonstration scenario remains unaffected by manual analysis.

---

## Technology Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
- **Recharts**
- **Framer Motion**
- **Local deterministic analysis engine**
- **Frontend service architecture designed for future FastAPI integration**

The current prototype is frontend-based and uses deterministic/simulated verification data for demonstration purposes.

---

## Project Structure

```text
src/
├── components/
│   ├── EvidenceDrawer.tsx
│   ├── Login.tsx
│   ├── Shell.tsx
│   └── ui.tsx
│
├── data/
│   └── demo.ts
│
├── pages/
│   ├── Audit.tsx
│   ├── Dashboard.tsx
│   ├── Decision.tsx
│   ├── Matrix.tsx
│   ├── Radar.tsx
│   ├── Remediation.tsx
│   ├── Report.tsx
│   ├── Review.tsx
│   ├── Risk.tsx
│   ├── Tender.tsx
│   ├── Verification.tsx
│   └── Wizard.tsx
│
├── services/
│   └── engine.ts
│
├── state/
│   └── DemoContext.tsx
│
├── App.tsx
├── index.css
└── main.tsx

## The 3–5 minute judge flow

1. **Enter Demo** → Executive Dashboard shows the flagged bid (ABC Industrial Solutions · 62% · HIGH risk)
2. **Open Analysis** → Tender dossier `CPCL/PROC/2026/VALVE-042` (₹12.5 Cr valve procurement)
3. **Start AI Analysis** → animated 8-stage pipeline (reading → extracting → mapping → rules → registry → radar → risk → audit) → *Analysis Complete*
4. **Compliance Matrix** → 8 rows: R001 turnover ₹8.4 Cr FAIL · R002/R003 verified · R004 ISO expired · R005 OEM missing · R006 address REVIEW · R007/R008 pass
5. Click **View Evidence** on R001 → extracted ₹8.4 Cr vs ≥₹10 Cr, mock document preview with highlighted evidence
6. **Contradiction Radar** → address mismatch (doc vs simulated registry) → **Compare Evidence** side-by-side
7. **Verification Center** → GSTN / Udyam / PAN / MCA VERIFIED + Income-Tax / EPFO SIMULATED — all labelled *Demo / Simulated*
8. **Risk Center** → HIGH overall (Financial / Documentation / Certification HIGH, Identity MEDIUM, Technical LOW) with charts
9. **What would make this bid compliant?** → 4 remediations as Current → Required → Action
10. **Human Review** → resolve the address mismatch (Accept / Clarification / Reject / Escalate) → audit event created
11. **Audit Trail** → timestamped actor/action/result/reference timeline
12. **Final Decision** → AI recommends REQUIRES HUMAN REVIEW → officer Approves / Clarifies / Rejects → **Generate Audit Report** → **Export PDF** (browser print)

## Demo mode

- Amber **DEMO MODE** badge in sidebar + header. **Reset Demo** restores the original scenario (matrix, review queue, clarifications, decisions, audit trail).
- Top stepper (Analyze → Matrix → Radar → Verify → Risk → Remediate → Review → Report) follows the judge script.

## Key concept: Requirement → Evidence → Verification → Decision

Every result carries **evidence-chain labels**: `AI Extracted` · `Rule Verified` · `Externally Verified` · `Human Reviewed`. The matrix, evidence drawer, radar compare view and report all show the same chain.

**Compliance ≠ Confidence** is a first-class visual: Compliance 62% (are requirements satisfied?) vs Verification Confidence 91% (how sure are we about the evidence?). High-confidence evidence can still be non-compliant.

## How mock verification works

`src/data/demo.ts` holds the deterministic scenario; `src/services/engine.ts` mirrors the production pipeline shape (`ingest → extract → map → rules → registry → radar → risk → decide → audit`). Registry cards return realistic mock payloads (GSTIN status, Udyam class, MCA directors, ITR band, EPFO headcount) and are **always labelled simulated** in UI + report.

## How real government APIs plug in later

Each `VerificationCard` maps 1:1 to an adapter behind a `Registry Gateway` service:

| Card | Production source |
|---|---|
| GSTN | GST portal public search / GSTN API via authorized GSP |
| Udyam | Udyam Registration API |
| PAN | NSDL / Income-Tax PAN verification API |
| MCA | MCA21 company master data API |
| Income Tax | ITD Insight / AIS-TIS (with bidder consent) |
| EPFO | EPFO Establishment Search / ECR APIs |

Replace `src/services/engine.ts` stubs with FastAPI endpoints (`backend/` pattern: `/verify/gstn`, `/verify/mca`, …) returning the same `VerificationCard` shape — the UI needs no changes. Add OAuth/mTLS, consent capture, rate limiting, and hash-chained audit persistence (append-only store) before any pilot.

## Project structure

```
src/
  App.tsx               # provider + view router
  data/demo.ts          # deterministic scenario (tender, bidder, 8 reqs, docs, registries, risks, audit)
  state/DemoContext.tsx # demo store: view, analysis, evidence, review decisions, clarifications, audit
  services/engine.ts    # deterministic analysis engine (replaceable by FastAPI backend)
  components/           # Login, Shell (sidebar+stepper), EvidenceDrawer, ui primitives
  pages/                # Dashboard, Tender, Wizard, Matrix, Radar, Verification, Risk,
                        # Remediation, Review, Audit, Decision, Report
```

## Tech

React 19 + TypeScript + Vite + Tailwind CSS v4 + lucide-react + recharts + framer-motion-ready. Frontend-only mock APIs; structured so a FastAPI + Pydantic backend can replace `services/engine.ts` later. See `.env.example`.

## Safety note

Simulated checks are labelled everywhere. The AI never auto-labels a bidder fraudulent — ambiguous cases go to **Human Review**, and every officer action is audit-logged.
