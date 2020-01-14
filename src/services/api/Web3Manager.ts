import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';
import { autobind } from 'core-decorators';
import { Web3WalletsManager, Connector } from '@web3-wallets-kit/core';
import { InpageConnector } from '@web3-wallets-kit/inpage-connector';
import { FortmaticConnector } from '@web3-wallets-kit/fortmatic-connector';
import { ConnectWalletConnector } from '@web3-wallets-kit/connect-wallet-connector';
import { BitskiConnector } from '@web3-wallets-kit/bitski-connector';

import { getEnv } from 'core/getEnv';
import { Storage, LocalStorageAdapter } from 'services/storage';

export { ConnectionStatus } from '@web3-wallets-kit/core';

export const wallets = ['bitski', 'metamask', 'connectWallet', 'fortmatic'] as const;

export type WalletType = typeof wallets[number];

function isWallet(wallet: string): wallet is WalletType {
  return wallets.includes(wallet as WalletType);
}

interface StorageState {
  lastProvider: null | WalletType;
}

const NETWORK = 'kovan';
const NETWORK_ID = 42;

const INFURA_API_KEY = '6d0d9f2e41224239b3dce04146c256df';

const BITSKI_API_KEY = '45e6d1b2-f059-4ebd-8afc-3c1cfa0262a4';
const BITSKI_REDIR_URL = getEnv().isDevelopment
  ? 'http://localhost:8080/bitski-callback.html'
  : 'https://pool.akropolis.io/bitski-callback.html';

const FORTMATIC_API_KEY = 'pk_test_508AC5D15FD0D930';

const connectors: Record<WalletType, Connector> = {
  metamask: new InpageConnector(),
  connectWallet: new ConnectWalletConnector({ infuraId: INFURA_API_KEY, chainId: NETWORK_ID }),
  bitski: new BitskiConnector({ clientId: BITSKI_API_KEY, redirectUri: BITSKI_REDIR_URL }),
  fortmatic: new FortmaticConnector({ apiKey: FORTMATIC_API_KEY, network: NETWORK }),
};

const initialStorageState: StorageState = {
  lastProvider: null,
};

export class Web3Manager {
  public connectedWallet = new BehaviorSubject<WalletType | null>(null);

  private storage = new Storage<[StorageState]>(
    'walletManager',
    LocalStorageAdapter,
    initialStorageState,
    [],
  );

  private manager = new Web3WalletsManager<Web3>({
    defaultProvider: { network: NETWORK, infuraAccessToken: INFURA_API_KEY },
    makeWeb3: provider => new Web3(provider),
  });

  constructor() {
    this.connectLastProvider();
  }

  get web3() {
    return this.manager.web3;
  }

  get txWeb3() {
    return this.manager.txWeb3;
  }

  get account() {
    return this.manager.account;
  }

  get status() {
    return this.manager.status;
  }

  @autobind
  async disconnect() {
    this.connectedWallet.next(null);
    this.storage.setItem('lastProvider', null);
    await this.manager.disconnect();
  }

  @autobind
  async connect(wallet: WalletType) {
    const payload = await this.manager.connect(connectors[wallet]);
    this.connectedWallet.next(wallet);
    this.storage.setItem('lastProvider', wallet);
    return payload;
  }

  private connectLastProvider() {
    const lastProvider = this.storage.getItem('lastProvider');

    if (lastProvider && isWallet(lastProvider)) {
      this.connect(lastProvider);
    }
  }
}
