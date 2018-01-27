import { GraphQLServer } from "graphql-yoga"
import { Prisma } from "./generated/prisma"
import { resolvers, fragmentReplacements } from "./resolvers"
import checkJWT from "./middleware/check-jwt"
import getUser from "./middleware/get-user"

const db = new Prisma({
  fragmentReplacements,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true, // log all GraphQL queries & mutations
})

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db,
  }),
})

// server.express.post(
//   server.options.endpoint,
//   checkJWT,
//   (err, req, res, next) => {
//     if (err) return res.status(401).send(err.message)
//     next()
//   },
// )

// server.express.post(server.options.endpoint, (req, res, next) =>
//   getUser(req, res, next, db),
// )

server.start(({ port }) =>
  console.log(`Server is running on http://localhost:${port}`),
)
