const StorageAdapter = jest.fn().mockImplementation(() => {
  return {
    state: {},

    checkAvailability() {
      return true;
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

export { StorageAdapter };
