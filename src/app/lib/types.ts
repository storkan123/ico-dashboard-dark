export type Stage =
  | "awaiting_reply"
  | "emergency"
  | "triaged"
  | "scheduled"
  | "complete"
  | "incomplete";

export interface WorkOrder {
  work_request_number: string;
  work_request_date: string;
  work_request_description: string;
  property_name: string;
  property_address: string;
  unit: string;
  resident_name: string;
  resident_phone: string;
  resident_email: string;
  permission_to_enter: string;
  access_notes: string;
  is_emergency: string;
  Initial_Reachout: string;
  "Initial Tenet Email Response": string;
  Vendor: string;
  "Date of Job": string;
  "Completed?": string;
  stage: Stage;
}

export interface Step {
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
  detail?: string;
}

export const STAGE_CONFIG: Record<
  Stage,
  { label: string; order: number }
> = {
  awaiting_reply: { label: "Awaiting Reply", order: 0 },
  emergency: { label: "Emergency", order: 1 },
  triaged: { label: "Triaged", order: 2 },
  scheduled: { label: "Scheduled", order: 3 },
  complete: { label: "Complete", order: 4 },
  incomplete: { label: "Incomplete", order: 5 },
};

export const ACTIVE_STAGES: Stage[] = [
  "awaiting_reply",
  "emergency",
  "triaged",
  "scheduled",
];
