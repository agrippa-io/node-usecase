"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseList = void 0;
const UseCase_1 = require("./UseCase");
class UseCaseList extends UseCase_1.UseCase {
    constructor() {
        super(...arguments);
        this.page = 0;
        this.pageSize = 10;
    }
    get skip() {
        return Math.max(this.page * this.pageSize, 0);
    }
    get limit() {
        return Math.abs(this.pageSize);
    }
}
exports.UseCaseList = UseCaseList;
//# sourceMappingURL=UseCaseList.js.map