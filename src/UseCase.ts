export abstract class UseCase {
  protected _result: any
  private _success = false
  private _error: any

  get success(): boolean {
    return this._success
  }

  get result(): any {
    return this._result
  }

  get error(): any {
    return this._error
  }

  setSuccess(value: any) {
    this._result = value
    this._success = true
  }

  setFailure(error: any, result: any = null) {
    this._error = error
    this._success = false
    this._result = result
  }

  abstract perform(): Promise<void>
}
