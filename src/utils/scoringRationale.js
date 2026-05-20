import { metricLabels } from "../data/scenarios.js";

const metricRationales = {
  scope: {
    positive: "Mechanism: scope baseline control. The action clarifies or protects approved deliverables, requirements, or boundaries, so fewer unapproved changes or expectation gaps must be managed.",
    negative: "Mechanism: scope change or scope pressure. The action changes, narrows, or destabilizes approved boundaries, which can reduce delivered value, weaken requirements traceability, or require integrated change control."
  },
  schedule: {
    positive: "Mechanism: milestone and dependency control. The action preserves timing, reduces near-term work, or avoids critical path slippage by controlling sequence or decision delay.",
    negative: "Mechanism: schedule tradeoff. The action adds review, coordination, rework, dependency delay, or readiness work, so the timeline absorbs more work or uncertainty."
  },
  budget: {
    positive: "Mechanism: cost control and reserve protection. The action avoids unplanned spending, limits cost exposure, or preserves contingency and forecast stability.",
    negative: "Mechanism: contingency or funding consumption. The action uses budget, staff capacity, supplier funding, or reserve, leaving less flexibility for later issues."
  },
  quality: {
    positive: "Mechanism: quality planning, assurance, or control. The action improves prevention, acceptance readiness, compliance, usability, defect detection, or output reliability.",
    negative: "Mechanism: weakened quality control. The action increases the chance of rework, defects, weak acceptance, or late issue detection because acceptance criteria or readiness controls are less complete."
  },
  morale: {
    positive: "Mechanism: resource sustainability. The action makes workload, roles, or decision authority more manageable, which protects team capacity and confidence.",
    negative: "Mechanism: resource overcommitment. The action adds workload strain, ambiguity, overtime pressure, or ownership confusion, so team capacity absorbs the tradeoff."
  },
  stakeholders: {
    positive: "Mechanism: stakeholder engagement and legitimacy. The action improves trust, alignment, perceived fairness, or adoption readiness because affected groups see their concerns addressed.",
    negative: "Mechanism: stakeholder resistance. The action may reduce sponsor confidence, user trust, frontline adoption, or stakeholder willingness to support the outcome because expectations or impacts are not fully managed."
  },
  risk: {
    positive: "Mechanism: increased or accepted risk exposure. The action accepts, defers, or leaves a threat without a sufficient response, owner, threshold, or monitoring trigger. Higher risk values are worse.",
    negative: "Mechanism: risk response. The action mitigates, avoids, transfers, escalates, or monitors an important threat, reducing residual exposure through ownership, triggers, or controls."
  },
  communications: {
    positive: "Mechanism: communication planning and transparency. The action improves message clarity, cadence, visibility, escalation, or audience-specific information for decisions.",
    negative: "Mechanism: communication gap. The action weakens transparency, timing, escalation, or shared understanding, so stakeholder expectations may diverge."
  },
  procurement: {
    positive: "Mechanism: supplier performance control. The action strengthens contract governance, acceptance criteria, corrective action, service levels, or vendor accountability.",
    negative: "Mechanism: weakened supplier control. The action reduces contract leverage, supplier reliability, service-level clarity, or partner accountability, leaving more delivery exposure with the project."
  }
};

export function magnitudeBand(value) {
  const absolute = Math.abs(value);
  if (absolute >= 7) return "major";
  if (absolute >= 4) return "moderate";
  return "minor";
}

export function rationaleForMetric(metric, value) {
  const direction = value >= 0 ? "positive" : "negative";
  const band = magnitudeBand(value);
  const label = metricLabels[metric] || metric;
  const rationale = metricRationales[metric]?.[direction] || "The choice changes this project condition.";
  const displayValue = `${value > 0 ? "+" : ""}${value}`;
  const qualifier =
    metric === "risk"
      ? value > 0
        ? "unfavorable increase"
        : "favorable decrease"
      : value >= 0
        ? "favorable increase"
        : "unfavorable decrease";

  return {
    metric,
    label,
    value,
    displayValue,
    band,
    direction,
    text: `${displayValue} is a ${band} ${qualifier} in ${label}. ${rationale}`
  };
}

export function scoringRubricSummary() {
  return [
    "+1 to +3 / -1 to -3 = minor effect",
    "+4 to +6 / -4 to -6 = moderate effect",
    "+7 or more / -7 or less = major effect",
    "Risk is inverted: increasing risk is unfavorable; reducing risk is favorable."
  ];
}
