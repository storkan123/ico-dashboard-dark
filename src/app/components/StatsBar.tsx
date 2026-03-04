import { WorkOrder, ACTIVE_STAGES, Stage } from "@/app/lib/types";

const STAT_CONFIGS: {
  key: string;
  label: string;
  filter: (wo: WorkOrder) => boolean;
  cssVar: string;
  borderVar: string;
}[] = [
  {
    key: "total",
    label: "Total Active",
    filter: (wo) => ACTIVE_STAGES.includes(wo.stage),
    cssVar: "--accent-blue",
    borderVar: "--accent-blue",
  },
  {
    key: "awaiting",
    label: "Awaiting Reply",
    filter: (wo) => wo.stage === "awaiting_reply",
    cssVar: "--stage-awaiting-text",
    borderVar: "--accent-amber",
  },
  {
    key: "emergency",
    label: "Emergency",
    filter: (wo) => wo.stage === "emergency",
    cssVar: "--stage-emergency-text",
    borderVar: "--accent-red",
  },
  {
    key: "triaged",
    label: "Triaged",
    filter: (wo) => wo.stage === "triaged",
    cssVar: "--stage-triaged-text",
    borderVar: "--accent-blue",
  },
  {
    key: "scheduled",
    label: "Scheduled",
    filter: (wo) => wo.stage === "scheduled",
    cssVar: "--stage-scheduled-text",
    borderVar: "--accent-violet",
  },
];

export default function StatsBar({
  workOrders,
}: {
  workOrders: WorkOrder[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
      {STAT_CONFIGS.map((stat) => {
        const count = workOrders.filter(stat.filter).length;
        const isEmergency = stat.key === "emergency" && count > 0;
        return (
          <div
            key={stat.key}
            className={`rounded-xl px-4 py-3 border-l-4 transition-shadow glass-card ${
              isEmergency ? "emergency-glow" : ""
            }`}
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-card)",
              borderLeftColor: `var(${stat.borderVar})`,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p
              className="text-xs font-medium mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              {stat.label}
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: `var(${stat.cssVar})` }}
            >
              {count}
            </p>
          </div>
        );
      })}
    </div>
  );
}
