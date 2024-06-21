import { serverSupabaseClient } from '#supabase/server';

interface QueryData {
  menuId: number
  boardId: number
  pageSize: number
  page: number
}
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query: QueryData = getQuery(event);
  console.log(query);
  if (!query.boardId) {
    if (!query.menuId) {
      return { statusCode: 400, message: 'Invalid menuId' };
    }
    const { data: menuInfo, error: isMenuError } = await client
      .from('TB_MENU')
      .select('boardType, pageType, url, menuNm')
      .eq('menuId', query.menuId)
      .single();

    if (isMenuError) return { statusCode: 500, message: 'Internal Server Error' };
    if (!menuInfo) return { statusCode: 404, message: '게시판이 존재하지 않습니다.' };

    const pageSize = query.pageSize || 10;
    const page = query.page || 1;
    const start = (page - 1) * pageSize;

    const { data: boardInfo, error: isBoardError, count } = await client
      .from('TB_BOARD')
      .select('boardId, writer, menuId, regDate, title, attachment:TB_ATTACHMENT(filePath) ', { count: 'exact' })
      .eq('menuId', query.menuId)
      .range(start, start + pageSize - 1)
      .order('regDate', { ascending: false });

    if (isBoardError) return { statusCode: 500, message: 'Internal Server Error' };
    if (!boardInfo) return { statusCode: 404, message: '게시글이 존재하지 않습니다.' };

    return { statusCode: 200, message: '조회하였습니다.', menuInfo, boardInfo: { boardInfo, count } };
  } else if (query.boardId) {
    const { data: boardInfo, error: boardError } = await client
      .from('TB_BOARD')
      .select('*, attachment:TB_ATTACHMENT(filePath)')
      .eq('boardId', query.boardId)
      .single();

    if (boardError) return { statusCode: 500, message: 'Internal Server Error' };
    if (!boardInfo) return { statusCode: 404, message: '게시글이 존재하지 않습니다.' };

    return { statusCode: 200, message: '조회하였습니다.', boardInfo };
  }
});
