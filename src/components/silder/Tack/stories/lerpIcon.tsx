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
  percent,
  color,
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
  const colorObj = useMemo(
    () => new Color(color),
    [color],
  );
  return (
    <Tack
      variant="lerp"
      iconFrom={iconA}
      iconTo={iconB}
      color={colorObj}
      percent={percent}
      {...rest}
    />
  );
};

export const args = {
  color: '#fff',
  iconFrom: 'AcUnitIcon',
  iconTo: 'AspectRatioIcon',
  percent: 50,
};

const disabledArgs = {
  ...disabled,
  ...disable([
    'children',
    'variant',
    'colorFrom',
    'colorTo',
    'size',
    'color',
  ]),
};

export const argTypes = {
  percent: { control: { type: 'range', min: 0, max: 100 } },
  iconFrom: iconSelect,
  iconTo: iconSelect,
  ...disabledArgs,
};

export const parameters = makeSource(`
<Tack
  iconFrom={<IconA />}
  iconTo={<IconB />}
  percent={50}
>
  <MyIcon />
</Tack>
`);
