import React, { createContext, useContext, useCallback, useMemo, useState } from "react";
import { INITIAL_AUDIT, type AuditEvent } from "../data/demo";

export type ViewKey =
  | "dashboard" | "tender" | "wizard" | "matrix" | "radar"
  | "verification" | "risk" | "remediation" | "review" | "audit" | "decision" | "report";

export type FinalDecision = "PENDING" | "APPROVED" | "CLARIFICATION" | "REJECTED";

interface DemoState {
  entered: boolean;
  setEntered: (v: boolean) => void;
  view: ViewKey;
  setView: (v: ViewKey) => void;
  analysis: "idle" | "running" | "complete";
  setAnalysis: (v: "idle" | "running" | "complete") => void;
  stageIdx: number;
  setStageIdx: (n: number) => void;
  evidenceId: string | null;
  setEvidenceId: (id: string | null) => void;
  compareId: string | null;
  setCompareId: (id: string | null) => void;
  reviewState: Record<string, { decision: string; note: string; time: string }>;
  resolveReview: (id: string, decision: string, note: string) => void;
  requestedDocs: Record<string, boolean>;
  requestDoc: (id: string) => void;
  finalDecision: FinalDecision;
  setFinalDecision: (d: FinalDecision) => void;
  audit: AuditEvent[];
  addAudit: (e: Omit<AuditEvent, "id" | "time"> & { time?: string }) => void;
  resetDemo: () => void;
}

const Ctx = createContext<DemoState | null>(null);

function timestamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

let auditCounter = 100;

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState<ViewKey>("dashboard");
  const [analysis, setAnalysis] = useState<"idle" | "running" | "complete">("complete");
  const [stageIdx, setStageIdx] = useState(7);
  const [evidenceId, setEvidenceId] = useState<string | null>(null);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [reviewState, setReviewState] = useState<Record<string, { decision: string; note: string; time: string }>>({});
  const [requestedDocs, setRequestedDocs] = useState<Record<string, boolean>>({});
  const [finalDecision, setFinalDecisionState] = useState<FinalDecision>("PENDING");
  const [audit, setAudit] = useState<AuditEvent[]>(INITIAL_AUDIT);

  const addAudit = useCallback((e: Omit<AuditEvent, "id" | "time"> & { time?: string }) => {
    auditCounter += 1;
    const ev: AuditEvent = {
      id: `a${auditCounter}`,
      time: e.time ?? timestamp(),
      actor: e.actor,
      actorType: e.actorType,
      action: e.action,
      result: e.result,
      reference: e.reference,
      hash: e.hash ?? `sha256:${Math.random().toString(16).slice(2, 6)}…${Math.random().toString(16).slice(2, 6)}`,
    };
    setAudit((prev) => [...prev, ev]);
  }, []);

  const resolveReview = useCallback((id: string, decision: string, note: string) => {
    const t = timestamp();
    setReviewState((prev) => ({ ...prev, [id]: { decision, note, time: t } }));
  }, []);

  const requestDoc = useCallback((id: string) => {
    setRequestedDocs((prev) => ({ ...prev, [id]: true }));
  }, []);

  const setFinalDecision = useCallback((d: FinalDecision) => {
    setFinalDecisionState(d);
  }, []);

  const resetDemo = useCallback(() => {
    setView("dashboard");
    setAnalysis("idle");
    setStageIdx(0);
    setEvidenceId(null);
    setCompareId(null);
    setReviewState({});
    setRequestedDocs({});
    setFinalDecisionState("PENDING");
    setAudit(INITIAL_AUDIT);
  }, []);

  const value = useMemo(
    () => ({
      entered, setEntered, view, setView, analysis, setAnalysis, stageIdx, setStageIdx,
      evidenceId, setEvidenceId, compareId, setCompareId, reviewState, resolveReview,
      requestedDocs, requestDoc, finalDecision, setFinalDecision, audit, addAudit, resetDemo,
    }),
    [entered, view, analysis, stageIdx, evidenceId, compareId, reviewState, requestedDocs, finalDecision, audit, addAudit, resolveReview, requestDoc, setFinalDecision, resetDemo]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo(): DemoState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDemo outside provider");
  return v;
}
