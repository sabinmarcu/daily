import { BaseSizeType, IconType } from '../types';

export type RangeType = {
  at: number,
  color: string,
  icon: IconType,
  default?: boolean,
  name?: string,
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
  name: string | undefined,
};

export type BackTalkSliderProp = {
  onChange?: (step: RangeType) => void,
};

export type SliderProps = SizeType
& RangeParamType
& SliderColorProp
& BackTalkSliderProp;
