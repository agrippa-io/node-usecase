"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UseCase_1 = __importDefault(require("./UseCase"));
class UseCaseChain extends UseCase_1.default {
    constructor(chain) {
        super();
        this._chain = [];
        this._chain = chain;
        this.resultsMappedByKey = {};
    }
    get chain() {
        return this._chain;
    }
    get chainMap() {
        return this.resultsMappedByKey;
    }
    setResultToKeyValue(key) {
        const keyedResult = this.resultsMappedByKey[key];
        if (keyedResult) {
            this._result = keyedResult;
        }
    }
    setResultToChainMap() {
        this._result = this.resultsMappedByKey;
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const finalResult = [];
                let previousResults = {};
                for (const useCase of this._chain) {
                    const generatedConstructorArgs = yield useCase.constructorArguments(this.resultsMappedByKey, previousResults);
                    const generatedUseCase = new useCase.node(...generatedConstructorArgs);
                    yield generatedUseCase.perform();
                    if (generatedUseCase.error) {
                        throw generatedUseCase.error;
                    }
                    previousResults = generatedUseCase.result;
                    this.resultsMappedByKey[useCase === null || useCase === void 0 ? void 0 : useCase.key] = previousResults;
                    finalResult.push(generatedUseCase.result);
                }
                this.setSuccess(finalResult);
            }
            catch (error) {
                this.setFailure(error);
            }
        });
    }
}
exports.default = UseCaseChain;
//# sourceMappingURL=UseCaseChain.js.map