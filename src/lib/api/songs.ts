import { supabase, Song } from "../supabase";

/**
 * すべての曲を取得
 */
export async function getAllSongs(): Promise<Song[]> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching songs:", error);
    return [];
  }

  return data || [];
}

/**
 * 特定の曲を取得
 */
export async function getSongById(id: number): Promise<Song | null> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching song:", error);
    return null;
  }

  return data;
}
