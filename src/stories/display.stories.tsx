import { Avatar, AvatarFallback, AvatarImage, Box, Button, Card, CardFooter, CardHeader, H3, Image, ListItem, Loader, Paragraph, Spinner, Text, XStack, YStack } from '../index';
import { renderStory } from './render';

const illustration = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"%3E%3Crect width="640" height="360" fill="%231c2635"/%3E%3Ccircle cx="320" cy="180" r="92" fill="%235b93ff"/%3E%3C/svg%3E';

export default { title: 'Components/Display' };

export const AvatarStates = () => renderStory(
  <XStack gap="medium" alignItems="center"><Avatar size="sm"><AvatarFallback>BS</AvatarFallback></Avatar><Avatar><AvatarFallback>UI</AvatarFallback></Avatar><Avatar size="lg"><AvatarImage src={illustration} alt="Blue abstract avatar" /></Avatar></XStack>,
);

export const CardComposition = () => renderStory(
  <Card elevated style={{ width: '24rem' }}><CardHeader><H3>Release 1.2</H3><Text color="muted">Now available</Text></CardHeader><Paragraph>Semantic tokens and Hono JSX primitives for coherent interfaces.</Paragraph><CardFooter><Button>Read release notes</Button></CardFooter></Card>,
);

export const Media = () => renderStory(
  <YStack gap="small" style={{ width: '24rem' }}><Image src={illustration} alt="Blue circular illustration" width="100%" height="auto" /><Text color="muted">Images keep native loading and accessibility attributes.</Text></YStack>,
);

export const ListItems = () => renderStory(
  <YStack gap="small" style={{ width: '24rem' }}><ListItem icon="●" title="BlackSilva" subTitle="Maintainer" pressable /><ListItem icon="○" title="Silva UI" subTitle="Component library" pressable /><ListItem title="No icon required" subTitle="The text layout remains aligned." /></YStack>,
);

export const LoadingStates = () => renderStory(
  <Box p="large" bg="subtle" borderRadius="large"><XStack gap="medium" alignItems="center"><Spinner /><Loader /><Text>Fetching the latest release…</Text></XStack></Box>,
);
