
export const ctxUser = ctx => ctx.request.user

export const isLoggedIn = ctx => {
  if (!ctx.request.user) throw new Error(`Not logged in`)
  return ctxUser(ctx)
}

export const createPrismaUserFromFacebook = async (ctx, facebookUser) => {
  return ctx.db.mutation.createUser({
    data: {
      facebookUserId: facebookUser.id,
      name: facebookUser.name,
      first_name: facebookUser.first_name,
      last_name: facebookUser.last_name,
      locale: facebookUser.locale,
      birthday: facebookUser.birthday,
    },
  })
}
