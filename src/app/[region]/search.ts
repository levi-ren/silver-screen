"use server";

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  "use server";
  const query = formData.get("query");
  if (!query) return;
  redirect(`/search?query=${query}`);
}
