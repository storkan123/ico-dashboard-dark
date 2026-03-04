import { Step } from "@/app/lib/types";

export default function StepTracker({ steps }: { steps: Step[] }) {
  return (
    <div className="w-full mb-8">
      {/* Desktop horizontal stepper */}
      <div className="hidden md:flex items-start justify-between relative">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center flex-1 relative">
            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div
                className="absolute top-4 left-1/2 w-full h-0.5"
                style={{
                  background: step.completed
                    ? "var(--accent-blue)"
                    : "var(--border-primary)",
                }}
              />
            )}
            {/* Circle */}
            <div
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all glass-card"
              style={{
                background: step.completed
                  ? "var(--accent-blue)"
                  : step.current
                  ? "var(--stage-triaged-bg)"
                  : "var(--bg-secondary)",
                color: step.completed
                  ? "#ffffff"
                  : step.current
                  ? "var(--accent-blue)"
                  : "var(--text-dim)",
                border: step.current
                  ? "2px solid var(--accent-blue)"
                  : "2px solid var(--border-primary)",
                boxShadow: step.current
                  ? "0 0 12px var(--accent-blue)"
                  : step.completed
                  ? "0 0 8px rgba(59, 130, 246, 0.3)"
                  : "none",
              }}
            >
              {step.completed ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7L5.5 10L11.5 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {/* Label */}
            <p
              className="text-xs font-medium mt-2 text-center"
              style={{
                color: step.completed || step.current
                  ? "var(--text-primary)"
                  : "var(--text-dim)",
              }}
            >
              {step.label}
            </p>
            {step.current && (
              <span
                className="text-[10px] mt-0.5 px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--stage-triaged-bg)",
                  color: "var(--accent-blue)",
                }}
              >
                Current
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile vertical stepper */}
      <div className="md:hidden flex flex-col gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: step.completed
                    ? "var(--accent-blue)"
                    : step.current
                    ? "var(--stage-triaged-bg)"
                    : "var(--bg-secondary)",
                  color: step.completed
                    ? "#ffffff"
                    : step.current
                    ? "var(--accent-blue)"
                    : "var(--text-dim)",
                  border: `2px solid ${step.current ? "var(--accent-blue)" : "var(--border-primary)"}`,
                }}
              >
                {step.completed ? (
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-0.5 h-6"
                  style={{
                    background: step.completed ? "var(--accent-blue)" : "var(--border-primary)",
                  }}
                />
              )}
            </div>
            <div className="pb-4">
              <p
                className="text-sm font-medium"
                style={{
                  color: step.completed || step.current ? "var(--text-primary)" : "var(--text-dim)",
                }}
              >
                {step.label}
                {step.current && (
                  <span
                    className="ml-2 text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--stage-triaged-bg)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    Current
                  </span>
                )}
              </p>
              <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
