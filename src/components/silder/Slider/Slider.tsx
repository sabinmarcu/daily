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
import { FinalLerpArgs, FinalDefaultArgs, Tack } from '../Tack';
import { useSize } from '../../../hooks/useSize';
import { useProgress, useTackRange } from './Slider.hooks';

export const Slider: VFC<SliderProps> = ({
  range,
  color,
  size = 'medium',
}) => {
  const [containerSize, measureProps] = useSize();
  const [progress, dragging, setProgress, startDragging] = useProgress(range, containerSize);
  const currentStep = useTackRange(range, progress, dragging, setProgress);
  const tackProps: FinalLerpArgs | FinalDefaultArgs = useMemo(
    () => (currentStep
      ? {
        ...currentStep,
        variant: 'lerp',
      }
      : {
        variant: 'default',
        color: new Color(color),
      }
    ),
    [currentStep, color],
  );
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
        <Tack
          {...tackProps}
          style={{
            position: 'absolute',
            left: containerSize ? (progress / 100) * containerSize.width : `${progress}%`,
            top: containerSize ? containerSize.height / 2 : '50%',
          }}
          size={size}
          onMouseDown={startDragging}
          animation={!dragging}
          center
        >
          C
        </Tack>
      </SliderWrapper>
    </SliderRoot>
  );
};
