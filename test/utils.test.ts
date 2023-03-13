/* eslint @typescript-eslint/no-magic-numbers: "off" -- Testing lots of numbers */

import type Player from '@vimeo/player';

import { type Adjustments } from '../src';
import { applyAdjustmentStyles, formatCssPercentage, getVideoAspectRatio } from '../src/lib/utils';

it.each<[percentage: number, formatted: string]>([
  [1, '100%'],
  [0, '0%'],
  [0.5, '50%'],
])('formats CSS percentages', (percentage, expected) => {
  expect(formatCssPercentage(percentage)).toEqual(expected);
});

it.each<[adjustments: Adjustments, expected: Record<'width' | 'height' | 'left' | 'top', `${string}%`>]>([
  [{}, { width: '100%', height: '100%', left: '0%', top: '0%' }], // No adjustments
  [
    { width: 0.2, left: 0.4 },
    { width: '20%', height: '100%', left: '40%', top: '0%' },
  ], // Partial adjustments
  [
    { width: 0.2, height: 0.3, left: 0.4, top: 0.5 },
    { width: '20%', height: '30%', left: '40%', top: '50%' },
  ], // Complete adjustments
])('applies adjustment styles', (adjustments, expected) => {
  const style = {} as CSSStyleDeclaration;
  applyAdjustmentStyles(style, adjustments);
  expect(style).toEqual({ position: 'absolute', ...expected });
});

it('calculates video aspect ratios', async () => {
  const width = 100;
  const height = 200;

  const player = {
    getVideoWidth: () => width,
    getVideoHeight: () => height,
  } as unknown as Player;
  expect(await getVideoAspectRatio(player)).toEqual({ width, height });
});
