import { BaseSizeType, IconType } from '../types';

export type RangeType = {
  at: number,
  color: string,
  icon: IconType,
  default?: boolean,
};

export type RangeParamType = {
  range: RangeType[],
};

export type SliderColorProp = {
  color: string,
};

export type SizeType = {
  size?: BaseSizeType,
};

export type ZIndexType = {
  zIndex?: number,
};

export type StepType = {
  from: number,
  to: number,
  colorFrom: string,
  colorTo: string,
  iconFrom: IconType,
  iconTo: IconType,
};

export type SliderProps = SizeType
& RangeParamType
& SliderColorProp;
