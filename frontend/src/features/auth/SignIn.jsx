import { useEffect, useState } from "react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.38-1 2.54-2.14 3.32v2.76h3.46c2.02-1.86 3.18-4.6 3.18-7.86 0-.76-.07-1.47-.2-2.2Z" />
      <path fill="currentColor" d="M12 22c2.97 0 5.46-.98 7.28-2.66l-3.46-2.76c-.96.65-2.2 1.03-3.82 1.03-2.94 0-5.43-1.87-6.32-4.4H2.09v2.84A10 10 0 0 0 12 22Z" />
      <path fill="currentColor" d="M5.68 13.21A5.98 5.98 0 0 1 5.36 11c0-.77.13-1.52.32-2.21V5.95H2.09A10 10 0 0 0 2 11c0 1.61.39 3.14 1.07 4.45l2.61-2.24Z" />
      <path fill="currentColor" d="M12 4.12c1.62 0 3.07.56 4.22 1.66l3.16-3.16C17.45.88 14.97 0 12 0A10 10 0 0 0 2.09 5.95l3.59 2.84C6.57 6 9.06 4.12 12 4.12Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="currentColor" d="M16.7 13.2c0-2.3 1.9-3.4 1.9-3.4-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.8 0-1.9-.8-3-.8-1.5 0-3 .9-3.9 2.2-1.6 2.4-.4 5.9 1.1 7.9.7 1 1.5 2 2.6 1.9 1 0 1.4-.6 2.7-.6s1.7.6 2.8.6c1.1 0 1.8-1 2.5-1.9.8-1 1.1-2 1.1-2.1 0 0-2-.8-2-2.8Z" />
      <path fill="currentColor" d="M14.7 3.7c.6-.8 1-1.9.9-3-1 .1-2.2.7-2.9 1.5-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 3-1.4Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="currentColor" d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM3 8.75h3.95V21H3V8.75Zm7.02 0h3.78v1.67h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-3.94v-5.2c0-1.24-.02-2.83-1.73-2.83-1.74 0-2 1.36-2 2.74V21h-3.93V8.75Z" />
    </svg>
  );
}

export default function SignIn({ onClose }) {
  const [mode, setMode] = useState("signin");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const isSignInMode = mode === "signin";
  const isResetMode = mode === "reset";
  const panelIsFlipped = mode !== "signin";

  const leftPanelTitle = isResetMode
    ? "Recover your account."
    : "The fastest way back into your market flow.";

  const leftPanelCopy = isResetMode
    ? "Reset your password securely, regain access, and get back to saved searches without breaking your workflow."
    : "Pick up the latest listings, revisit saved searches, and keep your data-backed decisions moving without breaking your rhythm.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 text-white">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close sign in dialog"
        onClick={onClose}
      />

      <div className="relative z-10 min-h-[50rem] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220] shadow-2xl shadow-black/40">
        <div className="relative min-h-[50rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-28 -translate-x-1/2 bg-[linear-gradient(90deg,rgba(11,18,32,0),rgba(15,23,42,0.65),rgba(11,18,32,0))] blur-2xl" />

          <section
            className={`absolute inset-y-0 left-0 w-full overflow-hidden bg-[linear-gradient(160deg,#0f172a_0%,#111827_62%,#0b1220_100%)] px-8 py-16 transition-transform duration-700 ease-in-out will-change-transform sm:px-10 sm:py-18 lg:w-1/2 lg:px-12 lg:py-20 ${
              panelIsFlipped ? "lg:translate-x-full" : "lg:translate-x-0"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_28%)]" />
            <div className="relative z-10 flex h-full min-h-[32rem] flex-col justify-between gap-14 py-8 lg:py-10">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/80">Markit access</p>
                <h1 className="mt-5 max-w-lg text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  {leftPanelTitle}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                  {leftPanelCopy}
                </p>
              </div>
            </div>
          </section>

          <section
            className={`absolute inset-y-0 left-0 w-full bg-[#0b1220] px-6 py-16 transition-transform duration-700 ease-in-out will-change-transform sm:px-8 sm:py-18 lg:w-1/2 lg:px-10 lg:py-20 ${
              panelIsFlipped ? "lg:translate-x-0" : "lg:translate-x-full"
            }`}
          >
            <div className="mb-10 flex items-start justify-between gap-4 lg:mb-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                  {isResetMode ? "Password recovery" : isSignInMode ? "Welcome back" : "Join Markit"}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  {isResetMode ? "Reset Password" : isSignInMode ? "Sign In" : "Create Account"}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                  {isResetMode
                    ? "Enter your account email and choose a new password to restore access."
                    : isSignInMode
                      ? "Enter your details to access your Markit workspace."
                      : "Create your Markit account to save searches, follow listings, and keep your workflow in one place."}
                </p>
              </div>

              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white"
                onClick={onClose}
                aria-label="Close sign in dialog"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              {isResetMode ? (
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-medium text-white/75">
                    Account email
                  </label>
                  <input
                    id="reset-email"
                    name="reset-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/45 focus:bg-white/8"
                  />
                </div>
              ) : !isSignInMode ? (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/75">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/45 focus:bg-white/8"
                  />
                </div>
              ) : null}

              {isResetMode ? (
                <div className="space-y-2">
                  <label htmlFor="reset-code" className="text-sm font-medium text-white/75">
                    Reset code
                  </label>
                  <input
                    id="reset-code"
                    name="reset-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter the code from your email"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/45 focus:bg-white/8"
                  />
                </div>
              ) : null}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/75">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/45 focus:bg-white/8"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white/75">
                  {isResetMode ? "New password" : "Password"}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isResetMode ? "new-password" : "current-password"}
                  placeholder={isResetMode ? "Enter a new password" : "Enter your password"}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/45 focus:bg-white/8"
                />
              </div>

              {isResetMode ? (
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium text-white/75">
                    Confirm new password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter your new password"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/45 focus:bg-white/8"
                  />
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-4 pt-1 text-sm">
                {isResetMode ? (
                  <span className="text-white/45">Use a strong password you do not reuse elsewhere.</span>
                ) : (
                  <label className="flex items-center gap-2 text-white/65">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-white/10 text-emerald-300 accent-emerald-300"
                    />
                    Remember me
                  </label>
                )}

                {isSignInMode ? (
                  <button
                    type="button"
                    className="font-semibold text-emerald-300 transition hover:text-emerald-200"
                    onClick={() => setMode("reset")}
                  >
                    Forgot password?
                  </button>
                ) : isResetMode ? (
                  <button
                    type="button"
                    className="font-semibold text-emerald-300 transition hover:text-emerald-200"
                    onClick={() => setMode("signin")}
                  >
                    Back to sign in
                  </button>
                ) : (
                  <span className="text-white/40">Secure registration</span>
                )}
              </div>

              <button className="mt-2 w-full rounded-full bg-white py-3.5 font-bold text-black transition hover:bg-gray-200">
                {isResetMode ? "Update Password" : isSignInMode ? "Sign In" : "Create Account"}
              </button>
            </form>

            {!isResetMode ? (
              <>
                <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.32em] text-white/30">
                  <span className="h-px flex-1 bg-white/10" />
                  <span>Or continue with</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
                    <GoogleIcon />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
                    <AppleIcon />
                    Apple
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
                    <LinkedInIcon />
                    LinkedIn
                  </button>
                </div>
              </>
            ) : null}

            <div className="mt-6 text-center text-sm text-white/60">
              {isResetMode ? (
                <>
                  Remember your password?{" "}
                  <button
                    type="button"
                    className="font-semibold text-emerald-300 transition hover:text-emerald-200"
                    onClick={() => setMode("signin")}
                  >
                    Sign in
                  </button>
                </>
              ) : isSignInMode ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-emerald-300 transition hover:text-emerald-200"
                    onClick={() => setMode("signup")}
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-emerald-300 transition hover:text-emerald-200"
                    onClick={() => setMode("signin")}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
