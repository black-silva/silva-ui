import { Box, Separator, Text, XGroup, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Components/Layout' };

export const BoxPrimitive = () => renderStory(
  <Box p="large" bg="subtle" borderRadius="large">
    <Text>Box is the base layout primitive.</Text>
  </Box>,
);

export const HorizontalStack = () => renderStory(
  <XStack gap="medium" alignItems="center">
    <Box p="medium" bg="primary" borderRadius="medium"><Text color="primaryContrast">One</Text></Box>
    <Box p="medium" bg="secondary" borderRadius="medium"><Text>Two</Text></Box>
    <Box p="medium" bg="muted" borderRadius="medium"><Text>Three</Text></Box>
  </XStack>,
);

export const VerticalStack = () => renderStory(
  <YStack gap="small" style={{ width: '20rem' }}>
    <Box p="medium" bg="subtle" borderRadius="medium"><Text>Profile</Text></Box>
    <Box p="medium" bg="subtle" borderRadius="medium"><Text>Notifications</Text></Box>
    <Box p="medium" bg="subtle" borderRadius="medium"><Text>Appearance</Text></Box>
  </YStack>,
);

export const GroupedControls = () => renderStory(
  <XGroup>
    <Box p="small" bg="subtle"><Text>Day</Text></Box>
    <Box p="small" bg="subtle"><Text>Week</Text></Box>
    <Box p="small" bg="subtle"><Text>Month</Text></Box>
  </XGroup>,
);

export const Separators = () => renderStory(
  <YStack gap="medium" style={{ width: '20rem' }}>
    <Text>Account</Text><Separator /><Text>Preferences</Text><Separator /><Text>Security</Text>
  </YStack>,
);

export const FluidProjectionTokens = () => renderStory(
  <XStack gap="$2.4" alignItems="flex-end">
    <Box w="$8" h="$8" bg="primary" borderRadius="$1.2" />
    <Box w="$12" h="$12" bg="secondary" borderRadius="$1.6" />
    <Box w="$16" h="$16" bg="muted" borderRadius="$2" />
  </XStack>,
);
