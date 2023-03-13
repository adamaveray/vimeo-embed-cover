import { type Player } from '@vimeo/player';

import calculate from './lib/calculate';
import { applyAdjustmentStyles, getVideoAspectRatio } from './lib/utils';
import { type AspectRatio } from './types';

export * from './types';

interface PlayerWithElement<T extends HTMLElement = HTMLElement> extends Player {
  element: T; // Not included in documented API but is available
}

export default async function vimeoEmbedCover<T extends HTMLElement = HTMLElement>(
  player: PlayerWithElement<T>,
): Promise<void> {
  await player.ready();

  const playerElement = player.element;
  const containerElement = playerElement.parentElement;
  if (containerElement == null) {
    // Player element detached from DOM
    return;
  }

  let aspectRatio: AspectRatio = await getVideoAspectRatio(player);

  const update = (containerSize: DOMRect): void => {
    const adjustments = calculate(aspectRatio, containerSize);
    applyAdjustmentStyles(playerElement.style, adjustments);
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
