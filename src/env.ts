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
      ptk: '0x671e51CAAAde72DfD6B6d2dEDFa102368dE74c84',
      pool: '0x47c1003f9542FF4fBa23d2E17f8545EDe7D6949a',
      curveModule: '0xC8584d1D606826Ced02c44Dc17B48f34B9Ce5d05',
      fundsModule: '0x82A0dcCA7F14A8eF77C8E8CC263BE6A030494e07',
      liquidityModule: '0x2E506DaC3563CCCDB6890f20BEBf681CA5F33190',
      loanModule: '0x1Efcb2B253a9155Be36AddF5EaEd7f644C9C09fd',
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
