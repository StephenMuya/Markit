export default function Faq() {
  const faqs = [
    {
      question: "Where does Markit source its data?",
      answer: "We aggregate, normalize, and verify commercial real estate data from over 120+ public registries, broker-specific feeds, and syndication networks."
    },
    {
      question: "How often is the database updated?",
      answer: "Our data engine syncs every 24 hours. This ensures active listings reflect current market conditions and off-market statuses are accurately flagged."
    },
    {
      question: "How do you handle duplicate listings from different brokers?",
      answer: "Our system automatically cross-references addresses, APNs, and property metrics to merge duplicate postings into a single, clean source of truth."
    },
    {
      question: "Can I export the data for my own financial modeling?",
      answer: "Yes. Any filtered search, comp report, or watchlist can be instantly exported to CSV or Excel."
    },
    {
      question: "Do you offer developer API access?",
      answer: "Yes. API access is available for teams looking to pipe our normalized CRE data directly into their internal dashboards or proprietary brokerage tools."
    }
  ];

  return (
    <section className="bg-zinc-950 py-24 text-white lg:py-32">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-zinc-400">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col space-y-8">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group border-b border-white/10 pb-8 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between text-xl font-medium text-zinc-100 transition-colors hover:text-white">
                <span>{faq.question}</span>
                <span className="ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 group-open:rotate-180">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>
              <p className="mt-6 pr-12 text-lg leading-relaxed text-zinc-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
