import { forwardTo } from "prisma-binding"
import { Context } from "../utils/types"

export default {
  users: forwardTo("db"),
}
