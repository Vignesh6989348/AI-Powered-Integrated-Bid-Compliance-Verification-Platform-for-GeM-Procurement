# GeM Compliance Intelligence — AI-Powered Bid Compliance Verification Platform

**SIH 2026 · Problem ID SIH26100** · Ministry of Petroleum & Natural Gas · Chennai Petroleum Corporation Limited (CPCL) · Theme: Smart Automation

> This system takes a government tender + bidder documents, automatically checks every requirement, detects missing / expired / inconsistent evidence, performs simulated cross-verification, calculates compliance and risk, and gives procurement officers an explainable decision with an audit trail.

## Run locally (2 commands)

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173). Click **Enter Demo**. No credentials, no API keys, no backend needed.

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
