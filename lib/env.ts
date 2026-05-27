import { supabaseConfig } from "@/lib/supabase-config";

export function getSupabaseUrl() {
  return supabaseConfig.url;
}

export function getSupabaseAnonKey() {
  return supabaseConfig.anonKey;
}

export function getSupabaseServiceRoleKey() {
  return supabaseConfig.serviceRoleKey;
}

export function hasSupabaseEnv() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export function hasSupabaseServiceRole() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey());
}
