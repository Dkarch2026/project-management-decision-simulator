import { Printer, RotateCcw } from "lucide-react";
import { calculateHealth, evaluateKnowledgePerformance } from "../utils/scoring.js";
import { decisionPattern } from "../utils/complexity.js";
import TrendDisplay from "./TrendDisplay.jsx";
import InstructorNotes from "./InstructorNotes.jsx";

function formatSigned(value) {
  return `${value > 0 ? "+" : ""}${Math.round(value * 10) / 10}`;
}

function metricImpactText(impact) {
  const sign = impact.raw > 0 ? "+" : "";
  const direction =
    impact.metric === "risk"
      ? impact.raw > 0
        ? "increased risk, lowering the focus-area score"
        : "reduced risk, improving the focus-area score"
      : impact.raw > 0
        ? "improved this metric"
        : "reduced this metric";

  return `${impact.metric} ${sign}${impact.raw}: ${direction}`;
}

function ScoreTile({ label, area, detail }) {
  if (!detail) {
    return (
      <div className="score-tile">
        <span>{label}</span>
        <strong>{area}</strong>
      </div>
    );
  }

  return (
    <details className="score-tile score-tile--explainable">
      <summary>
        <span>{label}</span>
        <strong>{area}</strong>
        <small>Score {formatSigned(detail.average)}</small>
      </summary>
      <div className="score-popover">
        <p>
          This score is the average net impact of decisions tagged to this project management focus area. Positive
          metric changes add points; risk is inverted, so reducing risk adds points and increasing risk subtracts
          points.
        </p>
        <dl>
          <div>
            <dt>Decision count</dt>
            <dd>{detail.count}</dd>
          </div>
          <div>
            <dt>Total net impact</dt>
            <dd>{formatSigned(detail.total)}</dd>
          </div>
        </dl>
        {detail.decisions.map((decision) => (
          <article className="score-evidence" key={`${decision.roundTitle}-${decision.optionLabel}`}>
            <h4>
              Round {decision.roundNumber}: {decision.roundTitle}
            </h4>
            <p>{decision.optionLabel}</p>
            <strong>Net {formatSigned(decision.delta)}</strong>
            <ul>
              {decision.metricImpacts.map((impact) => (
                <li key={`${decision.roundTitle}-${impact.metric}`}>{metricImpactText(impact)}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </details>
  );
}

function buildExportText(scenario, metrics, decisions, reflections, performance, delayedEvents) {
  const patterns = decisionPattern(decisions, metrics, delayedEvents);
  const lines = [
    `Project Management Decision Simulator Debrief`,
    `Project: ${scenario.projectName}`,
    `Industry: ${scenario.industry}`,
    `Final Project Health Score: ${calculateHealth(metrics)}`,
    `Strongest Focus Area Performance: ${performance.strongest}`,
    `Weakest Focus Area Performance: ${performance.weakest}`,
    "",
    "Decision Summary:"
  ];

  decisions.forEach((decision, index) => {
    lines.push(
      `${index + 1}. ${decision.roundTitle} (${decision.knowledgeArea})`,
      `Decision: ${decision.option.label}`,
      `Consequence: ${decision.option.explanation}`,
      `Reflection: ${reflections[index] || "No reflection entered."}`,
      ""
    );
  });

  lines.push("Decision Pattern Analysis:", ...patterns, "");
  if (delayedEvents.length) {
    lines.push("Delayed Consequences:");
    delayedEvents.forEach((event) => {
      lines.push(`- From ${event.source} before ${event.appliesBefore}: ${event.explanation}`);
    });
    lines.push("");
  }
  lines.push(
    "Key Lessons Learned:",
    "In this learning scenario, the decision path illustrates how competing project constraints interact. A defensible response makes tradeoffs explicit, aligns with governance and stakeholder needs, and documents residual risks and ownership. In practice, the appropriate action depends on organizational policy, contract terms, compliance requirements, and decision authority.",
    scenario.finalDebrief
  );
  return lines.join("\n");
}

export default function FinalDebrief({ scenario, metrics, history, decisions, reflections, delayedEvents = [], onReset }) {
  const performance = evaluateKnowledgePerformance(decisions);
  const patterns = decisionPattern(decisions, metrics, delayedEvents);
  const strongestDetail = performance.ranked.find((item) => item.area === performance.strongest);
  const weakestDetail = performance.ranked.find((item) => item.area === performance.weakest);

  function printDebrief() {
    window.print();
  }

  return (
    <main className="debrief-page">
      <section className="debrief-hero">
        <span className="eyebrow">Final Debrief</span>
        <h1>{scenario.projectName}</h1>
        <p>
          In this learning scenario, the decision path illustrates how competing project constraints interact. A
          defensible response makes tradeoffs explicit, aligns with governance and stakeholder needs, and documents
          residual risks and ownership. In practice, the appropriate action depends on organizational policy, contract
          terms, compliance requirements, and decision authority.
        </p>
        <p>{scenario.finalDebrief}</p>
        <div className="debrief-actions">
          <button className="primary-button" onClick={printDebrief}>
            <Printer size={18} aria-hidden="true" /> Print / Save PDF
          </button>
          <button className="secondary-button" onClick={onReset}>
            <RotateCcw size={18} aria-hidden="true" /> Choose Another Scenario
          </button>
        </div>
      </section>

      <section className="debrief-section">
        <div className="score-tile">
          <span>Final Project Health</span>
          <strong>{calculateHealth(metrics)}</strong>
        </div>
        <ScoreTile label="Strongest Focus Area" area={performance.strongest} detail={strongestDetail} />
        <ScoreTile label="Weakest Focus Area" area={performance.weakest} detail={weakestDetail} />
      </section>

      <section className="debrief-section debrief-section--stack">
        <h2>Decision Pattern Analysis</h2>
        <ul>
          {patterns.map((pattern) => (
            <li key={pattern}>{pattern}</li>
          ))}
        </ul>
      </section>

      {delayedEvents.length > 0 && (
        <section className="debrief-section debrief-section--stack">
          <h2>Delayed Consequences</h2>
          {delayedEvents.map((event, index) => (
            <article className="decision-record" key={`${event.source}-${index}`}>
              <h3>
                From {event.source} before {event.appliesBefore}
              </h3>
              <p>{event.explanation}</p>
            </article>
          ))}
        </section>
      )}

      <section className="debrief-section debrief-section--stack">
        <h2>Metrics Trend Summary</h2>
        <TrendDisplay history={history} />
      </section>

      <section className="debrief-section debrief-section--stack">
        <h2>Decision Record</h2>
        {decisions.map((decision, index) => (
          <article className="decision-record" key={`${decision.roundTitle}-${index}`}>
            <h3>
              {index + 1}. {decision.roundTitle}
            </h3>
            <p>
              <strong>{decision.knowledgeArea}:</strong> {decision.option.label}
            </p>
            <p>{decision.option.explanation}</p>
            <blockquote>{reflections[index] || "No reflection entered."}</blockquote>
          </article>
        ))}
      </section>

      <section className="debrief-section debrief-section--stack">
        <h2>Project Management Reflection</h2>
        <ul>
          {scenario.instructorNotes.discussion.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <InstructorNotes notes={scenario.instructorNotes} />
      <footer className="app-footer">
        <p>
          © 2026 Donna M. Karch, PhD, PMP. All rights reserved. | Instructional use only. | Project Management
          Decision Simulator
        </p>
      </footer>
    </main>
  );
}
