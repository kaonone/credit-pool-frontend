import { Storage } from './Storage';
import { FallbackAdapter } from './FallbackAdapter';
import { localStorageAdapter } from './LocalStorageAdapter';
import { StorageAdapter } from './types';

interface StorageState {
  firstItem: string;
  secondItem: string;
}

interface StorageStateV2 {
  first: string;
  second: string;
}

interface StorageStateV3 {
  first: number;
  second: number;
}

class UnavailableAdapter {
  private state: Record<string, string> = {};
  // eslint-disable-next-line class-methods-use-this
  checkAvailability() {
    return false;
  }

  getAllKeys(): string[] {
    return Object.keys(this.state);
  }
}

describe('Storage', () => {
  const adapter = new FallbackAdapter();

  const initialState: StorageState = {
    firstItem: '123',
    secondItem: '456',
  };

  const storage = new Storage<[StorageState]>('test', adapter, initialState, []);

  it('Throw error, if namespace already exist', () => {
    expect(() => new Storage<[StorageState]>('test', adapter, initialState, [])).toThrow(Error);
  });

  it('Save FallbackAdapter as adapter, if adapter is not available', () => {
    const unavailableStorage = new Storage<[StorageState]>(
      'unavailableStorage',
      (new UnavailableAdapter() as unknown) as StorageAdapter,
      initialState,
      [],
    );

    expect(unavailableStorage.get()).toEqual({ firstItem: '123', secondItem: '456' });
  });

  it('If pass array with functions, it run migrations', () => {
    localStorage.setItem('localStorage:__storage_version__', JSON.stringify(0));
    localStorage.setItem('localStorage:firstItem', JSON.stringify('12345'));
    localStorage.setItem('localStorage:secondItem', JSON.stringify('56789'));

    const initialStateV3: StorageStateV3 = {
      first: 123,
      second: 456,
    };

    const storageV2 = new Storage<[StorageState, StorageStateV2, StorageStateV3]>(
      'localStorage',
      localStorageAdapter,
      initialStateV3,
      [
        data => ({ first: data.firstItem, second: data.secondItem }),
        data => ({ first: Number(data.first), second: Number(data.second) }),
      ],
    );

    expect(storageV2.get()).toEqual({ first: 12345, second: 56789 });
  });

  it('If migrations not passed, do not change storage', () => {
    localStorage.setItem('localStorageV3:__storage_version__', JSON.stringify(3));
    localStorage.setItem('localStorageV3:firstItem', JSON.stringify('12345'));
    localStorage.setItem('localStorageV3:secondItem', JSON.stringify('56789'));

    const storageV3 = new Storage<[StorageState]>(
      'localStorageV3',
      localStorageAdapter,
      initialState,
      [],
    );

    expect(storageV3.get()).toEqual({ firstItem: '12345', secondItem: '56789' });
  });

  it('set method accept and save object with items', () => {
    storage.set({ firstItem: '12345', secondItem: '56789' });

    expect(storage.getItem('firstItem')).toEqual('12345');
    expect(storage.getItem('secondItem')).toEqual('56789');
  });

  it('get method return object with all items', () => {
    storage.set({ firstItem: '12345', secondItem: '56789' });

    expect(storage.get()).toEqual({ firstItem: '12345', secondItem: '56789' });
  });

  it('setItem method save item in storage', () => {
    storage.setItem('secondItem', '00000');

    expect(storage.getItem('secondItem')).toEqual('00000');
  });

  it('getItem method get item from storage by key', () => {
    storage.setItem('firstItem', '12345');

    expect(storage.getItem('firstItem')).toEqual('12345');
  });

  it('If data does not exist, getItem method throw Error', () => {
    storage.reset();

    expect(() => storage.getItem('firstItem')).toThrow(Error);
  });

  it('Reset method remove all data with current namespace', () => {
    localStorage.setItem('localData:__storage_version__', JSON.stringify(0));
    localStorage.setItem('localData:firstItem', JSON.stringify('12345'));
    localStorage.setItem('localData:secondItem', JSON.stringify('56789'));
    localStorage.setItem('data:firstItem', JSON.stringify('56789'));

    const testStorage = new Storage<[StorageState]>(
      'localData',
      localStorageAdapter,
      initialState,
      [],
    );
    testStorage.reset();

    expect(storage.get()).toEqual({});
    expect(JSON.parse(localStorage.getItem('data:firstItem') || '')).toEqual('56789');
  });
});
