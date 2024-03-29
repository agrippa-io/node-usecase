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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseParallel = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
const UseCase_1 = require("./UseCase");
class UseCaseParallel extends UseCase_1.UseCase {
    constructor(params) {
        var _a;
        super();
        this.useCases = params.nodes;
        this.ignoreRejects = (_a = params.ignoreRejects) !== null && _a !== void 0 ? _a : false;
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instantiatedUseCases = this.useCases.map((useCaseNode) => {
                    node_utils_1.Logger.info(`${useCaseNode.node.name} :: ${JSON.stringify(useCaseNode.parameters)}`);
                    return new useCaseNode.node(useCaseNode.parameters);
                });
                let performPromises = instantiatedUseCases.map((useCaseInstance) => useCaseInstance.perform());
                if (this.ignoreRejects) {
                    performPromises = performPromises.map((promiseElement) => promiseElement.catch((error) => error));
                }
                yield Promise.all(performPromises);
                const data = {};
                instantiatedUseCases.forEach((useCaseInstance) => (data[useCaseInstance.constructor.name] = useCaseInstance.success
                    ? useCaseInstance.result
                    : useCaseInstance.error));
                this.setSuccess(data);
            }
            catch (error) {
                this.setFailure(error);
            }
        });
    }
}
exports.UseCaseParallel = UseCaseParallel;
//# sourceMappingURL=UseCaseParallel.js.map