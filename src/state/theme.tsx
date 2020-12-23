import { MuiThemeProvider } from '@material-ui/core';
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { createContainer } from 'react-tracked';
import { Brightness, Emotions, themes } from '../config/themes';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMatchMedia } from '../hooks/useMatchMedia';

export const defaultEmotion = 'neutral';
const useEmotionTheme = (
  { defaultValue = defaultEmotion }: DefaultProp<Emotions>,
) => useLocalStorage<Emotions>('theme:emotion', defaultValue);

type DefaultProp<T> = { defaultValue?: T };

export const defaultBrightness = 'light';
const useBrightnessTheme = ({ defaultValue = defaultBrightness }: DefaultProp<Brightness>) => {
  const [theme, setTheme] = useLocalStorage<Brightness>('theme:brightness', defaultValue);
  const [hasMediaDetection, setHasMediaDetection] = useLocalStorage<boolean>('theme-select', !defaultValue);
  const isLight = useMatchMedia('(prefers-color-scheme: light)');
  const isDark = useMatchMedia('(prefers-color-scheme: dark)');
  const setThemeImpl = useCallback(
    (t: Brightness) => {
      if (t) {
        setHasMediaDetection(false);
      } else {
        setHasMediaDetection(true);
      }
      setTheme(t);
    },
    [setTheme, setHasMediaDetection],
  );
  useEffect(
    () => {
      if (hasMediaDetection) {
        if (isLight) {
          setTheme('light');
        } else if (isDark) {
          setTheme('dark');
        } else {
          setTheme(defaultBrightness);
        }
      }
    },
    [theme, hasMediaDetection, isLight, isDark, setTheme],
  );
  return [theme, setThemeImpl] as [Brightness, (t: Brightness) => void];
};

export const {
  Provider: EmotionProvider,
  useTracked: useEmotion,
} = createContainer(useEmotionTheme);

export const {
  Provider: BrightnessProvider,
  useTracked: useBrightness,
} = createContainer(useBrightnessTheme);

const useTheme = () => {
  const [emotion] = useEmotion();
  const [brightness] = useBrightness();
  const theme = useMemo(
    () => themes[emotion || defaultEmotion][brightness || defaultBrightness],
    [emotion, brightness],
  );
  return theme;
};

export type ThemeInitProps = {
  emotion?: Emotions,
  brightness?: Brightness
};

export const ThemeProvider: FC = ({ children }) => {
  const theme = useTheme();
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};

export const Provider: FC<ThemeInitProps> = ({
  children,
  emotion,
  brightness,
}) => (
  <EmotionProvider defaultValue={emotion}>
    <BrightnessProvider defaultValue={brightness}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </BrightnessProvider>
  </EmotionProvider>
);
