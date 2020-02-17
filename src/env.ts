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
      pool: '0x24Aff547E744976e7e616B7BB9B10ea18185d472',
      ptk: '0xCbE6E7eA6aC7e9f3519a7599a011f3f54b66dD77',
      curveModule: '0x44EAF1D16270c0A48b6B554511f2B344698a8Ff1',
      liquidityModule: '0x338a0F148cfD0cb7fc2018cbD3ee8FFA5d3Fb55D',
      loanModule: '0xF9E9934AD57bc983f9847Dc1dCb737BD5D5e99f7',
      fundsModule: '0xf97C9b8180650cAa2a67F73d2743C6992B2110a5',
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
export const PLEDGE_MARGIN_DIVIDER = 10000;
