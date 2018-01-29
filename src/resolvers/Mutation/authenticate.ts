import * as jwt from "jsonwebtoken"
import { isNil } from "ramda"
import { Context } from "../../utils/types"
import { getFacebookUser } from "../../utils/facebook"
import { createPrismaUserFromFacebook } from "../../utils/auth"

export default async (parent, { idToken }, ctx: Context, info) => {
  let user = null
  try {
    const facebookUser = await getFacebookUser(idToken)
    user = await ctx.db.query.user(
      { where: { facebookUserId: facebookUser.id } },
      info,
    )

    if (isNil(user)) {
      user = await createPrismaUserFromFacebook(ctx, facebookUser)
    }
    return {
      ...user,
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    }
  } catch (error) {
    throw new Error(error)
  }
}
