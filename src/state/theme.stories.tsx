import { Typography } from '../primitives/stories';
import {
  defaultBrightness,
  defaultEmotion,
  Provider,
} from './theme';
import {
  Brightness,
  brightnessMap,
  emotionMap,
  Emotions,
} from '../config/themes';
import { Showcase } from './stories/common';

export default {
  title: 'Core/Themes',
  docs: { disable: true },
};

export const Playground = ({
  emotion,
  brightness,
}: {
  emotion: Emotions,
  brightness: Brightness
}) => (
  <Provider {...{ emotion, brightness }}>
    <Showcase />
  </Provider>
);
Playground.args = {
  emotion: defaultEmotion,
  brightness: defaultBrightness,
};
Playground.argTypes = {
  emotion: {
    control: {
      type: 'select',
      options: emotionMap.map(({ value }) => value),
    },
  },
  brightness: {
    control: {
      type: 'select',
      options: brightnessMap.map(({ value }) => value),
    },
  },
};

const makeShowcase = (
  emotion: Emotions,
  brightness: Brightness,
) => {
  const Component = () => (
    <>
      <Typography variant="h4">
        {`Theme: ${emotion} ${brightness}`}
      </Typography>
      <Provider emotion={emotion} brightness={brightness}>
        <Showcase />
      </Provider>
    </>
  );
  Component.parameters = {
    docs: { disable: true },
  };
  return Component;
};

export const PositiveLight = makeShowcase('positive', 'light');
export const PositiveDark = makeShowcase('positive', 'dark');
export const NegativeLight = makeShowcase('negative', 'light');
export const NegativeDark = makeShowcase('negative', 'dark');
export const NeutralLight = makeShowcase('neutral', 'light');
export const NeutralDark = makeShowcase('neutral', 'dark');
