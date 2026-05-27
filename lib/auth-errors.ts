import type { AuthError } from "@supabase/supabase-js";

export function getAuthErrorMessage(error: AuthError | null): string {
  if (!error) return "Something went wrong. Please try again.";

  switch (error.code) {
    case "email_provider_disabled":
      return "Email login is turned off in Supabase. Open Authentication → Providers → Email and enable it, then try again.";
    case "invalid_credentials":
      return "Wrong email or password. Check the user exists under Authentication → Users.";
    case "email_not_confirmed":
      return "This account is not confirmed. In Supabase, open the user and confirm them, or recreate with Auto Confirm enabled.";
    case "user_banned":
      return "This account has been disabled.";
    default:
      return error.message || "Could not sign in. Please try again.";
  }
}
