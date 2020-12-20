import {
  useMemo,
  VFC,
} from 'react';
import Measure from 'react-measure';
import Color from 'color';
import {
  SliderBar,
  SliderPoint,
  SliderRoot,
  SliderWrapper,
} from './Slider.style';
import { SliderProps } from './Slider.types';
import {
  FinalLerpArgs,
  FinalDefaultArgs,
  Tack,
  TackProps,
} from '../Tack';
import { useSize } from '../../../hooks/useSize';
import { useChange, useProgress, useTackRange } from './Slider.hooks';

export const Slider: VFC<SliderProps> = ({
  range,
  color,
  onChange,
  size = 'medium',
}) => {
  const [containerSize, measureProps] = useSize();
  const [progress, dragging, setProgress, startDragging] = useProgress(range, containerSize);
  const { renderStep, closestPoint } = useTackRange(range, progress, dragging, setProgress);
  useChange(closestPoint, onChange);
  const tackProps: FinalLerpArgs | FinalDefaultArgs = useMemo(
    () => (renderStep
      ? {
        ...renderStep,
        variant: 'lerp',
      }
      : {
        variant: 'default',
        color: new Color(color),
      }
    ),
    [renderStep, color],
  );
  const tackRenderProps: TackProps = {
    ...tackProps,
    style: {
      position: 'absolute',
      left: containerSize ? (progress / 100) * containerSize.width : `${progress}%`,
      top: containerSize ? containerSize.height / 2 : '50%',
    },
    onMouseDown: startDragging,
    animation: !dragging,
    size,
    center: true,
  };
  return (
    <SliderRoot size={size}>
      <Measure {...measureProps}>
        {({ measureRef }) => (
          <SliderWrapper ref={measureRef}>
            <SliderBar style={{ backgroundColor: color }} />
          </SliderWrapper>
        )}
      </Measure>
      <SliderWrapper>
        {range.map(({ at }) => (
          <SliderPoint
            size={size}
            key={at}
            style={{
              left: containerSize ? (at / 100) * containerSize.width : `${at}%`,
              borderColor: color,
            }}
          />
        ))}
      </SliderWrapper>
      <SliderWrapper zIndex={5}>
        <Tack {...tackRenderProps} />
      </SliderWrapper>
    </SliderRoot>
  );
};
