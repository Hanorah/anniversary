import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const participant_name =
      typeof body.participant_name === "string"
        ? body.participant_name.trim()
        : "";

    if (!participant_name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("sessions")
      .insert({ participant_name })
      .select("id")
      .single();

    if (error) {
      console.error("start-session:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ session_id: data.id });
  } catch (e) {
    console.error("start-session:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
