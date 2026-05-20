export const metricDefinitions = {
  scope: "Scope stability: how well approved deliverables and boundaries are controlled.",
  schedule: "Schedule health: how likely planned milestones and sequencing can be met.",
  budget: "Budget health: how well cost exposure, contingency, and forecast stability are controlled.",
  quality: "Quality readiness: how well outputs meet standards, acceptance criteria, and use needs.",
  morale: "Resource sustainability: how manageable workload, role clarity, and team capacity are.",
  stakeholders: "Stakeholder support: how much confidence, alignment, and adoption readiness stakeholders show.",
  risk: "Risk exposure: unresolved threat level. Higher values are worse.",
  communications: "Communication effectiveness: how clearly, timely, and transparently project information reaches decision makers and affected groups.",
  procurement: "Procurement/vendor health: how well supplier performance, contract expectations, and external commitments are controlled."
};

export const metricLabels = {
  scope: "Scope Stability",
  schedule: "Schedule Health",
  budget: "Budget Health",
  quality: "Quality Health",
  morale: "Team Morale",
  stakeholders: "Stakeholder Satisfaction",
  risk: "Risk Exposure",
  communications: "Communication Effectiveness",
  procurement: "Procurement/Vendor Health"
};

const commonReflections = [
  "Which project constraint was most affected by your decision?",
  "Which stakeholder group would be most concerned about this decision?",
  "What risk did your decision reduce or increase?",
  "How would you explain this decision to the project sponsor?",
  "What would you monitor next?"
];

const option = (label, effect, explanation) => ({ label, effect, explanation });

export const scenarios = [
  {
    id: "erp-software",
    projectName: "Enterprise CRM Modernization",
    industry: "Information Technology / Software Implementation",
    background:
      "A professional services firm is replacing disconnected sales, client service, and reporting tools with a cloud CRM. Executives want rapid adoption before the next fiscal year, while regional offices worry about losing local workflow flexibility.",
    objective:
      "Deploy a standardized CRM with migrated customer data, role-based dashboards, and trained users across six regions.",
    centralTension:
      "The core decision is how to preserve launch timing and standardization while maintaining readiness, security assurance, and regional adoption.",
    governanceContext:
      "The COO sponsor owns business approval; IT security controls security acceptance; baseline changes should go through the steering committee or change-control process.",
    constraints: ["Nine-month implementation window", "Fixed software subscription budget", "High data quality expectations", "Regional process variation"],
    sponsorExpectations:
      "The COO expects a visible productivity gain in the first quarter after launch and minimal disruption to revenue teams.",
    stakeholders: ["COO sponsor", "Regional managing directors", "Sales operations", "IT security", "Implementation vendor", "End users"],
    initialMetrics: { scope: 72, schedule: 70, budget: 74, quality: 68, morale: 67, stakeholders: 66, risk: 42, communications: 64, procurement: 70 },
    primaryKnowledgeAreas: ["Integration", "Scope", "Schedule", "Quality", "Communications", "Stakeholder", "Risk"],
    rounds: [
      {
        phase: "Initiating",
        title: "Regional Requirements Pressure",
        knowledgeArea: "Project Scope Management",
        situation:
          "Two regions request extensive custom pipeline stages after the baseline requirements workshop. The sponsor wants standardization, but local leaders argue adoption will fail without customization.",
        reflections: [commonReflections[0], commonReflections[1]],
        options: [
          option("Approve all requested customizations to protect regional buy-in.", { scope: -12, schedule: -9, budget: -8, quality: 4, stakeholders: 8, risk: 6, communications: 2 }, "This improves perceived fit and may build local support, but it weakens scope control and increases configuration and testing complexity."),
          option("Reject the requests and enforce the standard global workflow.", { scope: 9, schedule: 6, budget: 5, stakeholders: -10, risk: 5, communications: -4 }, "This protects the baseline and near-term delivery plan, but stakeholder resistance may become an adoption risk."),
          option("Create a change-control review with adoption evidence and impact estimates.", { scope: 4, schedule: -3, budget: -2, quality: 5, stakeholders: 5, risk: -5, communications: 6 }, "This response protects scope boundaries while making tradeoffs visible to decision makers."),
          option("Defer all regional differences to a post-launch enhancement backlog.", { scope: 7, schedule: 5, stakeholders: -4, risk: 2, communications: 2 }, "This supports the launch date but may signal that local workflow concerns are being postponed rather than resolved.")
        ]
      },
      {
        phase: "Planning",
        title: "Data Migration Defect Spike",
        knowledgeArea: "Project Quality Management",
        situation:
          "A trial migration finds duplicate client records and missing account ownership fields. The vendor says the issue is caused by inconsistent legacy data rather than migration tooling.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Add a formal data cleansing sprint before configuration freeze.", { schedule: -8, budget: -5, quality: 12, risk: -10, stakeholders: 4 }, "This improves quality and reduces downstream adoption risk, but it consumes schedule and budget reserve."),
          option("Proceed with migration and fix defects during user acceptance testing.", { schedule: 5, budget: 2, quality: -12, risk: 12, morale: -5 }, "This protects short-term schedule performance but allows quality risk to accumulate in a later phase."),
          option("Ask each region to clean its own records with central quality checks.", { quality: 6, communications: 5, morale: -4, stakeholders: 3, risk: -4, schedule: -3 }, "This distributes ownership and may improve trust in the data, but it adds coordination load to regional teams."),
          option("Narrow the launch dataset to active accounts only.", { scope: -7, schedule: 6, budget: 4, quality: 5, stakeholders: -5, risk: -3 }, "This reduces complexity for launch, but some stakeholders may view it as a scope reduction.")
        ]
      },
      {
        phase: "Executing",
        title: "Vendor Consultant Turnover",
        knowledgeArea: "Project Procurement Management",
        situation:
          "The vendor's lead consultant leaves the project. The replacement is available in three weeks, but the vendor offers two junior consultants immediately.",
        reflections: [commonReflections[2], commonReflections[3]],
        options: [
          option("Accept the junior consultants and add internal oversight.", { schedule: 3, budget: -4, quality: -4, morale: -5, procurement: -3, risk: 4 }, "This protects momentum but shifts quality and coordination risk to the internal team."),
          option("Pause vendor-dependent work until the senior replacement joins.", { schedule: -10, budget: -2, quality: 6, procurement: 4, risk: -5, stakeholders: -3 }, "This preserves expertise and reduces rework risk, but the visible delay may worry the sponsor."),
          option("Escalate contractually and request a certified senior substitute at no added cost.", { budget: 3, procurement: 6, stakeholders: 2, communications: 3, risk: -3, schedule: -4 }, "This uses procurement governance to protect value, though negotiation may still cost time."),
          option("Shift configuration ownership to internal IT for the next month.", { schedule: 1, budget: 4, quality: -3, morale: -10, procurement: -6, risk: 6 }, "This reduces dependency on the vendor but risks overloading internal resources and blurring accountability.")
        ]
      },
      {
        phase: "Executing",
        title: "Security Review Objection",
        knowledgeArea: "Project Risk Management",
        situation:
          "IT security identifies unresolved concerns about external integrations and customer data access. The sponsor asks whether the issue can be handled after go-live.",
        reflections: [commonReflections[2], commonReflections[3]],
        options: [
          option("Require remediation before go-live approval.", { schedule: -8, budget: -3, quality: 8, risk: -13, stakeholders: 2, communications: 3 }, "This reduces a material threat and clarifies governance, but it may put the target launch date under pressure."),
          option("Accept the risk temporarily with sponsor signoff and monitoring.", { schedule: 5, budget: 2, risk: 9, quality: -4, stakeholders: -2 }, "This preserves the launch plan but formalizes elevated exposure that could become reputational or compliance risk."),
          option("Limit initial integrations and phase in the high-risk connections later.", { scope: -6, schedule: 2, budget: 1, quality: 5, risk: -7, stakeholders: -4 }, "This reduces security exposure by narrowing launch scope, but it may disappoint users expecting full workflow connectivity."),
          option("Run an independent security assessment before deciding.", { schedule: -5, budget: -6, risk: -6, communications: 4, stakeholders: 3 }, "This gives the steering committee better evidence, though it consumes contingency.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Training Attendance Falls",
        knowledgeArea: "Project Communications Management",
        situation:
          "Training attendance is below 45 percent. Managers say client work is taking priority, and users are relying on informal peer explanations.",
        reflections: [commonReflections[1], commonReflections[4]],
        options: [
          option("Ask the COO to mandate attendance before system access is granted.", { stakeholders: -2, communications: 5, quality: 5, morale: -5, schedule: -2, risk: -4 }, "This raises participation but may feel compliance-driven rather than adoption-focused."),
          option("Replace long sessions with role-based microlearning and office hours.", { budget: -3, quality: 7, morale: 5, stakeholders: 5, communications: 8, risk: -5 }, "This adapts communication to user constraints and improves adoption readiness, with modest cost impact."),
          option("Proceed with launch and rely on floor support after go-live.", { schedule: 5, budget: 2, quality: -7, morale: -6, stakeholders: -4, risk: 8 }, "This protects the go-live date but increases support burden and user error risk."),
          option("Delay launch until each region reaches 80 percent training completion.", { schedule: -9, quality: 8, stakeholders: 2, morale: 1, risk: -6 }, "This improves readiness but may be hard to justify if the sponsor values fiscal-year timing.")
        ]
      },
      {
        phase: "Closing",
        title: "Benefits Realization Dispute",
        knowledgeArea: "Project Integration Management",
        situation:
          "At launch closeout, the sponsor asks for evidence that the project improved sales productivity. The team can show system adoption, but benefit metrics will take months to mature.",
        reflections: [commonReflections[3], commonReflections[4]],
        options: [
          option("Close the project with adoption metrics and transfer benefits tracking to operations.", { scope: 4, schedule: 4, budget: 3, stakeholders: -2, communications: 3 }, "This respects project closure boundaries but may leave the sponsor wanting stronger outcome evidence."),
          option("Extend the project for a 90-day benefits measurement period.", { schedule: -6, budget: -6, stakeholders: 6, quality: 3, morale: -3 }, "This gives the sponsor more confidence but changes the closure plan and consumes resources."),
          option("Create a benefits owner charter and lessons-learned package before closing.", { communications: 7, stakeholders: 5, integration: 0, risk: -4, schedule: -2 }, "This transfers benefits tracking to accountable operational owners with measures, review timing, and escalation expectations, without requiring the project to remain open until benefits fully mature."),
          option("Report the project as complete and exclude benefits from the final narrative.", { schedule: 5, budget: 2, stakeholders: -8, communications: -5, risk: 4 }, "This supports administrative closure, but it severs the link between deliverable completion and benefits accountability, reducing transparency for sponsor and operations stakeholders.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how standardization, adoption readiness, vendor performance, and risk-based governance must be managed together; decisions that protect schedule or baseline control can create downstream consequences in quality, stakeholder trust, and benefits realization.",
    instructorNotes: {
      emphasis: ["Integration", "Scope", "Quality", "Risk", "Procurement", "Stakeholder"],
      tradeoffs:
        "Protecting schedule can transfer pressure into quality, adoption, vendor performance, and benefits realization.",
      discussion: ["Which project constraint is being protected, and which constraint absorbs the pressure?", "What evidence should be required before approving a baseline change?", "How should accountability continue after project closure?"],
      assignment:
        "Prepare an integrated change request that documents the trigger, affected baselines, alternatives considered, impact analysis across scope, schedule, cost, quality, risk, and stakeholder adoption, decision authority, approval criteria, and post-decision monitoring."
    }
  },
  {
    id: "health-portal",
    projectName: "Regional Health Portal Implementation",
    industry: "Healthcare Technology",
    background:
      "A regional healthcare network is implementing a patient portal across five clinics. The project has strong executive support, but clinical staff are worried about workflow disruption. The vendor has missed two configuration deadlines, and patient privacy concerns are increasing.",
    objective:
      "Launch a secure patient portal for appointment messaging, lab result notifications, and care-team communication while balancing HIPAA-sensitive data handling, clinic workflow readiness, vendor delivery constraints, and stakeholder confidence.",
    centralTension:
      "The core decision is whether to preserve launch timing or delay, phase, or govern the release for risk reduction, workflow readiness, and patient trust.",
    governanceContext:
      "Compliance and clinical leadership are approval authorities for privacy, workflow readiness, and patient-facing communication; vendor commitments should be handled through contract and escalation paths.",
    constraints: ["HIPAA-sensitive data", "Clinic workflow disruption", "Vendor configuration delays", "Public trust"],
    sponsorExpectations:
      "The Chief Medical Officer expects launch before the patient engagement reporting period begins.",
    stakeholders: ["Chief Medical Officer", "Clinic physicians", "Nurses", "Patients", "Compliance officer", "Portal vendor"],
    initialMetrics: { scope: 70, schedule: 64, budget: 72, quality: 69, morale: 62, stakeholders: 61, risk: 50, communications: 60, procurement: 58 },
    primaryKnowledgeAreas: ["Stakeholder", "Communications", "Risk", "Procurement", "Quality", "Integration"],
    rounds: [
      {
        phase: "Planning",
        title: "Clinic Testing Refusal",
        knowledgeArea: "Project Stakeholder Management",
        situation:
          "Two clinics are refusing to participate in user acceptance testing because they feel the system was designed without enough clinical input.",
        reflections: [commonReflections[1], commonReflections[3]],
        options: [
          option("Escalate to the executive sponsor and require participation.", { schedule: 4, stakeholders: -8, morale: -5, communications: -3, risk: 5 }, "This may restart testing quickly, but it can deepen clinical resistance and reduce trust."),
          option("Pause testing and conduct listening sessions with clinical staff.", { schedule: -7, budget: -2, stakeholders: 9, quality: 6, communications: 7, risk: -5 }, "This improves stakeholder engagement and solution fit, while increasing schedule pressure."),
          option("Replace clinic representatives with more cooperative users.", { schedule: 3, stakeholders: -10, quality: -6, risk: 8, morale: -4 }, "This reduces immediate conflict but weakens the validity of acceptance testing."),
          option("Continue testing with only participating clinics.", { schedule: 5, quality: -7, stakeholders: -6, risk: 7, communications: -3 }, "This protects the short-term plan but allows unresolved clinical workflow risk to accumulate.")
        ]
      },
      {
        phase: "Executing",
        title: "Privacy Notice Concern",
        knowledgeArea: "Project Risk Management",
        situation:
          "The compliance officer warns that the portal privacy notice is understandable to lawyers but confusing for patients with limited health literacy.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Revise the notice using patient-friendly language and legal review.", { schedule: -4, budget: -2, quality: 8, stakeholders: 5, risk: -8, communications: 6 }, "This improves patient communication and reduces compliance and reputational risk."),
          option("Use the approved legal notice to avoid delay.", { schedule: 4, budget: 2, quality: -5, stakeholders: -3, risk: 6, communications: -5 }, "This protects timing but may weaken informed consent and patient trust."),
          option("Launch with the legal notice and add a plain-language FAQ later.", { schedule: 3, communications: 2, risk: 3, stakeholders: -1, quality: -2 }, "This partially addresses communication needs, but it leaves the core consent experience weak at launch."),
          option("Pilot the notice with a patient advisory group before final approval.", { schedule: -6, budget: -3, stakeholders: 7, communications: 8, risk: -6, quality: 5 }, "This brings patient voice into risk management but requires schedule flexibility.")
        ]
      },
      {
        phase: "Executing",
        title: "Vendor Interface Delay",
        knowledgeArea: "Project Procurement Management",
        situation:
          "The portal vendor cannot complete the lab results interface by the agreed date. The vendor proposes launching messaging features first.",
        reflections: [commonReflections[0], commonReflections[2]],
        options: [
          option("Accept a phased launch without lab results.", { scope: -8, schedule: 5, budget: 2, quality: 2, stakeholders: -5, procurement: -2, risk: -2 }, "This protects timing by reducing scope, but it may disappoint patients and sponsors expecting full functionality."),
          option("Enforce the contract milestone and delay launch until complete.", { schedule: -9, procurement: 5, quality: 6, stakeholders: 2, risk: -4 }, "This holds the vendor accountable and protects scope, while increasing schedule pressure."),
          option("Negotiate service credits and add temporary manual result posting.", { budget: 1, schedule: -2, quality: -3, morale: -5, procurement: 4, risk: 4 }, "This creates a workaround and preserves leverage, but manual processing introduces quality and workload risk."),
          option("Bring in an integration specialist at project cost.", { budget: -8, schedule: 3, quality: 4, procurement: -1, risk: -5 }, "This may recover the schedule, but the project absorbs cost for a vendor performance issue.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Nurse Workload Spike",
        knowledgeArea: "Project Resource Management",
        situation:
          "During pilot launch, portal messages create more nurse triage work than forecast. Nurses are asking for response-time limits and staffing support.",
        reflections: [commonReflections[0], commonReflections[4]],
        options: [
          option("Add temporary nurse coverage during the first 60 days.", { budget: -7, morale: 8, quality: 6, stakeholders: 4, risk: -5 }, "This supports care quality and staff sustainability, while increasing operating cost."),
          option("Limit message categories until workload patterns are understood.", { scope: -5, schedule: 2, quality: 4, morale: 5, stakeholders: -3, risk: -3 }, "This controls demand and protects resources but narrows the initial patient experience."),
          option("Ask existing staff to absorb the work during stabilization.", { budget: 5, morale: -10, quality: -6, stakeholders: -4, risk: 7 }, "This protects cost but risks burnout, delayed responses, and lower care-team confidence."),
          option("Automate triage routing before expanding the pilot.", { schedule: -5, budget: -5, quality: 7, morale: 5, risk: -6 }, "This addresses root workflow design, but it delays broader rollout.")
        ]
      },
      {
        phase: "Closing",
        title: "Sponsor Requests Public Launch",
        knowledgeArea: "Project Communications Management",
        situation:
          "The sponsor wants a public launch announcement next week. Pilot feedback is mostly positive, but response-time performance is not yet stable.",
        reflections: [commonReflections[3], commonReflections[4]],
        options: [
          option("Proceed with broad announcement and emphasize innovation.", { stakeholders: 5, schedule: 3, risk: 7, quality: -4, communications: 2 }, "This may satisfy sponsor visibility goals but increases reputational risk if service levels slip."),
          option("Recommend a limited announcement focused on pilot learning.", { stakeholders: 2, communications: 6, risk: -4, quality: 3, schedule: 1 }, "This balances transparency and momentum without overpromising maturity."),
          option("Delay public communication until service metrics stabilize.", { stakeholders: -3, quality: 5, risk: -6, communications: 1, schedule: -2 }, "This protects credibility but may frustrate executives seeking visible progress."),
          option("Announce only to enrolled patients and clinic staff.", { stakeholders: 1, communications: 4, scope: -2, risk: -3, quality: 2 }, "This keeps communication close to affected users while limiting public exposure.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how launch timing, privacy risk, vendor accountability, and clinical adoption readiness must be managed together; a schedule-driven decision that ignores trust and workflow readiness can create downstream quality and stakeholder consequences.",
    instructorNotes: {
      emphasis: ["Stakeholder", "Communications", "Risk", "Procurement", "Resource", "Quality"],
      tradeoffs:
        "Executive urgency must be balanced against adoption readiness, workflow impact, trust, and regulated data risk.",
      discussion: ["How should stakeholder concerns be represented in project governance?", "When is a phased launch a stronger control strategy than a full launch?", "What evidence should be required before communicating launch readiness?"],
      assignment:
        "Develop a stakeholder engagement plan that maps influence and concerns, defines communication cadence and channels, assigns owners, and establishes escalation thresholds for unresolved adoption, workflow, or compliance issues."
    }
  },
  {
    id: "library-renovation",
    projectName: "Downtown Library Renovation",
    industry: "Construction / Facilities Renovation",
    background:
      "A city library renovation must update HVAC, accessibility, and learning spaces while keeping some public services available. Community groups want quiet study space preserved, while city leaders want a visible modernization.",
    objective:
      "Renovate the library safely, meet code requirements, and reopen full services before the summer reading season.",
    centralTension:
      "The core decision is how to protect the reopening milestone while treating code, permitting, accessibility, and public access impacts as non-negotiable constraints.",
    governanceContext:
      "Code, permit, accessibility, and public safety requirements are not discretionary; material changes should be routed through city governance, the library sponsor, and the contractor change process.",
    constraints: ["Fixed public bond budget", "Permit and inspection dependencies", "Public access expectations", "Aging building surprises"],
    sponsorExpectations:
      "The city manager expects no major budget overrun and a ribbon cutting before summer programs begin.",
    stakeholders: ["City manager", "Library director", "Patrons", "Facilities contractor", "Historic preservation committee", "Accessibility advocates"],
    initialMetrics: { scope: 73, schedule: 68, budget: 66, quality: 71, morale: 69, stakeholders: 64, risk: 47, communications: 61, procurement: 67 },
    primaryKnowledgeAreas: ["Cost", "Schedule", "Procurement", "Risk", "Stakeholder"],
    rounds: [
      {
        phase: "Planning",
        title: "Historic Mural Discovery",
        knowledgeArea: "Project Integration Management",
        situation:
          "Demolition exposes a historic mural behind old shelving. Preservation advocates ask for restoration, but the renovation scope did not include it.",
        reflections: [commonReflections[0], commonReflections[1]],
        options: [
          option("Add mural restoration to the project scope.", { scope: -8, schedule: -7, budget: -8, stakeholders: 7, quality: 4, risk: -1 }, "This responds to community values but changes scope and cost baselines."),
          option("Protect the mural and defer restoration to a separate project.", { scope: 5, schedule: -2, budget: -2, stakeholders: 3, risk: -3 }, "This preserves the asset while maintaining clearer project boundaries."),
          option("Cover the mural and continue renovation as planned.", { schedule: 5, budget: 4, stakeholders: -9, risk: 5, communications: -4 }, "This protects baseline performance but may create public backlash."),
          option("Request an emergency steering committee decision with options.", { schedule: -3, communications: 6, stakeholders: 4, risk: -4, scope: 2 }, "This makes the integration tradeoff explicit and keeps governance visible.")
        ]
      },
      {
        phase: "Executing",
        title: "HVAC Cost Increase",
        knowledgeArea: "Project Cost Management",
        situation:
          "The contractor reports that code-compliant HVAC work will cost 12 percent more than estimated because duct conditions are worse than expected.",
        reflections: [commonReflections[0], commonReflections[2]],
        options: [
          option("Use contingency funds for the full HVAC correction.", { budget: -8, quality: 8, risk: -7, stakeholders: 2 }, "This protects compliance and building performance, while reducing financial flexibility."),
          option("Reduce furniture and technology upgrades to offset HVAC cost.", { budget: 3, scope: -6, quality: 1, stakeholders: -5, risk: -3 }, "This preserves the total budget but shifts impact to visible user-facing improvements."),
          option("Challenge the estimate and request competitive quotes.", { schedule: -6, procurement: 5, budget: 5, risk: -2, stakeholders: -1 }, "This may improve cost confidence, but procurement review affects schedule."),
          option("Approve only minimum repairs needed for inspection.", { budget: 6, quality: -8, risk: 8, stakeholders: -3 }, "This protects short-term cost but raises lifecycle performance and maintenance risk.")
        ]
      },
      {
        phase: "Executing",
        title: "Noise Complaints",
        knowledgeArea: "Project Communications Management",
        situation:
          "Residents complain about early morning construction noise. The contractor is using early shifts to protect the schedule.",
        reflections: [commonReflections[1], commonReflections[3]],
        options: [
          option("Keep early shifts and have the city manager defend the schedule.", { schedule: 5, stakeholders: -7, communications: -4, risk: 3 }, "This protects construction momentum, but it treats executive sponsorship as a substitute for stakeholder engagement and public impact mitigation."),
          option("Move noisy work later and update the construction sequence.", { schedule: -5, stakeholders: 6, communications: 5, morale: 2 }, "This responds to the community but creates schedule pressure."),
          option("Create a weekly public disruption forecast and hotline.", { budget: -2, communications: 8, stakeholders: 5, risk: -3 }, "This improves transparency and issue handling, but communication alone is not a substitute for schedule or sequencing changes if disruption exceeds acceptable thresholds."),
          option("Offer temporary quiet workspaces at a nearby facility.", { budget: -4, stakeholders: 6, communications: 4, schedule: 1 }, "This mitigates user impact while construction continues.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Accessibility Inspection Risk",
        knowledgeArea: "Project Quality Management",
        situation:
          "An accessibility advocate flags that the planned service desk height may technically pass code but will be difficult for wheelchair users.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Redesign the desk based on universal design feedback.", { schedule: -4, budget: -4, quality: 9, stakeholders: 7, risk: -5 }, "This improves usability and stakeholder trust, with moderate cost and timing impact."),
          option("Keep the code-compliant design to protect baseline scope.", { scope: 4, budget: 3, quality: -5, stakeholders: -7, risk: 4 }, "This protects baseline commitments but may undercut the project's accessibility goals."),
          option("Add an auxiliary accessible station instead of redesigning the desk.", { budget: -2, quality: 4, stakeholders: 2, scope: -2, risk: -2 }, "This addresses access needs partially, though it may feel separate rather than inclusive."),
          option("Ask the inspector for a formal ruling before changing design.", { schedule: -3, communications: 3, risk: -2, stakeholders: 1 }, "This improves decision evidence but does not directly resolve the user experience concern.")
        ]
      },
      {
        phase: "Closing",
        title: "Ribbon Cutting Pressure",
        knowledgeArea: "Project Schedule Management",
        situation:
          "The mayor's office wants the ribbon cutting to happen on the original date, but punch-list work remains in two meeting rooms.",
        reflections: [commonReflections[3], commonReflections[4]],
        options: [
          option("Open the main library and keep meeting rooms closed temporarily.", { schedule: 4, scope: -2, stakeholders: 2, quality: 2, risk: -1 }, "This supports public reopening while being transparent about incomplete areas."),
          option("Rush the punch-list work with overtime.", { schedule: 5, budget: -5, quality: -3, morale: -4, risk: 3 }, "This may meet the ceremonial date but increases cost, fatigue, and rework risk."),
          option("Recommend delaying the ribbon cutting until all spaces pass final review.", { schedule: -6, quality: 7, stakeholders: -2, risk: -5 }, "This protects quality and credibility but disappoints political stakeholders."),
          option("Hold a preview event and schedule the formal opening later.", { communications: 6, stakeholders: 4, schedule: -2, quality: 3 }, "This balances visibility with honest closeout status.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how baseline control, code compliance, cost contingency, public accountability, and construction disruption must be governed together; unresolved discoveries can shift pressure into scope, schedule, cost, and stakeholder trust.",
    instructorNotes: {
      emphasis: ["Cost", "Schedule", "Quality", "Risk", "Stakeholder", "Procurement"],
      tradeoffs:
        "Baseline control must be weighed against compliance, public value, stakeholder confidence, and lifecycle quality.",
      discussion: ["When should new information justify changing the approved baseline?", "What makes a partial delivery acceptable or unacceptable?", "How should contingency be governed when several constraints are under pressure?"],
      assignment:
        "Create a construction change request that documents the discovered condition, requirements or compliance driver, impact on scope, schedule, cost, quality, risk, contingency use, public access mitigation, funding options, and governance approval path."
    }
  },
  {
    id: "product-rollout",
    projectName: "Smart Sensor Product Rollout",
    industry: "Manufacturing / Product Rollout",
    background:
      "A manufacturer is launching a connected industrial sensor for existing customers. Engineering is still refining firmware, procurement is managing chip shortages, and sales has announced an aggressive launch window.",
    objective:
      "Deliver the first production run with reliable firmware, certified components, and sales enablement materials.",
    centralTension:
      "The core decision is how to balance launch timing and margin pressure against certification readiness, supplier reliability, and customer acceptance.",
    governanceContext:
      "Quality certification and customer safety are release gates; supplier issues should be managed through documented performance controls, acceptance criteria, and escalation paths.",
    constraints: ["Component availability", "Quality certification", "Aggressive launch date", "Margin targets"],
    sponsorExpectations:
      "The VP of Product expects first shipments before a major trade show and wants no visible quality issues.",
    stakeholders: ["VP of Product", "Engineering", "Quality assurance", "Supply chain", "Sales", "Pilot customers"],
    initialMetrics: { scope: 69, schedule: 66, budget: 70, quality: 65, morale: 63, stakeholders: 67, risk: 53, communications: 62, procurement: 55 },
    primaryKnowledgeAreas: ["Quality", "Procurement", "Schedule", "Risk", "Stakeholder"],
    rounds: [
      {
        phase: "Planning",
        title: "Feature Freeze Debate",
        knowledgeArea: "Project Scope Management",
        situation:
          "Sales requests one more analytics feature for the trade show demo. Engineering says it will require firmware changes close to certification.",
        reflections: [commonReflections[0], commonReflections[2]],
        options: [
          option("Add the feature to strengthen market appeal.", { scope: -8, schedule: -6, quality: -5, stakeholders: 5, risk: 7 }, "This may improve demo value but introduces late technical and certification risk."),
          option("Freeze scope and offer the feature on the roadmap.", { scope: 8, schedule: 5, quality: 4, stakeholders: -4, risk: -4 }, "This protects execution discipline but may frustrate sales expectations."),
          option("Prototype the feature outside the certified release build.", { budget: -4, scope: 2, stakeholders: 4, risk: -1, communications: 3 }, "This supports market learning without placing the production baseline at the same level of risk."),
          option("Let pilot customers vote on whether the feature is essential.", { schedule: -3, stakeholders: 5, communications: 4, risk: 1 }, "This improves customer evidence, though it can delay a clear scope decision.")
        ]
      },
      {
        phase: "Executing",
        title: "Chip Supplier Allocation",
        knowledgeArea: "Project Procurement Management",
        situation:
          "The preferred chip supplier can only fulfill 60 percent of the first production order. A secondary supplier is available but requires additional validation.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Use the secondary supplier and run accelerated validation.", { schedule: -2, budget: -5, quality: -3, procurement: 5, risk: 2 }, "This improves supply availability but adds validation and quality uncertainty."),
          option("Reduce the first shipment quantity to match preferred supply.", { scope: -5, schedule: 4, quality: 4, stakeholders: -5, risk: -4 }, "This protects product reliability but may disappoint sales and pilot customers."),
          option("Pay a premium for brokered preferred chips.", { budget: -9, schedule: 5, quality: 2, procurement: -3, risk: 3 }, "This supports schedule and consistency at a high cost and with sourcing traceability concerns."),
          option("Delay launch until preferred allocation improves.", { schedule: -9, budget: 2, quality: 5, risk: -6, stakeholders: -6 }, "This reduces supply and quality risk but sacrifices market timing.")
        ]
      },
      {
        phase: "Executing",
        title: "Firmware Defect Trend",
        knowledgeArea: "Project Quality Management",
        situation:
          "Testing shows intermittent connectivity failures in high-temperature conditions. The defect is not frequent, but the device is marketed for industrial use.",
        reflections: [commonReflections[2], commonReflections[3]],
        options: [
          option("Stop release testing and fix the firmware before certification.", { schedule: -8, budget: -4, quality: 10, risk: -10, stakeholders: 1 }, "This protects product integrity and reduces field failure risk, but the schedule impact is significant."),
          option("Document the condition as a known limitation for first release.", { schedule: 5, quality: -9, stakeholders: -6, risk: 11 }, "This preserves timing but conflicts with the product value proposition and may harm trust."),
          option("Limit first release to customers with controlled environments.", { scope: -6, schedule: 2, quality: 5, stakeholders: -3, risk: -5 }, "This narrows exposure while maintaining some market progress."),
          option("Add enhanced monitoring and field replacement contingency.", { budget: -5, quality: 1, stakeholders: 2, risk: -2, communications: 4 }, "This reduces customer impact if defects occur, but it does not eliminate root technical risk.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Sales Enablement Gap",
        knowledgeArea: "Project Communications Management",
        situation:
          "Sales teams are using outdated spec sheets that overstate battery life. Marketing says final collateral is waiting on engineering confirmation.",
        reflections: [commonReflections[1], commonReflections[4]],
        options: [
          option("Issue corrected interim collateral immediately.", { communications: 8, stakeholders: 3, risk: -6, quality: 2, schedule: -1 }, "This improves message control and reduces expectation risk."),
          option("Wait for final collateral to avoid multiple versions.", { communications: -5, stakeholders: -3, risk: 6, schedule: 2 }, "This reduces rework in materials but allows inaccurate claims to continue."),
          option("Hold mandatory sales briefing before any customer demos.", { schedule: -3, communications: 7, stakeholders: 4, risk: -5, morale: -1 }, "This aligns field communication but may slow selling activity."),
          option("Let regional sales leaders adapt messaging locally.", { communications: -3, stakeholders: 2, risk: 5, morale: 2 }, "This offers flexibility but risks inconsistent promises.")
        ]
      },
      {
        phase: "Closing",
        title: "Trade Show Shipment Decision",
        knowledgeArea: "Project Risk Management",
        situation:
          "The team can ship a small batch before the trade show if quality approves a waiver on one noncritical test still in progress.",
        reflections: [commonReflections[2], commonReflections[3]],
        options: [
          option("Approve the waiver and ship the batch.", { schedule: 6, stakeholders: 5, quality: -5, risk: 7, communications: -1 }, "This satisfies market timing but accepts unresolved verification risk."),
          option("Decline shipment until all tests are complete.", { schedule: -6, quality: 8, risk: -7, stakeholders: -4 }, "This protects quality governance while sacrificing a visible market opportunity."),
          option("Ship only demo units with clear noncommercial labeling.", { scope: -3, schedule: 3, stakeholders: 3, risk: -2, quality: 2 }, "This supports the trade show narrative without implying full production readiness."),
          option("Ask pilot customers to sign controlled evaluation agreements.", { stakeholders: 2, communications: 4, risk: -1, schedule: 1, quality: -1 }, "This enables limited use with clearer expectations, but it still requires disciplined follow-up.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how market timing, product quality, supplier constraints, certification readiness, and customer expectations must be controlled together; protecting launch momentum can transfer risk into acceptance, trust, and downstream support.",
    instructorNotes: {
      emphasis: ["Scope", "Quality", "Procurement", "Risk", "Communications"],
      tradeoffs:
        "Late scope pressure and supply choices can affect quality assurance, risk exposure, stakeholder commitments, and trust.",
      discussion: ["When is accepting a quality exception an appropriate project decision?", "How should scope or quantity be adjusted when constraints tighten?", "How should commitments be controlled when uncertainty remains?"],
      assignment:
        "Draft a risk response plan that defines root causes, risk events, potential effects, owners, response strategy, triggers, escalation thresholds, mitigation actions, and communication expectations."
    }
  },
  {
    id: "curriculum-change",
    projectName: "Graduate Curriculum Redesign",
    industry: "Higher Education / Organizational Change",
    background:
      "A college is redesigning a graduate business curriculum to include analytics, ethics, and flexible online delivery. Faculty governance is strong, enrollment pressure is real, and accreditation review is approaching.",
    objective:
      "Approve and implement a redesigned curriculum with faculty support, accreditation alignment, and updated course shells.",
    centralTension:
      "The core decision is how to balance faculty governance, accreditation evidence, student value, and launch timing without weakening adoption or quality readiness.",
    governanceContext:
      "Curriculum approval depends on faculty governance and accreditation expectations; changes should trace to program outcomes, acceptance criteria, and implementation capacity.",
    constraints: ["Faculty governance calendar", "Accreditation evidence", "Instructional design capacity", "Enrollment targets"],
    sponsorExpectations:
      "The dean expects the new curriculum to be marketed for the next admissions cycle.",
    stakeholders: ["Dean", "Faculty committee", "Instructional designers", "Students", "Admissions", "Accreditation liaison"],
    initialMetrics: { scope: 71, schedule: 62, budget: 73, quality: 70, morale: 60, stakeholders: 58, risk: 48, communications: 59, procurement: 76 },
    primaryKnowledgeAreas: ["Stakeholder", "Communications", "Resource", "Schedule", "Quality"],
    rounds: [
      {
        phase: "Initiating",
        title: "Faculty Governance Concern",
        knowledgeArea: "Project Stakeholder Management",
        situation:
          "Several senior faculty argue that the redesign is being driven by market pressure rather than academic quality.",
        reflections: [commonReflections[1], commonReflections[3]],
        options: [
          option("Invite faculty skeptics into the design authority group.", { stakeholders: 8, communications: 5, schedule: -5, quality: 5, risk: -4 }, "This builds legitimacy but may slow decisions."),
          option("Proceed with the existing steering group to maintain pace.", { schedule: 5, stakeholders: -8, risk: 5, morale: -3 }, "This protects speed but may provoke governance resistance."),
          option("Ask the dean to reaffirm the strategic mandate publicly.", { stakeholders: -2, communications: 4, schedule: 2, risk: 2 }, "This clarifies sponsorship but may not address academic concerns."),
          option("Run a short evidence session comparing peer programs.", { schedule: -3, quality: 4, stakeholders: 5, communications: 6, risk: -3 }, "This reframes the debate around evidence and learning outcomes.")
        ]
      },
      {
        phase: "Planning",
        title: "Instructional Design Bottleneck",
        knowledgeArea: "Project Resource Management",
        situation:
          "The instructional design team can support only half of the proposed course updates this term.",
        reflections: [commonReflections[0], commonReflections[4]],
        options: [
          option("Prioritize gateway courses for the first launch.", { scope: -5, schedule: 4, quality: 4, stakeholders: -2, risk: -2 }, "This focuses scarce capacity on courses with high student impact, while reducing initial scope."),
          option("Hire external course developers.", { budget: -8, schedule: 5, quality: -2, procurement: 3, risk: 2 }, "This expands capacity but introduces consistency and vendor oversight challenges."),
          option("Ask faculty to update shells independently.", { budget: 4, morale: -6, quality: -6, stakeholders: -2, risk: 6 }, "This saves money but risks uneven student experience and faculty overload."),
          option("Move the launch one term later.", { schedule: -9, quality: 7, morale: 5, stakeholders: -5, risk: -5 }, "This supports quality and workload sustainability while missing the admissions target.")
        ]
      },
      {
        phase: "Executing",
        title: "Accreditation Mapping Gap",
        knowledgeArea: "Project Quality Management",
        situation:
          "The accreditation liaison finds that several new learning outcomes are not clearly mapped to assessment evidence.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Add an assessment mapping workshop before approval.", { schedule: -5, quality: 8, stakeholders: 3, risk: -7 }, "This strengthens academic quality evidence but delays governance approval."),
          option("Approve curriculum now and complete assessment mapping later.", { schedule: 5, quality: -7, risk: 8, stakeholders: -2 }, "This protects the approval timeline but creates accreditation exposure."),
          option("Reduce the number of new outcomes to match available evidence.", { scope: -5, quality: 3, schedule: 2, stakeholders: -3, risk: -3 }, "This narrows ambition but improves defensibility."),
          option("Assign mapping responsibility to each course lead.", { morale: -4, quality: 2, communications: 3, risk: -2, schedule: -2 }, "This distributes work to content experts but requires strong coordination.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Student Advisory Feedback",
        knowledgeArea: "Project Communications Management",
        situation:
          "Student advisors report that students like the analytics emphasis but worry that fewer electives will reduce personalization.",
        reflections: [commonReflections[1], commonReflections[3]],
        options: [
          option("Restore two electives by reducing required analytics credits.", { scope: -4, stakeholders: 5, quality: -2, schedule: -2 }, "This responds to students but weakens a strategic learning priority."),
          option("Keep requirements and create elective-like project options inside core courses.", { quality: 4, stakeholders: 3, schedule: -3, morale: -2 }, "This preserves curriculum direction while adding design work."),
          option("Communicate the career rationale for the required analytics sequence.", { communications: 6, stakeholders: 2, risk: -1 }, "This may improve acceptance, but communication alone may not satisfy students who value choice."),
          option("Pilot the new structure with one cohort before full rollout.", { schedule: -7, quality: 5, stakeholders: 5, risk: -5 }, "This reduces adoption risk but delays broad implementation.")
        ]
      },
      {
        phase: "Closing",
        title: "Admissions Launch Materials",
        knowledgeArea: "Project Integration Management",
        situation:
          "Admissions needs final curriculum language for recruitment materials, but one committee vote remains pending.",
        reflections: [commonReflections[3], commonReflections[4]],
        options: [
          option("Release materials with a pending-approval note.", { schedule: 4, communications: 3, risk: 3, stakeholders: -1 }, "This supports recruitment timing but requires careful expectation management."),
          option("Wait for final approval before releasing materials.", { schedule: -5, risk: -4, stakeholders: 2, communications: 1 }, "This protects governance integrity but slows admissions work."),
          option("Release high-level themes without course-level claims.", { scope: 2, schedule: 3, communications: 5, risk: -2 }, "This balances marketing needs with approval uncertainty."),
          option("Ask the dean to authorize provisional language.", { schedule: 5, stakeholders: -3, risk: 4, communications: 2 }, "This may move quickly but can be perceived as bypassing governance.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how governance authority, expert capacity, communication, and quality evidence must be balanced; moving too quickly without adoption and acceptance criteria can create downstream approval, readiness, and stakeholder trust risks.",
    instructorNotes: {
      emphasis: ["Stakeholder", "Resource", "Quality", "Communications", "Integration"],
      tradeoffs:
        "Organizational authority, expert capacity, evidence requirements, and stakeholder trust all shape project pace.",
      discussion: ["How should governance risk be managed when approval authority is distributed?", "When is a pilot preferable to full implementation?", "How should quality be defined when success depends on adoption and evidence?"],
      assignment:
        "Prepare a stakeholder engagement matrix that identifies stakeholder groups, influence, interests, concerns, engagement objective, communication cadence, decision rights, owner, and escalation threshold."
    }
  },
  {
    id: "housing-program",
    projectName: "Community Housing Support Program",
    industry: "Nonprofit / Public-Sector Program Implementation",
    background:
      "A nonprofit consortium is launching a housing navigation program funded by a city grant. Partner agencies share the mission but disagree on referral criteria, reporting burden, and client privacy practices.",
    objective:
      "Implement a coordinated housing support program with referral workflows, case tracking, and grant reporting.",
    centralTension:
      "The core decision is whether to prioritize speed, legitimacy, privacy, or consistency in criteria and service delivery under grant constraints.",
    governanceContext:
      "Grant requirements, privacy expectations, and legal or compliance review define the boundaries for eligibility criteria, data sharing, and public reporting.",
    constraints: ["Grant compliance", "Client confidentiality", "Partner agency capacity", "Urgent community need"],
    sponsorExpectations:
      "The city funder expects measurable service volume within the first quarter.",
    stakeholders: ["City grant officer", "Nonprofit executive directors", "Case managers", "Clients", "Data coordinator", "Community advocates"],
    initialMetrics: { scope: 68, schedule: 69, budget: 65, quality: 67, morale: 61, stakeholders: 63, risk: 51, communications: 58, procurement: 72 },
    primaryKnowledgeAreas: ["Stakeholder", "Communications", "Risk", "Cost", "Integration"],
    rounds: [
      {
        phase: "Initiating",
        title: "Referral Criteria Conflict",
        knowledgeArea: "Project Integration Management",
        situation:
          "Partner agencies disagree on whether the program should prioritize families with children, chronically unhoused adults, or first-come referrals.",
        reflections: [commonReflections[1], commonReflections[3]],
        options: [
          option("Adopt the city funder's preferred criteria immediately.", { schedule: 5, stakeholders: -6, risk: 3, communications: -2 }, "This gives fast direction but may reduce partner ownership."),
          option("Facilitate a criteria workshop using mission and grant requirements.", { schedule: -4, communications: 7, stakeholders: 7, risk: -4 }, "This builds stakeholder engagement and traceability, but the criteria still must stay within grant, policy, and governance limits."),
          option("Allow each agency to use its own criteria for the first quarter.", { schedule: 4, scope: -7, quality: -5, risk: 7, stakeholders: 2 }, "This reduces conflict but undermines consistency and reporting validity."),
          option("Pilot two criteria models and compare outcomes.", { schedule: -5, quality: 5, stakeholders: 5, risk: -2, budget: -3 }, "This creates evidence but may be difficult to explain to the funder.")
        ]
      },
      {
        phase: "Planning",
        title: "Data Sharing Agreement Delay",
        knowledgeArea: "Project Risk Management",
        situation:
          "The legal review of data sharing agreements is delayed. Case managers want to begin serving clients using spreadsheets.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Delay shared case tracking until agreements are signed.", { schedule: -6, risk: -8, quality: 4, stakeholders: -3 }, "This protects client privacy but slows coordinated service delivery."),
          option("Use temporary de-identified tracking only.", { schedule: 2, quality: 2, risk: -4, communications: 3, stakeholders: 1 }, "This supports progress while limiting privacy exposure."),
          option("Allow spreadsheets with password protection.", { schedule: 4, budget: 2, risk: 8, quality: -5 }, "This appears practical but creates privacy and data integrity risks."),
          option("Escalate legal review through the city grant officer.", { schedule: -2, communications: 4, stakeholders: -1, risk: -3 }, "This may accelerate resolution but can strain partner autonomy.")
        ]
      },
      {
        phase: "Executing",
        title: "Case Manager Burnout",
        knowledgeArea: "Project Resource Management",
        situation:
          "Referral volume is twice the forecast, and case managers are reporting emotional exhaustion.",
        reflections: [commonReflections[0], commonReflections[4]],
        options: [
          option("Set weekly intake caps until staffing stabilizes.", { scope: -5, morale: 8, quality: 5, stakeholders: -5, risk: -5 }, "This protects staff and service quality but limits near-term volume."),
          option("Use volunteers for initial intake screening.", { budget: 3, schedule: 3, quality: -4, risk: 5, morale: 2 }, "This increases capacity but adds training and confidentiality risk."),
          option("Request grant budget reallocation for temporary staff.", { budget: -4, morale: 7, quality: 5, stakeholders: 2, risk: -4 }, "This addresses root capacity needs but requires funder approval."),
          option("Continue at current pace and revisit after the first reporting period.", { schedule: 4, budget: 3, morale: -10, quality: -7, risk: 8 }, "This maximizes short-term volume but threatens sustainability and service quality.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Grant Reporting Discrepancy",
        knowledgeArea: "Project Cost Management",
        situation:
          "The first monthly report shows service numbers that differ across partner agencies because each counts repeat contacts differently.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Standardize definitions and restate the first report.", { schedule: -3, quality: 7, communications: 5, risk: -6, stakeholders: 1 }, "This improves reporting integrity, though it may require explaining revised numbers."),
          option("Submit the report as-is with footnotes.", { schedule: 4, quality: -5, risk: 6, stakeholders: -2 }, "This meets timing but weakens confidence in program controls."),
          option("Exclude ambiguous contacts from the report.", { quality: 3, stakeholders: -3, risk: -2, communications: 1 }, "This is conservative but may understate service value."),
          option("Ask the city funder to define acceptable counting rules.", { communications: 4, stakeholders: 2, schedule: -2, risk: -3 }, "This improves alignment with sponsor expectations but may reveal internal inconsistency.")
        ]
      },
      {
        phase: "Closing",
        title: "Public Success Story Request",
        knowledgeArea: "Project Stakeholder Management",
        situation:
          "The funder asks for client success stories for a public council meeting. Case managers worry that clients may feel pressured to share personal experiences.",
        reflections: [commonReflections[1], commonReflections[3]],
        options: [
          option("Share anonymized aggregate outcomes instead of personal stories.", { communications: 4, stakeholders: 1, risk: -5, quality: 2 }, "This protects client dignity while still showing program value."),
          option("Ask case managers to identify willing clients quickly.", { schedule: 3, stakeholders: 4, risk: 5, morale: -3 }, "This may satisfy the funder but risks coercive dynamics if not handled carefully."),
          option("Decline the request on ethical grounds.", { risk: -6, stakeholders: -4, communications: -1, morale: 3 }, "This protects clients but may reduce sponsor satisfaction."),
          option("Create a consent-based storytelling protocol for future use.", { schedule: -2, quality: 5, communications: 5, risk: -4 }, "This improves governance, though it may not meet the immediate event need.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how mission urgency, funder expectations, privacy risk, reporting quality, and staff sustainability must be managed together; increasing service volume without controls can create downstream quality, compliance, and resource-capacity consequences.",
    instructorNotes: {
      emphasis: ["Integration", "Risk", "Resource", "Cost", "Stakeholder", "Communications"],
      tradeoffs:
        "Mission urgency does not remove the need for privacy, reporting discipline, resource sustainability, and sponsor alignment.",
      discussion: ["How should a project balance output volume with quality and sustainability?", "What controls are needed when multiple partners contribute to the same deliverable?", "How should sensitive stakeholder information be governed?"],
      assignment:
        "Build a risk register that identifies root cause, risk event, effect, owner, probability, impact, response strategy, residual risk, trigger, review timing, and escalation path."
    }
  },
  {
    id: "product-launch-event",
    projectName: "Global Product Launch Summit",
    industry: "Event Planning / Marketing Campaign",
    background:
      "A technology company is planning a hybrid launch summit for a new enterprise platform. Executive visibility is high, the creative concept keeps expanding, and regional teams need localized campaign assets.",
    objective:
      "Deliver a high-quality hybrid event and coordinated campaign that generates qualified enterprise leads.",
    centralTension:
      "The core decision is how to maintain a fixed launch event while governing executive changes, supplier readiness, audience quality, and benefits evidence.",
    governanceContext:
      "The CMO owns sponsor priorities, but event scope, supplier readiness, and success reporting should be governed through documented decision authority, acceptance criteria, and follow-up ownership.",
    constraints: ["Fixed event date", "Executive availability", "Hybrid production complexity", "Lead quality targets"],
    sponsorExpectations:
      "The Chief Marketing Officer expects a polished event, strong attendance, and credible sales pipeline impact.",
    stakeholders: ["CMO", "Product executives", "Creative agency", "Regional marketing teams", "Sales", "Event platform vendor"],
    initialMetrics: { scope: 66, schedule: 67, budget: 64, quality: 68, morale: 62, stakeholders: 70, risk: 49, communications: 63, procurement: 60 },
    primaryKnowledgeAreas: ["Schedule", "Cost", "Procurement", "Communications", "Stakeholder"],
    rounds: [
      {
        phase: "Planning",
        title: "Executive Keynote Change",
        knowledgeArea: "Project Schedule Management",
        situation:
          "The CEO wants a new keynote storyline three weeks before the event. The creative agency says it will affect rehearsals and video production.",
        reflections: [commonReflections[0], commonReflections[3]],
        options: [
          option("Approve the new storyline and compress production.", { stakeholders: 5, schedule: -8, budget: -5, quality: -4, morale: -5, risk: 6 }, "This satisfies executive direction but increases production and rehearsal risk."),
          option("Keep the approved storyline and offer a short CEO addendum.", { scope: 4, schedule: 4, stakeholders: -3, quality: 3, risk: -2 }, "This protects production stability while giving the CEO some message flexibility."),
          option("Hold an executive decision meeting with cost and schedule impacts.", { communications: 6, stakeholders: 2, schedule: -2, risk: -3 }, "This makes tradeoffs explicit before changing the baseline."),
          option("Move lower-priority breakout content to fund the keynote change.", { scope: -5, budget: 1, stakeholders: 2, quality: -1, schedule: -2 }, "This supports the keynote while reducing other event value.")
        ]
      },
      {
        phase: "Executing",
        title: "Hybrid Platform Instability",
        knowledgeArea: "Project Procurement Management",
        situation:
          "The event platform vendor's rehearsal stream drops twice. The vendor says it was a temporary network issue.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Require a technical remediation plan and second full rehearsal.", { schedule: -3, budget: -2, procurement: 5, quality: 6, risk: -7 }, "This strengthens supplier accountability, acceptance readiness, and contingency planning, which reduces launch failure exposure but consumes time and budget."),
          option("Accept the explanation and continue production.", { schedule: 3, budget: 2, risk: 7, quality: -5, procurement: -3 }, "This protects schedule performance by deferring corrective action, but it weakens quality control and leaves a known risk without a sufficient response."),
          option("Contract a backup streaming provider.", { budget: -7, procurement: 3, risk: -8, quality: 3 }, "This adds resilience at a significant cost."),
          option("Move the highest-value sessions to in-person only.", { scope: -6, risk: -3, stakeholders: -5, quality: 2 }, "This reduces streaming exposure but weakens the hybrid promise.")
        ]
      },
      {
        phase: "Executing",
        title: "Regional Asset Requests",
        knowledgeArea: "Project Communications Management",
        situation:
          "Regional teams request localized emails, landing pages, and social graphics. The central team has capacity for only a subset.",
        reflections: [commonReflections[1], commonReflections[4]],
        options: [
          option("Prioritize localization for highest-revenue regions.", { scope: -3, stakeholders: 1, budget: 2, communications: 2, risk: -1 }, "This allocates capacity based on business impact but may create perceived inequity."),
          option("Build a modular template kit regions can adapt.", { budget: -3, communications: 7, morale: 2, stakeholders: 5, quality: 2 }, "This improves consistency and regional flexibility with moderate setup effort."),
          option("Reject localization to protect brand consistency.", { scope: 5, budget: 3, stakeholders: -7, communications: -3 }, "This protects central control but may reduce campaign relevance."),
          option("Outsource all requested localization to the agency.", { budget: -8, schedule: 2, procurement: 2, quality: 3, stakeholders: 5 }, "This expands capacity at a high cost.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Lead Quality Warning",
        knowledgeArea: "Project Quality Management",
        situation:
          "Registration numbers are strong, but sales says many attendees are students, consultants, or competitors rather than qualified buyers.",
        reflections: [commonReflections[0], commonReflections[4]],
        options: [
          option("Shift paid promotion toward target-account audiences.", { budget: -4, quality: 6, stakeholders: 4, risk: -3 }, "This improves lead quality but adds campaign cost."),
          option("Celebrate attendance volume and address lead quality after the event.", { schedule: 3, budget: 2, quality: -6, stakeholders: -3, risk: 5 }, "This protects current execution but may weaken business outcome credibility."),
          option("Add qualification fields and sales routing before registration closes.", { schedule: -2, communications: 3, quality: 5, risk: -3 }, "This improves lead data while adding friction to registration."),
          option("Invite sales leaders to nominate priority accounts for direct outreach.", { morale: -2, stakeholders: 5, communications: 5, quality: 4 }, "This aligns event execution with sales goals but adds coordination work.")
        ]
      },
      {
        phase: "Closing",
        title: "Post-Event Metrics Narrative",
        knowledgeArea: "Project Integration Management",
        situation:
          "The event looked polished, but pipeline attribution is still uncertain. The CMO wants a success report within 48 hours.",
        reflections: [commonReflections[3], commonReflections[4]],
        options: [
          option("Report attendance and engagement now, with pipeline follow-up later.", { communications: 5, stakeholders: 2, risk: -1, quality: 1 }, "This provides timely evidence while acknowledging benefit measurement lag."),
          option("Claim pipeline impact using early sales estimates.", { stakeholders: 4, communications: -3, risk: 7, quality: -5 }, "This may satisfy executives briefly but risks overstating outcomes."),
          option("Delay the report until sales attribution is validated.", { schedule: -5, quality: 6, risk: -4, stakeholders: -3 }, "This improves accuracy but misses the sponsor's communication window."),
          option("Create a two-stage debrief: event performance now, revenue impact later.", { communications: 7, quality: 4, stakeholders: 4, risk: -3 }, "This sets a credible benefits narrative and clear follow-up accountability.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how executive visibility, production risk, campaign localization, and measurable benefits must be managed together; polished delivery can still leave unresolved questions about outcome ownership and benefits realization.",
    instructorNotes: {
      emphasis: ["Schedule", "Procurement", "Communications", "Quality", "Integration"],
      tradeoffs:
        "Visible delivery quality and measurable benefits are related, but they are not identical success criteria.",
      discussion: ["How should late sponsor requests be governed once execution is underway?", "When does backup planning become necessary rather than optional?", "How should benefits be measured when outcomes mature after project closure?"],
      assignment:
        "Create a closeout and benefits realization plan that separates immediate delivery results from longer-term outcome measures, identifies acceptance criteria, assigns owners, defines follow-up review dates, and documents how unresolved benefits will transfer to operations."
    }
  },
  {
    id: "ai-analytics",
    projectName: "AI Demand Forecasting Implementation",
    industry: "Data Analytics / AI Implementation",
    background:
      "A retail company is implementing an AI forecasting model to improve inventory decisions. Data scientists are optimistic, store leaders distrust black-box predictions, and legal is reviewing responsible AI obligations.",
    objective:
      "Deploy an explainable demand forecasting capability integrated into planning workflows across three product categories.",
    centralTension:
      "The core decision is how to balance model performance, explainability, stakeholder adoption, and operational ownership before scaling the capability.",
    governanceContext:
      "Legal, operations, analytics, and the sponsor share decision authority for responsible AI requirements, acceptance criteria, model monitoring, and transition to operations.",
    constraints: ["Model accuracy uncertainty", "Data quality variation", "Responsible AI expectations", "Planner adoption"],
    sponsorExpectations:
      "The Chief Supply Chain Officer expects inventory reduction without worsening stockouts.",
    stakeholders: ["Chief Supply Chain Officer", "Data science team", "Merchandise planners", "Store operations", "Legal/privacy", "Analytics vendor"],
    initialMetrics: { scope: 67, schedule: 65, budget: 68, quality: 63, morale: 66, stakeholders: 58, risk: 56, communications: 57, procurement: 62 },
    primaryKnowledgeAreas: ["Risk", "Quality", "Stakeholder", "Integration", "Procurement"],
    rounds: [
      {
        phase: "Initiating",
        title: "Accuracy Target Ambiguity",
        knowledgeArea: "Project Quality Management",
        situation:
          "The sponsor says the model must be 'better than planners,' but no one has defined acceptable accuracy, bias, or business impact measures.",
        reflections: [commonReflections[0], commonReflections[4]],
        options: [
          option("Define acceptance criteria for accuracy, bias checks, and business KPIs.", { schedule: -4, quality: 9, stakeholders: 4, risk: -8, communications: 5 }, "This creates a defensible quality baseline but delays modeling work."),
          option("Let data science set technical accuracy targets.", { schedule: 3, quality: -2, stakeholders: -5, risk: 5 }, "This speeds technical work but may miss operational and ethical success criteria."),
          option("Use inventory cost reduction as the only success metric.", { communications: 2, stakeholders: 1, quality: -5, risk: 6 }, "This aligns to business value but ignores model reliability and unintended effects."),
          option("Run a benchmark against current planner forecasts first.", { schedule: -3, quality: 5, risk: -4, stakeholders: 3 }, "This grounds expectations in evidence, though it takes setup time.")
        ]
      },
      {
        phase: "Planning",
        title: "Vendor Model Transparency",
        knowledgeArea: "Project Procurement Management",
        situation:
          "The analytics vendor offers a higher-performing proprietary model but cannot fully explain feature weighting. Legal prefers explainability.",
        reflections: [commonReflections[2], commonReflections[3]],
        options: [
          option("Choose the proprietary model for higher forecast accuracy.", { quality: 3, stakeholders: -4, procurement: 2, risk: 8, communications: -3 }, "This may improve technical performance but increases explainability and governance risk."),
          option("Require an explainable model even if accuracy is slightly lower.", { quality: 1, stakeholders: 5, risk: -7, procurement: -2, communications: 4 }, "This supports responsible AI and planner trust, with potential performance tradeoff."),
          option("Pilot both models and compare accuracy, explainability, and adoption.", { schedule: -6, budget: -5, quality: 6, stakeholders: 5, risk: -5 }, "This improves decision evidence but consumes time and budget."),
          option("Negotiate additional transparency documentation into the vendor contract.", { procurement: 6, communications: 3, risk: -4, schedule: -2, budget: -2 }, "This strengthens governance without rejecting the vendor outright.")
        ]
      },
      {
        phase: "Executing",
        title: "Planner Adoption Resistance",
        knowledgeArea: "Project Stakeholder Management",
        situation:
          "Merchandise planners say the forecasts do not account for local promotions and are reluctant to use model recommendations.",
        reflections: [commonReflections[1], commonReflections[3]],
        options: [
          option("Mandate use of the model in planning meetings.", { schedule: 3, stakeholders: -8, morale: -5, risk: 5, quality: -2 }, "This may force adoption metrics but does not build trust in the tool."),
          option("Add planner override reasons and feedback loops.", { schedule: -4, quality: 6, stakeholders: 8, communications: 5, risk: -4 }, "This improves adoption and learning, while adding workflow design effort."),
          option("Limit deployment to planners who volunteer for the pilot.", { scope: -4, stakeholders: 4, quality: 3, risk: -2, schedule: 2 }, "This creates champions but may bias pilot results."),
          option("Ask data science to improve accuracy before further engagement.", { quality: 2, stakeholders: -3, schedule: -5, risk: 1 }, "This focuses on technical performance but postpones the human workflow challenge.")
        ]
      },
      {
        phase: "Monitoring and Controlling",
        title: "Stockout Signal",
        knowledgeArea: "Project Risk Management",
        situation:
          "In one pilot category, inventory dropped as expected, but stockouts increased in rural stores with sparse historical data.",
        reflections: [commonReflections[2], commonReflections[4]],
        options: [
          option("Pause expansion and investigate model performance by store segment.", { schedule: -7, quality: 8, risk: -9, stakeholders: 2 }, "This reduces harm and improves model governance, with a major timeline impact."),
          option("Continue rollout because aggregate results meet targets.", { schedule: 5, budget: 2, quality: -7, risk: 10, stakeholders: -5 }, "This favors aggregate performance while ignoring uneven impacts."),
          option("Add safety stock rules for low-data stores.", { scope: -2, quality: 5, risk: -6, budget: -3, stakeholders: 4 }, "This mitigates the observed risk while preserving the broader pilot."),
          option("Shift rural stores back to manual forecasting temporarily.", { scope: -4, quality: 3, stakeholders: 3, risk: -5, schedule: 1 }, "This protects affected locations but creates a split operating model.")
        ]
      },
      {
        phase: "Closing",
        title: "Operational Ownership",
        knowledgeArea: "Project Integration Management",
        situation:
          "The project is ready to close, but no team has accepted ownership for model monitoring, retraining, and policy updates.",
        reflections: [commonReflections[3], commonReflections[4]],
        options: [
          option("Delay closure until a model operations owner is assigned.", { schedule: -5, risk: -7, quality: 5, stakeholders: 2 }, "This protects long-term value but extends the project."),
          option("Transfer ownership informally to data science.", { schedule: 4, risk: 5, stakeholders: -2, communications: -3 }, "This closes quickly but leaves unclear accountability for business decisions."),
          option("Create a governance charter with operations, analytics, and legal roles.", { schedule: -3, quality: 6, communications: 6, risk: -7, stakeholders: 5 }, "This connects the project output to sustained operational control."),
          option("Schedule quarterly reviews without changing ownership.", { schedule: 2, communications: 2, risk: 2, quality: -2 }, "This provides some monitoring but may be too weak for active model management.")
        ]
      }
    ],
    finalDebrief:
      "This scenario illustrates how quality criteria, responsible risk management, stakeholder adoption, vendor transparency, and operational ownership must be managed together; technical performance alone is insufficient if governance, explainability, and monitoring are weak.",
    instructorNotes: {
      emphasis: ["Quality", "Risk", "Stakeholder", "Procurement", "Integration"],
      tradeoffs:
        "Technical performance must be balanced with governance, explainability, stakeholder adoption, and operational ownership.",
      discussion: ["Who should define success criteria when technical and operational priorities differ?", "When is aggregate performance insufficient evidence of project success?", "What ownership structure must exist before responsible project closure?"],
      assignment:
        "Write a governance charter section that defines success and acceptance criteria, monitoring cadence, model or deliverable owner, escalation path, decision rights, review timing, and operational handoff conditions."
    }
  }
];
