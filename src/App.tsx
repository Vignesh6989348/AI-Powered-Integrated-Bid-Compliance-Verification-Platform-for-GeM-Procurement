import { DemoProvider, useDemo } from "./state/DemoContext";
import { ManualProvider, useManual } from "./state/ManualContext";
import Login from "./components/Login";
import Shell from "./components/Shell";
import Manual from "./pages/Manual";
import EvidenceDrawer from "./components/EvidenceDrawer";
import Dashboard from "./pages/Dashboard";
import Tender from "./pages/Tender";
import Wizard from "./pages/Wizard";
import Matrix from "./pages/Matrix";
import RadarPage from "./pages/Radar";
import Verification from "./pages/Verification";
import Risk from "./pages/Risk";
import Remediation from "./pages/Remediation";
import Review from "./pages/Review";
import Audit from "./pages/Audit";
import Decision from "./pages/Decision";
import Report from "./pages/Report";

function Router() {
  const { entered, view, evidenceId } = useDemo();
  const { activeMode } = useManual();
  if (!entered) return <Login />;
  if (activeMode === "manual") return <Manual />;
  return <Shell>
    {view === "dashboard" && <Dashboard />}{view === "tender" && <Tender />}{view === "wizard" && <Wizard />}{view === "matrix" && <Matrix />}{view === "radar" && <RadarPage />}{view === "verification" && <Verification />}{view === "risk" && <Risk />}{view === "remediation" && <Remediation />}{view === "review" && <Review />}{view === "audit" && <Audit />}{view === "decision" && <Decision />}{view === "report" && <Report />}{evidenceId && <EvidenceDrawer />}
  </Shell>;
}

export default function App() { return <ManualProvider><DemoProvider><Router /></DemoProvider></ManualProvider>; }
