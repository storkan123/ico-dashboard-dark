import { NextResponse } from "next/server";
import { deriveStage } from "@/app/lib/deriveStage";
import { WorkOrder } from "@/app/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { success: false, error: "N8N_WEBHOOK_URL not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `n8n returned ${res.status}` },
        { status: 502 }
      );
    }

    const rows: Record<string, string>[] = await res.json();

    const workOrders: WorkOrder[] = rows
      .filter((row) => (row.work_request_number ?? "").trim() !== "")
      .map((row) => ({
        work_request_number: row.work_request_number ?? "",
        work_request_date: row.work_request_date ?? "",
        work_request_description: row.work_request_description ?? "",
        property_name: row.property_name ?? "",
        property_address: row.property_address ?? "",
        unit: row.unit ?? "",
        resident_name: row.resident_name ?? "",
        resident_phone: row.resident_phone ?? "",
        resident_email: row.resident_email ?? "",
        permission_to_enter: row.permission_to_enter ?? "",
        access_notes: row.access_notes ?? "",
        is_emergency: row.is_emergency ?? "",
        Initial_Reachout: row.Initial_Reachout ?? "",
        "Initial Tenet Email Response":
          row["Initial Tenet Email Response"] ?? "",
        Vendor: row.Vendor ?? "",
        "Date of Job": row["Date of Job"] ?? "",
        "Completed?": row["Completed?"] ?? "",
        stage: deriveStage(row),
      }));

    return NextResponse.json({ success: true, data: workOrders });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 502 }
    );
  }
}
