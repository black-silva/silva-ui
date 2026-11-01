import type { Child } from "hono/jsx";
import { Anchor, Box, H2, Text, Theme, XStack, YStack } from "silva-ui";

interface LayoutProps {
  children: Child;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Theme name="green">
      <YStack gap="xl" p="medium" bg="background">
        <XStack alignItems="center" justifyContent="space-between" gap="medium" flexWrap="wrap">
          <Box href="/" textDecoration="none" color="secondary">
            <H2 fontSize="xl">silva-ui</H2>
          </Box>
          <XStack aria-label="Main navigation" gap="medium">
            <Anchor href="/" color="secondary">Home</Anchor>
            <Anchor href="/about" color="secondary">About</Anchor>
          </XStack>
        </XStack>

        {children}

        <Box as="footer" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="medium" p="medium">
          <Text color="muted" fontSize="sm">Built with Silva UI.</Text>
        </Box>
      </YStack>
    </Theme>
  );
}
