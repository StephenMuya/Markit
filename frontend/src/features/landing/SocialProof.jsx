import CountUp from "../../components/CountUp/CountUp";
import { socialProofStats } from "../../data/siteContent";

export default function SocialProof() {
  return (
    <section className="pt-10" aria-label="Social Proof">
      <dl className="mx-auto grid gap-8 sm:grid-cols-3 lg:max-w-3xl">
        {socialProofStats.map(({ label, target, suffix }) => (
          <div className="text-center" key={label}>
            <dd className="text-3xl font-black text-white md:text-4xl">
              <CountUp target={target} suffix={suffix} />
            </dd>
            <dt className="mt-1 text-sm font-bold tracking-wider text-gray-400 uppercase">
              {label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
