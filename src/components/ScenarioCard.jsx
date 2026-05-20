import { ArrowRight, Building2, ChevronDown } from "lucide-react";
import { useState } from "react";
import KnowledgeTags from "./KnowledgeTags.jsx";

export default function ScenarioCard({ scenario, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`scenario-card ${isOpen ? "scenario-card--open" : ""}`}>
      <button className="scenario-summary" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen}>
        <span className="scenario-card__top">
          <Building2 size={18} aria-hidden="true" />
          <span>{scenario.industry}</span>
        </span>
        <span className="scenario-summary__title">{scenario.projectName}</span>
        <span className="scenario-summary__objective">{scenario.objective}</span>
        <ChevronDown size={20} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="scenario-expanded">
          <p>{scenario.background}</p>
          <dl className="scenario-details">
            {scenario.centralTension && (
              <div>
                <dt>Core Decision Tension</dt>
                <dd>{scenario.centralTension}</dd>
              </div>
            )}
            <div>
              <dt>Primary Constraints</dt>
              <dd>{scenario.constraints.join(", ")}</dd>
            </div>
            {scenario.governanceContext && (
              <div>
                <dt>Governance Context</dt>
                <dd>{scenario.governanceContext}</dd>
              </div>
            )}
            <div>
              <dt>Sponsor Expectations</dt>
              <dd>{scenario.sponsorExpectations}</dd>
            </div>
            <div>
              <dt>Key Stakeholders</dt>
              <dd>{scenario.stakeholders.join(", ")}</dd>
            </div>
          </dl>
          <KnowledgeTags
            areas={scenario.primaryKnowledgeAreas}
            label="Project management focus areas emphasized in this scenario"
          />
          <button className="primary-button" onClick={() => onSelect(scenario)}>
            Start Scenario <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </article>
  );
}
