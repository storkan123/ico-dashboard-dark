import { WorkOrder, Step } from "./types";

export function deriveSteps(wo: WorkOrder): Step[] {
  const steps: Step[] = [
    {
      label: "Email Received",
      description: "Work order submitted via email",
      completed: !!wo.work_request_date.trim(),
      current: false,
      detail: wo.work_request_date,
    },
    {
      label: "AI Classified",
      description: "AI analyzed and classified the request",
      completed: wo.is_emergency.trim() !== "",
      current: false,
      detail: wo.is_emergency.trim()
        ? `Emergency: ${wo.is_emergency}`
        : undefined,
    },
    {
      label: "Tenant Contacted",
      description: "Initial outreach email sent to tenant",
      completed: !!wo.Initial_Reachout.trim(),
      current: false,
      detail: wo["Initial Tenet Email Response"].trim() || undefined,
    },
    {
      label: "Vendor Assigned",
      description: "Maintenance vendor assigned to the job",
      completed: !!wo.Vendor.trim(),
      current: false,
      detail: wo.Vendor.trim() || undefined,
    },
    {
      label: "Job Scheduled",
      description: "Job date and time confirmed",
      completed: !!wo["Date of Job"].trim(),
      current: false,
      detail: wo["Date of Job"].trim() || undefined,
    },
    {
      label: "Completed",
      description: "Follow-up sent, tenant confirmed resolution",
      completed:
        wo["Completed?"].trim().toLowerCase() === "complete" ||
        wo["Completed?"].trim().toLowerCase() === "incomplete",
      current: false,
      detail: wo["Completed?"].trim() || undefined,
    },
  ];

  // Mark the current step (first incomplete step)
  let foundCurrent = false;
  for (let i = 0; i < steps.length; i++) {
    if (!steps[i].completed && !foundCurrent) {
      steps[i].current = true;
      foundCurrent = true;
    }
  }

  // If all completed, mark last as current
  if (!foundCurrent && steps.length > 0) {
    steps[steps.length - 1].current = true;
  }

  return steps;
}
