import { render, useState } from 'hono/jsx/dom';
import { Box, Button, Heading, Input, Paragraph, Text, Theme, XStack, YStack } from 'silva-ui';
import type { ColorShade, ColorTokenName, CSSNamedColor, ThemeName } from 'silva-ui';
import { parseNamedColor } from './named-colors';

const colors = ['deepskyblue', 'rebeccapurple', 'tomato', 'seagreen', 'gold'] as const satisfies readonly CSSNamedColor[];
const shades: ColorShade[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type Scope = 'light' | 'dark' | 'emerald' | 'midnight' | 'dynamic-light' | 'dynamic-dark';
const scopes: { value: Scope; label: string }[] = [
  { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' },
  { value: 'emerald', label: 'Emerald' }, { value: 'midnight', label: 'Midnight' },
  { value: 'dynamic-light', label: 'Dynamic light' }, { value: 'dynamic-dark', label: 'Dynamic dark' },
];

function App() {
  const [color, setColor] = useState<CSSNamedColor>('deepskyblue');
  const [draft, setDraft] = useState('deepskyblue');
  const [error, setError] = useState(false);
  const [scope, setScope] = useState<Scope>('light');

  function selectColor(name: CSSNamedColor) {
    setColor(name);
    setDraft(name);
    setError(false);
  }

  function applyColor(event: Event) {
    event.preventDefault();
    const parsed = parseNamedColor(draft);
    if (!parsed) {
      setError(true);
      return;
    }
    selectColor(parsed);
  }
  const themeName: ThemeName = scope === 'dynamic-light' ? `light-${color}` : scope === 'dynamic-dark' ? `dark-${color}` : scope;
  const token = (shade: ColorShade): ColorTokenName => `${color}${shade}`;

  return (
    <Theme name={themeName}>
      <Box as="main" bg="background" color="secondary" minHeight="screenH" p="large">
        <YStack gap="xl">
          <YStack gap="small">
            <Text color="secondary" fontWeight="bold">SILVA UI / PALETTE LAB</Text>
            <Heading level={1}>Explore the new colour scales</Heading>
            <Paragraph color="secondary">Choose a CSS named colour and a theme scope. Named shades mix that colour with the active scope’s light or dark base.</Paragraph>
          </YStack>

          <YStack gap="medium" bg="card" p="large" borderRadius="large" borderWidth={1} borderStyle="solid" borderColor="border">
            <Text fontWeight="semibold">1. Named colour</Text>
            <XStack gap="small" flexWrap="wrap" aria-label="Named colour presets">
              {colors.map(name => <Button key={name} variant={color === name ? 'solid' : 'outline'} aria-pressed={color === name ? 'true' : 'false'} onClick={() => selectColor(name)}>{name}</Button>)}
            </XStack>
            <Box as="form" onSubmit={applyColor}>
              <YStack gap="small">
                <Text as="label" htmlFor="named-color">Or enter a CSS named colour</Text>
                <XStack gap="small" flexWrap="wrap">
                  <Input id="named-color" value={draft} placeholder="e.g. papayawhip" aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? 'color-error' : undefined} onInput={(event: Event) => { setDraft((event.target as HTMLInputElement).value); setError(false); }} />
                  <Button type="submit">Apply colour</Button>
                </XStack>
                {error && <Text id="color-error" role="alert" color="error">Enter a supported CSS named colour, such as papayawhip. Hex, functions and CSS keywords are not supported.</Text>}
              </YStack>
            </Box>
            <Text fontWeight="semibold">2. Theme scope</Text>
            <XStack gap="small" flexWrap="wrap" aria-label="Theme scope">
              {scopes.map(item => <Button key={item.value} variant={scope === item.value ? 'solid' : 'outline'} aria-pressed={scope === item.value ? 'true' : 'false'} onClick={() => setScope(item.value)}>{item.label}</Button>)}
            </XStack>
            <Text color="secondary" fontSize="sm">Active scope: {themeName}. Built-in scopes keep their own accent; dynamic scopes use the selected colour for their semantic palette.</Text>
          </YStack>

          <YStack gap="medium">
            <Heading level={2}>Named shades 1–10</Heading>
            <Paragraph color="secondary">The same hue stays fixed when the scope changes; shade 10 is the full named colour. Labels are outside the swatches to keep them readable.</Paragraph>
            <XStack gap="medium" flexWrap="wrap" data-testid="swatches">
              {shades.map(shade => <YStack key={shade} gap="small" alignItems="center">
                <Box bg={token(shade)} width={16} height={16} borderRadius="medium" borderWidth={1} borderStyle="solid" borderColor="border" data-testid={`shade-${shade}`} aria-label={token(shade)} />
                <Text fontSize="sm">{shade}</Text>
              </YStack>)}
            </XStack>
            <Text fontSize="sm" color="secondary">Tokens: {color}1 … {color}10</Text>
          </YStack>

          <YStack gap="medium" bg="card" p="large" borderRadius="large" borderWidth={1} borderStyle="solid" borderColor="border">
            <Heading level={2}>Semantic colours and states</Heading>
            <Paragraph color="secondary">These roles follow the active theme, not necessarily the chosen named shade.</Paragraph>
            <XStack gap="medium" flexWrap="wrap" alignItems="center">
              <Box bg="primary" color="primaryContrast" p="medium" borderRadius="medium" data-testid="semantic-primary">primary / primaryContrast</Box>
              <Box bg="subtle" color="secondary" p="medium" borderRadius="medium">subtle / secondary</Box>
            </XStack>
            <Text>Hover or keyboard-focus the swatch: {color}3 → {color}6</Text>
            <Box as="button" type="button" aria-label={`Hover or focus to change ${color}3 to ${color}6`} bg={{ default: token(3), hover: token(6), focus: token(6) }} width={32} height={12} borderRadius="medium" borderWidth={1} borderStyle="solid" borderColor="border" cursor="pointer" data-testid="hover-probe" />
            <Text fontSize="sm" color="secondary">Check contrast in context: automatic accent contrast is not a guarantee, especially for interaction states.</Text>
          </YStack>

          <YStack gap="medium">
            <Heading level={2}>Theme-aware gradient</Heading>
            <Paragraph color="secondary">A semantic primary stop, a named shade, and the semantic background.</Paragraph>
            <Box gradient={{ from: 'primary', via: token(6), to: 'background', deg: 135 }} height={24} borderRadius="large" data-testid="gradient" aria-label={`Gradient from primary through ${color}6 to background`} />
            <Text fontSize="sm">primary → {color}6 → background</Text>
          </YStack>
        </YStack>
      </Box>
    </Theme>
  );
}

render(<App />, document.getElementById('root')!);
