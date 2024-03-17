"use server"

import { getXataClient } from "@/lib/xata";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const xataClient = getXataClient();
  const response = await xataClient.db.redirects.select(["*"]).filter({ "slug": params.slug.toString() }).getFirst();
  // console.log(response);
  if (!response) {
    return redirect("/");
  }
  return redirect(response.redirect?.toString() ?? "/");
}
