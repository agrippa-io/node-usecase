import { UseCase } from './UseCase';
export interface InterfaceUseCaseChainNode {
    key?: string;
    node: any;
    constructorArguments?: ((chainMap: Record<string, any>, ...args: any) => Array<any>) | ((chainMap: Record<string, any>, ...args: any) => Promise<Array<any>>);
}
export declare class UseCaseChain extends UseCase {
    private _chain;
    private resultsMappedByKey;
    constructor(chain: InterfaceUseCaseChainNode[]);
    get chain(): InterfaceUseCaseChainNode[];
    get chainMap(): any;
    setResultToKeyValue(key: string): void;
    setResultToChainMap(): void;
    perform(): Promise<void>;
}
