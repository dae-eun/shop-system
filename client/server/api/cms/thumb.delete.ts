import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const thumbId = body.thumbId;

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  if (!thumbId) {
    return { statusCode: 400, message: '올바르지 않은 썸네일ID 입니다.' };
  }

  try {
    const { error } = await client
      .from('TB_THUMBNAIL')
      .delete()
      .eq('thumbId', thumbId)
      .single();

    if (error) throw error;

    return { statusCode: 200, message: '게시글을 삭제했습니다.' };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: 'Internal Server Error' };
  }
});
