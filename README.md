# UseCases
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
