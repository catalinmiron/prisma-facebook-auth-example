import { Context } from "../utils/types"
import { isLoggedIn } from "../utils/auth"

export const Viewer = {
  me(_, args, ctx: Context, info) {
    const { facebookUserId } = isLoggedIn(ctx)
    return ctx.db.query.user({ where: { facebookUserId } }, info)
  },
}
