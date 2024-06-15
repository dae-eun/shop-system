import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  if (!query.attachmentId) return { statusCode: 400, message: '파일의 아이디가 없습니다.' }; ;

  // 특정 menuId에 맞는 데이터를 조회
  const { data, error } = await client
    .from('TB_ATTACHMENT')
    .select('*')
    .eq('attachmentId', query.attachmentId);

  if (error) {
    console.error('Error fetching menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else if (!data) {
    return { statusCode: 404, message: '파일이 존재하지 않습니다.' };
  } else {
    return { statusCode: 200, message: '조회하였습니다.', fileInfo: data };
  }
});
