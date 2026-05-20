import { AlertTriangle } from "lucide-react";
import { metricDefinitions, metricLabels } from "../data/scenarios.js";
import { calculateHealth } from "../utils/scoring.js";

function statusClass(key, value) {
  if (key === "risk") {
    if (value >= 60) return "danger";
    if (value >= 40) return "warning";
    return "strong";
  }
  if (value < 60) return "danger";
  if (value < 80) return "warning";
  return "strong";
}

function formatSigned(value) {
  return `${value > 0 ? "+" : ""}${value}`;
}

function metricMovementText(key, value) {
  if (key === "risk") {
    return value > 0 ? "Risk exposure increased, which is unfavorable." : "Risk exposure decreased, which is favorable.";
  }

  return value > 0 ? "This improved the metric." : "This reduced the metric.";
}

function startingScoreText(key, baseline) {
  if (key === "risk") {
    return `The starting Risk Exposure score of ${baseline} is an authored scenario baseline. It represents how much unresolved threat exposure exists at the beginning of the case. Unlike the other tiles, lower is better for risk.`;
  }

  return `The starting ${metricLabels[key]} score of ${baseline} is an authored scenario baseline. It represents the case writer's judgment about this part of the project at the moment the simulation begins.`;
}

function scoreBandText(key, value) {
  if (key === "risk") {
    if (value >= 60) return "At risk: high risk exposure";
    if (value >= 40) return "Watch: elevated risk exposure";
    return "Strong: controlled risk exposure";
  }

  if (value >= 80) return "Strong";
  if (value >= 60) return "Watch";
  return "At risk";
}

function buildMetricEvidence(key, initialMetrics = {}, decisions = [], delayedEvents = []) {
  const baseline = initialMetrics[key] ?? 0;
  const decisionImpacts = decisions
    .map((decision, index) => ({
      source: `Round ${index + 1}: ${decision.roundTitle}`,
      label: decision.option.label,
      value: decision.option.effect[key] || 0,
      type: "Decision"
    }))
    .filter((item) => item.value !== 0);
  const delayedImpacts = delayedEvents
    .map((event) => ({
      source: `Delayed consequence from ${event.source}`,
      label: event.explanation,
      value: event.effect[key] || 0,
      type: "Delayed"
    }))
    .filter((item) => item.value !== 0);

  return {
    baseline,
    impacts: [...decisionImpacts, ...delayedImpacts]
  };
}

export default function MetricDashboard({ metrics, initialMetrics, decisions = [], delayedEvents = [] }) {
  const health = calculateHealth(metrics);

  return (
    <section className="dashboard-panel" aria-label="Project metrics">
      <div className="overall-health">
        <div>
          <span className="eyebrow">Overall Project Health</span>
          <strong>{health}</strong>
        </div>
        <div className="health-explainer">
          <p>
            This is a composite indicator of current project condition. It blends scope, schedule, budget, quality,
            team morale, stakeholder satisfaction, communications, and procurement health with a risk adjustment.
          </p>
          <p>
            Risk Exposure is inverted in the calculation: higher risk lowers the overall health score.
          </p>
          <div className="health-bands" aria-label="Overall health interpretation bands">
            <span><strong>80-100</strong> Strong</span>
            <span><strong>60-79</strong> Watch</span>
            <span><strong>0-59</strong> At Risk</span>
          </div>
        </div>
      </div>
      <div className="metric-grid">
        {Object.entries(metrics).map(([key, value]) => {
          const className = statusClass(key, value);
          const evidence = buildMetricEvidence(key, initialMetrics, decisions, delayedEvents);
          const netChange = value - evidence.baseline;
          return (
            <details className={`metric-card metric-card--${className} metric-card--explainable`} key={key}>
              <summary>
                <div className="metric-card__header">
                  <span>{metricLabels[key]}</span>
                  <strong>{value}</strong>
                </div>
              </summary>
              <div className="metric-bar" role="img" aria-label={`${metricLabels[key]} ${value} out of 100`}>
                <span style={{ width: `${value}%` }} />
              </div>
              <p>
                {key === "risk" && <AlertTriangle size={14} aria-hidden="true" />} {metricDefinitions[key]}
              </p>
              <div className="metric-explanation">
                <p>
                  {startingScoreText(key, evidence.baseline)}
                </p>
                <p>
                  Current score {value} = starting score {evidence.baseline}{" "}
                  {netChange === 0 ? "with no net change" : `${formatSigned(netChange)} net change`}. Current
                  interpretation: {scoreBandText(key, value)}.
                </p>
                {evidence.impacts.length > 0 ? (
                  <ul>
                    {evidence.impacts.map((impact) => (
                      <li key={`${impact.source}-${impact.type}-${impact.value}`}>
                        <strong>{impact.type}</strong>: {impact.source} ({formatSigned(impact.value)}).{" "}
                        {metricMovementText(key, impact.value)}
                        <br />
                        <span>{impact.label}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No selected decision has changed this metric yet.</p>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
