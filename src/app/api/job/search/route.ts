import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const supabase =  createClient();
  const { searchParams } = new URL(request.url);
  const jobTitle = searchParams.get('job_title') ?? '';

  if (!jobTitle) {
    return NextResponse.json({ error: 'Missing job_title param' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('job')  // nama tabel contoh: jobs
    .select('*')
    .ilike('job_title', `%${jobTitle}%`); // search case-insensitive LIKE

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ results: data });
}
