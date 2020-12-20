import Color from 'color';
import { Tack } from '../Tack';
import { disable, makeSource } from '../../stories/common';

export const args = {
  children: 'C',
  colorFrom: 'red',
  colorTo: 'blue',
  percent: 50,
};

const disabled = disable([
  'children',
  'color',
  'variant',
  'iconFrom',
  'iconTo',
]);

export const argTypes = {
  colorFrom: { control: 'color' },
  colorTo: { control: 'color' },
  percent: { control: { type: 'range', min: 0, max: 100 } },
  ...disabled,
};

export const parameters = makeSource(`
<Tack colorFrom="red" colorTo="blue" percent={50}>
  <MyIcon />
</Tack>
`);

export const Template = ({
  colorFrom,
  colorTo,
  percent,
  ...rest
}: any) => (
  <Tack
    variant="lerp"
    colorFrom={new Color(colorFrom)}
    colorTo={new Color(colorTo)}
    percent={percent}
    {...rest}
  />
);
