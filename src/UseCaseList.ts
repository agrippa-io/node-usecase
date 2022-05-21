import { UseCase } from './UseCase'

export abstract class UseCaseList extends UseCase {
  private page = 0
  private pageSize = 10

  get skip(): number {
    return Math.max(this.page * this.pageSize, 0)
  }

  get limit(): number {
    return Math.abs(this.pageSize)
  }
}
