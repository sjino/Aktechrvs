"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { createAuthClient } from "@/lib/supabase-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from("product-images")
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) {
    console.error("이미지 업로드 실패:", error.message);
    return null;
  }

  const { data } = supabaseAdmin.storage
    .from("product-images")
    .getPublicUrl(filename);

  return data.publicUrl;
}

async function deleteImage(imageUrl: string) {
  const filename = imageUrl.split("/").pop();
  if (!filename) return;
  await supabaseAdmin.storage.from("product-images").remove([filename]);
}

function parseSpecs(raw: string): string[] {
  return raw.split("\n").map((s) => s.trim()).filter(Boolean);
}

// ImageManager에서 파일 선택 즉시 호출 — URL 반환
export async function uploadSingleImage(formData: FormData): Promise<string | null> {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return null;
  return uploadImage(file);
}

export async function createProduct(formData: FormData) {
  const image_urls = (formData.getAll("image_urls") as string[]).filter(Boolean);
  const image_url = image_urls[0] ?? null;

  const { error } = await supabaseAdmin.from("products").insert({
    category: formData.get("category"),
    type: formData.get("type"),
    manufacturer: formData.get("manufacturer"),
    model: formData.get("model"),
    description: formData.get("description"),
    specs: parseSpecs(formData.get("specs") as string),
    image_url,
    image_urls,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(id: number, formData: FormData) {
  const image_urls = (formData.getAll("image_urls") as string[]).filter(Boolean);
  const image_url = image_urls[0] ?? null;

  // 제거된 이미지를 스토리지에서 삭제
  const { data: current } = await supabaseAdmin
    .from("products")
    .select("image_url, image_urls")
    .eq("id", id)
    .single();

  const originalUrls: string[] = current?.image_urls?.length
    ? current.image_urls
    : current?.image_url
    ? [current.image_url]
    : [];

  const removed = originalUrls.filter((url) => !image_urls.includes(url));
  await Promise.all(removed.map(deleteImage));

  const { error } = await supabaseAdmin
    .from("products")
    .update({
      category: formData.get("category"),
      type: formData.get("type"),
      manufacturer: formData.get("manufacturer"),
      model: formData.get("model"),
      description: formData.get("description"),
      specs: parseSpecs(formData.get("specs") as string),
      image_url,
      image_urls,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id: number) {
  const { data } = await supabaseAdmin
    .from("products")
    .select("image_url, image_urls")
    .eq("id", id)
    .single();

  const allUrls: string[] = [
    ...(data?.image_urls ?? []),
    ...(data?.image_url && !data?.image_urls?.includes(data.image_url)
      ? [data.image_url]
      : []),
  ];
  await Promise.all(allUrls.map(deleteImage));

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/products");
  revalidatePath("/admin");
}
