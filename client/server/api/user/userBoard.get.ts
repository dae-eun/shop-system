import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  const { data, error } = await client
    .from('TB_MENU')
    .select('boardType, pageType, url')
    .eq('menuId', query.menuId);

  const { data: boardInfo, error: boardError, count } = await client
    .from('TB_BOARD')
    .select('*, attachment:TB_ATTACHMENT(filePath)', { count: 'exact' })
    .eq('menuId', query.menuId);

  if (error || boardError) {
    console.error('Error fetching menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else if (!data) {
    return { statusCode: 404, message: '게시판이 존재하지 않습니다.' };
  } else {
    return { statusCode: 200, message: '조회하였습니다.', menuInfo: data[0], boardInfo: { boardInfo, count } };
  }
});
