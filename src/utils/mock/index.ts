import moment from 'moment';

import { Token, TokenAmount, LiquidityAmount, Currency, PercentAmount } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const tokenAmount = new TokenAmount('0', new Token(zeroAddress, 'MOCK', 18));

export const liquidityAmount = new LiquidityAmount('0', new Currency('$', 18));

export const percentAmount = new PercentAmount(new Fraction('0', '10000'));

export const mockedSectors = [
  {
    value: 10,
    label: 'RSV',
  },
  {
    value: 30,
    label: 'DAI',
  },
  {
    value: 20,
    label: 'USDT',
  },
  {
    value: 10,
    label: 'TUSD',
  },
  {
    value: 30,
    label: 'USDC',
  },
];

export const makeMockedDatePoints = () =>
  Array.from(Array(10), (_elem, index) => ({
    date: moment().subtract(index, 'days').unix() * 1000, // Date in milliseconds
    value: Math.random(),
  })).reverse();

export const barChartData = [
  new PercentAmount(66),
  new PercentAmount(34),
  new PercentAmount(66),
  new PercentAmount(66),
];
