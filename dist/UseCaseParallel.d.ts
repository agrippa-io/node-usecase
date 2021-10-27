import { UseCase } from './UseCase';
export interface InterfaceUseCaseParallenNode<UseCaseType extends UseCase, UseCaseParameters> {
    node: new (UseCaseParameters: any) => UseCaseType;
    parameters: UseCaseParameters;
}
export declare type TypeUseCaseNodeArray = Array<InterfaceUseCaseParallenNode<UseCase, any>>;
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
