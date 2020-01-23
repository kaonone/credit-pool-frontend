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
      ptk: '0xc88F54A79CaE4C125D7A8c2Cf811daaE78b07D64',
      pool: '0x42b41f636C9eBB150F859f65e3c0f938b0347f59',
      curveModule: '0x42E24De51db5baf6E18F91619195375FBAe63b13',
      fundsModule: '0x5188E51Df8BD8675fFC71255F056cbBdBB7A79bf',
      liquidityModule: '0x7B6dD55353e080644809350Ef8230414cA064E29',
      loanModule: '0x46dB9021F2F3fFB79faE02BF47380698D81134a0',
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
export const MIN_COLLATERAL_PERCENT_FOR_BORROWER = 50;
