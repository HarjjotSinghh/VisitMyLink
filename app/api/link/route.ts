import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`SELECT * from public.redirects`;
    return new NextResponse(JSON.stringify(response));
  }