"use server"
export default async function Page({ params }: { params: { slug: string } }) {
  return <>{params.slug}</>;
}
