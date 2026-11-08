import { Box, Button, ListItem, Text, XStack, YStack } from '../index';
import { renderStory } from './render';

const SparkleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12 3-1.8 5.2L5 10l5.2 1.8L12 17l1.8-5.2L19 10l-5.2-1.8L12 3Z" /></svg>;
const ArrowIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>;

export default { title: 'Foundations/Icons' };

export const InlineSvg = () => renderStory(
  <XStack gap="medium" alignItems="center"><SparkleIcon /><ArrowIcon /><CheckIcon /><Text color="muted">Icons are normal JSX nodes.</Text></XStack>,
);

export const IconSlots = () => renderStory(
  <YStack gap="small" style={{ width: '24rem' }}><ListItem icon={<SparkleIcon />} title="Create a project" subTitle="Start with a focused workspace" pressable /><ListItem icon={<CheckIcon />} title="Publish changes" subTitle="Push the completed work" pressable /></YStack>,
);

export const IconButtons = () => renderStory(
  <XStack gap="small"><Button><XStack gap="small" alignItems="center"><SparkleIcon />Create</XStack></Button><Button variant="outline"><XStack gap="small" alignItems="center">Continue<ArrowIcon /></XStack></Button></XStack>,
);

export const DependencyFree = () => renderStory(
  <Box p="large" bg="subtle" borderRadius="large" style={{ width: '28rem' }}><YStack gap="small"><Text>Silva UI accepts icon nodes without bundling an icon set.</Text><Text color="muted">Use inline SVG, your preferred icon package, or a future optional Silva adapter.</Text></YStack></Box>,
);
