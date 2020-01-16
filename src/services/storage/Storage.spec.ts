import { Storage } from './Storage';
import { StorageAdapter, UnavailableAdapter } from './__mocks__';

interface StorageState {
  firstItem: string;
  secondItem: string;
}

interface StorageStateV1 {
  first: string;
  second: string;
}

interface StorageStateV2 {
  first: number;
  second: number;
}

beforeEach(() => {
  StorageAdapter.mockClear();
  UnavailableAdapter.mockClear();
});

describe('Storage', () => {
  const adapter = new StorageAdapter();

  const initialState: StorageState = {
    firstItem: '123',
    secondItem: '456',
  };

  const storage = new Storage<[StorageState]>('test', adapter, initialState, []);

  describe('Constructor', () => {
    it('Throw error, if namespace already exist', () => {
      expect(() => new Storage<[StorageState]>('test', adapter, initialState, [])).toThrow(Error);
    });

    it('Save FallbackAdapter as adapter, if adapter is not available', () => {
      const unavailableAdapter = new UnavailableAdapter();

      const unavailableStorage = new Storage<[StorageState]>(
        'unavailableStorage',
        unavailableAdapter,
        initialState,
        [],
      );

      expect(unavailableStorage.get()).toEqual({ firstItem: '123', secondItem: '456' });
    });
  });

  describe('Migrations', () => {
    const mockAdapter = new StorageAdapter();

    beforeEach(() => {
      Storage.namespaces = [];
    });

    it('Set initial state from first version', () => {
      const initialStateV0: StorageState = {
        firstItem: '123',
        secondItem: '456',
      };

      const storageV0 = new Storage<[StorageState]>(
        'localStorage',
        mockAdapter,
        initialStateV0,
        [],
      );

      expect(storageV0.get()).toEqual({ firstItem: '123', secondItem: '456' });
    });

    it('If pass one function in array, it run migration on next version', () => {
      const initialStateV1: StorageStateV1 = {
        first: '12345',
        second: '56789',
      };

      const storageV1 = new Storage<[StorageState, StorageStateV1]>(
        'localStorage',
        mockAdapter,
        initialStateV1,
        [data => ({ first: data.firstItem, second: data.secondItem })],
      );

      expect(storageV1.get()).toEqual({ first: '123', second: '456' });
    });

    it('If pass two functions in array, it run migration on two next versions', () => {
      const initialStateV2: StorageStateV2 = {
        first: 12345,
        second: 56789,
      };

      const storageV2 = new Storage<[StorageState, StorageStateV1, StorageStateV2]>(
        'localStorage',
        mockAdapter,
        initialStateV2,
        [
          data => ({ first: data.firstItem, second: data.secondItem }),
          data => ({ first: Number(data.first), second: Number(data.second) }),
        ],
      );

      expect(storageV2.get()).toEqual({ first: 123, second: 456 });
    });

    it('If migrations not passed, do not change storage', () => {
      mockAdapter.setItem('V3:__storage_version__', JSON.stringify(3));
      mockAdapter.setItem('V3:firstItem', JSON.stringify('12345'));
      mockAdapter.setItem('V3:secondItem', JSON.stringify('56789'));

      const storageV3 = new Storage<[StorageState]>('V3', mockAdapter, initialState, []);

      expect(storageV3.get()).toEqual({ firstItem: '12345', secondItem: '56789' });
    });
  });

  describe('set method', () => {
    it('Accept and save object with items', () => {
      storage.set({ firstItem: '12345', secondItem: '56789' });

      expect(storage.getItem('firstItem')).toEqual('12345');
      expect(storage.getItem('secondItem')).toEqual('56789');
    });
  });

  describe('get method', () => {
    it('Return object with all items', () => {
      storage.set({ firstItem: '12345', secondItem: '56789' });

      expect(storage.get()).toEqual({ firstItem: '12345', secondItem: '56789' });
    });
  });

  describe('setItem method', () => {
    it('Save item in storage', () => {
      storage.setItem('secondItem', 'testItem');

      expect(storage.getItem('secondItem')).toEqual('testItem');
    });
  });

  describe('getItem method', () => {
    it('Get item from storage by key', () => {
      storage.setItem('firstItem', '12345');

      expect(storage.getItem('firstItem')).toEqual('12345');
    });

    it('If data does not exist, getItem method throw Error', () => {
      storage.reset();

      expect(() => storage.getItem('firstItem')).toThrow(Error);
    });
  });

  describe('reset method', () => {
    it('Remove all data with current namespace', () => {
      adapter.setItem('localData:__storage_version__', JSON.stringify(0));
      adapter.setItem('localData:firstItem', JSON.stringify('12345'));
      adapter.setItem('localData:secondItem', JSON.stringify('56789'));
      adapter.setItem('data:firstItem', JSON.stringify('56789'));

      const testStorage = new Storage<[StorageState]>('localData', adapter, initialState, []);
      testStorage.reset();

      expect(storage.get()).toEqual({});
      expect(JSON.parse(adapter.getItem('data:firstItem') || '')).toEqual('56789');
    });
  });
});
