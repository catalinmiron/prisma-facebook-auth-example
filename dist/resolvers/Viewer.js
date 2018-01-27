"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../utils/auth");
exports.Viewer = {
    me: function (_, args, ctx, info) {
        var facebookUserId = auth_1.isLoggedIn(ctx).facebookUserId;
        return ctx.db.query.user({ where: { facebookUserId: facebookUserId } }, info);
    },
};
//# sourceMappingURL=Viewer.js.map