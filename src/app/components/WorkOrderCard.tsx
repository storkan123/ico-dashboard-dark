import Link from "next/link";
import { WorkOrder, STAGE_CONFIG } from "@/app/lib/types";
import { timeAgo } from "@/app/lib/utils";

export default function WorkOrderCard({ wo }: { wo: WorkOrder }) {
  const stageMeta = STAGE_CONFIG[wo.stage];
  const isEmergency = wo.stage === "emergency";

  return (
    <Link href={`/work-order/${wo.work_request_number}`}>
      <div
        className={`rounded-lg border p-4 cursor-pointer transition-all hover:scale-[1.02] glass-card ${
          isEmergency ? "emergency-glow" : ""
        }`}
        style={{
          background: "var(--bg-card)",
          borderColor: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-border)`,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            WR# {wo.work_request_number}
          </span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{
              background: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-bg)`,
              color: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-text)`,
            }}
          >
            {stageMeta.label}
          </span>
        </div>
        <p className="text-sm mb-0.5" style={{ color: "var(--text-secondary)" }}>
          {wo.property_name}
          {wo.unit ? ` — Unit ${wo.unit}` : ""}
        </p>
        <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
          {wo.resident_name}
        </p>
        <div className="flex items-center justify-between">
          <p
            className="text-xs truncate max-w-[70%]"
            style={{ color: "var(--text-dim)" }}
          >
            {wo.work_request_description.slice(0, 60)}
            {wo.work_request_description.length > 60 ? "..." : ""}
          </p>
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>
            {timeAgo(wo.work_request_date)}
          </span>
        </div>
        {wo.Vendor && (
          <div
            className="mt-2 pt-2 flex items-center gap-2 text-xs"
            style={{
              borderTop: "1px solid var(--border-primary)",
              color: "var(--text-muted)",
            }}
          >
            <span>Vendor: {wo.Vendor}</span>
            {wo["Date of Job"] && (
              <>
                <span style={{ color: "var(--text-dim)" }}>|</span>
                <span>{wo["Date of Job"]}</span>
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
