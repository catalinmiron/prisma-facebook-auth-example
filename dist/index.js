"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var prisma_1 = require("./generated/prisma");
var resolvers_1 = require("./resolvers");
var db = new prisma_1.Prisma({
    fragmentReplacements: resolvers_1.fragmentReplacements,
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: true,
});
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: resolvers_1.resolvers,
    context: function (req) { return (__assign({}, req, { db: db })); },
});
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
server.start(function (_a) {
    var port = _a.port;
    return console.log("Server is running on http://localhost:" + port);
});
//# sourceMappingURL=index.js.map