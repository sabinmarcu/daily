import {
  Button,
} from '@material-ui/core';
import { Container, Typography } from '../../primitives/stories';
import { Template as SliderTemplate, args as sliderArgs } from '../../components/silder/Slider/stories/emotion';

export const Showcase = () => (
  <>
    <Container>
      <Typography variant="h4">Primary Buttons</Typography>
      <Button variant="text" color="primary">Primary</Button>
      <Button variant="outlined" color="primary">Primary Outlined</Button>
      <Button variant="contained" color="primary">Primary Contained</Button>
      <Typography variant="h4">Secondary Buttons</Typography>
      <Button variant="text" color="secondary">Secondary</Button>
      <Button variant="outlined" color="secondary">Secondary Outlined</Button>
      <Button variant="contained" color="secondary">Secondary Contained</Button>
    </Container>
    <Container>
      <Typography variant="h4">Slider</Typography>
      <SliderTemplate {...sliderArgs} />
    </Container>
  </>
);
