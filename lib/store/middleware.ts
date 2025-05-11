import type { StateCreator, StoreMutatorIdentifier } from "zustand"

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(f: StateCreator<T, [], []>, name?: string) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...args) => {
    const prevState = get()
    set(...args)
    const nextState = get()

    // Skip logging if state didn't change
    if (prevState === nextState) return

    // Find what changed
    const changes: Record<string, { from: any; to: any }> = {}
    Object.keys(nextState).forEach((key) => {
      if (prevState[key] !== nextState[key]) {
        changes[key] = {
          from: prevState[key],
          to: nextState[key],
        }
      }
    })

    console.log(`[Store${name ? ` (${name})` : ""}] State updated:`, changes)
  }

  return f(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger
