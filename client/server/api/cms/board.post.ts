import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface BoardData {
  menuId: Number
  title: String
  content: String
  writer: String
  editor: String
  useAt: Boolean
  pin: Boolean
  attachmentData?: JSON
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
    pin: body.pin,
  };

  const { data, error } = await client
    .from('TB_BOARD')
    .insert([insertData])
    .select('boardId');

  if (error) {
    console.error('Error adding menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  }

  const uploadList = body.uploadList;
  if (uploadList && uploadList.length > 0) {
    for (const uploadFile of uploadList) {
      const { error } = await client
        .from('TB_ATTACHMENT')
        .update({ boardId: data[0].boardId })
        .match({ fileUid: uploadFile.fileUid });

      if (error) {
        console.error('Error updating attachment:', error);
        return { statusCode: 500, message: 'Internal Server Error' };
      }
    }
    return { statusCode: 201, message: '게시글을 작성하였습니다.' };
  }
  return { statusCode: 201, message: '게시글을 작성하였습니다.' };
});
