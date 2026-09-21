export abstract class AbstractStorage {
  abstract save(property: string, value: string | object): void;
  abstract get(property: string): string | null;
  abstract remove(property: string): void;
  abstract clear(): void;

  cast(value: object): string {
    return JSON.stringify(value);
  }
}
