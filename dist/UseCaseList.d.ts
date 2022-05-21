import { UseCase } from './UseCase';
export declare abstract class UseCaseList extends UseCase {
    private page;
    private pageSize;
    get skip(): number;
    get limit(): number;
}
