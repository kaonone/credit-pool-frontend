/* eslint-disable no-dupe-class-members */
class LocalStorage<Data extends Record<string, any> | Record<'version', string>> {
  public static namespaces: string[] = [];

  public static isLocalStorageAvailable = LocalStorage.checkAvailability();

  private static checkAvailability() {
    const testKey = `__test__${Math.random}`;

    try {
      localStorage.setItem(testKey, '__test-value__');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('Local storage is not available! Some features will be disabled!');
      return false;
    }
  }

  constructor(version: string, private currentNamespace: string) {
    if (LocalStorage.namespaces.includes(currentNamespace)) {
      throw new Error(`Namespace '${currentNamespace}' is already exist`);
    }

    this.checkVersion(version);

    LocalStorage.namespaces = [...LocalStorage.namespaces, currentNamespace];
  }

  public set<Key extends keyof Data>(key: Key, value: Data[Key]): void {
    if (!LocalStorage.isLocalStorageAvailable) {
      return;
    }

    localStorage.setItem(this.getFullKey(key), JSON.stringify(value));
  }

  public get<Key extends keyof Data>(key: Key): Data[Key] | null;
  public get<Key extends keyof Data>(key: Key, fallback: Data[Key]): Data[Key];
  public get<Key extends keyof Data>(key: Key, fallback?: Data[Key]): Data[Key] | null {
    const defaultValue = fallback || null;

    if (!LocalStorage.isLocalStorageAvailable) {
      return defaultValue;
    }

    const data = localStorage.getItem(this.getFullKey(key));

    try {
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(
        `Error while parsing data from localstorage for key: ${key}.
        Error is: ${e.message}, stack is: ${e.stack}`,
      );
      return defaultValue;
    }
  }

  private checkVersion(version: string) {
    const currentVersion = this.getVersion();

    if (currentVersion !== version) {
      this.reset();
      this.saveVersion(version);
    }
  }

  public reset() {
    if (LocalStorage.isLocalStorageAvailable) {
      Object.entries(localStorage).forEach(([key]) => {
        if (new RegExp(`^${this.getFullKey('' as keyof Data)}.+$`).test(key)) {
          localStorage.removeItem(key);
        }
      });
    }
  }

  private getVersion() {
    return this.get('version');
  }

  private saveVersion(version: string) {
    this.set('version', version);
  }

  private getFullKey<Key extends keyof Data>(key: Key): string {
    return `${this.currentNamespace}:${key}`;
  }
}

export { LocalStorage };
