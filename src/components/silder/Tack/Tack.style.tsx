import { makeStyles } from '@material-ui/core/styles';
import { FC, CSSProperties, useMemo } from 'react';
import { IconType } from '../types';
import { TackPrimitiveProps, SizeType } from './Tack.types';

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

const useStyles = makeStyles(
  ({
    shadows: [,shadow, hoverShadow],
    typography: {
      button: typography,
    },
    transitions: {
      create: transition,
    },
  }) => ({
    tack: {
      ...typography,
      width: 50,
      height: 50,
      boxShadow: shadow,
      borderRadius: '100%',
      cursor: 'pointer',
      transition: transition('box-shadow'),
      position: 'relative',
      overflow: 'hidden',
      ...centerStyles,

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
    },
    wrapper: {
      ...absStyles,
      ...centerStyles,
      transition: 'var(--inner-wrapper-transition)',
    },
    animated: {
      transition: transition(['background', 'left', 'box-shadow']),
      '--inner-wrapper-transition': transition(['opacity', 'transform']),
    },
  }),
);

export const TackInnerWrapper: IconType = ({ children, ...rest }) => {
  const styles = useStyles(rest);
  return (
    <div className={styles.wrapper} {...rest}>
      {children}
    </div>
  );
};

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
  const styles = useStyles(rest);
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
  const classes = [
    styles.tack,
    animation && styles.animated,
  ].filter(Boolean).join(' ');
  return (
    <div
      className={classes}
      style={finalStyle as CSSProperties}
      {...rest}
    />
  );
};
