import { type Player } from '@vimeo/player';

import calculate from './calculate';
import { type AspectRatio } from './types';

export * from './types';

interface PlayerWithElement extends Player {
  element: HTMLInputElement; // Not included in documented API but is available
}

function formatCssPercentage(value: number): string {
  return `${value * 100}%`; // eslint-disable-line @typescript-eslint/no-magic-numbers -- It's part of the function
}

export default async function vimeoEmbedCover(player: PlayerWithElement): Promise<void> {
  await player.ready();

  const playerElement = player.element;
  const containerElement = playerElement.parentElement;
  if (containerElement == null) {
    // Player element detached from DOM
    return;
  }

  const [videoWidth, videoHeight] = await Promise.all([player.getVideoWidth(), player.getVideoHeight()]);
  let aspectRatio: AspectRatio = { width: videoWidth, height: videoHeight };

  const update = (containerSize: DOMRect): void => {
    const adjustments = calculate(aspectRatio, containerSize);
    const { style } = playerElement;
    style.position = 'absolute';
    style.width = formatCssPercentage(adjustments.width ?? 1);
    style.height = formatCssPercentage(adjustments.height ?? 1);
    style.left = formatCssPercentage(adjustments.left ?? 0);
    style.top = formatCssPercentage(adjustments.top ?? 0);
  };

  const measureThenUpdate = (): void => {
    update(containerElement.getBoundingClientRect());
  };

  player.on('resize', (event) => {
    aspectRatio = { width: event.videoWidth, height: event.videoHeight };
    measureThenUpdate();
  });

  if (typeof ResizeObserver === 'undefined') {
    // Update when window changes on legacy browsers
    window.addEventListener('resize', measureThenUpdate, { passive: true });
  } else {
    // Update when wrapping element dimensions change
    new ResizeObserver(([entry]) => {
      if (entry != null) {
        update(entry.contentRect);
      }
    }).observe(containerElement);
  }

  // Set initial position
  measureThenUpdate();
}
