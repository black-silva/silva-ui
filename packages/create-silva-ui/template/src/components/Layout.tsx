import type { Child } from 'hono/jsx';
import { Box, H2, Text, Theme, XStack, YStack } from 'silva-ui';

interface LayoutProps {
  children: Child;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Theme name="dark" as="main" minHeight="screenH" backgroundColor="background" color="secondary" p="large">
      <YStack gap="xl" maxWidth={64} mx="auto">
        <XStack as="header" alignItems="center" justifyContent="space-between" gap="medium" flexWrap="wrap">
          <Box as="a" href="/" textDecoration="none" color="secondary">
            <H2 fontSize="xl">silva-ui</H2>
          </Box>
          <XStack as="nav" aria-label="Main navigation" gap="medium">
            <Box as="a" href="/" color="secondary">Home</Box>
            <Box as="a" href="/about" color="secondary">About</Box>
          </XStack>
        </XStack>

        {children}

        <Box as="footer" pt="large" borderWidth={1} borderStyle="solid" borderColor="border">
          <Text as="span" color="muted" fontSize="sm">Built with Silva UI.</Text>
        </Box>
      </YStack>
    </Theme>
  );
}
