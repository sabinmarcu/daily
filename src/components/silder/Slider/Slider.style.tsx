import { Container, styled, Theme } from '@material-ui/core';
import { SizeType, ZIndexType } from './Slider.types';

const rootSizeMap = {
  small: 50,
  medium: 75,
  large: 100,
};

export const SliderRoot = styled(Container)<Theme, Required<SizeType>>(
  ({ size, theme: { palette: { background: { paper } } } }) => ({
    position: 'relative',
    height: rootSizeMap[size],
    background: paper,
  }),
);

export const SliderWrapper = styled('div')<Theme, ZIndexType>(
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

export const SliderPoint = styled('div')<Theme, Required<SizeType>>(
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
);
