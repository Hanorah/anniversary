import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session_id = body.session_id as string;
    const question_number = Number(body.question_number);
    const question_text = String(body.question_text ?? "");
    const selected_answer =
      body.selected_answer === null || body.selected_answer === undefined
        ? null
        : String(body.selected_answer);
    const correct_answer = String(body.correct_answer ?? "");

    if (!session_id || !question_number || !correct_answer) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const is_correct =
      selected_answer !== null && selected_answer === correct_answer;

    const supabase = createSupabaseAdmin();

    const { data: existing } = await supabase
      .from("answers")
      .select("id")
      .eq("session_id", session_id)
      .eq("question_number", question_number)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase.from("answers").insert({
      session_id,
      question_number,
      question_text,
      selected_answer,
      correct_answer,
      is_correct,
    });

    if (error) {
      console.error("submit-answer:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("submit-answer:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
