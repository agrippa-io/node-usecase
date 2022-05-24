"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseList = void 0;
const UseCase_1 = require("./UseCase");
class UseCaseList extends UseCase_1.UseCase {
    constructor() {
        super(...arguments);
        this._page = 0;
        this._pageSize = 10;
    }
    set page(value) {
        this._page = value;
    }
    set pageSize(value) {
        this._pageSize = value;
    }
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    get page() {
        var _a;
        return Math.max((_a = this._page) !== null && _a !== void 0 ? _a : 0, 0);
    }
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    get pageSize() {
        var _a;
        return (_a = this._pageSize) !== null && _a !== void 0 ? _a : 10;
    }
    get limit() {
        return Math.abs(this.pageSize);
    }
    get skip() {
        return Math.max(this.page * this.pageSize, 0);
    }
}
exports.UseCaseList = UseCaseList;
//# sourceMappingURL=UseCaseList.js.map