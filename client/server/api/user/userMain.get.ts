import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  const { data: thumbInfo, error: thumbError } = await client
    .from('TB_THUMBNAIL')
    .select('filePath, title')
    .filter('useAt', 'eq', true)
    .order('sortOrdr', { ascending: true });

  // 전체 메뉴를 조회
  const { data, error } = await client
    .from('TB_MENU')
    .select(`
        *,
        boardInfo:TB_BOARD(boardId, title, regDate, attachment:TB_ATTACHMENT(filePath))
    `)
    .filter('useAt', 'eq', true)
    .filter('menuType', 'eq', 'Board')
    .filter('TB_BOARD.pin', 'eq', true)
    .order('sortOrdr');

  if (error) {
    console.error('Error fetching menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else if (thumbError) {
    console.error('Error fetching thumbnail:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else if (!data) {
    return { statusCode: 404, message: '메뉴가 존재하지 않습니다.' };
  } else {
    return { statusCode: 200, message: '조회하였습니다.', menuInfo: data, thumbInfo };
  }
});
