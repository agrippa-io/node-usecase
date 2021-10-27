export declare abstract class UseCase {
    protected _result: any;
    private _success;
    private _error;
    get success(): boolean;
    get result(): any;
    get error(): any;
    setSuccess(value: any): void;
    setFailure(error: any, result?: any): void;
    abstract perform(): Promise<void>;
}
