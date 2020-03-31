import { getEnv } from 'core/getEnv';

export type NetworkID = 1 | 4;

interface INetworkConfig {
  id: NetworkID;
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

const ethNetworkConfigs: Record<NetworkID, INetworkConfig> = {
  '4': {
    id: 4,
    name: 'rinkeby',
    contracts: {
      dai: '0x3F5B698332572Fb6188492F5D53ba75f81797F9d',
      pool: '0x17d7aFC6604C3933913960110Cfa5c436eb0dB45',
      ptk: '0x2dC45475c35AB01eC7eEA16a843246e8c67D6C82',
      curveModule: '0xD5F67aa0af6be5c10389A8AC5d2392ee60e8D1Cb',
      liquidityModule: '0xfC95422e89e1892D939B103e73e80d60030b02A5',
      loanModule: '0xCA7c5AcF5686d4fdF1a439FE356d66638371Db64',
      fundsModule: '0x3b1E2e62A4332BAb55A3e935EeaC95aF71002E7B',
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

const ethNetworkConfigsForStaging: Record<NetworkID, INetworkConfig> = {
  '4': {
    id: 4,
    name: 'rinkeby',
    contracts: {
      dai: '0x3F5B698332572Fb6188492F5D53ba75f81797F9d',
      pool: '0x89d6B368Db35B75373aA7ECd5cA7311EF5dBb615',
      ptk: '0x9b1b9E0355d9fa5446F88ce2CD48017307465EDD',
      curveModule: '0xC1BfE7636a244497BFc7D9D6C4419eD98f2fcd70',
      liquidityModule: '0xCBA406Cd5cEc74E7F23bF7C87b60322Cc0Fb451e',
      loanModule: '0xB7C9389735513B4313198d93e9fc835066b5F1fC',
      fundsModule: '0x3946fC3545Cef33d379466D3DC945Ca7e0181F1c',
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

export const NETWORK_ID: NetworkID = 4;
export const ETH_NETWORK_CONFIG = (getEnv().isStaging
  ? ethNetworkConfigsForStaging
  : ethNetworkConfigs)[NETWORK_ID];
export const SWARM_GATEWAY_URL = 'https://swarm-gateways.net';
// TODO take from contract
export const MIN_COLLATERAL_PERCENT_FOR_BORROWER = 50;
export const PLEDGE_MARGIN_DIVIDER = 1000000;

// ? 'https://graph-node.akropolis.io/subgraphs/name/akropolisio/akropolis-os'
export const SUBGRAPH_HTTP_URL = getEnv().isStaging
  ? 'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-sandbox'
  : 'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta';
// ? 'wss://graph-node.akropolis.io/ws/subgraphs/name/akropolisio/akropolis-os'
export const SUBGRAPH_WS_URL = getEnv().isStaging
  ? 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-sandbox'
  : 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta';
