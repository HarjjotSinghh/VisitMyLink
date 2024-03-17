import { neon } from '@neondatabase/serverless';
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
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const response = await sql`INSERT INTO public.redirects (redirect, slug) VALUES (${url.toString().trim()}, ${slug.toString().trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')})`;
    return new NextResponse(JSON.stringify({ status: 200, message: `✅ Link created successfully at:\nhttps://visitmyl.ink/${slug.toString().trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}` }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ status: 400, message: `❌ Link was not created. Something went wrong. Please try again.` }), { status: 400 });
  }
}

export const config = {
  runtime: 'edge',
};