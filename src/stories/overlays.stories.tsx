import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Box, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, Popover, PopoverClose, PopoverContent, PopoverTrigger, Tab, TabList, TabPanel, Tabs, Text, Tooltip, TooltipContent, TooltipTrigger, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Components/Overlays' };

export const AccordionStates = () => renderStory(
  <Accordion style={{ width: '24rem' }}>
    <AccordionItem value="first"><AccordionTrigger data-state="open">What is Silva UI?</AccordionTrigger><AccordionContent data-state="open"><Text>A zero-runtime component library for Hono JSX.</Text></AccordionContent></AccordionItem>
    <AccordionItem value="second"><AccordionTrigger>Does it support themes?</AccordionTrigger><AccordionContent>Yes, themes use semantic tokens.</AccordionContent></AccordionItem>
  </Accordion>,
);

export const TabsComposition = () => renderStory(
  <Tabs style={{ width: '24rem' }}><TabList aria-label="Account sections"><Tab value="profile" data-active="true">Profile</Tab><Tab value="settings">Settings</Tab><Tab value="billing">Billing</Tab></TabList><TabPanel value="profile"><Text>Update your public profile details.</Text></TabPanel></Tabs>,
);

export const PopoverOpenState = () => renderStory(
  <Popover><PopoverTrigger><Button>Share</Button></PopoverTrigger><PopoverContent data-state="open" side="bottom"><YStack gap="small"><Text>Invite collaborators to this project.</Text><PopoverClose>Close</PopoverClose></YStack></PopoverContent></Popover>,
);

export const TooltipOpenState = () => renderStory(
  <Tooltip><TooltipTrigger><Button variant="outline">Hover target</Button></TooltipTrigger><TooltipContent data-state="open" side="top">Helpful context appears here.</TooltipContent></Tooltip>,
);

export const DialogComposition = () => renderStory(
  <Dialog><DialogOverlay data-state="open" /><DialogContent data-state="open"><DialogHeader><DialogTitle>Delete project?</DialogTitle><DialogDescription>This action cannot be undone.</DialogDescription></DialogHeader><DialogFooter><XStack gap="small"><DialogClose>Cancel</DialogClose><Button>Delete</Button></XStack></DialogFooter></DialogContent></Dialog>,
);

export const Layering = () => renderStory(<Box p="large" bg="subtle" borderRadius="large"><YStack gap="small"><Text>Overlay primitives are markup-first.</Text><Text color="muted">Connect their open state to the interaction model you need.</Text></YStack></Box>);
