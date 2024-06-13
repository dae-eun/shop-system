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
    menuNm: body.menuNm || currentData.data?.menuNm, // menuNm 필드 업데이트
    upperMenuId: body.upperMenuId || currentData.data?.upperMenuId, // upperMenuId 필드 업데이트
    level: body.level || currentData.data?.level, // level 필드 업데이트
    url: body.url || currentData.data?.url, // url 필드 업데이트
    menuType: body.menuType || currentData.data?.menuType, // menuType 필드 업데이트
    pageType: body.pageType, // pageType 필드 업데이트
    sortOrdr: body.sortOrdr || currentData.data?.sortOrdr, // sortOrdr 필드 업데이트
    useAt: body.useAt || currentData.data?.useAt, // useAt 필드 업데이트
  };

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
