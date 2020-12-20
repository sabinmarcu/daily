import {
  styled,
  Typography as MUITypography,
  Container as MUIContainer,
} from '@material-ui/core';
import { iconMap } from './common';

export const Icon = iconMap.AcUnitIcon;
export const colors = [
  'red',
  'blue',
  'white',
  'black',
  '#0cf',
  '#cf0',
];
export const sizes = [
  'small',
  'medium',
  'large',
];

export const Container = styled(MUIContainer)(({
  theme: {
    shadows: [,,shadow],
    palette: { background: { paper: background } },
    shape,
  },
}) => ({
  ...shape,
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: 25,
  margin: '10px 0',
  boxShadow: shadow,
  background,
  '& > *': {
    margin: 5,
  },
}));

export const Typography = styled(MUITypography)({
  display: 'block',
  width: '100%',
});
