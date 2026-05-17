"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseParallel = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
const UseCase_1 = require("./UseCase");
class UseCaseParallel extends UseCase_1.UseCase {
    useCases;
    ignoreRejects;
    constructor(params) {
        super();
        this.useCases = params.nodes;
        this.ignoreRejects = params.ignoreRejects ?? false;
    }
    async perform() {
        try {
            const instantiatedUseCases = this.useCases.map((useCaseNode) => {
                node_utils_1.Logger.info(`${useCaseNode.node.name} :: ${JSON.stringify(useCaseNode.parameters)}`);
                return new useCaseNode.node(useCaseNode.parameters);
            });
            let performPromises = instantiatedUseCases.map((useCaseInstance) => useCaseInstance.perform());
            if (this.ignoreRejects) {
                performPromises = performPromises.map((promiseElement) => promiseElement.catch((error) => error));
            }
            await Promise.all(performPromises);
            const data = {};
            instantiatedUseCases.forEach((useCaseInstance) => (data[useCaseInstance.constructor.name] = useCaseInstance.success
                ? useCaseInstance.result
                : useCaseInstance.error));
            this.setSuccess(data);
        }
        catch (error) {
            this.setFailure(error);
        }
    }
}
exports.UseCaseParallel = UseCaseParallel;
