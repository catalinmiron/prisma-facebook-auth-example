// get user using auth0id
export default async (req, res, next, db) => {
  if (!req.user) return next()
  const user = await db.query.user({
    where: { facebookUserId: req.user.facebookUserId },
  })
  req.user = { token: req.user, ...user }
  next()
}
