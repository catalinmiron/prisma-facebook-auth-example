"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function getUserId(context) {
    var Authorization = context.request.get('Authorization');
    if (Authorization) {
        var token = Authorization.replace('Bearer ', '');
        var userId = jwt.verify(token, process.env.APP_SECRET).userId;
        return userId;
    }
    throw new AuthError();
}
exports.getUserId = getUserId;
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError() {
        return _super.call(this, 'Not authorized') || this;
    }
    return AuthError;
}(Error));
exports.AuthError = AuthError;
//# sourceMappingURL=utils.js.map