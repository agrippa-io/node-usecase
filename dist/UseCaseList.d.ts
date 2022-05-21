import { UseCase } from './UseCase';
export declare abstract class UseCaseList extends UseCase {
    private _page;
    private _pageSize;
    set page(value: number);
    set pageSize(value: number);
    get page(): number;
    get pageSize(): number;
    get limit(): number;
    get skip(): number;
}
