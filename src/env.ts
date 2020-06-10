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
      dai: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
      pool: '0x113462A2c643dFEb47E9Cc3938FCBab04a058dF9',
      ptk: '0x6553789Cb23a656f2CcbC312AeBFC8C3d697dB1b',
      curveModule: '0xB49c4b7996E36654436F5a8F3C5d97018379971B',
      liquidityModule: '0xE45dD10Bb723b13Dd6A226718D1A40cad9518C24',
      loanModule: '0x49Cc5A2d862567D3b6d8566eDB3FDc174aee8c37',
      loanLimitsModule: '0xFAc465D511a68059C9C659926Ee881e8331234E6',
      loanProposalsModule: '0xC98560141039adb69d6B5F7949b5403FB8CC5B78',
      fundsModule: '0xa157b6A439ae79dC6e6bf2E170bf0DcfcAEB5AdE',
      defiModule: '0x8413433fb3A7EC491c51d415AC437A32C5C81a40',
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
      pool: '0x8FA73B29f37C9c5290819BAfd4Aea177E832423e',
      ptk: '0xB879fD0e690171cea96aC7Df262BC751d0370E79',
      curveModule: '0x29e2Dc9BF33A20d10Df342b59b4aE0201924bd86',
      liquidityModule: '0xC999b3646c477Cc9eE0B44183A2571cE6e8F5E10',
      loanModule: '0x5F7EAEBAF88cBfDd586A6235E28A57e6BD56131d',
      loanLimitsModule: '0xb5b1d22044b61b385d69D7c465bB0BA082EaACdB',
      loanProposalsModule: '0x06Da2A4EB6e39C28D37E011e1D4345352b96FC08',
      fundsModule: '0xFDba597C53c2434aE7461c36812377c7bB238AF3',
      defiModule: '0x68CD145fF4620c4849EC2141F25766083B855c8a',
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
  sandbox: 'https://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-sandbox',
};

const subgraphWsUrlsByMode: Record<Mode, string> = {
  beta: 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta',
  'beta-defi': 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os-beta-defi',
  sandbox: 'wss://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-sandbox',
};

export const SUBGRAPH_HTTP_URL = subgraphHttpUrlsByMode[getEnv().mode];
export const SUBGRAPH_WS_URL = subgraphWsUrlsByMode[getEnv().mode];
