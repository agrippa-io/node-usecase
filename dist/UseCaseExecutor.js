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
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("../Logger"));
const ExpressRequestMongooseUtil_1 = __importDefault(require("../MongooseModeler/utils/ExpressRequestMongooseUtil"));
const Hydrator_1 = __importDefault(require("../MongooseModeler/utils/Hydrator"));
const Serializer_1 = __importDefault(require("../MongooseModeler/utils/Serializer"));
const ResponseHelper_1 = __importDefault(require("../ResponseHelper"));
class UseCaseExecutor {
    static hydrate(request, options, result) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootModel, rootModelByIndex } = options;
            const queryBuilder = new ExpressRequestMongooseUtil_1.default(request);
            const queryOptions = queryBuilder.requestOptions();
            const fields = queryOptions.fields || [];
            return yield Hydrator_1.default.populate(result, fields, {
                rootModel,
                rootModelByIndex,
            });
        });
    }
    static renderUseCase(UseCase, request, response, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const info = options.additionalInfo || {};
            if (UseCase.success) {
                const populated = yield this.hydrate(request, options, UseCase.result);
                let transformed;
                if (options.transform) {
                    const pathToModels = options.pathToModels || path_1.default.join(__dirname, '../../models');
                    const serializer = Serializer_1.default.getSerializer(pathToModels, options.rootModel);
                    transformed = yield ((_a = serializer === null || serializer === void 0 ? void 0 : serializer.transform) === null || _a === void 0 ? void 0 : _a.call(serializer, populated));
                }
                ResponseHelper_1.default.success(response, 'Success!', transformed || populated, info);
            }
            else {
                ResponseHelper_1.default.internalServerError(response, UseCase.error, UseCase.result, info);
            }
        });
    }
    execute(useCaseClass, useCaseArguments, request, response, options) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.default.info(`${useCaseClass.name} :: ${JSON.stringify(useCaseArguments)}`);
            const useCase = new useCaseClass(useCaseArguments);
            yield useCase.perform();
            yield UseCaseExecutor.renderUseCase(useCase, request, response, options);
        });
    }
}
exports.default = UseCaseExecutor;
//# sourceMappingURL=UseCaseExecutor.js.map