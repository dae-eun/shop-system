import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface MenuData {
  menuNm: String
  upperMenuId: Number
  level: Number
  url: String | null
  menuType: String
  pageType?: String | null
  sortOrdr: String
  boardType?: String
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
    url: null,
    menuType: body.menuType,
    sortOrdr: body.sortOrdr,
    useAt: body.useAt,
  };

  if (insertData.menuType !== 'Menu' && body.boardType) Object.assign(insertData, { boardType: body.boardType });
  if (insertData.menuType !== 'Menu' && body.pageType) Object.assign(insertData, { pageType: body.pageType });

  const { data, error } = await client
    .from('TB_MENU')
    .insert([insertData])
    .select('menuId');

  if (insertData.menuType !== 'Menu') {
    if (data && data[0]) {
      const updateData = {
        url: `/${insertData.menuType.toLocaleLowerCase()}/${insertData.pageType?.toLocaleLowerCase()}/${data[0].menuId}`,
      };
      const { error } = await client
        .from('TB_MENU')
        .update(updateData as never)
        .eq('menuId', data[0].menuId);

      if (error) {
        console.error('Error adding menu:', error);
        return { statusCode: 500, message: 'Internal Server Error' };
      } else {
        return { statusCode: 201, message: '메뉴를 추가하였습니다.' };
      }
    } else {
      console.error('Error adding menu: Data is null');
      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }

  if (error) {
    console.error('Error adding menu:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  } else {
    return { statusCode: 201, message: '메뉴를 추가하였습니다.' };
  }
});
