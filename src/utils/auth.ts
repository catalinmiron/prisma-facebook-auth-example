import * as moment from "moment"
import { isNil, pickBy, path, ifElse, equals } from "ramda"

export const ctxUser = ctx => ctx.request.user

export const isLoggedIn = ctx => {
  if (!ctx.request.user) throw new Error(`Not logged in`)
  return ctxUser(ctx)
}

export const createPrismaUserFromFacebook = async (ctx, facebookUser) => {
  const education =
    facebookUser.education &&
    facebookUser.education.map(e => ({
      type: e.type,
      name: e.school.name,
    }))

  const work =
    facebookUser.work &&
    facebookUser.work.map(w => ({
      employer: w.employer.name,
      location: w.location.name,
      position: w.position.name,
    }))

  const gender = path(["gender"], facebookUser)
  const maleOrFemale = gender === "male" ? "MALE" : "FEMALE"

  const userWithKeys = {
    facebookUserId: facebookUser.id,
    name: facebookUser.name,
    first_name: facebookUser.first_name,
    last_name: facebookUser.last_name,
    gender: maleOrFemale,
    locale: facebookUser.locale,
    email: path(["email"], facebookUser),
    birthday: moment(path(["birthday"], facebookUser)),
    education: {
      create: education,
    },
    work: {
      create: work,
    },
    photos: {
      create: {
        url: path(["picture", "data", "url"], facebookUser),
      },
    },
    lastLogin: moment(),
  }
  var isNotNil = val => !isNil(val)
  const userWithoutNullKeys = pickBy(isNotNil, userWithKeys)
  return ctx.db.mutation.createUser({ data: userWithoutNullKeys })
}
