import { Box, Button, Card, H3, Paragraph, Spinner, Text, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Foundations/Animations' };

export const EntranceAnimations = () => renderStory(
  <XStack gap="medium" alignItems="flex-end"><Box animation="fadeIn" p="large" bg="primary" borderRadius="large"><Text color="primaryContrast">Fade in</Text></Box><Box animation="slideUp" p="large" bg="secondary" borderRadius="large"><Text>Slide up</Text></Box></XStack>,
);

export const AttentionAnimation = () => renderStory(
  <Box animation="pulse" p="large" bg="subtle" borderRadius="large"><YStack gap="small"><H3>Background work in progress</H3><Text color="muted">Pulse is intended for quiet, repeating attention.</Text></YStack></Box>,
);

export const ComponentStates = () => renderStory(
  <Card animation="slideUp" elevated style={{ width: '22rem' }}><YStack gap="medium"><H3>Async action</H3><Paragraph>Animations compose with normal component props.</Paragraph><XStack gap="small" alignItems="center"><Spinner /><Button animation="pulse">Processing</Button></XStack></YStack></Card>,
);

export const MotionGuidance = () => renderStory(
  <YStack gap="small" style={{ width: '26rem' }}><Text>Use entrance motion for newly introduced content.</Text><Text color="muted">Reserve looping motion for meaningful status, and respect reduced-motion preferences in application code.</Text></YStack>,
);
