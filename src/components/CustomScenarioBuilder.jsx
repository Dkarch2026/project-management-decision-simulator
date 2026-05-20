import { useState } from "react";
import { Wand2 } from "lucide-react";
import { createDynamicScenario, customIndustryOptions } from "../data/dynamicScenarios.js";

export default function CustomScenarioBuilder({ onCreate }) {
  const [form, setForm] = useState({
    industry: customIndustryOptions[0],
    projectName: "",
    objective: "",
    constraint: "",
    sponsorExpectation: ""
  });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onCreate(createDynamicScenario(form));
  }

  return (
    <section className="custom-builder">
      <div>
        <span className="eyebrow">Dynamic Scenario Builder</span>
        <h2>Create a Custom Simulation</h2>
        <p>
          Use the starter scenarios as authored cases, or generate a structured simulation around any project context
          you want to explore.
        </p>
      </div>
      <form onSubmit={submit} className="builder-form">
        <label>
          Industry
          <select value={form.industry} onChange={(event) => updateField("industry", event.target.value)}>
            {customIndustryOptions.map((industry) => (
              <option key={industry}>{industry}</option>
            ))}
          </select>
        </label>
        <label>
          Project Name
          <input value={form.projectName} onChange={(event) => updateField("projectName", event.target.value)} placeholder="Example: Campus Advising Portal Launch" />
        </label>
        <label>
          Project Objective
          <input value={form.objective} onChange={(event) => updateField("objective", event.target.value)} placeholder="What should the project deliver?" />
        </label>
        <label>
          Primary Constraint
          <input value={form.constraint} onChange={(event) => updateField("constraint", event.target.value)} placeholder="Example: fixed launch date or limited staffing" />
        </label>
        <label>
          Sponsor Expectation
          <input value={form.sponsorExpectation} onChange={(event) => updateField("sponsorExpectation", event.target.value)} placeholder="What does the sponsor care about most?" />
        </label>
        <button className="primary-button" type="submit">
          <Wand2 size={18} aria-hidden="true" /> Generate Simulation
        </button>
      </form>
    </section>
  );
}
