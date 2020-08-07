import { MaybeArray } from '../../components/Loading';

export function toArray<T>(value: MaybeArray<T>): T[] {
  return Array.isArray(value) ? value : [value];
}
