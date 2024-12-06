import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gmgygbbnwnbekxxnzfdp.supabase.co";
// Supabase key we can take from prj settings > API > anon public
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZ3lnYmJud25iZWt4eG56ZmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMzcwMDAsImV4cCI6MjA0MzcxMzAwMH0.1OXVyHqNqT0tYEIl_vmmRumgV4tYy3MUW1BD03sCMkU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
