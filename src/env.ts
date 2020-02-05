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
      pool: '0x3fF17cB1e659529F3143F52F78D08393FCcdd7ed',
      ptk: '0xcEbf0883A36c54bE74da1F3ADe15C61a3930F112',
      curveModule: '0x91c6aFcBFBFE8e768dAC75a7289BFF3AAA5fA79D',
      liquidityModule: '0x052f0CF990f0e3515922A540701dDC9e3c7a7a53',
      loanModule: '0xccD1Fa4E164eb279e867E139c8946E0c7B2C8897',
      fundsModule: '0xb004A293002AaB928E7CF89623B12b16d717E5B9',
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
