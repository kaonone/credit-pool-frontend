export interface StorageAdapter {
  checkAvailability(): boolean;
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  getAllKeys(): string[];
}
