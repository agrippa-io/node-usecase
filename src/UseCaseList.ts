import { UseCase } from './UseCase'

export abstract class UseCaseList extends UseCase {
  private _page = 0
  private _pageSize = 10

  set page(value: number) {
    this._page = value
  }

  set pageSize(value: number) {
    this._pageSize = value
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get page(): number {
    return Math.max(this._page ?? 0, 0)
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get pageSize(): number {
    return this._pageSize ?? 10
  }

  get limit(): number {
    return Math.abs(this.pageSize)
  }

  get skip(): number {
    return Math.max(this.page * this.pageSize, 0)
  }
}
