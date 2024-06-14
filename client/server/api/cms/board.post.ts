import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface BoardData {
  menuId: Number
  title: String
  content: String
  writer: String
  editor: String
  useAt: Boolean
};
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };
  const { data: userData, error: userError } = await client
    .from('TB_USER')
    .select('userName')
    .eq('userUid', user.id);

  if (userError) {
    console.error('Error fetching user:', userError);
    return { statusCode: 500, message: 'Internal Server Error' };
  }

  const insertData: BoardData = {
    menuId: body.menuId,
    title: body.title,
    content: body.content,
    writer: userData[0].userName,
    editor: userData[0].userName,
    useAt: body.useAt,
  };
  const { error } = await client
    .from('TB_BOARD')
    .insert([insertData]);

  if (error) {
    console.error('Error adding menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else {
    return { statusCode: 201, message: '게시글을 작성하였습니다.' };
  }
});
