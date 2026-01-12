// 認証済み曲のlocalStorage管理（有効期限付き）

const AUTHORIZED_SONGS_KEY = 'authorizedSongs';
const AUTH_EXPIRY_HOURS = 24; // 24時間有効

type AuthData = {
  songId: number;
  expiry: number; // タイムスタンプ（ミリ秒）
};

/**
 * 曲が認証済みかチェック
 */
export function isAuthorized(songId: number): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const authorized: AuthData[] = JSON.parse(localStorage.getItem(AUTHORIZED_SONGS_KEY) || '[]');
    const now = Date.now();

    // 期限切れのものを除外
    const validAuths = authorized.filter(auth => auth.expiry > now);

    // クリーンアップ（期限切れのデータを削除）
    if (validAuths.length !== authorized.length) {
      localStorage.setItem(AUTHORIZED_SONGS_KEY, JSON.stringify(validAuths));
    }

    return validAuths.some(auth => auth.songId === songId);
  } catch {
    return false;
  }
}

/**
 * 曲の認証を追加（24時間の有効期限付き）
 */
export function addAuthorization(songId: number): void {
  if (typeof window === 'undefined') return;

  try {
    const authorized: AuthData[] = JSON.parse(localStorage.getItem(AUTHORIZED_SONGS_KEY) || '[]');
    const now = Date.now();
    const expiry = now + (AUTH_EXPIRY_HOURS * 60 * 60 * 1000); // 24時間後

    // 既存の認証を削除して新しく追加（期限更新）
    const filtered = authorized.filter(auth => auth.songId !== songId && auth.expiry > now);
    filtered.push({ songId, expiry });

    localStorage.setItem(AUTHORIZED_SONGS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to add authorization:', error);
  }
}

/**
 * 曲の認証を削除
 */
export function removeAuthorization(songId: number): void {
  if (typeof window === 'undefined') return;

  try {
    const authorized: AuthData[] = JSON.parse(localStorage.getItem(AUTHORIZED_SONGS_KEY) || '[]');
    const filtered = authorized.filter((auth) => auth.songId !== songId);
    localStorage.setItem(AUTHORIZED_SONGS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove authorization:', error);
  }
}

/**
 * すべての認証をクリア
 */
export function clearAllAuthorizations(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(AUTHORIZED_SONGS_KEY);
  } catch (error) {
    console.error('Failed to clear authorizations:', error);
  }
}

/**
 * 期限切れの認証をすべてクリーンアップ
 */
export function cleanupExpiredAuthorizations(): void {
  if (typeof window === 'undefined') return;

  try {
    const authorized: AuthData[] = JSON.parse(localStorage.getItem(AUTHORIZED_SONGS_KEY) || '[]');
    const now = Date.now();
    const validAuths = authorized.filter(auth => auth.expiry > now);

    localStorage.setItem(AUTHORIZED_SONGS_KEY, JSON.stringify(validAuths));
  } catch (error) {
    console.error('Failed to cleanup expired authorizations:', error);
  }
}
