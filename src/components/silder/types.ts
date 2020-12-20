import {
  ChangeEvent,
  MouseEvent,
  DOMAttributes,
  FC,
} from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export type IconType = FC<WithStyle>;
export type BaseSizeType = 'small' | 'medium' | 'large';
export type WithStyle = { style?: CSSProperties };
export type WithMouseEvent<
  K extends HTMLElement,
  T extends keyof DOMAttributes<K>,
> = {
  [key in T]?: (event: MouseEvent<K>) => void;
};

export type WithEvent<
  T extends keyof GlobalEventHandlers,
  K extends HTMLElement = HTMLElement,
> = {
  [key in T]?: (event: ChangeEvent<K>) => void;
};
