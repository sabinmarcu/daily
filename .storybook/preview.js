import {
  ThemeProvider,
  StylesProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import 'typeface-roboto';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const themeMap = {
  Light: lightTheme,
  Dark: darkTheme,
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global Theme',
    defaultValue: 'Light',
    toolbar: {
      icon: 'circlehollow',
      items: ['Light', 'Dark'],
    }
  }
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story, { globals: { theme } } ) => {
    return (
      <ThemeProvider theme={themeMap[theme]}>
        <StylesProvider injectFirst>
          <Story />
        </StylesProvider>
      </ThemeProvider>
    )
  }
]
