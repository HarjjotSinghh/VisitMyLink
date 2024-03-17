import { getXataClient } from '@/lib/xata';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  if (!req.body) {
    return new NextResponse(JSON.stringify({ error: 'Request body not provided.' }), { status: 400 });
  }
  const data = await req.json()
  const slug = data.slug
  const url = data.url
  if (!slug) {
    return new NextResponse(JSON.stringify({ error: 'Slug not provided.' }), { status: 400 });
  }
  if (!url) {
    return new NextResponse(JSON.stringify({ error: 'URL not provided.' }), { status: 400 });
  }
  const xataClient = getXataClient();
  try {
    const response = await xataClient.db["redirects"].create({
      redirect: url.toString().trim(),
      slug: slug.toString().trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
    });
    // const response = await sql`INSERT INTO public.redirects (redirect, slug) VALUES (${url.toString().trim()}, ${slug.toString().trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')})`;
    return new NextResponse(JSON.stringify({ status: 200, message: `✅ Link created successfully at:\nhttps://visitmyl.ink/${slug.toString().trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}` }), { status: 200 });
  } catch (error: any) {
    // console.error(error);
    if (error.message.includes("column [slug]: is not unique")) {
      return new NextResponse(JSON.stringify({ status: 400, message: `❌ Link was not created. A link with title "${slug.toString().trim()}" already exists.` }), { status: 400 });
    }
    return new NextResponse(JSON.stringify({ status: 400, message: `❌ Link was not created. ${error.message}` }), { status: 400 });
  }
}

export const runtime = "edge";