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
      pool: '0x3b42805B276eb1b74D253a80962D13ea6982a2ca',
      ptk: '0xC5fC6Ff3fdb34BC4fb8b4cd05184aFFf61dEEDaF',
      curveModule: '0x02198c667963B03B3180B99521F26D8B12d0C3CB',
      liquidityModule: '0xF3A7aC40D004Fb545d821DE3e4f823dFfFF766a0',
      loanModule: '0x94315b5Db360A8b212dB998576Fe0eC3F88d2456',
      fundsModule: '0x83e10F531Df7dd466F6C846bE2e49b1aD95A7ac1',
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
export const PLEDGE_MARGIN_DIVIDER = 1000000;

export const SUBGRAPH_HTTP_URL =
  'https://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os2';
export const SUBGRAPH_WS_URL = 'wss://api.thegraph.com/subgraphs/name/alekspickle/akropolis-os2';
