/** Cộng đồng bước 02 — dùng chung cho Process và popup thành công. */
export const COMMUNITY_URL = "https://www.facebook.com/groups/tinhoatuchu";

/**
 * Nơi nhận hồ sơ (Apps Script / Formspree / n8n webhook...).
 * CHƯA CÓ → form vẫn chạy và vẫn hiện popup, nhưng KHÔNG lưu được gì.
 * Đặt NEXT_PUBLIC_FORM_ENDPOINT trong .env.local rồi deploy lại.
 */
export const FORM_ENDPOINT: string | null =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? null;
