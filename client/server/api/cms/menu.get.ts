import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  let data, error;

  if (query.menuId) {
    // 특정 menuId에 맞는 데이터를 조회
    const { data: specificData, error: specificError } = await client
      .from('TB_MENU')
      .select('*')
      .eq('menuId', query.menuId);

    data = specificData;
    error = specificError;
  } else {
    // 전체 메뉴를 조회
    const { data: allData, error: allError } = await client
      .from('TB_MENU')
      .select('*');
    data = allData;
    error = allError;
  }

  if (error) {
    console.error('Error fetching menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else if (!data) {
    return { statusCode: 404, message: '메뉴가 존재하지 않습니다.' };
  } else {
    return { statusCode: 200, message: '조회하였습니다.', menuInfo: data };
  }
});
