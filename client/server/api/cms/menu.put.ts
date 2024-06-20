import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

interface MenuData {
  menuNm: Number
  menuId?: Number
  upperMenuId: Number
  level: Number
  url: String | null
  menuType: String
  pageType: String | null
  sortOrdr: String
  boardType: String
  useAt: Boolean
};

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  // 현재 데이터 조회
  let currentData: { data: MenuData | null } | null;
  try {
    currentData = await client
      .from('TB_MENU')
      .select('*')
      .eq('menuId', body.menuId)
      .single();
  } catch (error) {
    console.error('Error fetching existing data:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  }

  if (currentData.data) {
    delete (currentData.data as MenuData).menuId;
  }

  // 데이터 업데이트
  const updateData = {
    ...(currentData.data ? currentData.data : {}), // 기존 데이터의 모든 필드를 유지
    menuNm: body.menuNm,
    upperMenuId: body.upperMenuId,
    level: body.level,
    url: body.url,
    menuType: body.menuType,
    pageType: body.pageType,
    sortOrdr: body.sortOrdr,
    boardType: body.boardType,
    useAt: body.useAt,
  };
  if (body.menuType !== 'Menu') {
    updateData.url = `/${body.menuType.toLocaleLowerCase()}/${body.boardType.toLocaleLowerCase()}/${body.pageType.toLocaleLowerCase()}/${body.menuId}`;
  } else {
    updateData.url = null;
  }
  if (!body.boardType) delete updateData.boardType;
  if (!body.pageType) delete updateData.pageType;

  try {
    const { error } = await client
      .from('TB_MENU')
      .update(updateData as never)
      .eq('menuId', body.menuId);
    if (error) {
      console.error('Error updating menu:', error);
      return { statusCode: 500, message: 'Internal Server Error' };
    } else {
      return { statusCode: 200, message: '메뉴 정보를 성공적으로 업데이트했습니다.' };
    }
  } catch (error) {
    console.error('Error during update operation:', error);
    return { statusCode: 500, message: 'Internal Server Error' };
  }
});
