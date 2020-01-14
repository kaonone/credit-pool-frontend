/* eslint-disable no-dupe-class-members */
import { Tuple } from 'ts-toolbelt';

import { StorageAdapter } from './types';

function entries<Object>(obj: Object) {
  return Object.entries(obj) as [keyof Object, any][];
}

type _TailAndStatesToMigrations<T, S extends any> = {
  [key in keyof T]: (state: S[key]) => T[key];
};

type StatesToMigrations<S extends any[]> = _TailAndStatesToMigrations<Tuple.Tail<S>, S>;

interface IData {
  [key: string]: any;
  version?: number;
}

class Storage<Data extends IData[]> {
  public static namespaces: string[] = [];

  private isStorageAvailable: boolean | null = null;

  constructor(
    private currentNamespace: string,
    private adapter: StorageAdapter,
    private initialState: Tuple.Last<Data>,
    private migrations: StatesToMigrations<Data>,
  ) {
    if (Storage.namespaces.includes(currentNamespace)) {
      throw new Error(`Namespace '${currentNamespace}' is already exist`);
    }

    this.isStorageAvailable = this.adapter.checkAvailability();
    Storage.namespaces = [...Storage.namespaces, currentNamespace];
    this.checkVersion();
  }

  // eslint-disable-next-line class-methods-use-this
  public set(data: Tuple.Last<Data>): void {
    entries(data).forEach(item => {
      const [key, value] = item;
      this.setItem(key, value);
    });
  }

  public get(): Tuple.Last<Data> {
    return this.adapter.getAllKeys().reduce((allKeys, currentKey) => {
      if (!this.isCurrentNamespaceKey(currentKey)) {
        return allKeys;
      }

      const key = this.getShortKey(currentKey);
      const data = this.getItem(key);

      return {
        ...allKeys,
        [key]: data,
      };
    }, {} as Tuple.Last<Data>);
  }

  public setItem<Key extends keyof Tuple.Last<Data>>(key: Key, value: Tuple.Last<Data>[Key]): void {
    if (!this.isStorageAvailable) {
      return;
    }

    const convertedValue = JSON.stringify(value);

    this.adapter.setItem(this.getFullKey(key), convertedValue);
  }

  public getItem<Key extends keyof Tuple.Last<Data>>(key: Key): Tuple.Last<Data>[Key] | null;
  public getItem<Key extends keyof Tuple.Last<Data>>(
    key: Key,
    fallback: Tuple.Last<Data>[Key],
  ): Tuple.Last<Data>[Key];

  public getItem<Key extends keyof Tuple.Last<Data>>(
    key: Key,
    fallback?: Tuple.Last<Data>[Key],
  ): Tuple.Last<Data>[Key] | null {
    const defaultValue = fallback || null;

    if (!this.isStorageAvailable) {
      return defaultValue;
    }

    const data = this.adapter.getItem(this.getFullKey(key));

    try {
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(
        `Error while parsing data from storage for key: ${key}.
        Error is: ${e.message}, stack is: ${e.stack}`,
      );
      return defaultValue;
    }
  }

  private checkVersion() {
    if (!this.isStorageAvailable) {
      return;
    }

    const isVersionExist = !!this.getVersion() || this.getVersion() === 0;

    if (!isVersionExist) {
      this.reset();
      this.set(this.initialState);
      this.saveVersion(this.migrations.length as any); // TODO this.migrations.length is not a number
    } else {
      this.executeMigrations(Number(this.getVersion()));
    }
  }

  private executeMigrations(currentVersion: number) {
    const isMigrationExist =
      this.migrations.length && typeof this.migrations[currentVersion] !== 'undefined';

    if (!isMigrationExist) {
      return;
    }

    const currentData = this.get();
    const newData = this.migrations[currentVersion](currentData);
    this.reset();
    this.set(newData);

    const nextVersion = currentVersion + 1;
    this.saveVersion(nextVersion);
    this.executeMigrations(nextVersion);
  }

  public reset() {
    if (this.isStorageAvailable) {
      this.adapter.getAllKeys().forEach(key => {
        if (this.isCurrentNamespaceKey(key)) {
          this.adapter.removeItem(key);
        }
      });
    }
  }

  private getVersion() {
    return this.getItem('version');
  }

  private saveVersion(version: number) {
    this.setItem('version', version);
  }

  private getFullKey<Key extends keyof Tuple.Last<Data>>(key: Key): string {
    return `${this.currentNamespace}:${key}`;
  }

  private getShortKey(key: string): string {
    return key.replace(`${this.currentNamespace}:`, '');
  }

  private isCurrentNamespaceKey(key: string | number | symbol): key is keyof Tuple.Last<Data> {
    return (
      typeof key === 'string' &&
      new RegExp(`^${this.getFullKey('' as keyof Tuple.Last<Data>)}.+$`).test(key)
    );
  }
}

export { Storage };
