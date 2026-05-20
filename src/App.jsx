import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { scenarios } from "./data/scenarios.js";
import { applyEffect } from "./utils/scoring.js";
import ScenarioCard from "./components/ScenarioCard.jsx";
import MetricDashboard from "./components/MetricDashboard.jsx";
import DecisionRound from "./components/DecisionRound.jsx";
import ReflectionPanel from "./components/ReflectionPanel.jsx";
import InstructorNotes from "./components/InstructorNotes.jsx";
import FinalDebrief from "./components/FinalDebrief.jsx";
import CustomScenarioBuilder from "./components/CustomScenarioBuilder.jsx";
import GlobalSimulatorGuide from "./components/GlobalSimulatorGuide.jsx";
import { delayedConsequenceForDecision, emergingConditions } from "./utils/complexity.js";

function AppFooter() {
  return (
    <footer className="app-footer">
      <p>
        © 2026 Donna M. Karch, PhD, PMP. All rights reserved. | Instructional use only. | Project Management
        Decision Simulator
      </p>
    </footer>
  );
}

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [delayedEvents, setDelayedEvents] = useState([]);
  const [currentReflection, setCurrentReflection] = useState("");
  const [showDebrief, setShowDebrief] = useState(false);

  const selectedDecision = decisions[roundIndex] || null;
  const currentRound = selectedScenario?.rounds[roundIndex];

  function scrollToDecisionPanel() {
    window.setTimeout(() => {
      document.querySelector(".decision-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function startScenario(scenario) {
    setSelectedScenario(scenario);
    setRoundIndex(0);
    setMetrics(scenario.initialMetrics);
    setHistory([scenario.initialMetrics]);
    setDecisions([]);
    setReflections([]);
    setDelayedEvents([]);
    setCurrentReflection("");
    setShowDebrief(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setSelectedScenario(null);
    setShowDebrief(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDecision(option) {
    const updatedMetrics = applyEffect(metrics, option.effect);
    setMetrics(updatedMetrics);
    setHistory((current) => [...current, updatedMetrics]);
    setDecisions((current) => [
      ...current,
      {
        roundTitle: currentRound.title,
        knowledgeArea: currentRound.knowledgeArea,
        option
      }
    ]);
  }

  function handleNext() {
    const nextReflections = [...reflections];
    nextReflections[roundIndex] = currentReflection.trim();
    setReflections(nextReflections);
    setCurrentReflection(nextReflections[roundIndex + 1] || "");

    if (roundIndex === selectedScenario.rounds.length - 1) {
      setShowDebrief(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const nextRound = selectedScenario.rounds[roundIndex + 1];
      const delayed = delayedConsequenceForDecision(selectedDecision, nextRound.title);
      if (delayed) {
        const updatedMetrics = applyEffect(metrics, delayed.effect);
        setMetrics(updatedMetrics);
        setHistory((current) => [...current, updatedMetrics]);
        setDelayedEvents((current) => [...current, delayed]);
      }
      setRoundIndex((current) => current + 1);
      scrollToDecisionPanel();
    }
  }

  const industryCount = useMemo(() => new Set(scenarios.map((scenario) => scenario.industry)).size, []);

  if (!selectedScenario) {
    return (
      <main className="home-page">
        <section className="home-hero">
          <div>
            <h1>Project Management Decision Simulator</h1>
            <p>
              Practice realistic decision making across core project management areas. Each scenario
              presents tradeoffs among scope, schedule, cost, quality, resources, risk, communications, procurement,
              stakeholders, and integration.
            </p>
          </div>
        </section>

        <GlobalSimulatorGuide />

        <section className="home-workspace" aria-label="Scenario options">
          <div className="starter-section">
            <div className="section-intro">
              <h2>Built Scenario Library</h2>
              <p>
                Select from {scenarios.length} already built project scenarios across {industryCount} applied
                industries. Expand a scenario to review the case details and begin the simulation.
              </p>
            </div>
            <section className="scenario-grid" aria-label="Starter scenario selection">
              {scenarios.map((scenario) => (
                <ScenarioCard scenario={scenario} onSelect={startScenario} key={scenario.id} />
              ))}
            </section>
          </div>

          <CustomScenarioBuilder onCreate={startScenario} />
        </section>
        <AppFooter />
      </main>
    );
  }

  if (showDebrief) {
    return (
      <FinalDebrief
        scenario={selectedScenario}
        metrics={metrics}
        history={history}
        decisions={decisions}
        reflections={reflections}
        delayedEvents={delayedEvents}
        onReset={reset}
      />
    );
  }

  return (
    <main className="sim-page">
      <header className="sim-header">
        <button className="text-button" onClick={reset}>
          <ArrowLeft size={18} aria-hidden="true" /> Scenario Selection
        </button>
        <div>
          <span className="eyebrow">{selectedScenario.industry}</span>
          <h1>{selectedScenario.projectName}</h1>
          <p>{selectedScenario.objective}</p>
        </div>
      </header>

      <div className="sim-layout">
        <aside className="context-panel">
          <h2>Project Context</h2>
          <dl>
            {selectedScenario.centralTension && (
              <>
                <dt>Core Decision Tension</dt>
                <dd>{selectedScenario.centralTension}</dd>
              </>
            )}
            <dt>Primary Constraints</dt>
            <dd>{selectedScenario.constraints.join(", ")}</dd>
            {selectedScenario.governanceContext && (
              <>
                <dt>Governance Context</dt>
                <dd>{selectedScenario.governanceContext}</dd>
              </>
            )}
            <dt>Sponsor Expectations</dt>
            <dd>{selectedScenario.sponsorExpectations}</dd>
            <dt>Key Stakeholders</dt>
            <dd>{selectedScenario.stakeholders.join(", ")}</dd>
          </dl>
          <InstructorNotes notes={selectedScenario.instructorNotes} />
        </aside>

        <div className="work-panel">
          <MetricDashboard
            metrics={metrics}
            initialMetrics={selectedScenario.initialMetrics}
            decisions={decisions}
            delayedEvents={delayedEvents}
          />
          <DecisionRound
            round={currentRound}
            roundNumber={roundIndex + 1}
            totalRounds={selectedScenario.rounds.length}
            onDecision={handleDecision}
            selectedDecision={selectedDecision}
            emergingConditions={emergingConditions(metrics, decisions)}
          />
          <ReflectionPanel
            prompts={currentRound.reflections}
            value={currentReflection}
            onChange={setCurrentReflection}
            disabled={!selectedDecision}
          />
          <div className="round-actions">
            <button className="primary-button" onClick={handleNext} disabled={!selectedDecision}>
              {roundIndex === selectedScenario.rounds.length - 1 ? "View Final Debrief" : "Continue"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <AppFooter />
    </main>
  );
}
