import { CoordinatesGenerator } from 'recharts';
import * as R from 'ramda';

type GridOffset = {
  bottom: number;
  brushBottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

export function makeGridGenerator(gridCount: number): CoordinatesGenerator {
  return ({ offset }): number[] => {
    if (!offset) {
      return [];
    }

    const { height, top } = offset as GridOffset;
    const step = (height - top) / gridCount;
    const getNextStep = (x: number) => x * step + top;

    return R.map(getNextStep, R.range(0, gridCount));
  };
}
