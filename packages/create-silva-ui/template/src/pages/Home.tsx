import { Box, Card, H1, Text, YStack } from 'silva-ui';

export function Home() {
  return (
    <YStack gap="large">
      <YStack gap="small">
        <H1>Welcome to Silva UI</H1>
        <Text as="p" color="muted" lineHeight="relaxed">
          A small starting point for building your app.
        </Text>
      </YStack>

      <Card p="large" backgroundColor="aurora">
        <YStack gap="medium">
          <Text as="span" color="primaryContrast" fontWeight="bold">Start building</Text>
          <Text as="p" color="primaryContrast">
            Edit src/pages/Home.tsx and make this page yours.
          </Text>
          <Box as="a" href="/about" color="primaryContrast" fontWeight="bold">
            Meet the project
          </Box>
        </YStack>
      </Card>
    </YStack>
  );
}
