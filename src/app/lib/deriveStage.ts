import { Stage } from "./types";

export function deriveStage(row: Record<string, string>): Stage {
  const completed = (row["Completed?"] ?? "").trim().toLowerCase();
  if (completed === "complete") return "complete";
  if (completed === "incomplete") return "incomplete";

  const isEmergency = (row.is_emergency ?? "").trim().toLowerCase();
  if (isEmergency === "true") return "emergency";

  const vendor = (row.Vendor ?? "").trim();
  const dateOfJob = (row["Date of Job"] ?? "").trim();
  if (vendor && dateOfJob) return "scheduled";

  const hasReachout = (row.Initial_Reachout ?? "").trim();
  if (hasReachout) return "triaged";

  return "awaiting_reply";
}
