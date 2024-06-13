import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  if (user !== null) {
    // Check if user with the same userUid already exists
    const { data: existingUsers, error: checkError } = await client
      .from('TB_USER')
      .select('userUid')
      .eq('userUid', user.id);

    if (checkError) {
      console.error('Error checking existing user:', checkError);
      return { statusCode: 500, message: 'Internal Server Error' };
    }

    if (existingUsers.length > 0) {
      // User with the same userUid already exists
      return { statusCode: 409, message: '이미 가입한 계정입니다.' };
    }

    const insertData = {
      userName: body.userName || '',
      email: user.email || '',
      phoneNumber: body.phoneNumber || '',
      postNum: body.postNum || '',
      addr1: body.addr1 || '',
      addr2: body.addr2 || '',
      userUid: user.id,
    };

    const { data, error } = await client
      .from('TB_USER')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Error during user registration:', error);
      return { statusCode: 500, message: 'Internal Server Error' };
    } else {
      return { statusCode: 201, message: '가입되었습니다.', userInfo: data[0] };
    }
  } else {
    // User is not authenticated
    return { statusCode: 401, message: 'Authentication required' };
  }
});
