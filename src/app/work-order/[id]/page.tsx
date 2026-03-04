"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { WorkOrder } from "@/app/lib/types";
import { deriveSteps } from "@/app/lib/deriveSteps";
import StepTracker from "@/app/components/StepTracker";
import DetailCard from "@/app/components/DetailCard";

export default function WorkOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/workorders");
      const json = await res.json();
      if (json.success) {
        const found = json.data.find(
          (wo: WorkOrder) => wo.work_request_number === id
        );
        if (found) {
          setWorkOrder(found);
          setError(null);
        } else {
          setError(`Work order #${id} not found`);
        }
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div
            className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
            style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }}
          />
          <p style={{ color: "var(--text-muted)" }}>Loading work order...</p>
        </div>
      </div>
    );
  }

  if (error || !workOrder) {
    return (
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm mb-6 transition-colors"
          style={{ color: "var(--accent-blue)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Active Work Orders
        </Link>
        <div
          className="rounded-xl p-6 text-center border"
          style={{
            background: "var(--stage-emergency-bg)",
            borderColor: "var(--stage-emergency-border)",
          }}
        >
          <p className="font-medium" style={{ color: "var(--stage-emergency-text)" }}>
            {error || "Work order not found"}
          </p>
        </div>
      </div>
    );
  }

  const steps = deriveSteps(workOrder);

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm mb-6 transition-colors"
        style={{ color: "var(--accent-blue)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Active Work Orders
      </Link>

      <StepTracker steps={steps} />
      <DetailCard wo={workOrder} />
    </div>
  );
}
