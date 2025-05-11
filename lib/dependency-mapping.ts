// Define the types of entities in our system
export type EntityType = "resume" | "job" | "application" | "score" | "user"

// Define the dependency relationships
export interface DependencyMap {
  [key: string]: {
    affects: Array<{
      entity: EntityType
      action: string
    }>
  }
}

// Define our dependency map
export const dependencyMap: DependencyMap = {
  "resume:update": {
    affects: [
      { entity: "score", action: "invalidate" },
      { entity: "job", action: "recalculate-match" },
    ],
  },
  "resume:delete": {
    affects: [
      { entity: "score", action: "delete" },
      { entity: "job", action: "remove-matches" },
    ],
  },
  "score:update": {
    affects: [
      { entity: "resume", action: "update-metadata" },
      { entity: "job", action: "recalculate-match" },
    ],
  },
  "job:apply": {
    affects: [{ entity: "application", action: "create" }],
  },
  "application:update": {
    affects: [{ entity: "user", action: "update-stats" }],
  },
}

// Function to get affected entities
export function getAffectedEntities(
  sourceEntity: EntityType,
  action: string,
): Array<{ entity: EntityType; action: string }> {
  const key = `${sourceEntity}:${action}`
  return dependencyMap[key]?.affects || []
}

// Transaction manager to handle atomic operations
export class TransactionManager {
  private operations: Array<() => Promise<void>> = []
  private rollbackOperations: Array<() => Promise<void>> = []
  private completed = false

  addOperation(operation: () => Promise<void>, rollback: () => Promise<void>) {
    if (this.completed) {
      throw new Error("Transaction already completed")
    }
    this.operations.push(operation)
    this.rollbackOperations.push(rollback)
  }

  async execute(): Promise<boolean> {
    if (this.completed) {
      throw new Error("Transaction already completed")
    }

    try {
      for (const operation of this.operations) {
        await operation()
      }
      this.completed = true
      return true
    } catch (error) {
      console.error("Transaction failed, rolling back:", error)

      // Execute rollbacks in reverse order
      for (let i = this.rollbackOperations.length - 1; i >= 0; i--) {
        try {
          await this.rollbackOperations[i]()
        } catch (rollbackError) {
          console.error("Rollback operation failed:", rollbackError)
        }
      }

      this.completed = true
      return false
    }
  }
}
