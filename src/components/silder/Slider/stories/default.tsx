import { useTheme } from '@material-ui/core';
import { Slider } from '../Slider';
import { disable, iconMap } from '../../stories/common';
import { RangeType } from '../Slider.types';

const range: RangeType[] = [
  { at: 0, icon: iconMap.AcUnitIcon, color: '#000' },
  {
    at: 50, icon: iconMap.AirplanemodeActiveIcon, color: '#0cf', default: true,
  },
  { at: 100, icon: iconMap.AspectRatioIcon, color: '#fff' },
];

export const Template = ({ color, ...rest }: any) => {
  const theme = useTheme();
  return (
    <Slider
      range={range}
      color={color || theme.palette.primary.main}
      {...rest}
    />
  );
};

export const argTypes = {
  color: { control: 'color' },
  ...disable(['range']),
};

export const args = {
  color: '',
};

export const parameters = {};
