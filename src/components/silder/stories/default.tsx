import { createElement } from 'react';
import Color from 'color';
import { Tack } from '../Tack';
import {
  disable,
  iconMap,
  iconSelect,
  makeSource,
} from './common';

export const Template = ({ color, children, ...args }: any) => {
  let kids = children;
  if (typeof kids === 'string') {
    if (kids in iconMap) {
      const component = createElement(iconMap[kids as keyof typeof iconMap]);
      kids = component;
    }
  }
  return (
    <Tack
      color={new Color(color)}
      variant="default"
      {...args}
    >
      {kids}
    </Tack>
  );
};

const disabledArgs = disable(
  [
    'colorFrom',
    'colorTo',
    'percent',
    'variant',
    'iconFrom',
    'iconTo',
  ],
);

export const argTypes = {
  color: { control: 'color' },
  size: {
    control: {
      type: 'range',
      min: 30,
      max: 100,
    },
  },
  children: iconSelect,
  ...disabledArgs,
};

export const args = {
  color: 'red',
  size: 50,
  children: Object.keys(iconMap)[0],
};

export const parameters = makeSource(`
<Tack color={new Color('red')}>
  <MyIcon />
</Tack>
`);
