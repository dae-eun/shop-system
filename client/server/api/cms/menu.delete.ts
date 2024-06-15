import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const menuId = body.menuId;

  if (!user) return { statusCode: 401, message: 'Authentication required' };

  if (!menuId) {
    return { statusCode: 400, message: '메뉴아이디를 입력해주세요.' };
  }

  async function deleteMenusRecursively(menuIdsToDelete: number[]) {
    if (menuIdsToDelete.length === 0) return;

    // Get all child menus of the current menus to delete
    const { data: childMenus, error: childError } = await client
      .from('TB_MENU')
      .select('menuId')
      .in('upperMenuId', menuIdsToDelete);

    if (childError) {
      console.error('하위항목을 불러오는데 실패하였습니다.:', childError);
      throw childError;
    }

    const childMenuIdsToDelete = childMenus.map(menu => menu.menuId);

    const { error: deleteError } = await client
      .from('TB_MENU')
      .delete()
      .in('menuId', menuIdsToDelete);

    if (deleteError) {
      console.error('삭제에 실패했습니다.:', deleteError);
      throw deleteError;
    }

    await deleteMenusRecursively(childMenuIdsToDelete);
  }

  try {
    await deleteMenusRecursively([menuId]);
    return { statusCode: 200, message: '메뉴와 하위 항목들을 삭제했습니다.' };
  } catch (err) {
    console.error(err);
    console.log('실패');
    return { statusCode: 500, message: 'Internal Server Error' };
  }
});
