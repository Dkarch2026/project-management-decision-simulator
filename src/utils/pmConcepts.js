const conceptRules = [
  {
    match: /change request|change-control|change control|baseline/i,
    concepts: ["Change control", "Baseline management", "Constraint impact analysis", "Governance decision making"]
  },
  {
    match: /stakeholder engagement|stakeholder engagement matrix|stakeholder/i,
    concepts: ["Stakeholder analysis", "Engagement planning", "Communication needs", "Decision rights"]
  },
  {
    match: /risk register|risk response|risk/i,
    concepts: ["Risk identification", "Risk ownership", "Response strategy", "Monitoring triggers"]
  },
  {
    match: /communication plan|communication expectations|communication/i,
    concepts: ["Communication planning", "Audience analysis", "Message timing", "Benefits reporting"]
  },
  {
    match: /governance charter|governance/i,
    concepts: ["Governance structure", "Escalation paths", "Acceptance criteria", "Operational ownership"]
  },
  {
    match: /transition|closure|benefits|owner/i,
    concepts: ["Project closure", "Benefits realization", "Operational handoff", "Accountability transfer"]
  },
  {
    match: /procurement|vendor|contract|supplier/i,
    concepts: ["Procurement control", "Vendor accountability", "Contract governance", "Corrective action"]
  },
  {
    match: /quality|acceptance|criteria/i,
    concepts: ["Quality planning", "Acceptance criteria", "Verification", "Fit-for-purpose delivery"]
  }
];

export function conceptsForSuggestedAction(action = "", emphasis = []) {
  const concepts = new Set();

  conceptRules.forEach((rule) => {
    if (rule.match.test(action)) {
      rule.concepts.forEach((concept) => concepts.add(concept));
    }
  });

  emphasis.slice(0, 3).forEach((area) => concepts.add(`${area} management`));

  if (!concepts.size) {
    concepts.add("Tradeoff analysis");
    concepts.add("Decision documentation");
    concepts.add("Monitoring and control");
  }

  return Array.from(concepts).slice(0, 6);
}

export function decisionEffectRubric() {
  return [
    {
      range: "1-3 points",
      label: "Minor effect",
      meaning: "A noticeable but limited effect on one project condition."
    },
    {
      range: "4-6 points",
      label: "Moderate effect",
      meaning: "A meaningful effect that should influence project monitoring or communication."
    },
    {
      range: "7+ points",
      label: "Major effect",
      meaning: "A significant effect that may require governance attention, tradeoff discussion, or risk response."
    },
    {
      range: "Risk metric",
      label: "Inverted",
      meaning: "Higher risk exposure is worse; reducing risk improves project health."
    }
  ];
}

export function referenceAnchors() {
  return [
    {
      label: "PMI PMBOK Guide and Standards",
      url: "https://www.pmi.org/pmbok-guide-standards/foundational/pmbok",
      use: "Reference point for project management principles, domains, tailoring, and value delivery language."
    },
    {
      label: "PMI Process Groups: A Practice Guide",
      url: "https://www.pmi.org/pmbok-guide-standards/practice-guides/process-groups-a-practice-guide",
      use: "Reference point for process-oriented practices such as initiating, planning, executing, monitoring and controlling, and closing."
    },
    {
      label: "PMI: The Essential Role of Communications",
      url: "https://www.pmi.org/learning/thought-leadership/pulse/essential-role-communications",
      use: "Reference point for the importance of clear stakeholder communication in project outcomes."
    },
    {
      label: "PMI Pulse of the Profession 2026: Driving Success in Complex Projects",
      url: "https://www.pmi.org/learning/thought-leadership/driving-success-in-complex-projects",
      use: "Reference point for complexity, stakeholder alignment, systems thinking, and outcome-focused project work."
    }
  ];
}
