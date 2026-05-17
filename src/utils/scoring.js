const positiveMetrics = ["scope", "schedule", "budget", "quality", "morale", "stakeholders", "communications", "procurement"];

export function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function applyEffect(metrics, effect) {
  return Object.fromEntries(
    Object.entries(metrics).map(([key, value]) => [key, clamp(value + (effect[key] || 0))])
  );
}

export function calculateHealth(metrics) {
  const positiveScore = positiveMetrics.reduce((sum, key) => sum + metrics[key], 0) / positiveMetrics.length;
  const riskAdjusted = 100 - metrics.risk;
  return clamp(positiveScore * 0.84 + riskAdjusted * 0.16);
}

export function evaluateKnowledgePerformance(decisions) {
  const groups = {};

  decisions.forEach((decision, index) => {
    const metricImpacts = Object.entries(decision.option.effect).map(([key, value]) => ({
      metric: key,
      raw: value,
      normalized: key === "risk" ? -value : value
    }));
    const delta = metricImpacts.reduce((sum, impact) => sum + impact.normalized, 0);

    if (!groups[decision.knowledgeArea]) {
      groups[decision.knowledgeArea] = { score: 0, count: 0, decisions: [] };
    }

    groups[decision.knowledgeArea].score += delta;
    groups[decision.knowledgeArea].count += 1;
    groups[decision.knowledgeArea].decisions.push({
      roundNumber: index + 1,
      roundTitle: decision.roundTitle,
      optionLabel: decision.option.label,
      delta,
      metricImpacts
    });
  });

  const ranked = Object.entries(groups)
    .map(([area, value]) => ({
      area,
      total: value.score,
      count: value.count,
      average: value.score / value.count,
      decisions: value.decisions
    }))
    .sort((a, b) => b.average - a.average);

  return {
    strongest: ranked[0]?.area || "Not enough data",
    weakest: ranked[ranked.length - 1]?.area || "Not enough data",
    ranked
  };
}
