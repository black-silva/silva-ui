import { Anchor, H1, H2, H3, H4, H5, H6, Heading, Paragraph, SizableText, Text, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Components/Typography' };

export const HeadingScale = () => renderStory(
  <YStack gap="small"><H1>Heading one</H1><H2>Heading two</H2><H3>Heading three</H3><H4>Heading four</H4><H5>Heading five</H5><H6>Heading six</H6></YStack>,
);

export const FlexibleHeading = () => renderStory(
  <YStack gap="small"><Heading level={1}>A semantic level one heading</Heading><Heading level={2} size="xl">A visually larger level two heading</Heading><Heading level={3} size="sm">A compact level three heading</Heading></YStack>,
);

export const BodyCopy = () => renderStory(
  <YStack gap="medium" style={{ width: '36rem' }}><Paragraph>Silva UI keeps text components composable, semantic, and aligned with its token system.</Paragraph><Paragraph color="muted">Muted text carries supporting context without competing with the primary message.</Paragraph><Text>Short inline text works for compact interface labels.</Text></YStack>,
);

export const SizableTextScale = () => renderStory(
  <XStack gap="medium" alignItems="baseline"><SizableText size="xs">Extra small</SizableText><SizableText size="sm">Small</SizableText><SizableText size="md">Medium</SizableText><SizableText size="lg">Large</SizableText><SizableText size="xl">Extra large</SizableText></XStack>,
);

export const Links = () => renderStory(
  <YStack gap="small"><Anchor href="#default">Default link</Anchor><Anchor href="#subtle" color="muted">Muted supporting link</Anchor><Text>Links can sit naturally within <Anchor href="#inline">running text</Anchor>.</Text></YStack>,
);

export const ProjectionSizedType = () => renderStory(
  <YStack gap="small"><Text fontSize="$1.6">Small fluid text uses $1.6</Text><Text fontSize="$2.4">Body fluid text uses $2.4</Text><Text fontSize="$3.2">Display fluid text uses $3.2</Text></YStack>,
);
