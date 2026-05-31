/** Seconds allowed per question */
export const QUESTION_TIME_SECONDS = 20;

/** Timer turns red and pulses when remaining seconds are at or below this */
export const TIMER_WARNING_SECONDS = 5;

export const TOTAL_QUESTIONS = 19;

/** Flag sessions completed faster than question_count × this many seconds */
export const MIN_SECONDS_PER_QUESTION = 5;

/** Brief pause after selecting an answer before next question */
export const ANSWER_ADVANCE_MS = 280;

/** Pause after time runs out before next question */
export const TIMEOUT_ADVANCE_MS = 450;

/** Wait before locking in final winners on admin dashboard */
export const WINNER_DELAY_SECONDS = 4 * 60;
