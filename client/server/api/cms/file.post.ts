import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface FileData {
  boardId: Number
  attachmentType: String
  fileName: String
  filePath: String
  size: Number
  fileUid: String
};
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  const insertData: FileData = {
    boardId: body.boardId,
    attachmentType: body.attachmentType,
    fileName: body.fileName,
    filePath: body.filePath,
    size: body.size,
    fileUid: body.fileUid,
  };

  const { data, error } = await client
    .from('TB_ATTACHMENT')
    .insert([insertData])
    .select();

  if (error) {
    console.error('Error adding menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else {
    return { statusCode: 201, message: '파일을 추가하였습니다.', attachmentData: data[0] };
  }
});
