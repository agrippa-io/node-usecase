import { UseCase } from './UseCase';
export interface InterfaceUseCaseParallenNode<UseCaseType extends UseCase, UseCaseParameters> {
    node: new (params: UseCaseParameters) => UseCaseType;
    parameters: UseCaseParameters;
}
export type TypeUseCaseNodeArray = Array<InterfaceUseCaseParallenNode<UseCase, any>>;
export interface InterfaceUseCaseParallelParameters {
    nodes: TypeUseCaseNodeArray;
    ignoreRejects?: boolean;
}
export declare class UseCaseParallel extends UseCase {
    private useCases;
    private ignoreRejects;
    constructor(params: InterfaceUseCaseParallelParameters);
    perform(): Promise<void>;
}
