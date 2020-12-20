import Color from 'color';
import { FC, useMemo } from 'react';
import interpolate from 'color-interpolate';
import { lerp } from '../../../utils/lerp';

import { TackInnerWrapper, TackWrapper } from './Tack.style';
import type {
  BasePercentType,
  DefaultArgs,
  DefaultColorArgs,
  LerpArgs,
  LerpColorArgs,
  LerpIconArgs,
  TackProps,
} from './Tack.types';
import { WithStyle } from '../types';

export const DefaultTack: FC<DefaultArgs> = (
  props,
) => <TackWrapper {...props} />;

export const LerpIcon: FC<
LerpIconArgs
& BasePercentType
> = ({
  iconFrom: IconA,
  iconTo: IconB,
  percent,
}) => {
  if (!(IconA && IconB)) {
    return null;
  }
  return (
    <>
      <TackInnerWrapper>
        <IconB
          style={{
            opacity: lerp(0, 1, (percent / 100)),
            transform: `scale(${lerp(0.5, 1, (percent / 100))})`,
          }}
        />
      </TackInnerWrapper>
      <TackInnerWrapper>
        <IconA
          style={{
            opacity: lerp(0, 1, 1 - (percent / 100)),
            transform: `scale(${lerp(1.5, 1, 1 - (percent / 100))})`,
          }}
        />
      </TackInnerWrapper>
    </>
  );
};

const useColorInterop = (
  props: (LerpColorArgs | DefaultColorArgs),
  percent: number,
) => {
  const interpolation = useMemo(
    () => {
      if ('colorFrom' in props && 'colorTo' in props) {
        const { colorFrom, colorTo } = props as LerpColorArgs;
        return interpolate([colorFrom.hex(), colorTo.hex()]);
      }
      return () => (props as DefaultColorArgs).color;
    },
    [props],
  );
  const color = useMemo(
    () => new Color(interpolation(percent / 100)),
    [interpolation, percent],
  );
  return color;
};

export const LerpTack: FC<LerpArgs> = ({
  percent,
  ...args
}) => {
  const color = useColorInterop(args, percent);
  if ('iconFrom' in args && 'iconTo' in args) {
    const {
      iconFrom,
      iconTo,
      children,
      ...rest
    } = args as LerpIconArgs & Omit<typeof args, keyof LerpArgs> & WithStyle;
    return (
      <TackWrapper
        {...rest}
        color={color}
      >
        <LerpIcon {...{ iconFrom, iconTo, percent }} />
      </TackWrapper>
    );
  }
  return <TackWrapper color={color} {...args} />;
};

export const Tack: FC<TackProps> = (args) => {
  switch (args.variant) {
    case 'default': return <DefaultTack {...args} />;
    case 'lerp': return <LerpTack {...args} />;
    default: return null;
  }
};
