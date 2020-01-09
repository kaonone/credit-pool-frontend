class LocalStorage<Data extends Record<string, any> | Record<'version', string>> {
  public static namespaces: string[] = [];

  public static checkAvailability() {
    const testKey = '__test__';

    try {
      localStorage.setItem(testKey, '__test-value__');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('Local storage is not available! Some features will be disabled!');
      return false;
    }
  }

  private isLocalStorageAvailable: boolean | null = null;

  constructor(version: string, private currentNamespace: string) {
    this.isLocalStorageAvailable = LocalStorage.checkAvailability();
    this.checkVersion(version);

    if (LocalStorage.namespaces.includes(currentNamespace)) {
      throw new Error(`Namespace '${currentNamespace}' is already exist`);
    }

    LocalStorage.namespaces = [...LocalStorage.namespaces, currentNamespace];
  }

  public set<Key extends keyof Data>(key: Key, value: Data[Key]): void {
    if (!this.isLocalStorageAvailable) {
      return;
    }

    localStorage.setItem(`${this.currentNamespace}:${key}`, JSON.stringify(value));
  }

  public get<Key extends keyof Data>(key: Key, fallback?: Data[Key]): Data[Key] | null {
    const defaultValue = fallback || null;

    if (!this.isLocalStorageAvailable) {
      return defaultValue;
    }

    const data = localStorage.getItem(`${this.currentNamespace}:${key}`);

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

  public reset() {
    if (this.isLocalStorageAvailable) {
      Object.entries(localStorage).forEach(([key]) => {
        if (key.match(this.currentNamespace)) {
          localStorage.removeItem(key);
        }
      });
    }
  }

  private checkVersion(version: string) {
    const currentVersion = this.getVersion();

    if (currentVersion !== version) {
      this.reset();
      this.saveVersion(version);
    }
  }

  private getVersion() {
    return this.get('version');
  }

  private saveVersion(version: string) {
    this.set('version', version);
  }
}

export { LocalStorage };
