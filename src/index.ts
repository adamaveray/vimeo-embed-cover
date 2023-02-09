import type { Player } from '@vimeo/player';
import type { AspectRatio } from './types';
import calculate from './calculate';

export * from './types';

const formatCssPercentage = (value: number): string => value * 100 + '%';

export default async function vimeoEmbedCover(player: Player): Promise<void> {
  await player.ready();

  const playerElement = (player as any).element as HTMLIFrameElement; // Not included in documented API but is available
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

  if (typeof ResizeObserver !== 'undefined') {
    // Update when wrapping element dimensions change
    new ResizeObserver((entries) => {
      update(((entries as any)[0] as ResizeObserverEntry).contentRect);
    }).observe(containerElement);
  } else {
    // Update when window changes on legacy browsers
    window.addEventListener('resize', measureThenUpdate);
  }

  // Set initial position
  measureThenUpdate();
}
