import { useTheme } from '@material-ui/core';
import { Slider } from '../Slider';
import { disable, iconMap, iconSelect } from '../../stories/common';

export const Template = ({
  color,
  leftColor,
  centerColor,
  rightColor,
  leftIcon,
  centerIcon,
  rightIcon,
  ...rest
}: {
  leftIcon: keyof typeof iconMap,
  centerIcon: keyof typeof iconMap,
  rightIcon: keyof typeof iconMap,
} & {
  [key: string]: any
}) => {
  const theme = useTheme();
  const range = [
    { at: 0, color: leftColor, icon: iconMap[leftIcon] },
    {
      at: 50, color: centerColor, icon: iconMap[centerIcon], default: true,
    },
    { at: 100, color: rightColor, icon: iconMap[rightIcon] },
  ];
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
  leftColor: { control: 'color' },
  centerColor: { control: 'color' },
  rightColor: { control: 'color' },
  leftIcon: iconSelect,
  centerIcon: iconSelect,
  rightIcon: iconSelect,
  ...disable(['range', 'onChange']),
};

export const args = {
  color: '',
  leftColor: '#000',
  centerColor: '#888',
  rightColor: '#fff',
  leftIcon: 'AcUnitIcon',
  centerIcon: 'AirplanemodeActiveIcon',
  rightIcon: 'AspectRatioIcon',
};

export const parameters = {};
