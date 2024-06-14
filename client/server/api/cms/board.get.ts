import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  if (!query.menuId) return { statusCode: 400, message: '조회할 메뉴의 아이디를 입력해주세요.' }; ;

  const { data, error } = await client
    .from('TB_BOARD')
    .select('*')
    .eq('menuId', query.menuId)
    .order('boardId');

  if (error) {
    console.error('Error fetching menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else if (!data) {
    return { statusCode: 404, message: '게시글이 존재하지 않습니다.' };
  } else {
    return { statusCode: 200, message: '조회하였습니다.', boardInfo: data };
  }
});
