import Color from 'color';
import { DOMAttributes } from 'react';
import { BaseSizeType, WithStyle, IconType } from '../types';

export type SizeType = BaseSizeType | number;
export type SizeArgs = {
  size?: BaseSizeType,
};

export type CenterType = {
  center?: boolean,
};

export type BaseDefaultArgs = {
  variant: 'default',
};

export type BasePercentType = {
  percent: number,
};

export type BaseLerpArgs = BasePercentType & {
  variant: 'lerp'
};

export type DefaultColorArgs = {
  color: Color,
};

export type LerpColorArgs = {
  colorFrom: Color,
  colorTo: Color,
};

export type DefaultIconArgs = {};

export type LerpIconArgs = {
  iconFrom: IconType,
  iconTo: IconType,
};

export type DefaultColorProps = BaseDefaultArgs & DefaultColorArgs;
export type LerpColorProps = BaseLerpArgs & (LerpColorArgs | DefaultColorArgs);

export type DefaultIconProps = BaseDefaultArgs & DefaultIconArgs;
export type LerpIconProps = BaseLerpArgs & (LerpIconArgs | DefaultIconArgs);

export type FinalDefaultArgs = DefaultColorProps & DefaultIconProps;
export type DefaultArgs = WithStyle & FinalDefaultArgs;
export type FinalLerpArgs = LerpColorProps & LerpIconProps;
export type LerpArgs = WithStyle & FinalLerpArgs;

export type TackProps = DOMAttributes<HTMLDivElement>
& WithStyle
& CenterType
& SizeArgs
& (DefaultArgs | LerpArgs);

export type TackPrimitiveProps = DOMAttributes<HTMLDivElement>
& WithStyle
& CenterType
& SizeArgs
& DefaultColorArgs;
