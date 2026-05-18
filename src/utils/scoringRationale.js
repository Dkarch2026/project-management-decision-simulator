import { metricLabels } from "../data/scenarios.js";

const metricRationales = {
  scope: {
    positive: "The choice protects or clarifies the approved project boundaries.",
    negative: "The choice expands, reduces, or destabilizes the agreed scope baseline."
  },
  schedule: {
    positive: "The choice helps preserve timing, sequencing, or near-term delivery momentum.",
    negative: "The choice adds work, review, coordination, or delay to the timeline."
  },
  budget: {
    positive: "The choice protects cost reserve or avoids additional unplanned spending.",
    negative: "The choice consumes budget, contingency, or staff/vendor funding."
  },
  quality: {
    positive: "The choice improves acceptance readiness, compliance, usability, or output reliability.",
    negative: "The choice increases the chance of rework, defects, weak acceptance, or lower output quality."
  },
  morale: {
    positive: "The choice makes the workload more sustainable or increases team confidence.",
    negative: "The choice adds resource strain, ambiguity, or burnout pressure."
  },
  stakeholders: {
    positive: "The choice improves trust, buy-in, or perceived legitimacy with important stakeholders.",
    negative: "The choice may reduce stakeholder confidence, support, or willingness to adopt the outcome."
  },
  risk: {
    positive: "The choice increases exposure to threats or uncertainty. Higher risk values are worse.",
    negative: "The choice reduces exposure to threats or uncertainty. Lower risk values are better."
  },
  communications: {
    positive: "The choice improves clarity, visibility, or alignment of project information.",
    negative: "The choice weakens message clarity, transparency, or stakeholder understanding."
  },
  procurement: {
    positive: "The choice strengthens vendor, contract, supplier, or partner performance.",
    negative: "The choice weakens vendor control, contract leverage, supplier reliability, or partner accountability."
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

  return {
    metric,
    label,
    value,
    displayValue,
    band,
    direction,
    text: `${displayValue} is a ${band} ${direction} effect on ${label}. ${rationale}`
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
