import { Tuple } from 'ts-toolbelt';

export interface StorageAdapter {
  checkAvailability(): boolean;
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  getAllKeys(): string[];
}

type _TailAndStatesToMigrations<T, S extends any> = {
  [key in Exclude<keyof T, keyof []>]: (state: S[key]) => T[key];
} &
  ((state: S[keyof S]) => T[keyof T])[];

export type StatesToMigrations<S extends any[]> = _TailAndStatesToMigrations<Tuple.Tail<S>, S>;
