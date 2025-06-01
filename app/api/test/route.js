export async function GET() {
  console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  return Response.json({
    message: 'Environment variables loaded',
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL
  });
}