import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface FileData {
  thumbId?: Number
  title: String
  attachmentType: String
  fileName: String
  filePath: String
  size: String
  uploadDate?: String
  fileUid: String
  useAt: Boolean
  sortOrdr: Number
  link: String
};
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  const insertData: FileData = {
    title: body.title,
    attachmentType: body.attachmentType,
    fileName: body.fileName,
    filePath: body.filePath,
    size: body.size,
    fileUid: body.fileUid,
    useAt: body.useAt,
    sortOrdr: body.sortOrdr,
    link: body.link,
  };

  const { data, error } = await client
    .from('TB_THUMBNAIL')
    .insert([insertData])
    .select();

  if (error) {
    console.error('Error adding menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else {
    console.log(data);
    return { statusCode: 201, message: '썸네일을 추가하였습니다.', thumbInfo: data[0] };
  }
});
