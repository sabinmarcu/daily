import { makeStyles } from '@material-ui/core/styles';
import { FC, CSSProperties, useMemo } from 'react';
import { TackPrimitiveProps, BaseSizeType } from './Tack.types';

const center: Partial<CSSProperties> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const abs: Partial<CSSProperties> = {
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
      ...center,

      '&:hover': {
        boxShadow: hoverShadow,
        '&::after': {
          opacity: 'var(--hover-op)',
        },
      },

      '&::after': {
        ...abs,
        content: '""',
        background: 'var(--hover-bg)',
        opacity: 0,
        transition: transition('opacity'),
      },
    },
    wrapper: {
      ...abs,
      ...center,
    },
  }),
);

export const TackInnerWrapper: FC = ({ children }) => {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

const useSize = (size: BaseSizeType) => useMemo(
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
  size = 'medium',
  ...rest
}) => {
  const styles = useStyles(rest);
  const realSize = useSize(size);
  const style = {
    background: color.hex(),
    color: color.isLight() ? 'black' : 'white',
    width: realSize,
    height: realSize,
    '--hover-bg': color.isLight() ? 'black' : 'white',
    '--hover-op': color.isLight() ? '0.1' : '0.3',
  };
  return (
    <div
      className={styles.tack}
      style={style as CSSProperties}
      {...rest}
    />
  );
};
