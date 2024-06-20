import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // 전체 메뉴를 조회
  const { data, error } = await client
    .from('TB_MENU')
    .select('*')
    .filter('useAt', 'eq', true)
    .order('sortOrdr');

  if (error) {
    console.error('Error fetching menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else if (!data) {
    return { statusCode: 404, message: '메뉴가 존재하지 않습니다.' };
  } else {
    return { statusCode: 200, message: '조회하였습니다.', menuInfo: data };
  }
});
