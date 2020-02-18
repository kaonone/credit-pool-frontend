import { getEnv } from 'core/getEnv';

interface INetworkConfig {
  id: 1 | 4;
  name: 'mainnet' | 'rinkeby';
  contracts: {
    dai: string;
    ptk: string;
    pool: string;
    curveModule: string;
    fundsModule: string;
    liquidityModule: string;
    loanModule: string;
  };
  etherskanDomain: string;
}

const ethNetworkConfigs: Record<number, INetworkConfig> = {
  '4': {
    id: 4,
    name: 'rinkeby',
    contracts: {
      dai: '0x3F5B698332572Fb6188492F5D53ba75f81797F9d',
      pool: '0xBd0459c5522EAaBE44897146A6017c813984e06F',
      ptk: '0x325a5ac54FBa5EFbf480FB83B1f712bd5e2c0a9f',
      curveModule: '0x03731AC85D13d804F5b09548463c0654a8799c78',
      liquidityModule: '0xA66fAE2A84aB13CA6284c8610c85632326C62D70',
      loanModule: '0xE9e55bB8e77d380D38f4224559A5D7C9606D8265',
      fundsModule: '0x74Cd4069C5AaAbb4F7e8a06c499910BD6897ED68',
    },
    etherskanDomain: 'https://rinkeby.etherscan.io/',
  },
  '1': {
    id: 1,
    name: 'mainnet',
    contracts: {
      dai: '',
      ptk: '',
      pool: '',
      curveModule: '',
      fundsModule: '',
      liquidityModule: '',
      loanModule: '',
    },
    etherskanDomain: 'https://etherscan.io/',
  },
};

export const NETWORK_ID = 4;
export const ETH_NETWORK_CONFIG = ethNetworkConfigs[NETWORK_ID];
export const SWARM_GATEWAY_URL = 'https://swarm-gateways.net';
// TODO take from contract
export const MIN_COLLATERAL_PERCENT_FOR_BORROWER = 50;
export const PLEDGE_MARGIN_DIVIDER = 1000000;

export const SUBGRAPH_HTTP_URL = getEnv().isStaging
  ? 'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os2'
  : 'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os2-stable';
export const SUBGRAPH_WS_URL = getEnv().isStaging
  ? 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os2'
  : 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os2-stable';
