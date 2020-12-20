import { useState, useCallback } from 'react';
import { BoundingRect, ContentRect } from 'react-measure';

export const useSize = (): [
  BoundingRect | undefined,
  {
    bounds: true,
    onResize: (rect: ContentRect) => void
  },
] => {
  const [size, setSize] = useState<BoundingRect>();
  const onResize = useCallback(
    (contentRect: ContentRect) => {
      setSize(
        contentRect.bounds
        || { width: 0, height: 0 } as BoundingRect,
      );
    },
    [setSize],
  );
  return [
    size,
    {
      bounds: true,
      onResize,
    },
  ];
};
