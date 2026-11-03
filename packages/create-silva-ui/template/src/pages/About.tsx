import { Card, H1, Text, YStack } from "silva-ui";
import { Layout } from "../components/Layout";

export function About() {
  async function loadMessage() {
    const response = await fetch("/api/message");
    const { message } = await response.json();
    window.alert(message);
  }

  return (
    <Layout>
      <YStack gap="large">
        <YStack gap="small">
          <H1>About this starter</H1>
          <Text as="p" color="muted" lineHeight="relaxed">
            It has two pages, one shared layout, and declarative routes.
          </Text>
        </YStack>

        <Card p="large">
          <YStack gap="medium">
            <Text as="p">
              Add pages in src/pages, then define their paths in src/app.tsx.
            </Text>
            <button type="button" onClick={loadMessage}>
              Call the Hono API
            </button>
          </YStack>
        </Card>
      </YStack>
    </Layout>
  );
}
