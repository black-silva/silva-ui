import { Box, Button, Card, CardFooter, CardHeader, H3, Paragraph, Text, Theme, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Foundations/Themes' };

function ThemeCard({ name, label }: { name: string; label: string }) {
  return <Theme name={name}><Card elevated style={{ width: '18rem' }} bg="background"><CardHeader><H3>{label}</H3><Text color="muted">{name}</Text></CardHeader><Paragraph>Semantic colours adapt without changing component props.</Paragraph><CardFooter><Button>Continue</Button></CardFooter></Card></Theme>;
}

export const BuiltInThemes = () => renderStory(
  <XStack gap="medium" flexWrap="wrap"><ThemeCard name="light" label="Light" /><ThemeCard name="dark" label="Dark" /><ThemeCard name="midnight" label="Midnight" /><ThemeCard name="emerald" label="Emerald" /></XStack>,
);

export const DynamicColourThemes = () => renderStory(
  <XStack gap="medium" flexWrap="wrap"><ThemeCard name="ocean" label="Ocean" /><ThemeCard name="forest" label="Forest" /><ThemeCard name="sunrise" label="Sunrise" /><ThemeCard name="dark-aurora" label="Aurora dark" /></XStack>,
);

export const NestedThemes = () => renderStory(
  <Theme name="dark"><Box p="large" bg="background" borderRadius="large" style={{ width: '28rem' }}><YStack gap="medium"><Text color="secondary">A dark parent theme</Text><Theme name="light"><Box p="medium" bg="background" borderRadius="medium"><Text>This nested region uses light semantic values.</Text></Box></Theme></YStack></Box></Theme>,
);

export const SemanticTokens = () => renderStory(
  <Theme name="midnight"><XStack gap="small" p="medium" bg="background" borderRadius="large"><Box p="medium" bg="primary" borderRadius="medium"><Text color="primaryContrast">Primary</Text></Box><Box p="medium" bg="secondary" borderRadius="medium"><Text>Secondary</Text></Box><Box p="medium" bg="muted" borderRadius="medium"><Text>Muted</Text></Box></XStack></Theme>,
);
