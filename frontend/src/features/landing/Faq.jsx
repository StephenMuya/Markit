import { useEffect, useRef } from "react";
import SectionBackdrop from "./SectionBackdrop";

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

  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-fade]");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const delay = entry.target.dataset.delay || "0";

          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.style.transitionDuration = "0.7s";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          } else {
            entry.target.style.transitionDelay = "0ms";
            entry.target.style.transitionDuration = "0.3s";
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(28px)";
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const f = () => ({
    opacity: 0,
    transform: "translateY(28px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 text-white lg:py-32" ref={sectionRef}>
      <SectionBackdrop variant="faq" />
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 data-fade data-delay="0" style={f()} className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p data-fade data-delay="100" style={f()} className="mt-4 text-xl text-zinc-400">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col space-y-4">
          {faqs.map((faq, index) => (
            <article 
              key={index}
              data-fade 
              data-delay={index * 50} 
              style={f()} 
              className="group relative overflow-hidden border-b border-white/10 transition-all duration-500 last:border-none"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between py-6 lg:py-8">
                <h3 className="text-xl font-medium text-zinc-300 transition-colors duration-500 group-hover:text-white">
                  {faq.question}
                </h3>
              </div>
              
              {/* Expandable Answer Wrapper */}
              <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="pb-6 pt-0 lg:pb-8">
                    <p className="pr-12 text-lg leading-relaxed text-zinc-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
