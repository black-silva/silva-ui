import { render, useState } from 'hono/jsx/dom';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle,
  Avatar, AvatarFallback, AvatarImage, Box, Button, Card, CardFooter, CardHeader,
  Checkbox, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle,
  Field, FieldHelper, Form, H1, H2, Heading, Image, Input, ListItem, Loader, Menu, MenuContent, MenuItem, MenuTrigger,
  Paragraph, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, Select, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle,
  Slider, Spinner, Switch, Tab, TabList, TabPanel, Tabs, Text, TextArea, Theme, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle,
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
  return stage(stack(<><ListItem title="Release notes" subTitle="Preview app now renders source components" /><XStack gap="medium"><Spinner /><Loader /></XStack></>));
}

function Forms({ id }: { id: string }) {
  const [on, setOn] = useState(false); const [range, setRange] = useState(55);
  if (id === 'forms-1') return stage(<Form class="preview-stack"><Field><Text>Email address</Text><Input type="email" placeholder="you@example.com" /></Field><Button type="button">Subscribe</Button></Form>);
  if (id === 'forms-2') return stage(stack(<><Checkbox label="Send me release updates" /><TextArea placeholder="Add a note…" /></>));
  if (id === 'forms-3') return stage(<Button variant="outline">Save changes</Button>);
  if (id === 'forms-4') return stage(stack(<><Field><Text>Project name</Text><Input value="Silva UI" /></Field><FieldHelper>Use a clear, memorable name.</FieldHelper></>));
  if (id === 'forms-5') return stage(<Select value="starter"><option value="starter">Starter</option><option value="team">Team</option><option value="business">Business</option></Select>);
  if (id === 'forms-6') return stage(<XStack gap="medium"><Switch checked={on} onChange={(e: any) => setOn(e.currentTarget.checked)} /><Text>{on ? 'Notifications enabled' : 'Notifications disabled'}</Text></XStack>);
  if (id === 'forms-7') return stage(stack(<><Slider min={0} max={100} value={range} onInput={(e: any) => setRange(Number(e.currentTarget.value))} /><Text>{range}% complete</Text></>));
  if (id === 'forms-8') return stage(<ToggleGroup><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>);
  if (id === 'forms-9') return stage(<RadioGroup value="pro"><RadioGroupItem value="starter">Starter</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup>);
  if (id === 'forms-10') return stage(stack(<><Progress value={72} /><Text>72% complete</Text></>));
  return stage(<ToggleGroup><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>);
}

function TabsPreview() { const [tab, setTab] = useState('overview'); return stage(<Tabs value={tab}><TabList><Tab value="overview" onClick={() => setTab('overview')}>Overview</Tab><Tab value="activity" onClick={() => setTab('activity')}>Activity</Tab></TabList><TabPanel value="overview" hidden={tab !== 'overview'}><Box p="medium"><Text>Overview content</Text></Box></TabPanel><TabPanel value="activity" hidden={tab !== 'activity'}><Box p="medium"><Text>Recent activity</Text></Box></TabPanel></Tabs>); }
function DialogPreview() { const [open, setOpen] = useState(false); return stage(<><Button onClick={() => setOpen(true)}>Open dialog</Button>{open && <Dialog><DialogOverlay onClick={() => setOpen(false)} /><DialogContent><DialogHeader><DialogTitle>Publish changes?</DialogTitle><DialogDescription>Your docs will update for everyone.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Publish</Button></DialogFooter></DialogContent></Dialog>}</>); }
function AlertPreview() { const [open, setOpen] = useState(false); return stage(<><Button onClick={() => setOpen(true)}>Delete project</Button>{open && <AlertDialog><AlertDialogOverlay onClick={() => setOpen(false)} /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this project?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => setOpen(false)}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>}</>); }
function PopoverPreview() { const [open, setOpen] = useState(false); return stage(<Popover><PopoverTrigger><Button onClick={() => setOpen(!open)}>Open popover</Button></PopoverTrigger>{open && <PopoverContent><YStack gap="small"><Text>Quick settings</Text><PopoverClose onClick={() => setOpen(false)}>Close</PopoverClose></YStack></PopoverContent>}</Popover>); }
function SheetPreview() { const [open, setOpen] = useState(false); return stage(<><Button onClick={() => setOpen(true)}>Open sheet</Button>{open && <Sheet><SheetOverlay onClick={() => setOpen(false)} /><SheetContent><SheetHeader><SheetTitle>Account settings</SheetTitle><SheetDescription>Manage your preferences.</SheetDescription></SheetHeader><SheetFooter><SheetClose onClick={() => setOpen(false)}>Done</SheetClose></SheetFooter></SheetContent></Sheet>}</>); }
function TooltipPreview() { const [open, setOpen] = useState(false); return stage(<Tooltip><TooltipTrigger><Button variant="outline" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>Hover me</Button></TooltipTrigger>{open && <TooltipContent>Helpful context</TooltipContent>}</Tooltip>); }
function ToastPreview() { const [open, setOpen] = useState(false); return stage(<ToastProvider><Button onClick={() => setOpen(true)}>Show toast</Button>{open && <Toast><ToastTitle>Saved</ToastTitle><ToastDescription>Your changes are live.</ToastDescription><ToastClose onClick={() => setOpen(false)}>Close</ToastClose></Toast>}</ToastProvider>); }
function MenuPreview({ context = false }: { context?: boolean }) { const [open, setOpen] = useState(false); const Shell: any = context ? ContextMenu : Menu; const Trigger: any = context ? ContextMenuTrigger : MenuTrigger; const Content: any = context ? ContextMenuContent : MenuContent; const Item: any = context ? ContextMenuItem : MenuItem; return stage(<Shell><Trigger>{context ? <Box class="preview-fallback" onContextMenu={(e: Event) => { e.preventDefault(); setOpen(true); }}>Right-click here</Box> : <Button onClick={() => setOpen(!open)}>Open menu</Button>}</Trigger>{open && <Content><Item onClick={() => setOpen(false)}>Edit</Item><Item onClick={() => setOpen(false)}>Duplicate</Item><Item onClick={() => setOpen(false)}>Delete</Item></Content>}</Shell>); }
function AccordionPreview() { const [open, setOpen] = useState('item'); return stage(<Accordion><AccordionItem value="item"><AccordionTrigger onClick={() => setOpen(open ? '' : 'item')}>What is Silva UI?</AccordionTrigger><AccordionContent hidden={!open}>A TypeScript-first component library.</AccordionContent></AccordionItem></Accordion>); }
function Overlays({ id }: { id: string }) { const views: Record<string, any> = {'overlay-2': <TabsPreview />, 'overlay-1': <DialogPreview />, 'overlay-3': <AlertPreview />, 'overlay-4': <PopoverPreview />, 'overlay-5': <SheetPreview />, 'overlay-6': <TooltipPreview />, 'overlay-7': <ToastPreview />, 'overlay-8': <MenuPreview />, 'overlay-9': <MenuPreview context />, 'overlay-10': <AccordionPreview />}; return views[id]; }

function Foundation({ id }: { id: string }) {
  if (id.startsWith('layout')) { const n = Number(id.split('-')[1]); return stage(n === 1 ? <Box p="large" backgroundColor="subtle" borderRadius="large"><Text>Box is the layout foundation.</Text></Box> : n === 2 ? <YStack gap="small"><Text>First item</Text><Text>Second item</Text><Text>Third item</Text></YStack> : n === 3 ? <XStack gap="medium"><Button>Save</Button><Button variant="outline">Cancel</Button></XStack> : <XStack gap="small"><Input value="https://" /><Button>Copy</Button></XStack>); }
  if (id.startsWith('typography')) { const n = Number(id.split('-')[1]); return stage(n === 1 ? <Text size="lg">Text styles are token-driven.</Text> : n === 2 ? <YStack><H1>Build with confidence</H1><H2>Designed for composability</H2></YStack> : <Paragraph>Silva UI keeps documentation examples close to the components they demonstrate.</Paragraph>); }
  if (id.startsWith('sprinkles')) { const n = Number(id.split('-')[1]); return stage(n === 1 ? <Card class="preview-card"><CardHeader><Heading level={3}>Token-powered card</Heading></CardHeader><Box p="medium"><Text>Spacing and colour come from sprinkles.</Text></Box></Card> : n === 2 ? <Box p="$4" backgroundColor="subtle" borderRadius="medium"><Text>Semantic size $4</Text></Box> : <Button onClick={(e: any) => e.currentTarget.textContent = 'Applied'}>Apply styles</Button>); }
  if (id.startsWith('gradient')) { const n = Number(id.split('-')[1]); return stage(<Box class={`preview-gradient ${n === 4 ? 'radial' : ''}`} gradient={n === 1 ? { from: 'brand', to: 'accent', direction: 'to-r' } as any : undefined}><Text>{n === 1 ? 'Theme-aware gradient' : n === 2 ? 'Scoped theme gradient' : n === 3 ? 'Custom gradient' : 'Radial gradient'}</Text></Box>); }
  if (id.startsWith('visuals')) { const n = Number(id.split('-')[1]); return stage(n === 1 ? <Box class="preview-gradient" gradient={{ from: 'brand', to: 'accent', direction: 'to-r' } as any}>Named gradient</Box> : n === 2 ? <Text color="brand" size="xl">Gradient text</Text> : <Box p="large" backgroundColor="subtle" animation="fadeIn"><Text>Animated on entry</Text></Box>); }
  if (id.startsWith('theming')) return stage(<Theme name={id === 'theming-1' ? 'light' : 'dark'}><Card class="preview-card"><CardHeader><Heading level={3}>{id === 'theming-1' ? 'Built-in theme' : 'Custom theme scope'}</Heading></CardHeader><Box p="medium"><Text>The theme is applied by Silva UI.</Text></Box></Card></Theme>);
  return stage(<Box p="large" backgroundColor="subtle" borderRadius="large"><Text>Preview unavailable.</Text></Box>);
}
function Intro({ id }: { id: string }) { return stage(id === 'intro-1' ? <Card class="preview-card"><CardHeader><Heading level={3}>Silva UI</Heading></CardHeader><Box p="medium"><Text>Composable components for Hono JSX.</Text></Box><CardFooter><Button>Get started</Button></CardFooter></Card> : <YStack gap="medium"><Text>npm install silva-ui</Text><Button>Install package</Button></YStack>); }

function App() { const id = new URLSearchParams(window.location.search).get('example') || 'intro-1'; let content: any; if (id.startsWith('display')) content = <Display id={id} />; else if (id.startsWith('forms')) content = <Forms id={id} />; else if (id.startsWith('overlay')) content = <Overlays id={id} />; else if (id.startsWith('layout') || id.startsWith('typography') || id.startsWith('sprinkles') || id.startsWith('gradient') || id.startsWith('visuals') || id.startsWith('theming')) content = <Foundation id={id} />; else if (id === 'intro-1' || id === 'install-2') content = <Intro id={id} />; else content = stage(<Box class="preview-fallback">Unknown preview: {id}</Box>); return <Theme name="light"><main class="preview">{content}</main></Theme>; }

render(<App />, document.getElementById('root')!);
