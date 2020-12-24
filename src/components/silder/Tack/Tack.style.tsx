import { withTheme } from '@material-ui/core/styles';
import { FC, CSSProperties, useMemo } from 'react';
import styled from '@emotion/styled';
import { WithTheme } from '../types';
import { TackPrimitiveProps, SizeType, Animated } from './Tack.types';

const centerStyles: Partial<CSSProperties> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const absStyles: Partial<CSSProperties> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const sizeMap = {
  small: 35,
  medium: 50,
  large: 75,
};

export const TackInnerWrapper = styled.div(
  {
    ...absStyles,
    ...centerStyles,
    transition: 'var(--inner-wrapper-transition)',
  },
);

export const StyledTackWrapper = withTheme(
  styled.div<WithTheme & Animated>(
    ({
      theme: {
        shadows: [,shadow, hoverShadow],
        transitions: {
          create: transition,
        },
        typography: { button },
      },
    }) => ({
      ...(button as any),
      ...centerStyles,
      width: 50,
      height: 50,
      boxShadow: shadow,
      borderRadius: '100%',
      cursor: 'pointer',
      transition: transition('box-shadow'),
      position: 'relative',
      overflow: 'hidden',

      '&:hover': {
        boxShadow: hoverShadow,
        '&::after': {
          opacity: 'var(--hover-op)',
        },
      },

      '&::after': {
        ...absStyles,
        content: '""',
        background: 'var(--hover-bg)',
        opacity: 0,
        transition: transition('opacity'),
      },
      '& svg': {
        fontSize: '1em',
      },
      '& *': {
        pointerEvents: 'none',
      },
    }),
    ({
      animation,
      theme: {
        transitions: {
          create: transition,
        },
      },
    }) => (animation
      ? {
        transition: transition(['background', 'left', 'box-shadow']),
        '--inner-wrapper-transition': transition(['opacity', 'transform']),
      }
      : {}
    ),
  ),
);

const useSize = (size: SizeType) => useMemo(
  () => {
    if (typeof size === 'string') {
      return sizeMap[size];
    }
    return size;
  },
  [size],
);

export const TackWrapper: FC<TackPrimitiveProps> = ({
  color,
  center,
  size = 'medium',
  style,
  animation,
  ...rest
}) => {
  const realSize = useSize(size);
  const finalStyle = {
    background: color.hex(),
    color: color.isLight() ? 'black' : 'white',
    width: realSize,
    height: realSize,
    fontSize: realSize * 0.6,
    ...(center
      ? {
        marginLeft: -(realSize / 2),
        marginTop: -(realSize / 2),
      }
      : {}
    ),
    ...style,
    '--hover-bg': color.isLight() ? 'black' : 'white',
    '--hover-op': color.isLight() ? '0.1' : '0.3',
  };
  return (
    <StyledTackWrapper
      animation={animation}
      style={finalStyle as CSSProperties}
      {...rest}
    />
  );
};
