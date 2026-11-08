import { Box, Button, H3, Text, Theme, XStack, YStack, gradients } from '../index';
import { renderStory } from './render';

export default { title: 'Foundations/Gradients' };

export const ThemeAwareStops = () => renderStory(
  <XStack gap="medium" flexWrap="wrap"><Box gradient={{ from: 'primary', via: 'violet9', to: 'cyan9', deg: 135 }} p="large" borderRadius="large"><H3 color="primaryContrast">Theme-aware gradient</H3><Text color="primaryContrast">Token stops adapt to the active theme.</Text></Box><Box gradient={{ from: 'orange9', to: 'pink9', type: 'radial' }} p="large" borderRadius="large"><H3>Radial gradient</H3><Text>Any token or CSS colour works.</Text></Box></XStack>,
);

export const GradientTypes = () => renderStory(
  <XStack gap="medium" flexWrap="wrap"><Box gradient={{ from: '#2563eb', to: '#ec4899', type: 'linear', deg: 135 }} p="large" borderRadius="large"><Text color="primaryContrast">Linear</Text></Box><Box gradient={{ from: '#16a34a', to: '#0284c7', type: 'radial' }} p="large" borderRadius="large"><Text color="primaryContrast">Radial</Text></Box><Box gradient={{ from: '#f97316', to: '#7c3aed', type: 'conic', deg: 45 }} p="large" borderRadius="large"><Text color="primaryContrast">Conic</Text></Box></XStack>,
);

export const NamedGradients = () => renderStory(
  <XStack gap="small" flexWrap="wrap">{Object.entries(gradients).map(([name, background]) => <Box key={name} style={{ backgroundImage: background }} p="medium" borderRadius="medium"><Text color="primaryContrast">{name}</Text></Box>)}</XStack>,
);

export const NestedTheme = () => renderStory(
  <Theme name="dark"><Box gradient={{ from: 'primary', via: 'purple9', to: 'cyan9', deg: 120 }} p="large" borderRadius="large" style={{ width: '26rem' }}><YStack gap="small"><H3 color="primaryContrast">Dark theme gradient</H3><Text color="primaryContrast">The same semantic stops resolve through the dark palette.</Text><Button variant="outline">Explore themes</Button></YStack></Box></Theme>,
);
