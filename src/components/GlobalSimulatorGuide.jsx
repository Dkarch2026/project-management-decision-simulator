import { BookOpen } from "lucide-react";
import { decisionEffectRubric, referenceAnchors } from "../utils/pmConcepts.js";

export default function GlobalSimulatorGuide() {
  const rubric = decisionEffectRubric();
  const references = referenceAnchors();

  return (
    <details className="global-guide">
      <summary>
        <BookOpen size={18} aria-hidden="true" />
        Simulator Scoring and Reference Guide
      </summary>
      <div className="global-guide__body">
        <div className="standards-note">
          <strong>Scoring and Standards Note</strong>
          <p>
            This simulator is an independent educational tool that uses authored scenarios, illustrative decision
            logic, and simplified scoring to support project management reflection and discussion. It is not
            PMI-authored, PMI-endorsed, PMI-derived scoring, or a PMI-validated assessment instrument. References to
            PMI publications are included only as informational learning anchors. Scenario outcomes are simplified for
            instruction and do not replace organizational governance, legal, compliance, procurement, or policy review.
          </p>
        </div>
        <div className="standards-note">
          <strong>How to Read the Choices</strong>
          <p>
            Each option is a plausible response in a constrained project situation. Learners are practicing defensible
            project management judgment: making tradeoffs explicit, matching the response to decision authority,
            documenting residual risk, and identifying who owns follow-up.
          </p>
        </div>
        <h4>Decision Effect Rubric</h4>
        <div className="rubric-grid">
          {rubric.map((item) => (
            <div key={item.range}>
              <strong>{item.range}</strong>
              <span>{item.label}</span>
              <p>{item.meaning}</p>
            </div>
          ))}
        </div>
        <h4>Reference Anchors</h4>
        <p className="reference-note">
          These sources provide informational learning anchors for commonly used project management concepts. They do
          not make the simulator official PMI guidance or a PMI-validated scoring instrument.
        </p>
        <ul className="reference-list">
          {references.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(source.url, "_blank", "noopener,noreferrer");
                }}
              >
                {source.label}
              </a>
              <span>{source.use}</span>
            </li>
          ))}
        </ul>
        <p className="trademark-note">
          PMI, PMBOK, and Pulse of the Profession are trademarks or publications of Project Management Institute.
          Links are provided for reference only; no endorsement is implied.
        </p>
      </div>
    </details>
  );
}
