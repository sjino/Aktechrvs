import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 일반 클라이언트 (브라우저/서버 공용, RLS 적용)
export const supabase = createClient(url, anonKey);

// 관리자 클라이언트 (서버 전용, RLS 우회)
export const supabaseAdmin = createClient(url, serviceKey || anonKey);

export type Product = {
  id: number;
  category: "중고기계" | "신품기계" | "기계부품";
  type: string;
  manufacturer: string;
  model: string;
  description: string;
  specs: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
};
