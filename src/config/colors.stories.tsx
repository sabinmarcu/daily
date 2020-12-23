import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useMemo } from 'react';
import { Showcase } from '../state/stories/common';

const PlaygroundComponent = ({
  primary,
  secondary,
  type,
}: {
  primary: string,
  secondary: string,
  type: 'light' | 'dark',
}) => {
  const theme = useMemo(
    () => createMuiTheme({
      palette: {
        primary: { main: primary },
        secondary: { main: secondary },
        type,
      },
    }),
    [
      primary,
      secondary,
      type,
    ],
  );
  return (
    <ThemeProvider theme={theme}>
      <Showcase />
    </ThemeProvider>
  );
};

const colorInput = { control: 'color' };
const PlaygroundTemplate = PlaygroundComponent.bind({});

// @ts-ignore
PlaygroundTemplate.args = {
  primary: '#90caf9',
  secondary: '#0d47a1',
  type: 'light',
};

// @ts-ignore
PlaygroundTemplate.argTypes = {
  primary: colorInput,
  secondary: colorInput,
  type: {
    control: {
      type: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default {
  title: 'Core/Colors',
  component: PlaygroundTemplate,
  parameters: {
    viewMode: 'story',
    docs: { disable: true },
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};

export const Playground = PlaygroundTemplate;
