import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

const buildTracks = [
  {
    title: "Python-first backend",
    description:
      "FastAPI is now the API foundation, with environment-based settings and CORS ready for the web app.",
  },
  {
    title: "React + Tailwind frontend",
    description:
      "The new interface is a Vite-powered React app with a custom Tailwind theme instead of a generated placeholder stack.",
  },
  {
    title: "Intentional rebuild",
    description:
      "This starter is deliberately small so the next features can be designed around the product instead of inherited noise.",
  },
];

export default function App() {
  const [health, setHealth] = useState({
    label: "Checking API",
    detail: "Trying to reach the FastAPI service...",
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchHealth() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/health`);

        if (!response.ok) {
          throw new Error("Health check failed.");
        }

        const payload = await response.json();

        if (!cancelled) {
          setHealth({
            label: payload.status === "ok" ? "API online" : "API needs attention",
            detail: `${payload.service} responded at ${new Date(
              payload.timestamp,
            ).toLocaleString()}.`,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setHealth({
            label: "Backend not running yet",
            detail: "Start the FastAPI app on port 8000 to enable the live connection badge.",
          });
        }
      }
    }

    fetchHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-parchment text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-clay/80 blur-3xl" />
        <div className="absolute right-[-4rem] top-24 h-64 w-64 rounded-full bg-ocean/15 blur-3xl" />
        <div className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-ember/15 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <section className="grid gap-8 rounded-[32px] border border-ink/10 bg-white/70 p-8 shadow-glow backdrop-blur lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-ocean">
              Clean Slate
            </p>
            <div className="space-y-4">
            <h1 className="max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
                Markit: Your Real Estate Market Intelligence Platform
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink/75">
                Aggregate, analyze, and serve real estate data from 10+ sources. Empowering agents, brokers, and home buyers with comprehensive market insights.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-ink/10 bg-ink px-4 py-2 text-parchment">
                FastAPI backend
              </span>
              <span className="rounded-full border border-ink/10 bg-white px-4 py-2">
                React UI
              </span>
              <span className="rounded-full border border-ink/10 bg-white px-4 py-2">
                Tailwind CSS
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="animate-float rounded-[28px] border border-ink/10 bg-ink p-6 text-parchment">
              <p className="text-sm uppercase tracking-[0.3em] text-parchment/60">
                Live Status
              </p>
              <h2 className="mt-3 font-display text-3xl">{health.label}</h2>
              <p className="mt-4 text-sm leading-7 text-parchment/80">{health.detail}</p>
            </div>

            <div className="rounded-[28px] border border-ink/10 bg-white/85 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-ember">Starter URLs</p>
              <div className="mt-4 space-y-3 text-sm leading-7">
                <p>
                  Frontend:
                  <span className="ml-2 rounded bg-clay px-2 py-1 font-medium">
                    http://localhost:5173
                  </span>
                </p>
                <p>
                  API:
                  <span className="ml-2 rounded bg-clay px-2 py-1 font-medium">
                    http://localhost:8000/api/health
                  </span>
                </p>
                <p>
                  Docs:
                  <span className="ml-2 rounded bg-clay px-2 py-1 font-medium">
                    http://localhost:8000/api/docs
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {buildTracks.map((track) => (
            <article
              key={track.title}
              className="rounded-[28px] border border-ink/10 bg-white/75 p-6 backdrop-blur"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-moss">Build Track</p>
              <h2 className="mt-4 font-display text-3xl">{track.title}</h2>
              <p className="mt-4 text-base leading-7 text-ink/75">{track.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[32px] border border-ink/10 bg-white/60 p-8 backdrop-blur lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-ocean">Next Moves</p>
              <h2 className="mt-4 font-display text-4xl">Ship the real product from here.</h2>
            </div>

            <div className="grid gap-4 text-sm leading-7 text-ink/80 sm:grid-cols-3">
              <div className="rounded-[24px] bg-clay/55 p-5">
                <p className="font-semibold uppercase tracking-[0.2em] text-ember">01</p>
                <p className="mt-3">Model the first core entities and define the API contract.</p>
              </div>
              <div className="rounded-[24px] bg-white/80 p-5">
                <p className="font-semibold uppercase tracking-[0.2em] text-ember">02</p>
                <p className="mt-3">Build the first production screen instead of another placeholder flow.</p>
              </div>
              <div className="rounded-[24px] bg-ocean/10 p-5">
                <p className="font-semibold uppercase tracking-[0.2em] text-ember">03</p>
                <p className="mt-3">Add persistence, auth, and tests once the product direction is clear.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
