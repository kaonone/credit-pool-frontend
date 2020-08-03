import * as React from 'react';

type Color = string;

interface GradientPoint {
  offset: string;
  color: Color;
}

interface Gradient {
  points: GradientPoint[];
  linear(sideOrCorner?: string): string;
  svgLinear(id: string, direction?: Partial<SvgGradientDirection>): JSX.Element;
}

interface SvgGradientDirection {
  x1: string;
  x2: string;
  y1: string;
  y2: string;
}

export function makeGradient(points: Array<GradientPoint | Color>): Gradient {
  return {
    points: points.map(toGradientPoint),
    linear: sideOrCorner => getLinearGradient(points, sideOrCorner),
    svgLinear: (id, direction) => getSvgGradient(id, points, direction),
  };
}

function getLinearGradient(
  points: Array<GradientPoint | Color>,
  sideOrCorner: string = 'to bottom',
) {
  return `linear-gradient(${sideOrCorner}, ${points
    .map((point, index) => {
      const { color, offset } = toGradientPoint(point, index, points);
      return [color, offset].filter(Boolean).join(' ');
    })
    .join(', ')})`;
}

function toGradientPoint(
  point: GradientPoint | Color,
  index: number,
  points: Array<GradientPoint | Color>,
): GradientPoint {
  const multiplier = 100 / (points.length - 1);
  const offset = `${Math.round(index * multiplier * 100) / 100}%`;
  return typeof point === 'string' ? { color: point, offset } : point;
}

function getSvgGradient(
  id: string,
  points: Array<GradientPoint | Color>,
  direction: Partial<SvgGradientDirection> = {},
) {
  const { x1 = '0%', x2 = '100%', y1 = '50%', y2 = '50%' } = direction;
  return (
    <defs>
      <linearGradient id={id} x1={x1} x2={x2} y1={y1} y2={y2}>
        {points.map((point, index) => {
          const { color, offset } = toGradientPoint(point, index, points);
          return <stop key={index} offset={offset} stopColor={color} />;
        })}
      </linearGradient>
    </defs>
  );
}
