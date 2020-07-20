export const periods = ['d', 'w', 'm', '6m', 'all'] as const;

export type Period = typeof periods[number];

export interface IPoint {
  date: number;
}
