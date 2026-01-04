import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 型定義
export type Song = {
  id: number;
  title: string;
  artist: string;
  album_title: string | null;
  lyrics: string | null;
  audio_url: string | null;
  created_at: string;
};
