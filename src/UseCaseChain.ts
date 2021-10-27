import { UseCase } from './UseCase'

export interface InterfaceUseCaseChainNode {
  key?: string
  node: any
  constructorArguments?:
    | ((chainMap: Record<string, any>, ...args: any) => Array<any>)
    | ((chainMap: Record<string, any>, ...args: any) => Promise<Array<any>>)
}

export class UseCaseChain extends UseCase {
  private _chain: InterfaceUseCaseChainNode[] = []
  private resultsMappedByKey: Record<string, any>

  constructor(chain: InterfaceUseCaseChainNode[]) {
    super()
    this._chain = chain
    this.resultsMappedByKey = {}
  }

  get chain(): InterfaceUseCaseChainNode[] {
    return this._chain
  }

  get chainMap(): any {
    return this.resultsMappedByKey
  }

  setResultToKeyValue(key: string) {
    const keyedResult = this.resultsMappedByKey[key]

    if (keyedResult) {
      this._result = keyedResult
    }
  }

  setResultToChainMap() {
    this._result = this.resultsMappedByKey
  }

  async perform(): Promise<void> {
    try {
      const finalResult: any[] = []
      let previousResults: any = {}

      for (const useCase of this._chain) {
        const generatedConstructorArgs = await useCase.constructorArguments(this.resultsMappedByKey, previousResults)
        const generatedUseCase = new useCase.node(...generatedConstructorArgs)

        await generatedUseCase.perform()

        if (generatedUseCase.error) {
          throw generatedUseCase.error
        }

        previousResults = generatedUseCase.result

        this.resultsMappedByKey[useCase?.key] = previousResults

        finalResult.push(generatedUseCase.result)
      }

      this.setSuccess(finalResult)
    } catch (error) {
      this.setFailure(error)
    }
  }
}
