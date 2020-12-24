import { useTheme } from '@material-ui/core';
import { useState } from 'react';
import { Slider } from '../Slider';
import { disable } from '../../stories/common';
import { RangeType } from '../Slider.types';
import { themes } from '../../../../config/themes';

import { TerribleIcon } from '../../../../icons/TerribleIcon';
import { SadIcon } from '../../../../icons/SadIcon';
import { NeutralIcon } from '../../../../icons/NeutralIcon';
import { HappyIcon } from '../../../../icons/HappyIcon';
import { SuperIcon } from '../../../../icons/SuperIcon';

import { Typography } from '../../../../primitives/stories';

const range: RangeType[] = [
  {
    at: 0,
    icon: TerribleIcon,
    color: themes.negative.light.palette.primary.main,
    name: 'Terrible',
  },
  {
    at: 25,
    icon: SadIcon,
    color: themes.negative.light.palette.secondary.main,
    name: 'Bad',
  },
  {
    at: 50,
    icon: NeutralIcon,
    color: themes.neutral.light.palette.primary.main,
    name: 'Meh',
    default: true,
  },
  {
    at: 75,
    icon: HappyIcon,
    color: themes.positive.light.palette.secondary.main,
    name: 'Good',
  },
  {
    at: 100,
    icon: SuperIcon,
    color: themes.positive.light.palette.primary.main,
    name: 'Awesome',
  },
];

export const Template = ({ color, ...rest }: any) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<RangeType>();
  return (
    <>
      <Typography>
        {`Current Step: ${currentStep?.name ?? 'Unknown'}`}
      </Typography>
      <Slider
        range={range}
        color={color || theme.palette.primary.main}
        onChange={setCurrentStep}
        {...rest}
      />
    </>
  );
};

export const argTypes = {
  color: { control: 'color' },
  ...disable(['range', 'onChange']),
};

export const args = {
  color: '',
};

export const parameters = {
  actions: { argTypesRegex: 'nope' },
};
