import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  // 전체 메뉴를 조회
  const { data, error } = await client
    .from('TB_THUMBNAIL')
    .select('*')
    .filter('useAt', 'eq', true)
    .order('sortOrdr', { ascending: true });

  if (error) {
    console.error('Error fetching thumnail:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else {
    return { statusCode: 200, message: '조회하였습니다.', thumbInfo: data };
  }
});
