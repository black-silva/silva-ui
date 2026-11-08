import { useState } from 'hono/jsx/dom';
import { Button, Checkbox, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, Field, Form, Input, Label, Popover, PopoverClose, PopoverContent, PopoverTrigger, Tab, TabList, TabPanel, Tabs, Text, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Components/Interactive examples' };

function InteractiveForm() {
  const [email, setEmail] = useState('');
  const [updates, setUpdates] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const isValid = /\S+@\S+\.\S+/.test(email);
  const error = email.length > 0 && !isValid ? 'Enter a valid email address.' : undefined;

  return <Form onSubmit={(event: Event) => { event.preventDefault(); setSubmitted(isValid); }}><YStack gap="medium" style={{ width: '22rem' }}><Field error={error} helperText="We only use this for account notices."><Label for="interactive-email">Email address</Label><Input id="interactive-email" type="email" value={email} aria-invalid={Boolean(error)} onInput={(event: Event) => { setEmail((event.target as HTMLInputElement).value); setSubmitted(false); }} /></Field><Checkbox checked={updates} onChange={(event: Event) => setUpdates((event.target as HTMLInputElement).checked)}>Send product updates</Checkbox><XStack gap="small"><Button type="submit">Save preferences</Button><Button variant="outline" type="button" onClick={() => { setEmail(''); setUpdates(true); setSubmitted(false); }}>Reset</Button></XStack>{submitted ? <Text color="success">Preferences saved.</Text> : null}</YStack></Form>;
}

function InteractiveTabs() {
  const [active, setActive] = useState('profile');
  const tabs = ['profile', 'settings', 'billing'];
  return <Tabs value={active} style={{ width: '24rem' }}><TabList aria-label="Account sections">{tabs.map((tab) => <Tab value={tab} data-active={active === tab} onClick={() => setActive(tab)}>{tab[0].toUpperCase() + tab.slice(1)}</Tab>)}</TabList><TabPanel value="profile" hidden={active !== 'profile'}><Text>Update your public profile details.</Text></TabPanel><TabPanel value="settings" hidden={active !== 'settings'}><Text>Control notifications and account preferences.</Text></TabPanel><TabPanel value="billing" hidden={active !== 'billing'}><Text>View invoices and payment methods.</Text></TabPanel></Tabs>;
}

function InteractiveOverlays() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  return <YStack gap="large"><XStack gap="small"><Button onClick={() => setDialogOpen(true)}>Delete project</Button><Popover><PopoverTrigger><Button variant="outline" onClick={() => setPopoverOpen(!popoverOpen)}>Share</Button></PopoverTrigger>{popoverOpen ? <PopoverContent data-state="open" side="bottom"><YStack gap="small"><Text>Invite collaborators to this project.</Text><PopoverClose onClick={() => setPopoverOpen(false)}>Close</PopoverClose></YStack></PopoverContent> : null}</Popover><Button variant="outline" onClick={() => setToastVisible(true)}>Show toast</Button></XStack>{dialogOpen ? <Dialog open><DialogOverlay onClick={() => setDialogOpen(false)} /><DialogContent data-state="open"><DialogHeader><DialogTitle>Delete project?</DialogTitle><DialogDescription>This action cannot be undone.</DialogDescription></DialogHeader><DialogFooter><XStack gap="small"><DialogClose onClick={() => setDialogOpen(false)}>Cancel</DialogClose><Button onClick={() => setDialogOpen(false)}>Delete</Button></XStack></DialogFooter></DialogContent></Dialog> : null}{toastVisible ? <ToastProvider position="bottom-right"><Toast variant="success"><ToastTitle>Saved</ToastTitle><ToastDescription>Your project changes are live.</ToastDescription><ToastClose onClick={() => setToastVisible(false)} /></Toast></ToastProvider> : null}</YStack>;
}

export const FormValidationAndSubmission = () => renderStory(<InteractiveForm />);
export const ControlledTabs = () => renderStory(<InteractiveTabs />);
export const DialogPopoverAndToast = () => renderStory(<InteractiveOverlays />);
