"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseChain = void 0;
const UseCase_1 = require("./UseCase");
class UseCaseChain extends UseCase_1.UseCase {
    _chain = [];
    resultsMappedByKey;
    constructor(chain) {
        super();
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
    async perform() {
        try {
            const finalResult = [];
            let previousResults = {};
            for (const useCase of this._chain) {
                const generatedConstructorArgs = await useCase.constructorArguments(this.resultsMappedByKey, previousResults);
                const generatedUseCase = new useCase.node(...generatedConstructorArgs);
                await generatedUseCase.perform();
                if (generatedUseCase.error) {
                    throw generatedUseCase.error;
                }
                previousResults = generatedUseCase.result;
                this.resultsMappedByKey[useCase.key] = previousResults;
                finalResult.push(generatedUseCase.result);
            }
            this.setSuccess(finalResult);
        }
        catch (error) {
            this.setFailure(error);
        }
    }
}
exports.UseCaseChain = UseCaseChain;
