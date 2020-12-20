import {
  styled,
  Typography as MUITypography,
  Container as MUIContainer,
  Theme,
} from '@material-ui/core';
import { FC } from 'react';
import { iconMap } from '../../stories/common';

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
}));

export const ItemContainer = styled('div')<
Theme,
{
  shadow?: boolean,
  stretch?: boolean,
  grid?: boolean,
}
>(
  ({
    theme: {
      shadows: [,,shadow],
      palette: {
        background: { paper: background },
        text: { primary },
      },
      shape,
    },
    shadow: hasShadow = true,
    stretch = false,
    grid,
  }) => ({
    ...shape,
    boxShadow: hasShadow ? shadow : undefined,
    background,
    ...(stretch
      ? {}
      : {
        width: 100,
        height: 100,
      }),
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    overflow: 'hidden',
    '& > *:not(:first-child)': {
      marginTop: 5,
    },
    ...(grid
      ? {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: primary,
        '&:after, &:before': {
          content: '""',
          position: 'absolute',
          background: primary,
          zIndex: 999,
        },
        '&:after': {
          left: '50%',
          marginLeft: -1,
          width: 2,
          top: 0,
          bottom: 0,
        },
        '&:before': {
          top: '50%',
          marginTop: -1,
          height: 2,
          left: 0,
          right: 0,
        },
      }
      : {}
    ),
  }),
);

export const CenterContainerStyled = styled('div')({
  position: 'absolute',
  left: 50,
  top: 50,
  width: '100%',
  height: '100%',
});

export const CenterContainer: FC = ({ children }) => (
  <ItemContainer shadow={false} grid>
    <CenterContainerStyled>
      {children}
    </CenterContainerStyled>
  </ItemContainer>
);

export const Typography = styled(MUITypography)({
  display: 'block',
  width: '100%',
});
