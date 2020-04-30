import { getEnv, Mode } from 'core/getEnv';
import { zeroAddress } from 'utils/mock';

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
    defiModule: string;
    liquidityModule: string;
    loanModule: string;
    loanLimitsModule: string;
    loanProposalsModule: string;
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
      loanLimitsModule: zeroAddress,
      loanProposalsModule: zeroAddress,
      fundsModule: '0x3b1E2e62A4332BAb55A3e935EeaC95aF71002E7B',
      defiModule: zeroAddress,
    },
    etherskanDomain: 'https://rinkeby.etherscan.io/',
  },
  '1': {
    id: 1,
    name: 'mainnet',
    contracts: {
      dai: zeroAddress,
      ptk: zeroAddress,
      pool: zeroAddress,
      curveModule: zeroAddress,
      fundsModule: zeroAddress,
      defiModule: zeroAddress,
      liquidityModule: zeroAddress,
      loanModule: zeroAddress,
      loanLimitsModule: zeroAddress,
      loanProposalsModule: zeroAddress,
    },
    etherskanDomain: 'https://etherscan.io/',
  },
};

const ethNetworkConfigsForStaging: Record<NetworkID, INetworkConfig> = {
  '4': {
    id: 4,
    name: 'rinkeby',
    contracts: {
      dai: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
      pool: '0x53DB2A5c8304aEE4cD31A9a10d09022e775F2EAd',
      ptk: '0x5b6214852c5e4E20EF4079bF73e98584FdB65228',
      curveModule: '0xaF3e4Cb1122b64FCa73354ec421d0c53AA183c88',
      liquidityModule: '0xA8155d44CaDee6b765E6054bbd39b5A3EBD0BC39',
      loanModule: '0x8C599627713C6E6A56fB875994aF0ba2E115C74B',
      loanLimitsModule: '0x873d123a008C305F58DfFe776626E37c4687ed9f',
      loanProposalsModule: '0x26c4F1A353d2463b30280686b65fE29ca33eD003',
      fundsModule: '0x91fcbbD3fE3DFCEa1E96fBa2936a06291a4e3953',
      defiModule: '0xCB77413Ab83b6B40Dbf9111e9035adbE92a23282',
    },
    etherskanDomain: 'https://rinkeby.etherscan.io/',
  },
  '1': {
    id: 1,
    name: 'mainnet',
    contracts: {
      dai: zeroAddress,
      ptk: zeroAddress,
      pool: zeroAddress,
      curveModule: zeroAddress,
      fundsModule: zeroAddress,
      defiModule: zeroAddress,
      liquidityModule: zeroAddress,
      loanModule: zeroAddress,
      loanLimitsModule: zeroAddress,
      loanProposalsModule: zeroAddress,
    },
    etherskanDomain: 'https://etherscan.io/',
  },
};

const ethNetworkConfigsForBetaDefi: Record<NetworkID, INetworkConfig> = {
  '4': {
    id: 4,
    name: 'rinkeby',
    contracts: {
      dai: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
      pool: '0x53DB2A5c8304aEE4cD31A9a10d09022e775F2EAd',
      ptk: '0x5b6214852c5e4E20EF4079bF73e98584FdB65228',
      curveModule: '0xaF3e4Cb1122b64FCa73354ec421d0c53AA183c88',
      liquidityModule: '0xA8155d44CaDee6b765E6054bbd39b5A3EBD0BC39',
      loanModule: '0x8C599627713C6E6A56fB875994aF0ba2E115C74B',
      loanLimitsModule: '0x873d123a008C305F58DfFe776626E37c4687ed9f',
      loanProposalsModule: '0x26c4F1A353d2463b30280686b65fE29ca33eD003',
      fundsModule: '0x91fcbbD3fE3DFCEa1E96fBa2936a06291a4e3953',
      defiModule: '0xCB77413Ab83b6B40Dbf9111e9035adbE92a23282',
    },
    etherskanDomain: 'https://rinkeby.etherscan.io/',
  },
  '1': {
    id: 1,
    name: 'mainnet',
    contracts: {
      dai: zeroAddress,
      ptk: zeroAddress,
      pool: zeroAddress,
      curveModule: zeroAddress,
      fundsModule: zeroAddress,
      defiModule: zeroAddress,
      liquidityModule: zeroAddress,
      loanModule: zeroAddress,
      loanLimitsModule: zeroAddress,
      loanProposalsModule: zeroAddress,
    },
    etherskanDomain: 'https://etherscan.io/',
  },
};

const configsByMode: Record<Mode, Record<NetworkID, INetworkConfig>> = {
  beta: ethNetworkConfigs,
  'beta-defi': ethNetworkConfigsForBetaDefi,
  sandbox: ethNetworkConfigsForStaging,
};

export const NETWORK_ID: NetworkID = 4;
// eslint-disable-next-line no-nested-ternary
export const ETH_NETWORK_CONFIG = configsByMode[getEnv().mode][NETWORK_ID];
export const SWARM_GATEWAY_URL = 'https://swarm-gateways.net';
// TODO take from contract
export const MIN_COLLATERAL_PERCENT_FOR_BORROWER = 50;
export const PLEDGE_MARGIN_DIVIDER = 1000000;

const subgraphHttpUrlsByMode: Record<Mode, string> = {
  beta: 'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta',
  'beta-defi': 'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta-defi',
  sandbox: 'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-sandbox',
};

const subgraphWsUrlsByMode: Record<Mode, string> = {
  beta: 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta',
  'beta-defi': 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta-defi',
  sandbox: 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-sandbox',
};

export const SUBGRAPH_HTTP_URL = subgraphHttpUrlsByMode[getEnv().mode];
export const SUBGRAPH_WS_URL = subgraphWsUrlsByMode[getEnv().mode];
