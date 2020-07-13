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

const ethNetworkConfigTestnet: INetworkConfig = {
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
};

const ethNetworkConfigsForSandbox: INetworkConfig = {
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
};

const ethNetworkConfigsForMainnet: INetworkConfig = {
  id: 1,
  name: 'mainnet',
  contracts: {
    dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
    ptk: '0xAA2edc0E5CDE4Da80628972c501e79326741dB17',
    pool: '0x73067fdd366Cb678E9b539788F4C0f34C5700246',
    curveModule: '0xFb6b0103063CDf701b733db3Fa3F1c0686F19668',
    fundsModule: '0xc88F54A79CaE4C125D7A8c2Cf811daaE78b07D64',
    defiModule: zeroAddress,
    liquidityModule: '0x543cBc6693f8cBCf0AE5f2cfd9922203cc13b10A',
    loanModule: '0x42E24De51db5baf6E18F91619195375FBAe63b13',
    loanLimitsModule: '0x42b41f636C9eBB150F859f65e3c0f938b0347f59',
    loanProposalsModule: '0xd3bdEdA5e165E67985a4Dc7927E4651Bedd1950c',
  },
  etherskanDomain: 'https://etherscan.io/',
};

const configsByMode: Record<Mode, INetworkConfig> = {
  testnet: ethNetworkConfigTestnet,
  sandbox: ethNetworkConfigsForSandbox,
  mainnet: ethNetworkConfigsForMainnet,
};

// eslint-disable-next-line no-nested-ternary
export const ETH_NETWORK_CONFIG = configsByMode[getEnv().mode];
export const NETWORK_ID: NetworkID = ETH_NETWORK_CONFIG.id;
export const SWARM_GATEWAY_URL = 'https://swarm-gateways.net';
// TODO take from contract
export const MIN_COLLATERAL_PERCENT_FOR_BORROWER = 50;
export const PLEDGE_MARGIN_DIVIDER = 1000000;

const subgraphHttpUrlsByMode: Record<Mode, string> = {
  testnet: 'https://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-rinkeby',
  sandbox: 'https://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-sandbox',
  mainnet: 'https://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-mainnet',
};

const subgraphWsUrlsByMode: Record<Mode, string> = {
  testnet: 'wss://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-rinkeby',
  sandbox: 'wss://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-sandbox',
  mainnet: 'wss://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-mainnet',
};

export const SUBGRAPH_HTTP_URL = subgraphHttpUrlsByMode[getEnv().mode];
export const SUBGRAPH_WS_URL = subgraphWsUrlsByMode[getEnv().mode];
