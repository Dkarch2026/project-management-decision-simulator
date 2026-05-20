import { CheckCircle2 } from "lucide-react";
import KnowledgeTags from "./KnowledgeTags.jsx";
import { affectedKnowledgeAreas, summarizeTradeoff } from "../utils/complexity.js";
import { rationaleForMetric, scoringRubricSummary } from "../utils/scoringRationale.js";

export default function DecisionRound({ round, roundNumber, totalRounds, onDecision, selectedDecision, emergingConditions }) {
  const decisionContext = `Decision context: ${round.phase} checkpoint for ${round.knowledgeArea.replace("Project ", "").replace(" Management", "")}.`;

  return (
    <section className="decision-panel">
      <div className="round-meta">
        <span>Round {roundNumber} of {totalRounds}</span>
        <span>{round.phase}</span>
        <span>{round.knowledgeArea}</span>
      </div>
      <h2>{round.title}</h2>
      <p className="decision-context">{decisionContext}</p>
      <p className="situation">{round.situation}</p>
      <KnowledgeTags
        areas={affectedKnowledgeAreas(round.knowledgeArea, round.options[0].effect)}
        label="Project management focus areas involved in this decision"
      />

      {emergingConditions.length > 0 && (
        <div className="emerging-panel">
          <h3>Emerging Conditions</h3>
          <ul>
            {emergingConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="decision-options">
        {round.options.map((choice, index) => {
          const isSelected = selectedDecision?.option.label === choice.label;
          const tradeoff = summarizeTradeoff(choice, round.knowledgeArea);
          return (
            <button
              className={`decision-card ${isSelected ? "decision-card--selected" : ""}`}
              key={choice.label}
              onClick={() => onDecision(choice)}
              disabled={Boolean(selectedDecision)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span>
                <strong>{choice.label}</strong>
                <small>
                  Protects {tradeoff.protects.slice(0, 2).join(", ")}; puts {tradeoff.putsAtRisk.slice(0, 2).join(", ")} at risk.
                </small>
              </span>
              {isSelected && <CheckCircle2 size={18} aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {selectedDecision && (
        <div className="consequence-panel" aria-live="polite">
          {(() => {
            const tradeoff = summarizeTradeoff(selectedDecision.option, round.knowledgeArea);
            return (
              <>
                <h3>Decision Tradeoff</h3>
                <dl className="tradeoff-list">
                  <div>
                    <dt>Protects</dt>
                    <dd>{tradeoff.protects.join(", ")}</dd>
                  </div>
                  <div>
                    <dt>Puts at Risk</dt>
                    <dd>{tradeoff.putsAtRisk.join(", ")}</dd>
                  </div>
                  <div>
                    <dt>Stakeholder Effect</dt>
                    <dd>{tradeoff.stakeholderImpact}</dd>
                  </div>
                  <div>
                    <dt>Timing</dt>
                    <dd>{tradeoff.timing}</dd>
                  </div>
                </dl>
                <KnowledgeTags
                  areas={affectedKnowledgeAreas(round.knowledgeArea, selectedDecision.option.effect)}
                  label="Project management focus areas affected by the selected option"
                />
              </>
            );
          })()}
          <h3>Decision Consequence</h3>
          <p>{selectedDecision.option.explanation}</p>
          <div className="delta-row">
            {Object.entries(selectedDecision.option.effect).map(([metric, value]) => (
              <span key={metric} className={value >= 0 ? "delta-positive" : "delta-negative"}>
                {metric}: {value > 0 ? "+" : ""}
                {value}
              </span>
            ))}
          </div>
          <details className="scoring-rationale">
            <summary>Why these score changes?</summary>
            <div className="rationale-body">
              <p>
                These consequences are predefined instructional assumptions for this option. The app applies the
                coded effects below; it is not using live AI scoring during the round.
              </p>
              <ul className="rationale-rubric">
                {scoringRubricSummary().map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="rationale-list">
                {Object.entries(selectedDecision.option.effect).map(([metric, value]) => {
                  const rationale = rationaleForMetric(metric, value);
                  return (
                    <article className="rationale-item" key={metric}>
                      <strong>{rationale.label}</strong>
                      <span>{rationale.text}</span>
                    </article>
                  );
                })}
              </div>
            </div>
          </details>
        </div>
      )}
    </section>
  );
}
