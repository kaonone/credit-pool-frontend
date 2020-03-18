import { StorageAdapter } from '../types';

interface IUnavailableAdapter extends StorageAdapter {
  state: Record<string, string>;
}

const UnavailableAdapter = jest.fn<IUnavailableAdapter, []>().mockImplementation(() => {
  return {
    state: {},

    checkAvailability() {
      return false;
    },

    setItem(key: string, value: string) {
      this.state[key] = value;
    },

    getItem(key: string): string {
      return this.state[key];
    },

    removeItem(key: string): void {
      delete this.state[key];
    },

    getAllKeys(): string[] {
      return Object.keys(this.state);
    },
  };
});

export { UnavailableAdapter };
