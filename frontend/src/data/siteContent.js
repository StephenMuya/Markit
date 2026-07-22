export const navigationContent = {
  productItems: ["Search Dashboard", "Clean Data", "Smart Categories", "Market Alerts"],
  solutionItems: ["Buyers", "Agents", "Investors"],
};

export const trustedBrands = [
  "Zillow",
  "Trulia",
  "Redfin",
  "CoStar",
  "LoopNet",
  "CBRE",
  "JLL",
  "Cushman & Wakefield",
  "Realtor.com",
  "Keller Williams",
];

export const socialProofStats = [
  { label: "Property Index", target: 50000, suffix: "+" },
  { label: "Data Points Processed", target: 2400000, suffix: "+" },
  { label: "Sources Ingested", target: 120, suffix: "+" },
];

export const faqItems = [
  {
    question: "Where does Markit source its data?",
    answer:
      "We aggregate, normalize, and verify commercial real estate data from over 120+ public registries, broker-specific feeds, and syndication networks.",
  },
  {
    question: "How often is the database updated?",
    answer:
      "Our data engine syncs every 24 hours. This ensures active listings reflect current market conditions and off-market statuses are accurately flagged.",
  },
  {
    question: "How do you handle duplicate listings from different brokers?",
    answer:
      "Our system automatically cross-references addresses, APNs, and property metrics to merge duplicate postings into a single, clean source of truth.",
  },
  {
    question: "Can I export the data for my own financial modeling?",
    answer:
      "Yes. Any filtered search, comp report, or watchlist can be instantly exported to CSV or Excel.",
  },
  {
    question: "Do you offer developer API access?",
    answer:
      "Yes. API access is available for teams looking to pipe our normalized CRE data directly into their internal dashboards or proprietary brokerage tools.",
  },
];

export const searchDashboardContent = {
  title: "Search Dashboard",
  description: "Welcome to the interactive data pipeline search. (Mock Page)",
};
