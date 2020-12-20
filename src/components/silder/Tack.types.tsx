import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Color from 'color';
import { FC } from 'react';

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

export type IconType = FC<{ style: CSSProperties }>;

export type LerpIconArgs = {
  iconFrom: IconType,
  iconTo: IconType,
};

export type DefaultColorProps = BaseDefaultArgs & DefaultColorArgs;
export type LerpColorProps = BaseLerpArgs & (LerpColorArgs | DefaultColorArgs);

export type DefaultIconProps = BaseDefaultArgs & DefaultIconArgs;
export type LerpIconProps = BaseLerpArgs & (LerpIconArgs | DefaultIconArgs);

export type DefaultArgs = DefaultColorProps & DefaultIconProps;
export type LerpArgs = LerpColorProps & LerpIconProps;

export type TackProps = DefaultArgs | LerpArgs;
