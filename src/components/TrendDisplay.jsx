import { metricLabels } from "../data/scenarios.js";

export default function TrendDisplay({ history }) {
  const start = history[0];
  const end = history[history.length - 1];

  return (
    <div className="trend-grid">
      {Object.keys(end).map((key) => {
        const change = end[key] - start[key];
        const favorable = key === "risk" ? change <= 0 : change >= 0;
        return (
          <div className="trend-item" key={key}>
            <span>{metricLabels[key]}</span>
            <strong className={favorable ? "trend-good" : "trend-poor"}>
              {change > 0 ? "+" : ""}
              {change}
            </strong>
          </div>
        );
      })}
    </div>
  );
}
