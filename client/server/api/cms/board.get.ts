import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  if (!query.menuId) {
    return { statusCode: 400, message: '조회할 메뉴의 아이디를 입력해주세요.' };
  }

  const { data: boardsData, error: boardsError } = await client
    .from('TB_BOARD')
    .select('*')
    .eq('menuId', query.menuId)
    .order('boardId', { ascending: false });

  if (boardsError) {
    console.error('Error fetching boards:', boardsError);
    return { statusCode: 500, message: 'Internal Server Error' };
  }

  const boardInfoPromises = boardsData.map((board: { boardId: number }) => {
    return Promise.resolve(
      client
        .from('TB_ATTACHMENT')
        .select('*')
        .filter('boardId', 'eq', board.boardId),
    )
      .then(attachmentData => ({
        ...board,
        attachmentData: attachmentData ? attachmentData.data : [],
      }))
      .catch((error: any) => {
        console.error('Error fetching attachments for board:', error);
        return {
          ...board,
          attachmentData: [],
        };
      });
  });

  const boardInfos = await Promise.all(boardInfoPromises);

  return { statusCode: 200, message: '조회하였습니다.', boardInfo: boardInfos };
});
