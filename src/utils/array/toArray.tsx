type MaybeArray<T> = T | T[];

export function toArray<T>(value: MaybeArray<T>): T[] {
  return Array.isArray(value) ? value : [value];
}
