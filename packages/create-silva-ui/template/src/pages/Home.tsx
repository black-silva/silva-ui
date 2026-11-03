import { Card, H1, Text, YStack, Anchor } from "silva-ui";
import { Layout } from "../components/Layout";

export function Home() {
  return (
    <Layout>
      <YStack gap="large">
        <YStack gap="small">
          <H1 color="primary">Welcome to Silva UI</H1>
          <Text color="muted" lineHeight="relaxed">
            A small starting point for building your app.
          </Text>
        </YStack>

        <Card p="large" backgroundColor="ocean">
          <YStack gap="medium">
            <Text color="primaryContrast" fontWeight="bold">Start building</Text>
            <Text color="primaryContrast">
              Edit src/pages/Home.tsx and make this page yours.
            </Text>
            <Anchor href="/about" color="primaryContrast" fontWeight="bold">
              Meet the project
            </Anchor>
          </YStack>
        </Card>
      </YStack>
    </Layout>
  );
}
