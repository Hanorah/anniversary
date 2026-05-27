import { NextResponse } from "next/server";
import { computePositions } from "@/lib/ranking";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    const supabase = createSupabaseAdmin();

    const { data: completedSessions, error: listError } = await supabase
      .from("sessions")
      .select("id, score, total_time_seconds")
      .eq("is_complete", true);

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const positions = computePositions(completedSessions ?? []);

    await Promise.all(
      (completedSessions ?? []).map((s) =>
        supabase
          .from("sessions")
          .update({ position: positions.get(s.id) ?? null })
          .eq("id", s.id)
      )
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("finalize-rankings:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
