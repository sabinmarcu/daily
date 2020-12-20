import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import Battery20Icon from '@material-ui/icons/Battery20';
import BatteryCharging90Icon from '@material-ui/icons/BatteryCharging90';

export const disable = <T extends readonly string[]>(
  fields: T,
): {
    [key in (
      typeof fields[number]
    )]: {
      table: {
        disable: true
      }
    }
  } => new Array(fields.length)
    .fill(0)
    .map((_, idx) => fields[idx])
    .reduce((prev, it) => ({
      ...prev,
      [it]: { table: { disable: true } },
    }), {} as any);

export const makeSource = (template: string): {
  docs: {
    source: {
      code: string,
    }
  }
} => ({
  docs: {
    source: {
      code: template,
    },
  },
});

export const iconMap = {
  AcUnitIcon,
  AccessibilityIcon,
  AirplanemodeActiveIcon,
  AspectRatioIcon,
  Battery20Icon,
  BatteryCharging90Icon,
};

export const iconSelect = {
  control: {
    type: 'select',
    options: Object.keys(iconMap),
  },
};
