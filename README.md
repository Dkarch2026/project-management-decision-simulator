# Project Management Decision Simulator

A self-contained React application for project management instruction. Students select or generate an industry scenario, make project decisions across PMI Knowledge Areas, observe metric tradeoffs, write reflections, and copy a final debrief for submission.

## Features

- 8 authored starter scenarios across IT, healthcare, construction, manufacturing, higher education, nonprofit/public sector, event marketing, and AI/data analytics.
- Dynamic scenario builder for creating additional structured simulations from industry, project objective, primary constraint, and sponsor expectations.
- 5 or more decision rounds per scenario.
- Decision consequences across scope, schedule, budget, quality, morale, stakeholder satisfaction, risk exposure, communications, and procurement/vendor health.
- Layered decision rounds with multiple affected PMI Knowledge Areas, explicit tradeoff summaries, stakeholder impact notes, and timing labels.
- Delayed consequences and emerging conditions so earlier choices can influence later rounds.
- Final debrief pattern analysis explaining how decision tendencies shaped the outcome, not only the final score.
- Risk exposure is displayed as an inverse metric where higher values are worse.
- Reflection prompts after every decision.
- Final debrief with decision history, metric trends, strongest and weakest Knowledge Area performance, instructor notes, and copy-to-clipboard export.
- Local state only. No database or authentication required.

## Run Locally

On Windows, the easiest way is to double-click:

```text
START_SIMULATOR.bat
```

Keep the terminal window open while using the simulator.

Or run manually:

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173
```

## Build

```bash
npm run build
```

## Project Structure

```text
src/
  App.jsx
  components/
    DecisionRound.jsx
    FinalDebrief.jsx
    InstructorNotes.jsx
    KnowledgeTags.jsx
    MetricDashboard.jsx
    ReflectionPanel.jsx
    ScenarioCard.jsx
    TrendDisplay.jsx
  data/
    scenarios.js
  utils/
    scoring.js
  styles.css
```

Scenario content is centralized in `src/data/scenarios.js`. Scoring and health calculations are in `src/utils/scoring.js`.
Dynamic scenario templates are in `src/data/dynamicScenarios.js`.
