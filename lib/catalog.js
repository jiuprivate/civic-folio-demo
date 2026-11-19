export const resources = {
  smallClaims: [
    "Small claims in California",
    "https://www.selfhelp.courts.ca.gov/small-claims-california",
  ],
  claimForm: [
    "Plaintiff’s Claim and Order to Go to Small Claims Court (SC-100)",
    "https://selfhelp.courts.ca.gov/jcc-form/SC-100",
  ],
  served: [
    "Understanding a small claims notice",
    "https://www.selfhelp.courts.ca.gov/small-claims/respond-claim-order",
  ],
  response: [
    "Options after a civil summons and complaint",
    "https://www.selfhelp.courts.ca.gov/civil-lawsuit/defendant/options",
  ],
  request: [
    "California Courts demand letter tool",
    "https://selfhelp.courts.ca.gov/form/demand-letter",
  ],
  hearing: [
    "Prepare for a small claims hearing",
    "https://www.selfhelp.courts.ca.gov/prepare-and-go-your-small-claims-trial",
  ],
  appeal: [
    "Challenging a small claims decision",
    "https://www.selfhelp.courts.ca.gov/small-claims/after-trial/appeal-decision",
  ],
  collection: [
    "Collecting a small claims judgment",
    "https://selfhelp.courts.ca.gov/small-claims/after-trial/collect-money",
  ],
  court: [
    "Find your county’s superior court",
    "https://courts.ca.gov/find-your-court",
  ],
  waiver: [
    "Request to Waive Court Fees (FW-001)",
    "https://selfhelp.courts.ca.gov/jcc-form/FW-001",
  ],
  help: [
    "California Courts Self-Help Guide",
    "https://selfhelp.courts.ca.gov/",
  ],
  lawyer: [
    "Find legal professionals through the State Bar of California",
    "https://www.calbar.ca.gov/public/find-legal-professionals",
  ],
};

export const services = [
  {
    id: "start-a-claim",
    short: "Start a claim",
    heading: "Prepare a small claim",
    description:
      "Organize what happened, what you asked for and the records behind your request.",
    price: 9,
    icon: "claim",
    action: "Prepare a claim outline",
    document: "Small claims planning sheet",
    deliverables: [
      "A timeline in your own words",
      "An itemized request and evidence list",
      "A link to the court’s current claim form",
    ],
    prepare:
      "Gather your receipt, correspondence and a breakdown of the amount you are requesting.",
    source: ["smallClaims", "claimForm", "court"],
    worksheet: [
      [
        "Amount requested and how you calculated it",
        "$480 paid in advance, less $0 returned.",
      ],
      [
        "When you asked for payment",
        "I emailed the shop the day after it canceled the appointment.",
      ],
    ],
    example: {
      title: "A repair deposit dispute",
      city: "Oakland",
      person: "Jordan Ellis",
      other: "Harbor Lane Repairs (fictional)",
      facts:
        "I paid a $480 deposit for a repair. The appointment was canceled before work began. I asked for the deposit back by email.",
      request: "Return the $480 deposit.",
      evidence:
        "Deposit receipt; canceled appointment email; copy of the refund request.",
    },
  },
  {
    id: "respond-to-papers",
    short: "Respond to papers",
    heading: "I received court papers",
    description:
      "Identify the document you received and collect the details you want to bring to court.",
    price: 9,
    icon: "response",
    action: "Prepare response notes",
    document: "Response preparation notes",
    deliverables: [
      "A record of the title, case number and service date",
      "Space for your account of the events",
      "Separate resources for small claims and a civil summons",
    ],
    prepare:
      "Have the first page and hearing notice available. Use the title exactly as it appears on your papers.",
    source: ["served", "response", "court"],
    worksheet: [
      [
        "Title of the paper and how you received it",
        "Plaintiff’s Claim and Order to Go to Small Claims Court. A process server handed me a copy.",
      ],
      [
        "Case number, service date and hearing details",
        "Copy the case number, delivery date and hearing information from the sample notice.",
      ],
    ],
    example: {
      title: "A disputed moving invoice",
      city: "Sacramento",
      person: "Avery Bennett",
      other: "Cedar Row Moving (fictional)",
      facts:
        "I received a small claims notice about a moving invoice. My bank statement shows a payment the invoice does not list.",
      request: "Explain the payment and the amount I dispute.",
      evidence: "Hearing notice; signed estimate; payment confirmation.",
    },
  },
  {
    id: "read-a-contract",
    short: "Read a contract",
    heading: "Understand an agreement",
    description:
      "Bring payment dates, cancellation terms and outstanding questions into one worksheet.",
    price: 4,
    icon: "contract",
    action: "Open the reading worksheet",
    document: "Contract reading worksheet",
    deliverables: [
      "A place to record the words of a clause",
      "A list of payment and cancellation questions",
      "A printable worksheet for a discussion before signing",
    ],
    prepare:
      "Choose the clause you want to understand. Keep the surrounding definitions and payment schedule nearby.",
    source: ["lawyer"],
    worksheet: [
      [
        "Clause to discuss",
        "Final payment is due upon completion. The proposal also mentions unused materials.",
      ],
      [
        "Questions to ask before signing",
        "Who keeps unused materials? How will the final invoice show any credit?",
      ],
    ],
    example: {
      title: "A home painting agreement",
      city: "Fresno",
      person: "Morgan Blake",
      other: "Pine Terrace Painting (fictional)",
      facts:
        "The proposal lists a deposit and a final installment. The cancellation paragraph does not say how unused materials are handled.",
      request:
        "Ask the contractor to clarify the materials charge before I sign.",
      evidence: "Written proposal; cancellation paragraph; materials estimate.",
    },
  },
  {
    id: "write-a-letter",
    short: "Write a letter",
    heading: "Write a demand letter",
    description:
      "Put your account, your request and the records you rely on into a letter you can review.",
    price: 4,
    icon: "letter",
    action: "Draft a sample letter",
    document: "Personal demand letter",
    deliverables: [
      "An editable statement of events",
      "A clear request written in your own name",
      "A printable letter and a copy for your records",
    ],
    prepare:
      "Have the recipient’s name, the facts you want to state and your specific request ready.",
    source: ["request", "help"],
    worksheet: [
      [
        "How you plan to send the letter",
        "Email a copy to the studio and save the sent message.",
      ],
      ["Follow-up for your own records", "Record the date sent and any reply."],
    ],
    example: {
      title: "Request for a canceled class refund",
      city: "San Diego",
      person: "Casey Rivera",
      other: "Meadow Studio (fictional)",
      facts:
        "I paid $180 for a class series. The studio canceled the series before it began. I requested a refund when I received the cancellation email.",
      request: "Please return the $180 I paid for the canceled classes.",
      evidence: "Registration receipt; cancellation email.",
    },
  },
  {
    id: "read-a-letter",
    short: "Read a letter",
    heading: "Review a letter you received",
    description:
      "Record the sender’s request, dates mentioned in the letter and the points you want clarified.",
    price: 4,
    icon: "response",
    action: "Open the letter worksheet",
    document: "Incoming letter worksheet",
    deliverables: [
      "A summary of the sender’s request",
      "Space for dates and disputed items",
      "A list of documents to check",
    ],
    prepare:
      "Have the letter and envelope available. Record any stated date exactly as written.",
    source: ["help", "lawyer"],
    worksheet: [
      ["What the sender wants", "The sender asks for an extra repair fee."],
      [
        "Date or deadline mentioned",
        "The sample letter asks for a response by the end of the month. I will check the exact date on the letter.",
      ],
    ],
    example: {
      title: "A request for an extra repair fee",
      city: "Long Beach",
      person: "Riley Parker",
      other: "Maple Row Service (fictional)",
      facts:
        "A letter asks for a fee that was not listed in the estimate I kept.",
      request: "Ask for an itemized explanation.",
      evidence: "Letter; estimate; receipt.",
    },
  },
  {
    id: "prepare-for-hearing",
    short: "Hearing preparation",
    heading: "Get ready for a hearing",
    description:
      "Build a short speaking outline and put your supporting records in the order you plan to use them.",
    price: 7,
    icon: "hearing",
    action: "Build a hearing outline",
    document: "Small claims hearing outline",
    deliverables: [
      "A short outline of the events",
      "An indexed list of supporting items",
      "A checklist for the time and location on your notice",
    ],
    prepare:
      "Check your hearing notice and your court’s instructions for submitting or bringing evidence.",
    source: ["hearing", "court"],
    worksheet: [
      [
        "Hearing details to check",
        "Confirm the date, time and appearance instructions on the hearing notice.",
      ],
      [
        "Speaking outline",
        "1. Explain the deposit. 2. Show the cancellation. 3. Show the request for a refund.",
      ],
    ],
    example: {
      title: "Preparing for a repair dispute hearing",
      city: "Oakland",
      person: "Jordan Ellis",
      other: "Harbor Lane Repairs (fictional)",
      facts:
        "I will explain the deposit, the cancellation and my request for a refund in that order.",
      request: "Present a clear timeline at the hearing.",
      evidence:
        "Item A: deposit receipt. Item B: cancellation. Item C: refund email.",
    },
  },
  {
    id: "after-a-decision",
    short: "Review a decision",
    heading: "Understand a small claims decision",
    description:
      "Note who made each claim, what the judge decided and which official review guide applies.",
    price: 7,
    icon: "decision",
    action: "Organize the decision",
    document: "Decision review worksheet",
    deliverables: [
      "A summary of the decision and your role",
      "A place to record when notice was handed or mailed",
      "The court’s guide to appeals and missed hearings",
    ],
    prepare:
      "Use the Notice of Entry of Judgment and note whether you attended the hearing.",
    source: ["appeal", "court", "lawyer"],
    worksheet: [
      [
        "Role and attendance",
        "I was sued on the claim and attended the hearing.",
      ],
      [
        "Notice date to check",
        "Copy the mailing or delivery date from the Notice of Entry of Judgment.",
      ],
    ],
    example: {
      title: "Reading a small claims judgment",
      city: "San Jose",
      person: "Alex Finley",
      other: "Juniper Works (fictional)",
      facts:
        "I was the defendant and attended the hearing. I have received the court’s written decision.",
      request:
        "Find the official guidance for my role and check the notice date.",
      evidence: "Notice of Entry of Judgment; hearing notes.",
    },
  },
  {
    id: "collect-a-judgment",
    short: "Collect a judgment",
    heading: "Organize post-judgment records",
    description:
      "Track the written judgment, amounts already received and the records you still need.",
    price: 7,
    icon: "collection",
    action: "Open a judgment worksheet",
    document: "Judgment collection worksheet",
    deliverables: [
      "A judgment and payment record",
      "A list of notices to keep",
      "A link to official collection steps",
    ],
    prepare:
      "Locate the judgment and any payment receipts. Check the court’s guidance about waiting periods and stays.",
    source: ["collection", "court"],
    worksheet: [
      [
        "Judgment and payment record",
        "Judgment: $700. Payment received: $200. Remaining principal: $500.",
      ],
      [
        "Next record to locate",
        "Match the payment receipt to the amount and date in my ledger.",
      ],
    ],
    example: {
      title: "Recording a partial payment",
      city: "Santa Rosa",
      person: "Taylor Reed",
      other: "Elm Workshop (fictional)",
      facts:
        "The written judgment awards $700. I later received a $200 payment.",
      request:
        "Keep an accurate payment record and check the court’s collection guide.",
      evidence: "Written judgment; payment receipt.",
    },
  },
];

export const byId = Object.fromEntries(
  services.map((service) => [service.id, service]),
);
export const priceLabel = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export const topics = [
  {
    id: "limits",
    title: "How much can I ask for in small claims?",
    terms: ["limit", "maximum", "how much", "12500", "12,500", "6250"],
    text: "For most money claims, California’s small claims limit is $12,500 for an individual and $6,250 for a business entity. Exceptions apply. The court’s self-help guide explains the limits and alternatives.",
    source: "smallClaims",
  },
  {
    id: "file",
    title: "Where do I find the form or the right court?",
    terms: ["where", "court location", "county", "form", "file", "venue"],
    text: "The California Courts website provides the current SC-100 for starting a small claim. Use the court directory to find your county’s superior court and its filing instructions.",
    source: "claimForm",
    more: "court",
  },
  {
    id: "papers",
    title: "What if I received court papers?",
    terms: ["served", "summons", "respond", "defend", "received", "sued"],
    text: "Read the title on the first page. An SC-100 small claims notice lists a hearing. A civil Summons and Complaint follows a different process. Keep the papers and the date you received them. Use the guide that matches the document.",
    source: "served",
    more: "response",
  },
  {
    id: "hearing",
    title: "What should I bring to my hearing?",
    terms: ["hearing", "trial", "evidence", "witness", "bring"],
    text: "Organize the records you want the judge to see and prepare a short account of the events. Check the notice and the local court’s instructions for copies, advance exchange, and remote appearances.",
    source: "hearing",
  },
  {
    id: "appeal",
    title: "Who can appeal a small claims decision?",
    terms: ["appeal", "challenge", "missed", "vacate"],
    text: "A party sued on a claim who loses on that claim may generally appeal if they attended the hearing. A person who brought the claim generally cannot appeal the loss on their own claim. A missed hearing can call for a different procedure. Check the notice and the court’s guide promptly.",
    source: "appeal",
  },
  {
    id: "fees",
    title: "Can I ask the court to waive fees?",
    terms: ["waive", "waiver", "fee", "afford"],
    text: "If you cannot afford court fees, you can ask the court for a fee waiver. The Judicial Council provides form FW-001 and instructions. A court fee waiver concerns charges imposed by the court.",
    source: "waiver",
  },
  {
    id: "letter",
    title: "How can I put a request in writing?",
    terms: ["demand", "letter", "ask for money", "request payment"],
    text: "Write down what happened, the amount or action you are requesting, and the records that support it. Keep a copy. The California Courts demand letter tool can help you draft a written request for money.",
    source: "request",
  },
  {
    id: "collect",
    title: "How do I start collecting a judgment?",
    terms: ["collection", "collect", "judgment", "paid"],
    text: "Keep the judgment and a record of payments. Collection generally requires steps by the person owed the money. Check whether a waiting period, appeal or stay affects the next step.",
    source: "collection",
  },
  {
    id: "lawyer",
    title: "Where can I find a California lawyer?",
    terms: ["attorney", "lawyer", "legal aid", "represent"],
    text: "The State Bar of California lists certified lawyer referral services and provides an attorney search. California Courts also provides free self-help information for people handling their own civil matters.",
    source: "lawyer",
    more: "help",
  },
];

export const guide = [
  [
    "Identify your court and case type",
    "Start with the county named on your papers or check the court directory. A small claims notice and a civil summons have different procedures.",
    ["court", "served", "response"],
  ],
  [
    "Prepare a money claim",
    "Write down the amount, how you calculated it, and what you have done to ask for payment. Check who you need to name and which court can hear the case before completing a form.",
    ["smallClaims", "claimForm", "request"],
  ],
  [
    "Plan for the hearing",
    "Check the date, location and appearance instructions. Arrange your timeline and supporting documents so you can find each item when you need it.",
    ["hearing", "court"],
  ],
  [
    "Read the decision and next steps",
    "Keep the written notice and record when it was handed or mailed. Eligibility for review and options for collection depend on your role and the judgment.",
    ["appeal", "collection"],
  ],
  [
    "Find help or ask about court fees",
    "Court self-help centers offer procedural information. Use the State Bar directory for individual legal advice. Court fees and any fee-waiver request are handled by the court.",
    ["help", "lawyer", "waiver"],
  ],
];
