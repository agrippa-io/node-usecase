"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
class UseCase {
    _result;
    _success = false;
    _error;
    get success() {
        return this._success;
    }
    get result() {
        return this._result;
    }
    get error() {
        return this._error;
    }
    setSuccess(value) {
        this._result = value;
        this._success = true;
    }
    setFailure(error, result = null) {
        this._error = error;
        this._success = false;
        this._result = result;
    }
}
exports.UseCase = UseCase;
