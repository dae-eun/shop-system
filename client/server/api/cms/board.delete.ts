import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const boardId = body.boardId;

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  if (!boardId) {
    return { statusCode: 400, message: '올바르지 않은 게시글번호 입니다.' };
  }

  try {
    const { error } = await client
      .from('TB_BOARD')
      .delete()
      .in('boardId', [boardId]);

    if (error) throw error;

    return { statusCode: 200, message: '게시글을 삭제했습니다.' };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: 'Internal Server Error' };
  }
});
