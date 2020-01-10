import { StorageAdapter } from './types';

function entries<Object>(obj: Object) {
  return Object.entries(obj) as [keyof Object, any][];
}

/* eslint-disable no-dupe-class-members */
class Storage<Data extends Record<string | 'version', any>> {
  public static namespaces: string[] = [];

  private isStorageAvailable: boolean | null = null;

  constructor(
    version: Data['version'],
    private currentNamespace: string,
    private adapter: StorageAdapter,
    private initialState: Data,
  ) {
    if (Storage.namespaces.includes(currentNamespace)) {
      throw new Error(`Namespace '${currentNamespace}' is already exist`);
    }

    this.isStorageAvailable = this.adapter.checkAvailability();
    this.checkVersion(version);
    Storage.namespaces = [...Storage.namespaces, currentNamespace];
    this.setInitialState(this.initialState);
  }

  // eslint-disable-next-line class-methods-use-this
  public set(data: Data): void {
    entries(data).forEach(item => {
      const [key, value] = item;
      this.setItem(key, value);
    });
  }

  public get(): Data {
    return this.adapter.getAllKeys().reduce((allKeys, currentKey) => {
      return this.isCurrentNamespaceKey(currentKey)
        ? {
            ...allKeys,
            [currentKey]: this.adapter.getItem(currentKey),
          }
        : allKeys;
    }, {} as Data);
  }

  public setItem<Key extends keyof Data>(key: Key, value: Data[Key]): void {
    if (!this.isStorageAvailable) {
      return;
    }

    this.adapter.setItem(this.getFullKey(key), JSON.stringify(value));
  }

  public getItem<Key extends keyof Data>(key: Key): Data[Key] | null;
  public getItem<Key extends keyof Data>(key: Key, fallback: Data[Key]): Data[Key];
  public getItem<Key extends keyof Data>(key: Key, fallback?: Data[Key]): Data[Key] | null {
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

  private checkVersion(version: Data['version']) {
    const currentVersion = this.getVersion();

    if (currentVersion !== version) {
      this.reset();
      this.saveVersion(version);
    }
  }

  public reset() {
    if (this.isStorageAvailable) {
      this.adapter.getAllKeys().forEach(key => {
        if (this.isCurrentNamespaceKey(key)) {
          this.adapter.setItem(key, this.initialState[key]);
        }
      });
    }
  }

  private getVersion() {
    return this.getItem('version');
  }

  private saveVersion(version: Data['version']) {
    this.setItem('version', version);
  }

  private setInitialState(initialState: Data) {
    const isStorageEmpty =
      this.get() === {} ||
      (Object.keys(this.get()).length === 1 &&
        Object.keys(this.get())[0] === this.getFullKey('version'));

    if (this.isStorageAvailable && isStorageEmpty) {
      this.set(initialState);
    }
  }

  private getFullKey<Key extends keyof Data>(key: Key): string {
    return `${this.currentNamespace}:${key}`;
  }

  private isCurrentNamespaceKey(key: string | number | symbol): key is keyof Data {
    return (
      typeof key === 'string' && new RegExp(`^${this.getFullKey('' as keyof Data)}.+$`).test(key)
    );
  }
}

export { Storage };
