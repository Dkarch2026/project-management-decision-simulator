import { scenarios, metricDefinitions, metricLabels } from "./data/scenarios.js";
import { createDynamicScenario, customIndustryOptions } from "./data/dynamicScenarios.js";
import { applyEffect, calculateHealth, evaluateKnowledgePerformance } from "./utils/scoring.js";
import { rationaleForMetric, scoringRubricSummary } from "./utils/scoringRationale.js";
import { conceptsForSuggestedAction, decisionEffectRubric, referenceAnchors } from "./utils/pmConcepts.js";
import {
  affectedKnowledgeAreas,
  delayedConsequenceForDecision,
  decisionPattern,
  emergingConditions,
  summarizeTradeoff
} from "./utils/complexity.js";

const root = document.getElementById("root");

let state = {
  scenario: null,
  roundIndex: 0,
  metrics: null,
  history: [],
  decisions: [],
  reflections: [],
  delayedEvents: [],
  currentReflection: "",
  showDebrief: false,
  openScenarioId: null
};

function html(strings, ...values) {
  return strings.reduce((result, string, index) => result + string + (values[index] ?? ""), "");
}

function escape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tagRow(areas, label = "") {
  return html`
    <div class="knowledge-tag-group">
      ${label ? `<span class="tag-label">${escape(label)}</span>` : ""}
      <div class="tag-row" aria-label="${escape(label || "Project management focus areas")}">
        ${areas.map((area) => `<span class="knowledge-tag">${escape(area)}</span>`).join("")}
      </div>
    </div>
  `;
}

function button(label, className, action, icon = "") {
  return `<button class="${className}" data-action="${action}">${icon}${escape(label)}</button>`;
}

function formatSigned(value) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${rounded}`;
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

function scoreTile(label, area, detail) {
  if (!detail) {
    return `<div class="score-tile"><span>${escape(label)}</span><strong>${escape(area)}</strong></div>`;
  }

  return html`
    <details class="score-tile score-tile--explainable">
      <summary>
        <span>${escape(label)}</span>
        <strong>${escape(area)}</strong>
        <small>Score ${escape(formatSigned(detail.average))}</small>
      </summary>
      <div class="score-popover">
        <p>This score is the average net impact of decisions tagged to this project management focus area. Positive metric changes add points; risk is inverted, so reducing risk adds points and increasing risk subtracts points.</p>
        <dl>
          <div><dt>Decision count</dt><dd>${detail.count}</dd></div>
          <div><dt>Total net impact</dt><dd>${escape(formatSigned(detail.total))}</dd></div>
        </dl>
        ${detail.decisions
          .map(
            (decision) => html`
              <article class="score-evidence">
                <h4>Round ${decision.roundNumber}: ${escape(decision.roundTitle)}</h4>
                <p>${escape(decision.optionLabel)}</p>
                <strong>Net ${escape(formatSigned(decision.delta))}</strong>
                <ul>${decision.metricImpacts.map((impact) => `<li>${escape(metricImpactText(impact))}</li>`).join("")}</ul>
              </article>
            `
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderHome() {
  const industryCount = new Set(scenarios.map((scenario) => scenario.industry)).size;
  root.innerHTML = html`
    <main class="home-page">
      <section class="home-hero">
        <div>
          <h1>Project Management Decision Simulator</h1>
          <p>
            Practice realistic decision making across core project management areas. Each scenario
            presents tradeoffs among scope, schedule, cost, quality, resources, risk, communications, procurement,
            stakeholders, and integration.
          </p>
        </div>
      </section>
      ${renderGlobalSimulatorGuide()}
      <section class="home-workspace" aria-label="Scenario options">
        <div class="starter-section">
          <div class="section-intro">
            <h2>Built Scenario Library</h2>
            <p>Select from ${scenarios.length} already built project scenarios across ${industryCount} applied industries. Expand a scenario to review the case details and begin the simulation.</p>
          </div>
          <section class="scenario-grid" aria-label="Starter scenario selection">
            ${scenarios
              .map(
                (scenario) => {
                  const isOpen = state.openScenarioId === scenario.id;
                  return html`
                  <article class="scenario-card ${isOpen ? "scenario-card--open" : ""}">
                    <button class="scenario-summary" data-action="toggle-scenario" data-id="${scenario.id}" aria-expanded="${isOpen}">
                      <span class="scenario-card__top"><span>${escape(scenario.industry)}</span></span>
                      <span class="scenario-summary__title">${escape(scenario.projectName)}</span>
                      <span class="scenario-summary__objective">${escape(scenario.objective)}</span>
                      <span aria-hidden="true">⌄</span>
                    </button>
                    ${
                      isOpen
                        ? html`
                            <div class="scenario-expanded">
                              <p>${escape(scenario.background)}</p>
                              <dl class="scenario-details">
                                ${scenario.centralTension ? `<div><dt>Core Decision Tension</dt><dd>${escape(scenario.centralTension)}</dd></div>` : ""}
                                <div><dt>Primary Constraints</dt><dd>${escape(scenario.constraints.join(", "))}</dd></div>
                                ${scenario.governanceContext ? `<div><dt>Governance Context</dt><dd>${escape(scenario.governanceContext)}</dd></div>` : ""}
                                <div><dt>Sponsor Expectations</dt><dd>${escape(scenario.sponsorExpectations)}</dd></div>
                                <div><dt>Key Stakeholders</dt><dd>${escape(scenario.stakeholders.join(", "))}</dd></div>
                              </dl>
                          ${tagRow(scenario.primaryKnowledgeAreas, "Project management focus areas emphasized in this scenario")}
                              <button class="primary-button" data-action="start" data-id="${scenario.id}">Start Scenario</button>
                            </div>
                          `
                        : ""
                    }
                  </article>
                `;
                }
              )
              .join("")}
          </section>
        </div>
        <section class="custom-builder">
          <div>
            <span class="eyebrow">Dynamic Scenario Builder</span>
            <h2>Create a Custom Simulation</h2>
            <p>Use the starter scenarios as authored cases, or generate a structured simulation around any project context you want to explore.</p>
          </div>
          <form class="builder-form" data-action="generate">
            <label>
              Industry
              <select name="industry">
                ${customIndustryOptions.map((industry) => `<option>${escape(industry)}</option>`).join("")}
              </select>
            </label>
            <label>
              Project Name
              <input name="projectName" placeholder="Example: Campus Advising Portal Launch" />
            </label>
            <label>
              Project Objective
              <input name="objective" placeholder="What should the project deliver?" />
            </label>
            <label>
              Primary Constraint
              <input name="constraint" placeholder="Example: fixed launch date or limited staffing" />
            </label>
            <label>
              Sponsor Expectation
              <input name="sponsorExpectation" placeholder="What does the sponsor care about most?" />
            </label>
            <button class="primary-button" type="submit">Generate Simulation</button>
          </form>
        </section>
      </section>
      ${renderAppFooter()}
    </main>
  `;
}

function renderAppFooter() {
  return html`
    <footer class="app-footer">
      <p>© 2026 Donna M. Karch, PhD, PMP. All rights reserved. | Instructional use only. | Project Management Decision Simulator</p>
    </footer>
  `;
}

function metricClass(key, value) {
  if (key === "risk") {
    if (value >= 60) return "danger";
    if (value >= 40) return "warning";
    return "strong";
  }
  if (value < 60) return "danger";
  if (value < 80) return "warning";
  return "strong";
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

function buildMetricEvidence(key) {
  const baseline = state.scenario?.initialMetrics[key] ?? 0;
  const decisionImpacts = state.decisions
    .map((decision, index) => ({
      source: `Round ${index + 1}: ${decision.roundTitle}`,
      label: decision.option.label,
      value: decision.option.effect[key] || 0,
      type: "Decision"
    }))
    .filter((item) => item.value !== 0);
  const delayedImpacts = state.delayedEvents
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

function renderMetrics() {
  return html`
    <section class="dashboard-panel" aria-label="Project metrics">
      <div class="overall-health">
        <div>
          <span class="eyebrow">Overall Project Health</span>
          <strong>${calculateHealth(state.metrics)}</strong>
        </div>
        <div class="health-explainer">
          <p>This is a composite indicator of current project condition. It blends scope, schedule, budget, quality, team morale, stakeholder satisfaction, communications, and procurement health with a risk adjustment.</p>
          <p>Risk Exposure is inverted in the calculation: higher risk lowers the overall health score.</p>
          <div class="health-bands" aria-label="Overall health interpretation bands">
            <span><strong>80-100</strong> Strong</span>
            <span><strong>60-79</strong> Watch</span>
            <span><strong>0-59</strong> At Risk</span>
          </div>
        </div>
      </div>
      <div class="metric-grid">
        ${Object.entries(state.metrics)
          .map(([key, value]) => {
            const evidence = buildMetricEvidence(key);
            const netChange = value - evidence.baseline;
            return html`
              <details class="metric-card metric-card--${metricClass(key, value)} metric-card--explainable">
                <summary>
                  <div class="metric-card__header"><span>${metricLabels[key]}</span><strong>${value}</strong></div>
                </summary>
                <div class="metric-bar" role="img" aria-label="${metricLabels[key]} ${value} out of 100">
                  <span style="width:${value}%"></span>
                </div>
                <p>${key === "risk" ? "Risk exposure is inverse: " : ""}${metricDefinitions[key]}</p>
                <div class="metric-explanation">
                  <p>${escape(startingScoreText(key, evidence.baseline))}</p>
                  <p>Current score ${value} = starting score ${evidence.baseline} ${netChange === 0 ? "with no net change" : `${formatSigned(netChange)} net change`}. Current interpretation: ${escape(scoreBandText(key, value))}.</p>
                  ${
                    evidence.impacts.length
                      ? html`
                          <ul>
                            ${evidence.impacts
                              .map(
                                (impact) => html`
                                  <li>
                                    <strong>${escape(impact.type)}</strong>: ${escape(impact.source)} (${escape(formatSigned(impact.value))}). ${escape(metricMovementText(key, impact.value))}
                                    <br />
                                    <span>${escape(impact.label)}</span>
                                  </li>
                                `
                              )
                              .join("")}
                          </ul>
                        `
                      : "<p>No selected decision has changed this metric yet.</p>"
                  }
                </div>
              </details>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderInstructorNotes(notes) {
  const actionConcepts = conceptsForSuggestedAction(notes.assignment, notes.emphasis);

  return html`
    <details class="instructor-notes">
      <summary>Project Management Notes</summary>
      <div class="notes-body">
        <h4>Project Management Focus Areas</h4>
        ${tagRow(notes.emphasis, "Project management focus areas emphasized")}
        <h4>Tradeoff Focus</h4>
        <p>${escape(notes.tradeoffs)}</p>
        <h4>Project Management Reflection</h4>
        <ul>${notes.discussion.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>
        <h4>Suggested Action</h4>
        <p>${escape(notes.assignment)}</p>
        <h4>Concepts Reinforced</h4>
        <div class="concept-row" aria-label="Project management concepts reinforced by the suggested action">
          ${actionConcepts.map((concept) => `<span>${escape(concept)}</span>`).join("")}
        </div>
      </div>
    </details>
  `;
}

function renderGlobalSimulatorGuide() {
  const rubric = decisionEffectRubric();
  const references = referenceAnchors();

  return html`
    <details class="global-guide">
      <summary>Simulator Scoring and Reference Guide</summary>
      <div class="global-guide__body">
        <div class="standards-note">
          <strong>Scoring and Standards Note</strong>
          <p>This simulator is an independent educational tool that uses authored scenarios, illustrative decision logic, and simplified scoring to support project management reflection and discussion. It is not PMI-authored, PMI-endorsed, PMI-derived scoring, or a PMI-validated assessment instrument. References to PMI publications are included only as informational learning anchors. Scenario outcomes are simplified for instruction and do not replace organizational governance, legal, compliance, procurement, or policy review.</p>
        </div>
        <div class="standards-note">
          <strong>How to Read the Choices</strong>
          <p>Each option is a plausible response in a constrained project situation. Learners are practicing defensible project management judgment: making tradeoffs explicit, matching the response to decision authority, documenting residual risk, and identifying who owns follow-up.</p>
        </div>
        <h4>Decision Effect Rubric</h4>
        <div class="rubric-grid">
          ${rubric
            .map(
              (item) => html`
                <div>
                  <strong>${escape(item.range)}</strong>
                  <span>${escape(item.label)}</span>
                  <p>${escape(item.meaning)}</p>
                </div>
              `
            )
            .join("")}
        </div>
        <h4>Reference Anchors</h4>
        <p class="reference-note">These sources provide informational learning anchors for commonly used project management concepts. They do not make the simulator official PMI guidance or a PMI-validated scoring instrument.</p>
        <ul class="reference-list">
          ${references
            .map(
              (source) => html`
                <li>
                  <a href="${escape(source.url)}" target="_blank" rel="noreferrer" data-action="open-reference" data-url="${escape(source.url)}">${escape(source.label)}</a>
                  <span>${escape(source.use)}</span>
                </li>
              `
            )
            .join("")}
        </ul>
        <p class="trademark-note">PMI, PMBOK, and Pulse of the Profession are trademarks or publications of Project Management Institute. Links are provided for reference only; no endorsement is implied.</p>
      </div>
    </details>
  `;
}

function renderSimulation() {
  const scenario = state.scenario;
  const round = scenario.rounds[state.roundIndex];
  const selected = state.decisions[state.roundIndex];
  const conditions = emergingConditions(state.metrics, state.decisions);
  const decisionContext = `Decision context: ${round.phase} checkpoint for ${round.knowledgeArea.replace("Project ", "").replace(" Management", "")}.`;

  root.innerHTML = html`
    <main class="sim-page">
      <header class="sim-header">
        ${button("Scenario Selection", "text-button", "reset")}
        <div>
          <span class="eyebrow">${escape(scenario.industry)}</span>
          <h1>${escape(scenario.projectName)}</h1>
          <p>${escape(scenario.objective)}</p>
        </div>
      </header>
      <div class="sim-layout">
        <aside class="context-panel">
          <h2>Project Context</h2>
          <dl>
            ${scenario.centralTension ? `<dt>Core Decision Tension</dt><dd>${escape(scenario.centralTension)}</dd>` : ""}
            <dt>Primary Constraints</dt><dd>${escape(scenario.constraints.join(", "))}</dd>
            ${scenario.governanceContext ? `<dt>Governance Context</dt><dd>${escape(scenario.governanceContext)}</dd>` : ""}
            <dt>Sponsor Expectations</dt><dd>${escape(scenario.sponsorExpectations)}</dd>
            <dt>Key Stakeholders</dt><dd>${escape(scenario.stakeholders.join(", "))}</dd>
          </dl>
          ${renderInstructorNotes(scenario.instructorNotes)}
        </aside>
        <div class="work-panel">
          ${renderMetrics()}
          <section class="decision-panel">
            <div class="round-meta">
              <span>Round ${state.roundIndex + 1} of ${scenario.rounds.length}</span>
              <span>${escape(round.phase)}</span>
              <span>${escape(round.knowledgeArea)}</span>
            </div>
            <h2>${escape(round.title)}</h2>
            <p class="decision-context">${escape(decisionContext)}</p>
            <p class="situation">${escape(round.situation)}</p>
            ${tagRow(affectedKnowledgeAreas(round.knowledgeArea, round.options[0].effect), "Project management focus areas involved in this decision")}
            ${
              conditions.length
                ? html`
                    <div class="emerging-panel">
                      <h3>Emerging Conditions</h3>
                      <ul>${conditions.map((condition) => `<li>${escape(condition)}</li>`).join("")}</ul>
                    </div>
                  `
                : ""
            }
            <div class="decision-options">
              ${round.options
                .map((choice, index) => {
                  const isSelected = selected?.option.label === choice.label;
                  const tradeoff = summarizeTradeoff(choice, round.knowledgeArea);
                  return html`
                    <button class="decision-card ${isSelected ? "decision-card--selected" : ""}" data-action="decision" data-index="${index}" ${selected ? "disabled" : ""}>
                      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                      <span>
                        <strong>${escape(choice.label)}</strong>
                        <small>Protects ${escape(tradeoff.protects.slice(0, 2).join(", "))}; puts ${escape(tradeoff.putsAtRisk.slice(0, 2).join(", "))} at risk.</small>
                      </span>
                    </button>
                  `;
                })
                .join("")}
            </div>
            ${
              selected
                ? html`
                    <div class="consequence-panel" aria-live="polite">
                      ${(() => {
                        const tradeoff = summarizeTradeoff(selected.option, round.knowledgeArea);
                        return html`
                          <h3>Decision Tradeoff</h3>
                          <dl class="tradeoff-list">
                            <div><dt>Protects</dt><dd>${escape(tradeoff.protects.join(", "))}</dd></div>
                            <div><dt>Puts at Risk</dt><dd>${escape(tradeoff.putsAtRisk.join(", "))}</dd></div>
                            <div><dt>Stakeholder Effect</dt><dd>${escape(tradeoff.stakeholderImpact)}</dd></div>
                            <div><dt>Timing</dt><dd>${escape(tradeoff.timing)}</dd></div>
                          </dl>
                          ${tagRow(affectedKnowledgeAreas(round.knowledgeArea, selected.option.effect), "Project management focus areas affected by the selected option")}
                        `;
                      })()}
                      <h3>Decision Consequence</h3>
                      <p>${escape(selected.option.explanation)}</p>
                      <div class="delta-row">
                        ${Object.entries(selected.option.effect)
                          .map(([metric, value]) => `<span class="${value >= 0 ? "delta-positive" : "delta-negative"}">${metric}: ${value > 0 ? "+" : ""}${value}</span>`)
                          .join("")}
                      </div>
                      <details class="scoring-rationale">
                        <summary>Why these score changes?</summary>
                        <div class="rationale-body">
                          <p>These consequences are predefined instructional assumptions for this option. The app applies the coded effects below; it is not using live AI scoring during the round.</p>
                          <ul class="rationale-rubric">
                            ${scoringRubricSummary().map((item) => `<li>${escape(item)}</li>`).join("")}
                          </ul>
                          <div class="rationale-list">
                            ${Object.entries(selected.option.effect)
                              .map(([metric, value]) => {
                                const rationale = rationaleForMetric(metric, value);
                                return html`
                                  <article class="rationale-item">
                                    <strong>${escape(rationale.label)}</strong>
                                    <span>${escape(rationale.text)}</span>
                                  </article>
                                `;
                              })
                              .join("")}
                          </div>
                        </div>
                      </details>
                    </div>
                  `
                : ""
            }
          </section>
          <section class="reflection-panel">
            <h3>Reflection</h3>
            <div class="reflection-prompts">${round.reflections.map((prompt) => `<p>${escape(prompt)}</p>`).join("")}</div>
            <textarea ${selected ? "" : "disabled"} placeholder="Enter your reflection for this decision. Your notes will appear in the final debrief export.">${escape(state.currentReflection)}</textarea>
          </section>
          <div class="round-actions">
            <button class="primary-button" data-action="next" ${selected ? "" : "disabled"}>
              ${state.roundIndex === scenario.rounds.length - 1 ? "View Final Debrief" : "Continue"}
            </button>
          </div>
        </div>
      </div>
      ${renderAppFooter()}
    </main>
  `;
}

function renderDebrief() {
  const scenario = state.scenario;
  const performance = evaluateKnowledgePerformance(state.decisions);
  const patterns = decisionPattern(state.decisions, state.metrics, state.delayedEvents);
  const start = state.history[0];
  const end = state.history[state.history.length - 1];
  const strongestDetail = performance.ranked.find((item) => item.area === performance.strongest);
  const weakestDetail = performance.ranked.find((item) => item.area === performance.weakest);

  root.innerHTML = html`
    <main class="debrief-page">
      <section class="debrief-hero">
        <div>
          <span class="eyebrow">Final Debrief</span>
          <h1>${escape(scenario.projectName)}</h1>
          <p>In this learning scenario, the decision path illustrates how competing project constraints interact. A defensible response makes tradeoffs explicit, aligns with governance and stakeholder needs, and documents residual risks and ownership. In practice, the appropriate action depends on organizational policy, contract terms, compliance requirements, and decision authority.</p>
          <p>${escape(scenario.finalDebrief)}</p>
        </div>
        <div class="debrief-actions">
          ${button("Print / Save PDF", "primary-button", "print")}
          ${button("Choose Another Scenario", "secondary-button", "reset")}
        </div>
      </section>
      <section class="debrief-section">
        <div class="score-tile"><span>Final Project Health</span><strong>${calculateHealth(state.metrics)}</strong></div>
        ${scoreTile("Strongest Focus Area", performance.strongest, strongestDetail)}
        ${scoreTile("Weakest Focus Area", performance.weakest, weakestDetail)}
      </section>
      <section class="debrief-section debrief-section--stack">
        <h2>Decision Pattern Analysis</h2>
        <ul>${patterns.map((pattern) => `<li>${escape(pattern)}</li>`).join("")}</ul>
      </section>
      ${
        state.delayedEvents.length
          ? html`
              <section class="debrief-section debrief-section--stack">
                <h2>Delayed Consequences</h2>
                ${state.delayedEvents
                  .map(
                    (event) => html`
                      <article class="decision-record">
                        <h3>From ${escape(event.source)} before ${escape(event.appliesBefore)}</h3>
                        <p>${escape(event.explanation)}</p>
                      </article>
                    `
                  )
                  .join("")}
              </section>
            `
          : ""
      }
      <section class="debrief-section debrief-section--stack">
        <h2>Metrics Trend Summary</h2>
        <div class="trend-grid">
          ${Object.keys(end)
            .map((key) => {
              const change = end[key] - start[key];
              const favorable = key === "risk" ? change <= 0 : change >= 0;
              return `<div class="trend-item"><span>${metricLabels[key]}</span><strong class="${favorable ? "trend-good" : "trend-poor"}">${change > 0 ? "+" : ""}${change}</strong></div>`;
            })
            .join("")}
        </div>
      </section>
      <section class="debrief-section debrief-section--stack">
        <h2>Decision Record</h2>
        ${state.decisions
          .map(
            (decision, index) => html`
              <article class="decision-record">
                <h3>${index + 1}. ${escape(decision.roundTitle)}</h3>
                <p><strong>${escape(decision.knowledgeArea)}:</strong> ${escape(decision.option.label)}</p>
                <p>${escape(decision.option.explanation)}</p>
                <blockquote>${escape(state.reflections[index] || "No reflection entered.")}</blockquote>
              </article>
            `
          )
          .join("")}
      </section>
      <section class="debrief-section debrief-section--stack">
        <h2>Project Management Reflection</h2>
        <ul>${scenario.instructorNotes.discussion.map((question) => `<li>${escape(question)}</li>`).join("")}</ul>
      </section>
      ${renderInstructorNotes(scenario.instructorNotes)}
      ${renderAppFooter()}
    </main>
  `;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToDecisionPanel() {
  window.setTimeout(() => {
    document.querySelector(".decision-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 0);
}

function buildExportText() {
  const scenario = state.scenario;
  const performance = evaluateKnowledgePerformance(state.decisions);
  const patterns = decisionPattern(state.decisions, state.metrics, state.delayedEvents);
  const lines = [
    "Project Management Decision Simulator Debrief",
    `Project: ${scenario.projectName}`,
    `Industry: ${scenario.industry}`,
    `Final Project Health Score: ${calculateHealth(state.metrics)}`,
    `Strongest Focus Area Performance: ${performance.strongest}`,
    `Weakest Focus Area Performance: ${performance.weakest}`,
    "",
    "Decision Summary:"
  ];

  state.decisions.forEach((decision, index) => {
    lines.push(
      `${index + 1}. ${decision.roundTitle} (${decision.knowledgeArea})`,
      `Decision: ${decision.option.label}`,
      `Consequence: ${decision.option.explanation}`,
      `Reflection: ${state.reflections[index] || "No reflection entered."}`,
      ""
    );
  });
  lines.push("Decision Pattern Analysis:", ...patterns, "");
  if (state.delayedEvents.length) {
    lines.push("Delayed Consequences:");
    state.delayedEvents.forEach((event) => {
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

function startScenario(id) {
  const scenario = scenarios.find((item) => item.id === id);
  launchScenario(scenario);
}

function launchScenario(scenario) {
  state = {
    scenario,
    roundIndex: 0,
    metrics: scenario.initialMetrics,
    history: [scenario.initialMetrics],
    decisions: [],
    reflections: [],
    delayedEvents: [],
    currentReflection: "",
    showDebrief: false,
    openScenarioId: null
  };
  renderSimulation();
  scrollToTop();
}

function chooseDecision(index) {
  const round = state.scenario.rounds[state.roundIndex];
  const option = round.options[index];
  state.metrics = applyEffect(state.metrics, option.effect);
  state.history = [...state.history, state.metrics];
  state.decisions = [
    ...state.decisions,
    {
      roundTitle: round.title,
      knowledgeArea: round.knowledgeArea,
      option
    }
  ];
  renderSimulation();
}

function nextRound() {
  state.reflections[state.roundIndex] = state.currentReflection.trim();
  state.currentReflection = state.reflections[state.roundIndex + 1] || "";
  if (state.roundIndex === state.scenario.rounds.length - 1) {
    state.showDebrief = true;
    renderDebrief();
  } else {
    const nextRound = state.scenario.rounds[state.roundIndex + 1];
    const delayed = delayedConsequenceForDecision(state.decisions[state.roundIndex], nextRound.title);
    if (delayed) {
      state.metrics = applyEffect(state.metrics, delayed.effect);
      state.history = [...state.history, state.metrics];
      state.delayedEvents = [...state.delayedEvents, delayed];
    }
    state.roundIndex += 1;
    renderSimulation();
  }
}

root.addEventListener("click", async (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;
  const action = control.dataset.action;

  if (action === "start") startScenario(control.dataset.id);
  if (action === "toggle-scenario") {
    state.openScenarioId = state.openScenarioId === control.dataset.id ? null : control.dataset.id;
    renderHome();
  }
  if (action === "reset") {
    state.scenario = null;
    renderHome();
    scrollToTop();
  }
  if (action === "decision") chooseDecision(Number(control.dataset.index));
  if (action === "next") {
    nextRound();
    if (state.showDebrief) {
      scrollToTop();
    } else {
      scrollToDecisionPanel();
    }
  }
  if (action === "print") window.print();
  if (action === "open-reference") {
    event.preventDefault();
    window.open(control.dataset.url, "_blank", "noopener,noreferrer");
  }
  if (action === "copy") await navigator.clipboard.writeText(buildExportText());
});

root.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-action='generate']");
  if (!form) return;
  event.preventDefault();
  const formData = new FormData(form);
  launchScenario(
    createDynamicScenario({
      industry: formData.get("industry"),
      projectName: formData.get("projectName"),
      objective: formData.get("objective"),
      constraint: formData.get("constraint"),
      sponsorExpectation: formData.get("sponsorExpectation")
    })
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
});

root.addEventListener("input", (event) => {
  if (event.target.matches("textarea")) {
    state.currentReflection = event.target.value;
  }
});

renderHome();
