import { NextRequest, NextResponse } from 'next/server';
import { getXataClient } from '@/lib/xata';

export async function GET(req: NextRequest, res: NextResponse) {
  const xataClient = getXataClient();
  const response = await xataClient.db["redirects"].select(["*"]).getMany();
  return new NextResponse(JSON.stringify(response));
}

export const runtime = "edge";