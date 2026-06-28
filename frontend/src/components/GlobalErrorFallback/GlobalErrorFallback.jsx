export default function GlobalErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] px-6 text-center font-sans text-white"
    >
      <div className="max-w-md rounded-lg border border-red-500/30 bg-red-500/10 p-8 shadow-xl">
        <h2 className="mb-4 text-3xl font-black text-red-400">Oops! Something went wrong.</h2>
        <p className="mb-6 text-sm text-gray-300">
          We experienced an unexpected error while rendering this section.
        </p>
        <div className="mb-8 overflow-auto rounded bg-black/40 p-4 text-left font-mono text-xs text-red-300">
          {error.message}
        </div>
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-red-500 hover:shadow-red-500/20"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
