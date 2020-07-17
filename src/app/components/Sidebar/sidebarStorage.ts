import { Storage, localStorageAdapter } from 'services/storage';

interface State {
  isExpanded: boolean;
}

export const sidebarStorage = new Storage<[State]>(
  'sidebar',
  localStorageAdapter,
  {
    isExpanded: true,
  },
  [],
);
