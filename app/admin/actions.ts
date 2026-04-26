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

export async function createProduct(formData: FormData) {
  const imageFile = formData.get("image") as File | null;
  let image_url: string | null = null;

  if (imageFile && imageFile.size > 0) {
    image_url = await uploadImage(imageFile);
  }

  const { error } = await supabaseAdmin.from("products").insert({
    category: formData.get("category"),
    type: formData.get("type"),
    manufacturer: formData.get("manufacturer"),
    model: formData.get("model"),
    description: formData.get("description"),
    specs: parseSpecs(formData.get("specs") as string),
    image_url,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(id: number, formData: FormData) {
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existing_image_url") as string | null;

  let image_url: string | null = existingImageUrl || null;

  if (imageFile && imageFile.size > 0) {
    // 기존 이미지 삭제 후 새 이미지 업로드
    if (existingImageUrl) await deleteImage(existingImageUrl);
    image_url = await uploadImage(imageFile);
  }

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
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id: number) {
  // 이미지도 함께 삭제
  const { data } = await supabaseAdmin
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  if (data?.image_url) await deleteImage(data.image_url);

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/products");
  revalidatePath("/admin");
}
