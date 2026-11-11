import { render, useState } from 'hono/jsx/dom';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle,
  Anchor, Avatar, AvatarFallback, AvatarImage, Box, Button, Card, CardFooter, CardHeader,
  Checkbox, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle,
  Field, FieldHelper, Form, H1, H2, Heading, Image, Input, ListItem, Loader, Menu, MenuContent, MenuItem, MenuTrigger,
  Paragraph, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, Select, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle,
  SizableText, Slider, Spinner, Switch, Tab, TabList, TabPanel, Tabs, Text, TextArea, Theme, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle,
  ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipTrigger, XStack, YStack,
} from 'silva-ui';
import './styles.css';

const photo = 'https://images.pexels.com/photos/37880101/pexels-photo-37880101.jpeg?auto=compress&cs=tinysrgb&w=900';
const stage = (content: any) => <div class="preview-stage">{content}</div>;
const stack = (content: any) => <YStack class="preview-stack" gap="medium">{content}</YStack>;

function Display({ id }: { id: string }) {
  if (id === 'display-1') return stage(<Card class="preview-card"><CardHeader><Heading level={3}>Project status</Heading><Text color="muted">Silva UI preview</Text></CardHeader><Box p="medium"><Text>Cards compose a clear content surface.</Text></Box><CardFooter><Button>Continue</Button></CardFooter></Card>);
  if (id === 'display-2') return stage(<XStack gap="medium"><Avatar><AvatarImage src={photo} alt="Developer writing code" /><AvatarFallback>BS</AvatarFallback></Avatar><YStack><Text>BlackSilva</Text><Text color="muted">Building in public</Text></YStack></XStack>);
  if (id === 'display-3') return stage(<Image class="preview-image" src={photo} alt="Developer writing code on a laptop" />);
  if (id === 'display-4') return stage(<ListItem title="Release notes" subTitle="Preview app now renders source components" />);
  if (id === 'display-5') return stage(<YStack gap="small" alignItems="center"><Spinner size="lg" /><Text color="muted">Loading project data</Text></YStack>);
  if (id === 'display-6') return stage(<YStack gap="small" alignItems="center"><Loader size="lg" /><Text color="muted">Preparing your workspace</Text></YStack>);
  return stage(<Box class="preview-fallback">Unknown display preview: {id}</Box>);
}

function Forms({ id }: { id: string }) {
  const [on, setOn] = useState(false);
  const [range, setRange] = useState(55);
  if (id === 'forms-1') return stage(<Form class="preview-stack"><Field><Text>Email address</Text><Input type="email" placeholder="you@example.com" /></Field><Button type="button">Subscribe</Button></Form>);
  if (id === 'forms-2') return stage(<Checkbox>Send me release updates</Checkbox>);
  if (id === 'forms-3') return stage(<Button variant="outline">Save changes</Button>);
  if (id === 'forms-4') return stage(stack(<><Field><Text>Project name</Text><Input value="Silva UI" /></Field><FieldHelper>Use a clear, memorable name.</FieldHelper></>));
  if (id === 'forms-5') return stage(<Select value="starter"><option value="starter">Starter</option><option value="team">Team</option><option value="business">Business</option></Select>);
  if (id === 'forms-6') return stage(<XStack gap="medium"><Switch checked={on} onChange={(e: any) => setOn(e.currentTarget.checked)} /><Text>{on ? 'Notifications enabled' : 'Notifications disabled'}</Text></XStack>);
  if (id === 'forms-7') return stage(stack(<><Slider min={0} max={100} value={range} onInput={(e: any) => setRange(Number(e.currentTarget.value))} /><Text>{range}% complete</Text></>));
  if (id === 'forms-8') return stage(<ToggleGroup><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>);
  if (id === 'forms-9') return stage(<RadioGroup value="pro"><RadioGroupItem value="starter">Starter</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup>);
  if (id === 'forms-10') return stage(stack(<><Progress value={72} /><Text>72% complete</Text></>));
  if (id === 'forms-11') return stage(<TextArea class="preview-textarea" placeholder="Add release notes…" rows={4} />);
  return stage(<Box class="preview-fallback">Unknown form preview: {id}</Box>);
}

function TabsPreview() {
  const [tab, setTab] = useState('overview');
  return stage(<Tabs value={tab}><TabList><Tab value="overview" onClick={() => setTab('overview')}>Overview</Tab><Tab value="activity" onClick={() => setTab('activity')}>Activity</Tab></TabList><TabPanel value="overview" hidden={tab !== 'overview'}><Box p="medium"><Text>Overview content</Text></Box></TabPanel><TabPanel value="activity" hidden={tab !== 'activity'}><Box p="medium"><Text>Recent activity</Text></Box></TabPanel></Tabs>);
}
function DialogPreview() {
  const [open, setOpen] = useState(true);
  return stage(<>{!open && <Button onClick={() => setOpen(true)}>Open dialog</Button>}{open && <Dialog open><DialogOverlay class="preview-overlay" onClick={() => setOpen(false)} /><DialogContent class="preview-modal"><DialogHeader><DialogTitle>Publish changes?</DialogTitle><DialogDescription>Your docs will update for everyone.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Publish</Button></DialogFooter></DialogContent></Dialog>}</>);
}
function AlertPreview() {
  const [open, setOpen] = useState(true);
  return stage(<>{!open && <Button onClick={() => setOpen(true)}>Delete project</Button>}{open && <AlertDialog open><AlertDialogOverlay class="preview-overlay" onClick={() => setOpen(false)} /><AlertDialogContent class="preview-modal preview-alert"><AlertDialogHeader><AlertDialogTitle>Delete this project?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => setOpen(false)}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>}</>);
}
function PopoverPreview() {
  const [open, setOpen] = useState(false);
  return stage(<Popover><PopoverTrigger><Button onClick={() => setOpen(!open)}>Open popover</Button></PopoverTrigger>{open && <PopoverContent><YStack gap="small"><Text>Quick settings</Text><PopoverClose onClick={() => setOpen(false)}>Close</PopoverClose></YStack></PopoverContent>}</Popover>);
}
function SheetPreview() {
  const [open, setOpen] = useState(true);
  return stage(<>{!open && <Button onClick={() => setOpen(true)}>Open sheet</Button>}{open && <Sheet open><SheetOverlay class="preview-overlay" onClick={() => setOpen(false)} /><SheetContent side="bottom" class="preview-sheet"><SheetHeader><SheetTitle>Account settings</SheetTitle><SheetDescription>Manage your preferences.</SheetDescription></SheetHeader><SheetFooter><SheetClose onClick={() => setOpen(false)}>Done</SheetClose></SheetFooter></SheetContent></Sheet>}</>);
}
function TooltipPreview() {
  const [open, setOpen] = useState(false);
  return stage(<Tooltip><TooltipTrigger><Button variant="outline" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>Hover me</Button></TooltipTrigger>{open && <TooltipContent>Helpful context</TooltipContent>}</Tooltip>);
}
function ToastPreview() {
  const [open, setOpen] = useState(true);
  return stage(<><Button onClick={() => setOpen(true)}>Show toast</Button><ToastProvider position="bottom-right">{open && <Toast variant="success"><YStack gap="xs"><ToastTitle>Saved</ToastTitle><ToastDescription>Your changes are live.</ToastDescription></YStack><ToastClose onClick={() => setOpen(false)} /></Toast>}</ToastProvider></>);
}
function MenuPreview({ context = false }: { context?: boolean }) {
  const [open, setOpen] = useState(false);
  const Shell: any = context ? ContextMenu : Menu;
  const Trigger: any = context ? ContextMenuTrigger : MenuTrigger;
  const Content: any = context ? ContextMenuContent : MenuContent;
  const Item: any = context ? ContextMenuItem : MenuItem;
  return stage(<Shell><Trigger>{context ? <Box class="preview-fallback" onContextMenu={(e: Event) => { e.preventDefault(); setOpen(true); }}>Right-click here</Box> : <Button onClick={() => setOpen(!open)}>Open menu</Button>}</Trigger>{open && <Content><Item onClick={() => setOpen(false)}>Edit</Item><Item onClick={() => setOpen(false)}>Duplicate</Item><Item onClick={() => setOpen(false)}>Delete</Item></Content>}</Shell>);
}
function AccordionPreview() {
  const [open, setOpen] = useState(true);
  return stage(<Accordion type="single" class="preview-accordion"><AccordionItem value="silva-ui"><AccordionTrigger data-state={open ? 'open' : 'closed'} onClick={() => setOpen(!open)}>What is Silva UI?</AccordionTrigger><AccordionContent data-state={open ? 'open' : 'closed'}>A TypeScript-first component library for Hono JSX.</AccordionContent></AccordionItem></Accordion>);
}
function Overlays({ id }: { id: string }) {
  const views: Record<string, any> = {
    'overlay-1': <DialogPreview />, 'overlay-2': <TabsPreview />, 'overlay-3': <AlertPreview />, 'overlay-4': <PopoverPreview />, 'overlay-5': <SheetPreview />, 'overlay-6': <TooltipPreview />, 'overlay-7': <ToastPreview />, 'overlay-8': <MenuPreview />, 'overlay-9': <MenuPreview context />, 'overlay-10': <AccordionPreview />,
  };
  return views[id] || stage(<Box class="preview-fallback">Unknown overlay preview: {id}</Box>);
}

function Foundation({ id }: { id: string }) {
  if (id.startsWith('layout')) {
    const n = Number(id.split('-')[1]);
    if (n === 1) return stage(<Box p="large" backgroundColor="subtle" borderRadius="large"><Text>Box is the layout foundation.</Text></Box>);
    if (n === 2) return stage(<YStack gap="small"><Text>First item</Text><Text>Second item</Text><Text>Third item</Text></YStack>);
    if (n === 3) return stage(<XStack gap="medium"><Button>Save</Button><Button variant="outline">Cancel</Button></XStack>);
    return stage(<YStack class="preview-separator" gap="small"><Text>Account</Text><Separator decorative={false} /><Text color="muted">Personal details and preferences</Text></YStack>);
  }
  if (id.startsWith('typography')) {
    const n = Number(id.split('-')[1]);
    if (n === 1) return stage(<Text size="lg">Text styles are token-driven.</Text>);
    if (n === 2) return stage(<YStack class="preview-heading" gap="xs"><H1>Build with confidence</H1><H2>Designed for composability</H2></YStack>);
    if (n === 3) return stage(<Paragraph>Silva UI keeps documentation examples close to the components they demonstrate.</Paragraph>);
    if (n === 4) return stage(<YStack gap="xs"><Text color="muted">Learn more</Text><Anchor href="https://blacksilva.com/silva-ui">Read the Silva UI docs</Anchor></YStack>);
    return stage(<SizableText size="xl">Responsive, semantic text</SizableText>);
  }
  return stage(<Box class="preview-fallback">Preview unavailable.</Box>);
}
function Intro({ id }: { id: string }) {
  return stage(id === 'intro-1' ? <Card class="preview-card"><CardHeader><Heading level={3}>Silva UI</Heading></CardHeader><Box p="medium"><Text>Composable components for Hono JSX.</Text></Box><CardFooter><Button>Get started</Button></CardFooter></Card> : <YStack gap="medium"><Text>npm install silva-ui</Text><Button>Install package</Button></YStack>);
}
function App() {
  const id = new URLSearchParams(window.location.search).get('example') || 'intro-1';
  let content: any;
  if (id.startsWith('display')) content = <Display id={id} />;
  else if (id.startsWith('forms')) content = <Forms id={id} />;
  else if (id.startsWith('overlay')) content = <Overlays id={id} />;
  else if (id.startsWith('layout') || id.startsWith('typography')) content = <Foundation id={id} />;
  else if (id === 'intro-1' || id === 'install-2') content = <Intro id={id} />;
  else content = stage(<Box class="preview-fallback">Unknown preview: {id}</Box>);
  return <Theme name="light"><main class="preview">{content}</main></Theme>;
}

render(<App />, document.getElementById('root')!);
