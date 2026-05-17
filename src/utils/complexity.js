const metricKnowledgeAreas = {
  scope: "Scope",
  schedule: "Schedule",
  budget: "Cost",
  quality: "Quality",
  morale: "Resource",
  stakeholders: "Stakeholder",
  risk: "Risk",
  communications: "Communications",
  procurement: "Procurement"
};

const stakeholderHints = {
  stakeholders: "affected stakeholder groups",
  morale: "project team and resource managers",
  procurement: "vendors, suppliers, and contract owners",
  quality: "users, customers, compliance reviewers, and quality owners",
  budget: "sponsor, finance, and governance bodies",
  schedule: "sponsor, dependent teams, and delivery partners",
  communications: "sponsor, users, and stakeholder representatives",
  scope: "sponsor, users, and change-control authorities",
  risk: "governance bodies and accountable risk owners"
};

export function affectedKnowledgeAreas(primaryArea, effect) {
  const inferred = Object.keys(effect)
    .map((metric) => metricKnowledgeAreas[metric])
    .filter(Boolean);
  return Array.from(new Set([primaryArea.replace("Project ", "").replace(" Management", ""), ...inferred]));
}

export function summarizeTradeoff(option, primaryArea) {
  const entries = Object.entries(option.effect);
  const protects = entries
    .filter(([metric, value]) => (metric === "risk" ? value < 0 : value > 0))
    .map(([metric]) => metricKnowledgeAreas[metric] || metric);
  const risks = entries
    .filter(([metric, value]) => (metric === "risk" ? value > 0 : value < 0))
    .map(([metric]) => metricKnowledgeAreas[metric] || metric);
  const stakeholderMetric = entries
    .slice()
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .find(([metric]) => stakeholderHints[metric])?.[0];
  const timing =
    option.effect.risk >= 5 || option.effect.quality <= -5 || option.effect.morale <= -5
      ? "Immediate metric movement with likely delayed or conditional consequences in later rounds."
      : option.effect.communications >= 5 || option.effect.risk <= -5
        ? "Immediate effect plus potential delayed benefit if follow-through is sustained."
        : "Primarily immediate effect, with later impact depending on governance and monitoring.";

  return {
    protects: protects.length ? protects : [primaryArea],
    putsAtRisk: risks.length ? risks : ["management reserve or stakeholder confidence"],
    stakeholderImpact: stakeholderMetric
      ? `Most visible to ${stakeholderHints[stakeholderMetric]}.`
      : "Stakeholder impact depends on how the decision is communicated and governed.",
    timing
  };
}

export function delayedConsequenceForDecision(decision, nextRoundTitle) {
  const effect = decision.option.effect;

  if (effect.risk >= 5 || effect.quality <= -7) {
    return {
      source: decision.roundTitle,
      appliesBefore: nextRoundTitle,
      effect: { quality: -2, stakeholders: -2, risk: 3 },
      explanation:
        "A prior decision left unresolved risk or quality uncertainty. That exposure becomes more visible as the next project situation develops."
    };
  }

  if (effect.morale <= -6) {
    return {
      source: decision.roundTitle,
      appliesBefore: nextRoundTitle,
      effect: { morale: -3, schedule: -2, risk: 2 },
      explanation:
        "Earlier resource pressure carries forward. Team capacity and delivery confidence weaken before the next decision point."
    };
  }

  if (effect.communications >= 6 || effect.stakeholders >= 7) {
    return {
      source: decision.roundTitle,
      appliesBefore: nextRoundTitle,
      effect: { stakeholders: 2, communications: 2, risk: -2 },
      explanation:
        "Earlier engagement and communication work creates a delayed benefit. Stakeholders enter the next round with better context and trust."
    };
  }

  if (effect.procurement <= -5) {
    return {
      source: decision.roundTitle,
      appliesBefore: nextRoundTitle,
      effect: { procurement: -3, schedule: -2, risk: 2 },
      explanation:
        "A prior vendor or partner compromise continues to affect delivery confidence and schedule reliability."
    };
  }

  return null;
}

export function emergingConditions(metrics, decisions) {
  const conditions = [];
  const recent = decisions.slice(-2);

  if (metrics.risk >= 65) {
    conditions.push("Risk exposure is now high enough that governance bodies may expect stronger escalation and monitoring.");
  }
  if (metrics.stakeholders <= 50) {
    conditions.push("Stakeholder confidence is weakening, so technically sound decisions may still face adoption or approval resistance.");
  }
  if (metrics.morale <= 50) {
    conditions.push("Resource strain is becoming a project condition, not just a team sentiment issue.");
  }
  if (metrics.procurement <= 50) {
    conditions.push("Vendor or partner performance is fragile and may constrain later schedule, cost, or quality choices.");
  }
  if (recent.filter((decision) => decision.option.effect.schedule > 0 && decision.option.effect.quality < 0).length >= 2) {
    conditions.push("The project has repeatedly protected schedule by accepting quality tradeoffs; later decisions may face acceptance risk.");
  }
  if (recent.filter((decision) => decision.option.effect.scope < 0).length >= 2) {
    conditions.push("Multiple scope reductions are changing stakeholder expectations about what the project will actually deliver.");
  }

  return conditions;
}

export function decisionPattern(decisions, metrics, delayedEvents = []) {
  const totals = decisions.reduce(
    (sum, decision) => {
      Object.entries(decision.option.effect).forEach(([metric, value]) => {
        sum[metric] = (sum[metric] || 0) + value;
      });
      return sum;
    },
    {}
  );

  const patterns = [];

  if ((totals.schedule || 0) > 8 && ((totals.quality || 0) < -4 || (totals.morale || 0) < -4)) {
    patterns.push("Your decisions tended to protect schedule performance while transferring pressure into quality or team capacity.");
  }
  if ((totals.stakeholders || 0) > 8 && ((totals.schedule || 0) < -4 || (totals.budget || 0) < -4)) {
    patterns.push("You invested in stakeholder alignment, which improved support but consumed time or management reserve.");
  }
  if ((totals.risk || 0) < -8) {
    patterns.push("You repeatedly reduced risk exposure, often by slowing decisions, narrowing rollout, or adding governance discipline.");
  }
  if ((totals.scope || 0) < -8) {
    patterns.push("You used scope reduction as a control strategy, improving feasibility while potentially lowering sponsor or user satisfaction.");
  }
  if (metrics.risk >= 65) {
    patterns.push("The final state shows significant residual risk, suggesting unresolved threats were accepted or deferred.");
  }
  if (delayedEvents.length > 0) {
    patterns.push(`${delayedEvents.length} delayed consequence${delayedEvents.length === 1 ? "" : "s"} affected the simulation, showing how earlier choices shaped later conditions.`);
  }

  if (!patterns.length) {
    patterns.push("Your decision pattern was relatively balanced, with no single constraint consistently protected at the expense of the others.");
  }

  return patterns;
}
