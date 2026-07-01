"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { EventData } from "@/types/events";

export async function fetchEvents(): Promise<EventData[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      title,
      description,
      image_url,
      venue,
      date_time,
      slug,
      created_at,
      updated_at,
      registrations ( id )
    `,
    )
    .order("date_time", { ascending: true });

  if (error || !data) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data.map((event: any) => {
    const totalParticipants = event.registrations?.length || 0;

    const formattedDate = new Date(event.date_time).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    );

    return {
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      venue: event.venue,
      dateTime: event.date_time,
      createdAt: event.created_at,
      updatedAt: event.updated_at,
      image: event.image_url || undefined,
      timeDate: formattedDate,
      totalParticipants,
    };
  });
}

export async function submitRegistration(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const eventId = formData.get("eventId");
  const name = formData.get("name");
  const email = formData.get("email");
  const phone_number = formData.get("phone_number");
  const profession = formData.get("profession");
  const institute_name = formData.get("institute_name");

  try {
    const { error } = await supabase.from("registrations").insert([
      {
        event_id: Number(eventId),
        name,
        email,
        phone_number,
        profession,
        institute_name,
      },
    ]);

    if (error) throw error;

    revalidatePath(`/events/${eventId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message || "Database execution failed.",
    };
  }
}
