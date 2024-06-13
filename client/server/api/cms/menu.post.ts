import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface MenuData {
  menuNm: Number
  upperMenuId: Number
  level: Number
  url: String | null
  menuType: String
  pageType: String | null
  sortOrdr: String
  useAt: Boolean
};
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  const insertData: MenuData = {
    menuNm: body.menuNm,
    upperMenuId: body.upperMenuId,
    level: body.level,
    url: body?.url ?? null,
    menuType: body.menuType,
    pageType: body?.pageType ?? null,
    sortOrdr: body.sortOrdr,
    useAt: body.useAt,
  };

  const { data, error } = await client
    .from('TB_MENU')
    .insert([insertData]);

  if (error) {
    console.error('Error adding menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else {
    return { statusCode: 201, message: '메뉴를 추가하였습니다.', menuInfo: data };
  }
});
