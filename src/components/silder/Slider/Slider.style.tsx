import { Container, withTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { SizeType, ZIndexType } from './Slider.types';
import { WithTheme } from '../types';

const rootSizeMap = {
  small: 50,
  medium: 75,
  large: 100,
};

type RootProps = WithTheme & Required<SizeType>;
export const SliderRoot = withTheme(
  styled(Container)<RootProps>(
    ({
      size,
      theme: {
        palette: { background: { paper } },
      },
    }) => ({
      position: 'relative',
      height: rootSizeMap[size],
      background: paper,
    }),
    `
      background: var(--theme-background);
    `,
  ),
);

export const SliderWrapper = styled('div')<ZIndexType>(
  ({ zIndex = 1 }) => ({
    position: 'absolute',
    left: 25,
    right: 25,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex,
  }),
);

export const SliderBar = styled('div')({
  flex: 1,
  height: 2,
  width: '100%',
});

const pointSizeMap = {
  small: 15,
  medium: 20,
  large: 30,
};

export const SliderPoint = withTheme(
  styled('div')<RootProps>(
    ({
      size,
      theme: {
        palette: {
          background: {
            paper,
          },
        },
      },
    }) => ({
      position: 'absolute',
      top: rootSizeMap[size] / 2,
      height: pointSizeMap[size],
      width: pointSizeMap[size],
      background: paper,
      borderRadius: '100%',
      marginTop: -(pointSizeMap[size] / 2),
      marginLeft: -(pointSizeMap[size] / 2),
      border: 'solid 2px transparent',
      boxSizing: 'border-box',
    }),
  ),
);
