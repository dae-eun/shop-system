import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface BoardData {
  menuId: Number
  boardId?: Number
  title: String
  content: String
  writer: String
  editor: String
  useAt: Boolean
  pin: Boolean
  regDate?: String
  modDate?: String
  attachmentData?: Array<any>
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

  // 현재 데이터 조회
  let currentData: { data: BoardData | null } | null;
  try {
    currentData = await client
      .from('TB_BOARD')
      .select('*')
      .eq('menuId', body.menuId)
      .eq('boardId', body.boardId)
      .single();
  } catch (error) {
    console.error('Error fetching existing data:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  }

  if (currentData.data) {
    delete (currentData.data as BoardData).boardId;
    delete (currentData.data as BoardData).regDate;
    delete (currentData.data as BoardData).modDate;
  }

  const updateData = {
    ...(currentData.data ? currentData.data : {}), // 기존 데이터의 모든 필드를 유지

    menuId: body.menuId,
    title: body.title,
    content: body.content,
    editor: userData[0].userName,
    useAt: body.useAt,
    pin: body.pin,
  };

  // uploadList가 있을 경우
  const uploadList = body.uploadList;
  if (uploadList && uploadList.length > 0) {
    for (const uploadFile of uploadList) {
      const { error } = await client
        .from('TB_ATTACHMENT')
        .update({ boardId: body.boardId })
        .match({ fileUid: uploadFile.fileUid });

      if (error) {
        console.error('Error updating attachment:', error);
        return { statusCode: 500, message: 'Internal Server Error' };
      }
    }
  }

  // deleteList가 있을 경우
  const deleteList = body.deleteList;
  if (deleteList && deleteList.length > 0) {
    for (const deleteFile of deleteList) {
      const { error } = await client
        .from('TB_ATTACHMENT')
        .update({ boardId: null })
        .match({ fileUid: deleteFile.fileUid });

      if (error) {
        console.error('Error deleting attachment:', error);
        return { statusCode: 500, message: 'Internal Server Error' };
      }
    }
  }

  try {
    const { error } = await client
      .from('TB_BOARD')
      .update(updateData as never)
      .eq('menuId', body.menuId)
      .eq('boardId', body.boardId);
    if (error) {
      console.error('Error updating menu:', error);
      return { statusCode: 500, message: 'Internal Server Error' };
    } else {
      return { statusCode: 200, message: '게시글을 성공적으로 업데이트했습니다.' };
    }
  } catch (error) {
    console.error('Error during update operation:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  }
});
