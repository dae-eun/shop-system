import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  if (user !== null) {
    const { data, error } = await client
      .from('TB_USER')
      .select('*')
      .eq('userUid', user.id);

    if (error) {
      console.error('Error fetching user:', error);
      return { statusCode: 500, message: 'Internal Server Error' };
    }

    if (data && data.length > 0) {
      // 사용자가 이미 존재하는 경우
      return { statusCode: 200, message: '로그인에 성공하였습니다.', userInfo: data[0] };
    } else {
      // 사용자가 없는 경우
      return { statusCode: 201, message: '등록된 회원정보가 없습니다.' };
    }
  } else {
    // user가 null인 경우 처리
    return { statusCode: 401, message: 'Authentication required' };
  }
});
