import { extractFragmentReplacements } from "prisma-binding"
import { Viewer } from "./Viewer"
import authenticate from "./Mutation/authenticate"
import Query from "./Query"

export const resolvers = {
  Query,
  Mutation: {
    authenticate,
  },
  Viewer,
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
