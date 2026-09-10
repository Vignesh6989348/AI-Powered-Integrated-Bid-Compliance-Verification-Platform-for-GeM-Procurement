/**
 * Deterministic demo analysis engine.
 * Mirrors the production pipeline shape so a real backend can replace it:
 *
 *   ingest → extractRequirements → extractEvidence → mapEvidence →
 *   evaluateRules → simulateRegistryChecks → detectContradictions →
 *   scoreRisk → decide → audit
 *
 * No API keys, no network. Always reproduces the VALVE-042 scenario.
 */
import { REQUIREMENTS, PROCESS_STAGES } from "../data/demo";

export interface EngineCallbacks {
  onStage: (idx: number, label: string) => void;
  onDone: () => void;
}

export function runDemoAnalysis(cb: EngineCallbacks, stepMs = 950): () => void {
  let i = 0;
  cb.onStage(0, PROCESS_STAGES[0]);
  const t = setInterval(() => {
    i += 1;
    if (i >= PROCESS_STAGES.length) {
      clearInterval(t);
      cb.onDone();
    } else {
      cb.onStage(i, PROCESS_STAGES[i]);
    }
  }, stepMs);
  return () => clearInterval(t);
}

/** Pure rule evaluation (mirrors backend rule service). */
export function evaluateRule(requirementId: string): string {
  const r = REQUIREMENTS.find((x) => x.id === requirementId);
  return r ? r.result : "REVIEW";
}

export const ENGINE_VERSION = "demo-engine/1.0.0 · deterministic · VALVE-042";
