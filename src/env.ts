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
      ptk: '0xEFf55211680b69CB10a158A316B0715DFBd5A731',
      pool: '0x51FEA17BFabb171687498cBdAa030c7D3B2172dC',
      curveModule: '0x5f75C9b5103A1A70c760a52168760141fabc89b3',
      fundsModule: '0x280eC6603bcC548Fc850eE6d9B94e58214D4a9EE',
      liquidityModule: '0x2eb19Ad7D17b67831202E16D0F7b7F3a0e01cd3C',
      loanModule: '0xE4cFc3c6Ed51957Ed67F784838C252130893C133',
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
// TODO take from contract
export const MIN_COLLATERAL_PERCENT_FOR_BORROWER = 50;
