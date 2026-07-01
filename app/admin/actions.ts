"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function saveEvent(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const venue = formData.get("venue") as string;
  const date_time = formData.get("date_time") as string;
  const imageFile = formData.get("image_file") as File | null;
  const existingImageUrl = formData.get("existing_image_url") as string | null;

  const generatedSlug = generateSlug(title || "untitled-event");

  try {
    let finalImageUrl = existingImageUrl || null;

    if (imageFile && imageFile.size > 0) {
      const fileExtension = imageFile.name.split(".").pop();
      const fileName = `${generatedSlug}-${Date.now()}.${fileExtension}`;

      const fileBuffer = await imageFile.arrayBuffer();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("event-banners")
        .upload(fileName, fileBuffer, {
          contentType: imageFile.type,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("event-banners")
        .getPublicUrl(fileName);

      finalImageUrl = publicUrlData.publicUrl;
    }

    let error;

    if (id) {
      const { error: updateError } = await supabase
        .from("events")
        .update({
          title,
          slug: generatedSlug,
          description,
          image_url: finalImageUrl,
          venue,
          date_time,
          updated_at: new Date().toISOString(),
        })
        .eq("id", Number(id));

      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("events").insert([
        {
          title,
          slug: generatedSlug,
          description,
          image_url: finalImageUrl,
          venue,
          date_time,
        },
      ]);

      error = insertError;
    }

    if (error) throw error;

    revalidatePath("/");
    revalidatePath(`/events/${generatedSlug}`);

    return { success: true };
  } catch (error: any) {
    console.error("Database mutation failure:", error);
    return {
      success: false,
      error: error.message || "Failed to commit parameters to database.",
    };
  }
}
