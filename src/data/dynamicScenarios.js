const knowledgeAreas = [
  "Integration",
  "Scope",
  "Schedule",
  "Cost",
  "Quality",
  "Resource",
  "Communications",
  "Risk",
  "Procurement",
  "Stakeholder"
];

const profiles = {
  "Information technology / software implementation": {
    projectNoun: "Digital Platform Implementation",
    stakeholders: ["Executive sponsor", "Business process owners", "IT security", "Vendor team", "End users"],
    procurement: "implementation partner",
    qualityFocus: "system acceptance and data integrity"
  },
  "Healthcare operations or health technology": {
    projectNoun: "Care Operations Improvement",
    stakeholders: ["Clinical sponsor", "Compliance officer", "Care teams", "Patients", "Technology vendor"],
    procurement: "health technology vendor",
    qualityFocus: "patient safety and workflow reliability"
  },
  "Construction or facilities renovation": {
    projectNoun: "Facilities Modernization",
    stakeholders: ["Sponsor", "Facilities team", "Contractor", "Inspectors", "Affected users"],
    procurement: "general contractor",
    qualityFocus: "code compliance and usable space"
  },
  "Manufacturing or product rollout": {
    projectNoun: "Product Launch Readiness",
    stakeholders: ["Product sponsor", "Engineering", "Quality assurance", "Supply chain", "Sales"],
    procurement: "critical supplier",
    qualityFocus: "release quality and production readiness"
  },
  "Higher education or organizational change": {
    projectNoun: "Organizational Change Initiative",
    stakeholders: ["Executive sponsor", "Faculty or staff leaders", "Students or employees", "Operations team", "Governance committee"],
    procurement: "external support partner",
    qualityFocus: "adoption quality and evidence of outcomes"
  },
  "Nonprofit or public-sector program implementation": {
    projectNoun: "Community Program Implementation",
    stakeholders: ["Public sponsor", "Partner agencies", "Frontline staff", "Community members", "Grant officer"],
    procurement: "service partner",
    qualityFocus: "service consistency and reporting integrity"
  },
  "Event planning or marketing campaign": {
    projectNoun: "Stakeholder Engagement Campaign",
    stakeholders: ["Executive sponsor", "Creative team", "Agency partner", "Sales or outreach team", "Target audience"],
    procurement: "production vendor",
    qualityFocus: "audience experience and message accuracy"
  },
  "Data analytics / AI implementation project": {
    projectNoun: "Analytics Decision Support Implementation",
    stakeholders: ["Business sponsor", "Data science team", "Operational users", "Legal or governance team", "Analytics vendor"],
    procurement: "analytics vendor",
    qualityFocus: "model usefulness, explainability, and adoption"
  }
};

const roundTemplates = [
  {
    phase: "Initiating",
    title: "Stakeholder Alignment Challenge",
    knowledgeArea: "Project Stakeholder Management",
    situation: ({ context, constraint }) =>
      `Early interviews reveal that key stakeholder groups disagree about what success should mean for ${context}. The sponsor wants visible progress, while operational users are concerned about ${constraint.toLowerCase()}.`,
    options: [
      {
        label: "Hold a facilitated alignment workshop before finalizing the charter.",
        effect: { schedule: -4, stakeholders: 8, communications: 6, risk: -5, quality: 3 },
        explanation:
          "This improves shared understanding and reduces stakeholder risk, while slowing early momentum."
      },
      {
        label: "Let the sponsor define success criteria and move into planning.",
        effect: { schedule: 5, stakeholders: -6, communications: -2, risk: 5, scope: 2 },
        explanation:
          "This protects speed and authority clarity, but it may reduce ownership among groups who must adopt the project output."
      },
      {
        label: "Document competing expectations and ask the steering group to prioritize them.",
        effect: { schedule: -2, stakeholders: 4, communications: 5, risk: -3, scope: 3 },
        explanation:
          "This makes tradeoffs visible and supports governance, though it still requires a difficult prioritization decision."
      }
    ]
  },
  {
    phase: "Planning",
    title: "Scope Expansion Request",
    knowledgeArea: "Project Scope Management",
    situation: ({ context }) =>
      `A senior stakeholder asks to add several features to ${context} after the initial scope baseline. The team believes the request is valuable but not required for the first release.`,
    options: [
      {
        label: "Add the request now to improve stakeholder acceptance.",
        effect: { scope: -9, schedule: -6, budget: -5, stakeholders: 6, risk: 5 },
        explanation:
          "This may increase perceived value, but it weakens scope control and introduces schedule and budget pressure."
      },
      {
        label: "Reject the request and protect the approved baseline.",
        effect: { scope: 8, schedule: 4, budget: 4, stakeholders: -5, communications: -2 },
        explanation:
          "This protects the delivery baseline but may require stronger communication to preserve stakeholder trust."
      },
      {
        label: "Use formal change control with impact estimates and release options.",
        effect: { scope: 4, schedule: -2, budget: -1, stakeholders: 5, communications: 6, risk: -3 },
        explanation:
          "This response evaluates the request through transparent tradeoff analysis and governance."
      }
    ]
  },
  {
    phase: "Executing",
    title: "Schedule Recovery Pressure",
    knowledgeArea: "Project Schedule Management",
    situation: ({ context }) =>
      `${context} is trending two weeks behind. The sponsor asks for a recovery plan that keeps the original milestone date intact.`,
    options: [
      {
        label: "Compress the schedule with overtime and parallel workstreams.",
        effect: { schedule: 8, budget: -5, quality: -4, morale: -7, risk: 5 },
        explanation:
          "This improves short-term schedule performance but increases quality risk and resource strain."
      },
      {
        label: "Move a lower-value deliverable to a later release.",
        effect: { scope: -6, schedule: 6, budget: 2, stakeholders: -3, risk: -2 },
        explanation:
          "This protects the milestone by reducing near-term scope, but sponsor satisfaction may decline if expectations are not reset."
      },
      {
        label: "Rebaseline the milestone with evidence and contingency actions.",
        effect: { schedule: -4, communications: 6, stakeholders: 1, risk: -5, morale: 3 },
        explanation:
          "This improves realism and transparency, though it requires the sponsor to accept a visible schedule change."
      }
    ]
  },
  {
    phase: "Executing",
    title: "Quality Concern",
    knowledgeArea: "Project Quality Management",
    situation: ({ profile }) =>
      `Testing and stakeholder review identify concerns about ${profile.qualityFocus}. The team can continue toward the milestone or pause to address the issue more fully.`,
    options: [
      {
        label: "Pause affected work and resolve the quality issue before proceeding.",
        effect: { schedule: -7, budget: -3, quality: 10, risk: -8, stakeholders: 2 },
        explanation:
          "This protects acceptance and reduces downstream risk, but it consumes time and contingency."
      },
      {
        label: "Proceed and track the issue as a post-launch improvement.",
        effect: { schedule: 6, budget: 2, quality: -8, stakeholders: -4, risk: 9 },
        explanation:
          "This protects short-term delivery but allows unresolved quality risk to accumulate."
      },
      {
        label: "Limit rollout to a controlled pilot while the issue is monitored.",
        effect: { scope: -4, schedule: 2, quality: 4, stakeholders: 2, risk: -4 },
        explanation:
          "This balances progress and caution by reducing exposure while more evidence is gathered."
      }
    ]
  },
  {
    phase: "Monitoring and Controlling",
    title: "Vendor or Partner Performance Issue",
    knowledgeArea: "Project Procurement Management",
    situation: ({ profile }) =>
      `The ${profile.procurement} misses a key delivery commitment and offers a workaround. The workaround may preserve timing but leaves accountability and quality questions unresolved.`,
    options: [
      {
        label: "Accept the workaround to preserve near-term momentum.",
        effect: { schedule: 4, budget: 1, quality: -5, procurement: -5, risk: 6 },
        explanation:
          "This reduces immediate delay but may allow procurement and quality risk to remain unresolved."
      },
      {
        label: "Escalate through contract governance and require a corrective plan.",
        effect: { schedule: -3, procurement: 7, communications: 4, risk: -5, stakeholders: 1 },
        explanation:
          "This strengthens accountability and risk control, though it may create short-term friction."
      },
      {
        label: "Shift part of the work internally while preserving vendor accountability.",
        effect: { schedule: 2, budget: -3, morale: -5, procurement: -2, risk: 2 },
        explanation:
          "This may recover some schedule, but it increases internal workload and can blur ownership."
      }
    ]
  },
  {
    phase: "Closing",
    title: "Benefits and Closure Decision",
    knowledgeArea: "Project Integration Management",
    situation: ({ context }) =>
      `${context} is ready for formal closure, but benefits evidence is incomplete. The sponsor wants a confident success narrative for senior leadership.`,
    options: [
      {
        label: "Close the project with output metrics and transfer benefits tracking to operations.",
        effect: { schedule: 5, budget: 3, communications: 3, stakeholders: -2, risk: 2 },
        explanation:
          "This respects project closure boundaries but may leave benefit realization less visible."
      },
      {
        label: "Extend the project to measure early benefits before closure.",
        effect: { schedule: -6, budget: -5, stakeholders: 5, quality: 3, risk: -3 },
        explanation:
          "This gives stronger outcome evidence but extends the project and consumes resources."
      },
      {
        label: "Create a transition charter with owners, measures, and review dates.",
        effect: { schedule: -2, communications: 7, stakeholders: 5, risk: -5, quality: 2 },
        explanation:
          "This links project outputs to operational accountability without fully extending the project."
      }
    ]
  }
];

export const customIndustryOptions = Object.keys(profiles);

export function createDynamicScenario({ industry, projectName, objective, constraint, sponsorExpectation }) {
  const profile = profiles[industry] || profiles[customIndustryOptions[0]];
  const context = projectName || profile.projectNoun;
  const primaryConstraint = constraint || "limited time and stakeholder pressure";
  const sponsor = sponsorExpectation || "The sponsor expects visible progress, disciplined tradeoff management, and a defensible path to benefits.";

  return {
    id: `custom-${Date.now()}`,
    projectName: context,
    industry,
    background: `This custom simulation presents a ${industry.toLowerCase()} project where uncertainty, stakeholder pressure, and ${primaryConstraint.toLowerCase()} shape project decisions.`,
    objective: objective || `Deliver ${context.toLowerCase()} while balancing delivery constraints, stakeholder expectations, and risk exposure.`,
    constraints: [primaryConstraint, "Competing stakeholder priorities", "Limited management reserve", "Uncertain adoption conditions"],
    sponsorExpectations: sponsor,
    stakeholders: profile.stakeholders,
    initialMetrics: { scope: 68, schedule: 66, budget: 67, quality: 66, morale: 64, stakeholders: 62, risk: 52, communications: 60, procurement: 63 },
    primaryKnowledgeAreas: knowledgeAreas,
    rounds: roundTemplates.map((round) => ({
      phase: round.phase,
      title: round.title,
      knowledgeArea: round.knowledgeArea,
      situation: round.situation({ context, constraint: primaryConstraint, profile }),
      reflections: [
        "Which project constraint was most affected by your decision?",
        "What would you monitor next?"
      ],
      options: round.options
    })),
    finalDebrief:
      "This custom scenario emphasizes that project decisions are contextual tradeoffs. The strongest path depends on stakeholder expectations, constraint priorities, risk tolerance, and the evidence available at the decision point.",
    instructorNotes: {
      emphasis: knowledgeAreas,
      tradeoffs:
        "The generated scenario surfaces cross-Knowledge Area tradeoffs and context-dependent project judgment.",
      discussion: [
        "Which decision created the most important second-order consequence?",
        "Where did the project trade short-term performance for long-term control?",
        "Which constraint received the most protection, and which constraint absorbed the most pressure?"
      ],
      assignment:
        "Revise the scenario by adding one additional project risk, one escalation trigger, and one monitoring action."
    }
  };
}
