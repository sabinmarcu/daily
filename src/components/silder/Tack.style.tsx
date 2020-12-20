import { makeStyles } from '@material-ui/core/styles';
import { FC, CSSProperties } from 'react';
import { DefaultColorArgs } from './Tack.types';

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
          opacity: 0.1,
        },
      },

      '&::after': {
        ...abs,
        content: '""',
        background: '#000',
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

export const TackWrapper: FC<DefaultColorArgs> = ({
  color,
  ...rest
}) => {
  const styles = useStyles(rest);
  return (
    <div
      className={styles.tack}
      style={{
        background: color.hex(),
        color: color.isLight() ? 'black' : 'white',
      }}
      {...rest}
    />
  );
};
