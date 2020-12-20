import Color from 'color';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BoundingRect } from 'react-measure';
import { clamp, range as interpolate } from '../../../utils/lerp';
import { RangeType, StepType } from './Slider.types';

export const useProgress = (
  range: RangeType[],
  containerSize?: BoundingRect,
): [
    number,
    (
    ) => void,
  ] => {
  const [progress, setProgress] = useState<number>(
    range.find(({ default: d }) => d)?.at ?? 0,
  );
  const [dragging, setDragging] = useState<boolean>(false);
  const startDragging = useCallback(
    () => setDragging(true),
    [setDragging],
  );
  const stopDragging = useCallback(
    () => setDragging(false),
    [setDragging],
  );
  const dragHandler = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !containerSize) {
        return undefined;
      }
      const pos = e.pageX - containerSize.left;
      setProgress(
        clamp(pos / containerSize.width) * 100,
      );
      return undefined;
    },
    [dragging, containerSize, setProgress],
  );
  useEffect(
    () => {
      if (!dragging) {
        return undefined;
      }
      const handler = () => {
        stopDragging();
      };
      const drag = (e: MouseEvent) => dragHandler(e);
      const events = ['mouseup', 'mouseleave'];
      events.forEach(
        (event) => window.addEventListener(event, handler),
      );
      window.addEventListener('mousemove', drag);
      return () => {
        events.forEach(
          (event) => window.removeEventListener(event, handler),
        );
        window.removeEventListener('mousemove', drag);
      };
    },
    [dragging, stopDragging, dragHandler],
  );
  return [progress, startDragging];
};

export const useTackRange = (
  range: RangeType[],
  progress: number,
) => {
  const steps = useMemo(
    () => {
      const [start, ...rest] = [...range];
      return rest.reduce(
        (prev: [RangeType, StepType[]], it) => [
          it,
          [
            ...prev[1],
            {
              colorFrom: prev[0].color,
              colorTo: it.color,
              iconFrom: prev[0].icon,
              iconTo: it.icon,
              from: prev[0].at,
              to: it.at,
            },
          ],
        ] as [RangeType, StepType[]],
        [start, [] as StepType[]] as [RangeType, StepType[]],
      )[1];
    },
    [range],
  );
  const currentStep = useMemo(
    () => steps.find(({ from, to }) => progress <= to && progress >= from),
    [steps, progress],
  );
  const renderCurrentStep = useMemo(
    () => {
      if (!currentStep) {
        return undefined;
      }
      const {
        iconFrom,
        iconTo,
        colorFrom,
        colorTo,
        from,
        to,
      } = currentStep;
      return {
        iconFrom,
        iconTo,
        colorFrom: new Color(colorFrom),
        colorTo: new Color(colorTo),
        percent: interpolate(
          from,
          to,
          0,
          100,
          progress,
        ),
      };
    },
    [currentStep, progress],
  );
  return renderCurrentStep;
};
