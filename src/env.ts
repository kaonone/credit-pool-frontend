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
      ptk: '0x9d39ad408A7c4987396308A3216E4961C12B6Bdb',
      pool: '0x2504fF0F9d5Dcb35E07f74d871FF8a7BA965AA68',
      curveModule: '0x267FE85742e84BdF174561fEf05D49bE693ccaC6',
      fundsModule: '0x36201b03F6A31300C67b6CFEaF45Fa28bea01662',
      liquidityModule: '0x7a471386877BD110De4cD123418059C340C6bd56',
      loanModule: '0x1B23eeb88f90324f48bF62F4314d68F7700b4564',
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
