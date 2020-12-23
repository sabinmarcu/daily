import { createMuiTheme, Theme } from '@material-ui/core/styles';
import {
  green,
  lightGreen,
  red,
  pink,
  blue,
} from '@material-ui/core/colors';

export type Emotions = 'positive' | 'neutral' | 'negative';
export type Brightness = 'light' | 'dark';

export type ColorMapping = {
  primary: string,
  secondary: string,
};
export type EmotionColors = {
  [key in Emotions]: ColorMapping
};

export type BrightnessMapping = {
  [k in Brightness]: Theme
};

export type EmotionMapping = {
  [key in Emotions]: BrightnessMapping
};

const emotionColors: EmotionColors = {
  positive: { primary: green[500], secondary: lightGreen[900] },
  negative: { primary: red[500], secondary: pink[900] },
  neutral: { primary: blue[200], secondary: blue[900] },
};

const createEmotionTheme = (
  type: Emotions,
  theme: Partial<Theme>,
): Partial<Theme> => ({
  ...theme,
  palette: {
    ...theme.palette,
    primary: { main: emotionColors[type].primary },
    secondary: { main: emotionColors[type].secondary },
  } as Theme['palette'],
});

const createBrightnessTheme = (
  type: Brightness,
  theme: Partial<Theme>,
): Partial<Theme> => ({
  ...theme,
  palette: {
    ...theme.palette,
    type,
  } as Theme['palette'],
});

export const themes: EmotionMapping = (['positive', 'neutral', 'negative'] as Emotions[])
  .reduce(
    (
      prev: Partial<EmotionMapping>,
      emotion,
    ) => {
      const emotionTheme = createEmotionTheme(emotion, {});
      const brightnessMapping = (['light', 'dark'] as Brightness[])
        .reduce(
          (
            p: Partial<BrightnessMapping>,
            brightness,
          ) => {
            const finalTheme = createBrightnessTheme(brightness, emotionTheme);
            return {
              ...p,
              [brightness]: createMuiTheme(finalTheme),
            };
          },
          {} as Partial<BrightnessMapping>,
        ) as BrightnessMapping;
      return {
        ...prev,
        [emotion]: brightnessMapping,
      };
    },
    {} as Partial<EmotionMapping>,
  ) as EmotionMapping;

export const brightnessMap: { name: string, value: Brightness }[] = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
];

export const emotionMap: { name: string, value: Emotions }[] = [
  { name: 'Positive', value: 'positive' },
  { name: 'Negative', value: 'negative' },
  { name: 'Neutral', value: 'neutral' },
];
