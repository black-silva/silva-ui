import { Card, H1, Text, YStack } from silva-ui;
import { Layout } from ../components/Layout;

export function About() {
  return (
    <Layout>
      <YStack gap="large">
        <YStack gap="small">
          <H1>About this starter</H1>
          <Text as="p" color="muted" lineHeight="relaxed">
            It has two pages, one shared layout, and no routing dependency.
          </Text>
        </YStack>

        <Card p="large">
          <Text as="p">
            Add more files in src/pages, then map their paths in src/app.tsx.
          </Text>
        </Card>
      </YStack>
    </Layout>
  );
}
