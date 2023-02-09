export interface AspectRatio {
  width: number;
  height: number;
}

export type AdjustmentPercentage = number;

export interface Adjustments {
  width?: AdjustmentPercentage;
  left?: AdjustmentPercentage;
  height?: AdjustmentPercentage;
  top?: AdjustmentPercentage;
}

export interface Size {
  width: number;
  height: number;
}
