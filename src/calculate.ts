import type { Adjustments, AspectRatio, Size } from './types';

export default function calculate(video: AspectRatio, container: Size): Adjustments {
  if (video.width <= 0 || video.height <= 0 || container.width <= 0 || container.height <= 0) {
    // Invalid values - cannot calculate
    return {};
  }

  const videoRatio = video.height / video.width;
  const containerRatio = container.height / container.width;

  /* eslint-disable no-case-declarations */
  switch (true) {
    case containerRatio > videoRatio:
      // Container too wide - stretch to fill
      const comparisonA = containerRatio / videoRatio;
      return {
        width: comparisonA,
        left: -(comparisonA - 1) / 2,
      };

    case videoRatio > containerRatio:
      // Container too tall - stretch to fill
      const comparisonB = videoRatio / containerRatio;
      return {
        height: comparisonB,
        top: -(comparisonB - 1) / 2,
      };

    default:
      // Perfect match
      return {};
  }
  /* eslint-enable no-case-declarations */
}
