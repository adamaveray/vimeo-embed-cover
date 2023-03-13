import { type Player } from '@vimeo/player';

import { type AspectRatio, type Adjustments } from '../types';

export function formatCssPercentage(value: number): string {
  return `${value * 100}%`; // eslint-disable-line @typescript-eslint/no-magic-numbers -- It's part of the function
}

export function applyAdjustmentStyles(style: CSSStyleDeclaration, adjustments: Adjustments): void {
  style.position = 'absolute';
  style.width = formatCssPercentage(adjustments.width ?? 1);
  style.height = formatCssPercentage(adjustments.height ?? 1);
  style.left = formatCssPercentage(adjustments.left ?? 0);
  style.top = formatCssPercentage(adjustments.top ?? 0);
}

export async function getVideoAspectRatio(player: Player): Promise<AspectRatio> {
  const [videoWidth, videoHeight] = await Promise.all([player.getVideoWidth(), player.getVideoHeight()]);
  return { width: videoWidth, height: videoHeight };
}
