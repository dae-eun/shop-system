import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface FileData {
  thumbId: Number
  title: string
  attachmentType: string
  fileName: string
  filePath: string
  size: string
  uploadDate?: string
  fileUid: string
  useAt: boolean
  sortOrdr: number
  link: string
};

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body: FileData[] = await readBody(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };
  if (!body || body.length === 0) return { statusCode: 400, message: '썸네일 아이디가 없습니다.' };

  for (const item of body) {
    const { data, error } = await client
      .from('TB_THUMBNAIL')
      .update({
        sortOrdr: item.sortOrdr,
        useAt: item.useAt,
      })
      .eq('thumbId', item.thumbId);

    if (error) {
      console.error(`Error updating thumbnail ${item.thumbId}:`, error);
      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }

  return { statusCode: 200, message: '썸네일 정보를 성공적으로 업데이트했습니다.' };
});
