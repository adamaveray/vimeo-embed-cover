/* eslint @typescript-eslint/no-magic-numbers: "off" -- Too many numbers to test */

import { type AspectRatio, type Size } from '../src';
import calculate from '../src/lib/calculate';

describe('the adjustments', () => {
  it.each<[string, AspectRatio]>([
    ['Same height, slightly wider', { width: 250, height: 100 }],
    ['Same height, significantly wider', { width: 1000, height: 100 }],
    ['Taller, slightly wider', { width: 600, height: 200 }],
  ])('are correct for too-wide videos', (label, aspectRatio) => {
    expect(calculate(aspectRatio, { width: 200, height: 100 })).toMatchSnapshot(label);
  });

  it.each<[string, AspectRatio]>([
    ['Same width, slightly taller', { width: 200, height: 150 }],
    ['Same width, significantly taller', { width: 200, height: 1000 }],
    ['Wider, slightly taller', { width: 400, height: 800 }],
  ])('are correct for too-tall videos', (label, aspectRatio) => {
    expect(calculate(aspectRatio, { width: 200, height: 100 })).toMatchSnapshot(label);
  });

  it.each<[string, AspectRatio]>([
    ['Identical', { width: 200, height: 100 }],
    ['Larger', { width: 400, height: 200 }],
    ['Smaller', { width: 100, height: 50 }],
  ])('are empty for same-ratio videos', (_, aspectRatio) => {
    expect(calculate(aspectRatio, { width: 200, height: 100 })).toEqual({});
  });

  it.each<AspectRatio>([
    { width: 10, height: 0 },
    { width: 0, height: 10 },
    { width: 0, height: 0 },
    { width: 10, height: -1 },
    { width: -1, height: 10 },
    { width: -1, height: -1 },
  ])('handle invalid video sizes', (aspectRatio) => {
    expect(calculate(aspectRatio, { width: 10, height: 10 })).toEqual({});
  });

  it.each<Size>([
    { width: 0, height: 10 },
    { width: 10, height: 0 },
    { width: 0, height: 0 },
    { width: -1, height: 10 },
    { width: 10, height: -1 },
    { width: -1, height: -1 },
  ])('handle invalid container sizes', (containerSize) => {
    expect(calculate({ width: 10, height: 10 }, containerSize)).toEqual({});
  });
});
