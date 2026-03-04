import { WorkOrder, Stage, ACTIVE_STAGES } from "@/app/lib/types";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({
  workOrders,
}: {
  workOrders: WorkOrder[];
}) {
  const grouped = ACTIVE_STAGES.reduce(
    (acc, stage) => {
      acc[stage] = workOrders.filter((wo) => wo.stage === stage);
      return acc;
    },
    {} as Record<Stage, WorkOrder[]>
  );

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {ACTIVE_STAGES.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          workOrders={grouped[stage] ?? []}
        />
      ))}
    </div>
  );
}
