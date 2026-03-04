import { WorkOrder, Stage, STAGE_CONFIG } from "@/app/lib/types";
import WorkOrderCard from "./WorkOrderCard";

const STAGE_CSS_KEY: Record<Stage, string> = {
  awaiting_reply: "awaiting",
  emergency: "emergency",
  triaged: "triaged",
  scheduled: "scheduled",
  complete: "complete",
  incomplete: "incomplete",
};

export default function KanbanColumn({
  stage,
  workOrders,
}: {
  stage: Stage;
  workOrders: WorkOrder[];
}) {
  const meta = STAGE_CONFIG[stage];
  const cssKey = STAGE_CSS_KEY[stage];

  return (
    <div className="flex flex-col min-w-[280px] max-w-[340px] flex-1">
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-t-lg"
        style={{ background: `var(--stage-${cssKey}-bg)` }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: `var(--stage-${cssKey}-text)` }}
        >
          {meta.label}
        </span>
        <span
          className="text-xs font-medium px-1.5 py-0.5 rounded-full"
          style={{
            background: `var(--stage-${cssKey}-border)`,
            color: `var(--stage-${cssKey}-text)`,
          }}
        >
          {workOrders.length}
        </span>
      </div>
      <div
        className="flex flex-col gap-3 p-3 rounded-b-lg border border-t-0 min-h-[120px]"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-primary)",
        }}
      >
        {workOrders.length === 0 ? (
          <p
            className="text-xs text-center py-6"
            style={{ color: "var(--text-dim)" }}
          >
            No work orders
          </p>
        ) : (
          workOrders.map((wo) => (
            <WorkOrderCard key={wo.work_request_number} wo={wo} />
          ))
        )}
      </div>
    </div>
  );
}
