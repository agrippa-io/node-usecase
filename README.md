# UseCases

> [!IMPORTANT]
> **Frozen (2026-11): bug fixes only.** This package serves the Mongo-era
> services (`node-event-handler`, `node-service-project-generation`). New
> services should not depend on it. Replacement: nothing: new services do not use this abstraction. See
> [shared-libs-1](https://github.com/agrippa-io/agrippa-stack/tree/develop/epics/shared-libs-1).

The `UseCases` library is used to create re-usable actions that represent
executing the logic for carrying out operations specific to a `UseCase
`. Included in the library are `UseCaseChain` and `UseCaseParallel` used to
 execute `UseCase`s in `Series` or `Parallel`.

## UseCase (Base Class)
`UseCase` is a `Base Class` that should be extended to implement actions in
your API. A `UseCase` can have a number of `UseCase`s as children and follow
the `Single Responsibity` design-pattern.

### UseCase - Single

### UseCase - With Child UseCases

## UseCaseChain

## UseCaseParallel
