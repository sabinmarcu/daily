import {
  ChangeEvent,
  MouseEvent,
  DOMAttributes,
} from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';

export type WithStyle = { style?: CSSProperties };
export type WithMouseEvent<
  K extends HTMLElement,
  T extends keyof DOMAttributes<K>,
> = {
  [key in T]?: (event: MouseEvent<K>) => void;
};

export type WithTheme = { theme: Theme };
export type WithEvent<
  T extends keyof GlobalEventHandlers,
  K extends HTMLElement = HTMLElement,
> = {
  [key in T]?: (event: ChangeEvent<K>) => void;
};
