import { NextResponse } from "next/server";
import { MIN_SECONDS_PER_QUESTION, TOTAL_QUESTIONS } from "@/lib/constants";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session_id = body.session_id as string;

    if (!session_id) {
      return NextResponse.json({ error: "session_id required" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const completed_at = new Date().toISOString();

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("started_at, is_complete")
      .eq("id", session_id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.is_complete) {
      const { data: existing } = await supabase
        .from("sessions")
        .select("score")
        .eq("id", session_id)
        .single();
      return NextResponse.json({
        success: true,
        score: existing?.score ?? 0,
      });
    }

    const { count, error: countError } = await supabase
      .from("answers")
      .select("*", { count: "exact", head: true })
      .eq("session_id", session_id)
      .eq("is_correct", true);

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const score = count ?? 0;
    const startedAt = new Date(session.started_at).getTime();
    const total_time_seconds = Math.max(
      0,
      Math.floor((Date.now() - startedAt) / 1000)
    );

    const { error: updateError } = await supabase
      .from("sessions")
      .update({
        score,
        total_time_seconds,
        is_complete: true,
        completed_at,
      })
      .eq("id", session_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Do not finalize winner positions here.
    // Admin applies a 4-minute review countdown before ranking is locked in.

    const suspicious =
      total_time_seconds < TOTAL_QUESTIONS * MIN_SECONDS_PER_QUESTION;

    return NextResponse.json({
      success: true,
      score,
      suspicious,
    });
  } catch (e) {
    console.error("complete-quiz:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
