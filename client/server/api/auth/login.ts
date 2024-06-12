import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  console.log(user);

  const { data } = await client.from('TB_USER')
    .select()
    .eq('email', user?.email)
    .eq('password', user.password);

  return data;
});

// import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
// import { createError } from 'h3';

// export default defineEventHandler(async (event) => {
//   const user = await serverSupabaseUser(event);
//   const client = await serverSupabaseClient(event);

//   const { data, error } = await client.from('TB_USER')
//     .select('id, title, completed')
//     .eq('email', user.email);
//   if (error) {
//     throw createError({ statusMessage: error.message });
//   }

//   return data;
// });
