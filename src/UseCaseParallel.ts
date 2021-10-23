import Logger from '@agrippa-io/node-utils/src/Logger'

import UseCase from './UseCase'

export interface InterfaceUseCaseParallenNode<UseCaseType extends UseCase, UseCaseParameters> {
  node: new (UseCaseParameters) => UseCaseType
  parameters: UseCaseParameters
}

export type TypeUseCaseNodeArray = Array<InterfaceUseCaseParallenNode<UseCase, any>>

export interface InterfaceUseCaseParallelParameters {
  nodes: TypeUseCaseNodeArray
  ignoreRejects?: boolean
}

class UseCaseParallel extends UseCase {
  private useCases: TypeUseCaseNodeArray
  private ignoreRejects: boolean

  constructor(params: InterfaceUseCaseParallelParameters) {
    super()
    this.useCases = params.nodes
    this.ignoreRejects = params.ignoreRejects ?? false
  }

  async perform() {
    try {
      const instantiatedUseCases: UseCase[] = this.useCases.map((useCaseNode) => {
        Logger.info(`${useCaseNode.node.name} :: ${JSON.stringify(useCaseNode.parameters)}`)
        return new useCaseNode.node(useCaseNode.parameters)
      })

      let performPromises = instantiatedUseCases.map((useCaseInstance) => useCaseInstance.perform())

      if (this.ignoreRejects) {
        performPromises = performPromises.map((promiseElement) => promiseElement.catch((error) => error))
      }

      await Promise.all(performPromises)

      const data = {}

      instantiatedUseCases.forEach(
        (useCaseInstance) =>
          (data[useCaseInstance.constructor.name] = useCaseInstance.success
            ? useCaseInstance.result
            : useCaseInstance.error)
      )

      this.setSuccess(data)
    } catch (error) {
      this.setFailure(error)
    }
  }
}

export default UseCaseParallel
