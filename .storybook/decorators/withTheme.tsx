import {
  ThemeProvider,
  StylesProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { VFC } from 'react';
import { themes as appThemes } from '../../src/config/themes';
import { camelCaseToCapitalized, capitalizedToCamelCase } from '../../src/utils/strings';

const themesList = Object.entries(appThemes)
  .reduce((prev, [emotion, value]) => ({
    ...prev,
    ...Object.entries(value).reduce((p, [brightness, theme]) => ({
      ...p,
      [capitalizedToCamelCase([emotion, brightness].join(' '))]: theme
    }), {})
  }), {});

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global Theme',
    defaultValue: 'Neutral Dark',
    toolbar: {
      icon: 'circlehollow',
      items: Object.keys(themesList).map(camelCaseToCapitalized),
    },
  }
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const useGlobalStyles = makeStyles(
  ({
    palette: {
      background: {
        default: background,
        paper,
      },
      text: {
        primary: color,
      }
    },
    transitions: {
      create: transition,
    }
  }) => ({
  '@global': {
    'html, body, .sbdocs': {
      background,
      color,
      transition: transition(['background', 'color']),
    },
    '.docs-story, .os-host': {
      background: `${paper} !important`,
      transition: transition(['background']),
    },
    '.sbdocs-title': {
      color,
      transition: transition(['color']),
    },
    '.docblock-argstable-body td': {
      background: `${paper} !important`,
      color,
      transition: transition(['background', 'color']),
    },
    '.docblock-argstable-head tr th': {
      transition: transition(['color']),
      color: `${color} !important`,
    },
    '.docblock-argstable-body td span, .docblock-argstable-body td select, .docblock-argstable-body td button': {
      background: `${paper} !important`,
      borderColor: `${background} !important`,
      color,
      transition: transition(['background', 'color', 'border-color']),
    }
  }
})
);

export const GlobalStyles: VFC = () => {
  useGlobalStyles();
  return <></>;
}

export const decorators = [
  (
    Story: any,
    { globals: { theme } }: any
  ) => {
    console.log(themesList, theme, capitalizedToCamelCase(theme));
    return (
      <ThemeProvider theme={themesList[capitalizedToCamelCase(theme)]}>
        <GlobalStyles />
        <StylesProvider injectFirst>
          <Story />
        </StylesProvider>
      </ThemeProvider>
    )
  }
]
