import merge from 'ts-deepmerge';
import {
  globalTypes as themeGlobalTypes,
  parameters as themeParameters,
  decorators as themeDecorators,
} from './decorators/withTheme';

export const globalTypes = merge(
  themeGlobalTypes
)

export const parameters = merge(
  themeParameters
)

export const decorators = [
  ...themeDecorators
]
