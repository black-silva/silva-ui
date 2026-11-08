import { Box, Button, Card, CardFooter, CardHeader, Checkbox, H2, Input, Label, Paragraph, Progress, Separator, Spinner, Switch, Text, TextArea, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Components/Primitives' };

export const ButtonVariants = () => renderStory(<XStack gap="small"><Button>Solid</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button></XStack>);
export const Inputs = () => renderStory(<YStack gap="small"><Label>Email</Label><Input type="email" placeholder="you@example.com" /><TextArea placeholder="Write a message" /><Checkbox>Remember me</Checkbox><Switch>Notifications</Switch></YStack>);
export const Typography = () => renderStory(<YStack gap="small"><H2>Design with intent</H2><Paragraph>Composable primitives built for Hono JSX.</Paragraph><Text color="muted">Supporting text</Text><Separator /></YStack>);
export const CardComposition = () => renderStory(<Card><CardHeader><H2>Project update</H2></CardHeader><Paragraph>Everything is ready to review.</Paragraph><CardFooter><Button>Open project</Button></CardFooter></Card>);
export const Feedback = () => renderStory(<YStack gap="small"><Progress value={62} /><XStack gap="small"><Spinner /><Text>Loading content</Text></XStack></YStack>);
export const Layout = () => renderStory(<Box p="medium" bg="subtle" borderRadius="medium"><Text>Box with semantic tokens</Text></Box>);
