import Color from 'color';
import { useMemo } from 'react';
import { Tack } from '../Tack';
import {
  disable,
  iconMap,
  iconSelect,
  makeSource,
} from '../../stories/common';
import type {
  IconType,
} from '../../types';
import {
  disabled,
} from './common';

export const Template = ({
  iconFrom,
  iconTo,
  colorFrom,
  colorTo,
  percent,
  ...rest
}: {
  iconFrom: keyof typeof iconMap,
  iconTo: keyof typeof iconMap,
} & {
  [key: string]: any
}) => {
  const iconA: IconType = useMemo(
    () => iconMap[iconFrom],
    [iconFrom],
  );
  const iconB: IconType = useMemo(
    () => iconMap[iconTo],
    [iconTo],
  );
  const colorA = useMemo(
    () => new Color(colorFrom),
    [colorFrom],
  );
  const colorB = useMemo(
    () => new Color(colorTo),
    [colorTo],
  );
  return (
    <Tack
      variant="lerp"
      iconFrom={iconA}
      iconTo={iconB}
      colorFrom={colorA}
      colorTo={colorB}
      percent={percent}
      {...rest}
    />
  );
};

export const args = {
  color: '#fff',
  iconFrom: 'AcUnitIcon',
  iconTo: 'AspectRatioIcon',
  colorFrom: 'red',
  colorTo: 'blue',
  percent: 50,
};

const disabledArgs = {
  ...disabled,
  ...disable([
    'children',
    'color',
    'variant',
    'size',
  ]),
};

export const argTypes = {
  colorFrom: { control: 'color' },
  colorTo: { control: 'color' },
  percent: { control: { type: 'range', min: 0, max: 100 } },
  iconFrom: iconSelect,
  iconTo: iconSelect,
  ...disabledArgs,
};

export const parameters = makeSource(`
<Tack
  colorFrom="red"
  colorTo="blue"
  iconFrom={<IconA />}
  iconTo={<IconB />}
  percent={50}
>
  <MyIcon />
</Tack>
`);
