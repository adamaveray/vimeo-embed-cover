import { type Adjustments, type AspectRatio, type Size } from '../types';

const HALF_MULTIPLIER = 0.5;

export default function calculate(video: AspectRatio, container: Size): Adjustments {
  if (video.width <= 0 || video.height <= 0 || container.width <= 0 || container.height <= 0) {
    // Invalid values - cannot calculate
    return {};
  }

  const videoRatio = video.height / video.width;
  const containerRatio = container.height / container.width;

  switch (true) {
    case containerRatio > videoRatio: {
      // Container too wide - stretch to fill
      const comparisonA = containerRatio / videoRatio;
      return {
        width: comparisonA,
        left: -(comparisonA - 1) * HALF_MULTIPLIER,
      };
    }

    case videoRatio > containerRatio: {
      // Container too tall - stretch to fill
      const comparisonB = videoRatio / containerRatio;
      return {
        height: comparisonB,
        top: -(comparisonB - 1) * HALF_MULTIPLIER,
      };
    }

    default: {
      // Perfect match
      return {};
    }
  }
}
