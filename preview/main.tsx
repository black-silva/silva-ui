import { render } from 'hono/jsx/dom';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle,
  Anchor, Avatar, AvatarFallback, AvatarImage, Box, Button, Card, CardFooter, CardHeader, Checkbox, ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger,
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, Field, FieldError, FieldHelper, Form, H1, H2, H3, H4, H5, H6, Image, Input, Label, ListItem, Loader, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger,
  Paragraph, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, Select, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle, SizableText, Slider, Spinner, Switch, Tab, TabList, TabPanel, Tabs, Text, TextArea, Theme, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipTrigger, XGroup, XStack, YStack,
} from 'silva-ui';

const stage = (children: any) => (
  <Box as="main" minHeight="screenH" width="full" p="large" display="flex" alignItems="center" justifyContent="center" bg="background">
    <Box width="full" maxWidth="64" minHeight="64" display="flex" alignItems="center" justifyContent="center">{children}</Box>
  </Box>
);

function previewControl(event: Event) { return (event.currentTarget as HTMLElement).closest<HTMLElement>('[data-preview-control]'); }
function setPreviewOpen(event: Event, open: boolean) {
  const root = previewControl(event);
  if (!root) return;
  root.dataset.open = String(open);
  root.querySelectorAll<HTMLElement>('[data-preview-layer]').forEach((layer) => { layer.hidden = !open; layer.setAttribute('data-state', open ? 'open' : 'closed'); });
  const toast = root.querySelector<HTMLElement>('[data-preview-toast]');
  if (toast) toast.hidden = !open;
}
function toggleAccordion(event: Event) {
  const trigger = event.currentTarget as HTMLElement;
  const item = trigger.closest<HTMLElement>('[data-preview-accordion-item]');
  if (!item) return;
  const open = trigger.getAttribute('data-state') !== 'open';
  trigger.setAttribute('data-state', open ? 'open' : 'closed');
  trigger.setAttribute('aria-expanded', String(open));
  const content = item.querySelector<HTMLElement>('[data-preview-accordion-content]');
  if (content) { content.hidden = !open; content.setAttribute('data-state', open ? 'open' : 'closed'); }
}
function choosePreviewTab(event: Event) {
  const tab = event.currentTarget as HTMLElement;
  const root = tab.closest<HTMLElement>('[data-preview-tabs]');
  if (!root) return;
  const value = tab.dataset.value;
  root.querySelectorAll<HTMLElement>('[role="tab"]').forEach((item) => { const active = item.dataset.value === value; item.dataset.active = String(active); item.setAttribute('aria-selected', String(active)); });
  root.querySelectorAll<HTMLElement>('[role="tabpanel"]').forEach((panel) => { panel.hidden = panel.dataset.value !== value; });
}

const Interactive = ({ children, menu = false }: { children: any; menu?: boolean }) => (
  <YStack data-preview-control width="64" gap="small" alignItems="center" justifyContent="center" minHeight={menu ? '40' : undefined} position={menu ? 'relative' : undefined}>{children}</YStack>
);
const Popout = ({ children, tooltip = false }: { children: any; tooltip?: boolean }) => (
  <YStack data-preview-layer data-state="closed" mt="small" gap="small" p={tooltip ? 'small' : 'medium'} width={tooltip ? 'fit' : undefined} minWidth={tooltip ? undefined : '48'}>{children}</YStack>
);

function ApiExample({ api, variant }: { api: string; variant: number }) {
  switch (api) {
    case 'avatar': return stage(variant ? <Avatar><AvatarFallback>UI</AvatarFallback></Avatar> : <Avatar><AvatarImage src="https://placehold.co/48" alt="BlackSilva" /><AvatarFallback>BS</AvatarFallback></Avatar>);
    case 'card': return stage(<Card elevated width="64" overflow="hidden"><Box gradient={{ from: 'teal9', via: 'blue9', to: 'violet9', deg: 135 }} minHeight="24" p="medium" color="background"><Text fontSize="xs" fontWeight="bold" letterSpacing="widest">{variant ? 'DESIGN SYSTEM' : 'SHIP FASTER'}</Text><H3 mt="small" color="background">{variant ? 'Silva UI' : 'Release 1.3'}</H3></Box><CardHeader p="medium"><YStack gap="xs"><Text fontSize="sm" fontWeight="bold">{variant ? 'The calm way to build' : 'A polished starting point'}</Text><Text fontSize="xs" color="muted">{variant ? 'Typed primitives that stay out of your way.' : 'Composable Hono JSX, ready for your next idea.'}</Text></YStack></CardHeader><CardFooter p="medium"><XStack alignItems="center" justifyContent="space-between" width="full"><Text fontSize="xs" color="muted">{variant ? '38 components' : 'Just published'}</Text><Button variant={variant ? 'outline' : undefined}>{variant ? 'Explore' : 'View notes'}</Button></XStack></CardFooter></Card>);
    case 'image': return stage(<Image width="64" height="32" objectFit="cover" borderRadius="large" src={variant ? 'https://placehold.co/320x180' : 'https://placehold.co/640x360'} alt={variant ? 'Small placeholder preview' : 'Placeholder preview'} />);
    case 'listItem': return stage(<ListItem title={variant ? 'Documentation' : 'Release notes'} subTitle={variant ? 'Two matched examples' : 'Updated today'} />);
    case 'loader': return stage(<Loader size={variant ? 'lg' : undefined} />);
    case 'spinner': return stage(<Spinner size={variant ? 'lg' : undefined} />);
    case 'button': return stage(<Button variant={variant ? 'outline' : undefined}>{variant ? 'Cancel' : 'Save changes'}</Button>);
    case 'checkbox': return stage(<Checkbox disabled={!!variant}>{variant ? 'Unavailable option' : 'Send updates'}</Checkbox>);
    case 'field': return stage(variant ? <Field><Input aria-invalid="true" placeholder="Email" /><FieldError>Enter a valid email address.</FieldError></Field> : <Field><Input placeholder="Project name" /><FieldHelper>Choose a clear name.</FieldHelper></Field>);
    case 'form': return stage(<Form onSubmit={(event) => event.preventDefault()}><Input placeholder={variant ? 'Search' : 'Email'} /><Button type="submit">{variant ? 'Search' : 'Subscribe'}</Button></Form>);
    case 'installation': return stage(<Theme name="emerald" p="large"><YStack gap="medium" maxWidth="40"><H1>Hello, Silva</H1><Paragraph color="muted">Your UI is ready to grow.</Paragraph><Button type="button">Get started</Button></YStack></Theme>);
    case 'input': return stage(<Input placeholder={variant ? 'Project name' : 'you@example.com'} type={variant ? undefined : 'email'} />);
    case 'label': return stage(<YStack gap="small" width="64"><Label htmlFor={variant ? 'project-name' : 'email'}>{variant ? 'Project name' : 'Email'}</Label><Input id={variant ? 'project-name' : 'email'} type={variant ? undefined : 'email'} /></YStack>);
    case 'progress': return stage(<Progress value={variant ? 40 : 72} aria-label={variant ? 'Profile completion' : 'Upload progress'} />);
    case 'radioGroup': return stage(variant ? <RadioGroup name="billing" defaultValue="monthly" aria-label="Billing interval"><RadioGroupItem value="monthly">Monthly</RadioGroupItem><RadioGroupItem value="yearly">Yearly</RadioGroupItem></RadioGroup> : <RadioGroup name="plan" defaultValue="starter" aria-label="Plan"><RadioGroupItem value="starter">Starter</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup>);
    case 'select': return stage(<Select options={variant ? [{ value: 'south-africa', label: 'South Africa' }, { value: 'other', label: 'Other' }] : [{ value: 'starter', label: 'Starter' }, { value: 'pro', label: 'Pro' }]} />);
    case 'slider': return stage(<Slider value={variant ? 80 : 50} />);
    case 'switch': return stage(<Switch checked={!variant} />);
    case 'textArea': return stage(<TextArea placeholder={variant ? 'Leave a comment' : 'Write release notes'} rows={3} />);
    case 'toggleGroup': return stage(variant ? <ToggleGroup><ToggleGroupItem value="grid">Grid</ToggleGroupItem><ToggleGroupItem value="list">List</ToggleGroupItem></ToggleGroup> : <ToggleGroup><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>);
    case 'box': return stage(<Box as="article" p="large" borderRadius="large" width="64" minHeight="48" overflow="hidden" gradient={{ from: 'blue10', via: 'blue9', to: 'teal9', deg: 135 }} color="background"><YStack gap="small"><Text fontSize="xs" fontWeight="bold" letterSpacing="widest">{variant ? 'WORKSPACE' : 'FOUNDATION'}</Text><H3 color="background">{variant ? 'Everything in its place' : 'Build from one good Box'}</H3><Text color="background" fontSize="xs">{variant ? 'A focused layout for your next session.' : 'Spacing, colour and radius through tokens.'}</Text><XStack gap="large" mt="small"><YStack gap="none"><Text color="background" fontSize="lg" fontWeight="bold">{variant ? '12' : '24'}</Text><Text color="background" fontSize="xs" textTransform="uppercase">{variant ? 'projects' : 'tokens'}</Text></YStack><YStack gap="none"><Text color="background" fontSize="lg" fontWeight="bold">{variant ? '4.8' : '100%'}</Text><Text color="background" fontSize="xs" textTransform="uppercase">{variant ? 'rating' : 'composable'}</Text></YStack></XStack></YStack></Box>);
    case 'separator': return stage(<YStack><Text>{variant ? 'Billing' : 'Profile'}</Text><Separator /><Text>{variant ? 'Invoices' : 'Security'}</Text></YStack>);
    case 'stacks': return stage(variant ? <XStack gap="small"><Button>Save</Button><Button variant="outline">Cancel</Button></XStack> : <YStack><Text>First</Text><Text>Second</Text></YStack>);
    case 'xGroup': return stage(<XGroup><Button>{variant ? 'Grid' : 'Day'}</Button><Button>{variant ? 'List' : 'Week'}</Button></XGroup>);
    case 'accordion': return stage(<Accordion width="64"><AccordionItem value={variant ? 'two' : 'one'} data-preview-accordion-item><AccordionTrigger data-state="closed" onClick={toggleAccordion}>{variant ? 'Is it typed?' : 'What is Silva UI?'}</AccordionTrigger><AccordionContent data-preview-accordion-content data-state="closed" hidden>{variant ? 'Yes, it is TypeScript-first.' : 'Composable UI for Hono JSX.'}</AccordionContent></AccordionItem></Accordion>);
    case 'alertDialog': return stage(<Interactive><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Discard draft' : 'Delete project'}</Button><AlertDialog open={false}><AlertDialogOverlay data-preview-layer hidden onClick={(event) => setPreviewOpen(event, false)} /><AlertDialogContent data-preview-layer hidden><AlertDialogHeader><AlertDialogTitle>{variant ? 'Discard changes?' : 'Delete project?'}</AlertDialogTitle><AlertDialogDescription>{variant ? 'Keep your current draft.' : 'This cannot be undone.'}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Keep editing' : 'Cancel'}</AlertDialogCancel><AlertDialogAction onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Discard' : 'Delete'}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></Interactive>);
    case 'contextMenu': return stage(<Interactive menu><ContextMenu><ContextMenuTrigger onContextMenu={(event) => { event.preventDefault(); setPreviewOpen(event, true); }} onClick={(event) => setPreviewOpen(event, true)}><Button variant="outline">{variant ? 'Right-click for actions' : 'Right-click this card'}</Button></ContextMenuTrigger><ContextMenuContent data-preview-layer data-state="closed">{variant ? <><ContextMenuLabel>Actions</ContextMenuLabel><ContextMenuGroup><ContextMenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</ContextMenuItem></ContextMenuGroup><ContextMenuSeparator /><ContextMenuItem onClick={(event) => setPreviewOpen(event, false)}>Delete</ContextMenuItem></> : <ContextMenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</ContextMenuItem>}</ContextMenuContent></ContextMenu></Interactive>);
    case 'dialog': return stage(<Interactive><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Open settings' : 'Publish changes'}</Button><Dialog open={false}><DialogOverlay data-preview-layer onClick={(event) => setPreviewOpen(event, false)} /><DialogContent data-preview-layer hidden><DialogHeader><DialogTitle>{variant ? 'Settings' : 'Publish changes?'}</DialogTitle><DialogDescription>{variant ? 'Choose how this project appears.' : 'Your documentation will update.'}</DialogDescription></DialogHeader><DialogFooter><DialogClose onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Done' : 'Cancel'}</DialogClose>{!variant && <Button onClick={(event) => setPreviewOpen(event, false)}>Publish</Button>}</DialogFooter></DialogContent></Dialog></Interactive>);
    case 'menu': return stage(<Interactive menu><Menu><MenuTrigger><Button variant="outline" onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Project actions' : 'Open menu'}</Button></MenuTrigger><MenuContent data-preview-layer data-state="closed">{variant ? <><MenuLabel>Actions</MenuLabel><MenuGroup><MenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</MenuItem></MenuGroup><MenuSeparator /><MenuItem onClick={(event) => setPreviewOpen(event, false)}>Delete</MenuItem></> : <MenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</MenuItem>}</MenuContent></Menu></Interactive>);
    case 'popover': return stage(<Interactive menu><Popover><PopoverTrigger><Button variant="outline" onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Show details' : 'Open popover'}</Button></PopoverTrigger><PopoverContent data-preview-layer data-state="closed"><YStack gap="small" p="medium"><Text>{variant ? 'This is where supporting detail belongs.' : 'A little context, right when you need it.'}</Text><PopoverClose onClick={(event) => setPreviewOpen(event, false)}>Close</PopoverClose></YStack></PopoverContent></Popover></Interactive>);
    case 'sheet': return stage(<Interactive><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Notification settings' : 'Open account settings'}</Button><Sheet open={false}><SheetOverlay data-preview-layer hidden onClick={(event) => setPreviewOpen(event, false)} /><SheetContent side="bottom" data-preview-layer hidden><SheetHeader><SheetTitle>{variant ? 'Notifications' : 'Account settings'}</SheetTitle><SheetDescription>{variant ? 'Choose what reaches you.' : 'Manage your profile.'}</SheetDescription></SheetHeader><SheetFooter><SheetClose onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Save' : 'Done'}</SheetClose></SheetFooter></SheetContent></Sheet></Interactive>);
    case 'tabs': return stage(<Tabs width="64" data-preview-tabs><TabList aria-label={variant ? 'Workspace' : 'Project'}><Tab id="overview-tab" value="overview" data-active aria-controls="overview-panel" onClick={choosePreviewTab}>Overview</Tab><Tab id="activity-tab" value="activity" aria-controls="activity-panel" onClick={choosePreviewTab}>Activity</Tab></TabList><TabPanel id="overview-panel" value="overview" aria-labelledby="overview-tab">{variant ? 'Workspace preferences and collaborators.' : 'Everything is ready for your next release.'}</TabPanel><TabPanel id="activity-panel" value="activity" aria-labelledby="activity-tab" hidden>{variant ? 'Three team members are online.' : 'No pending updates. You are all caught up.'}</TabPanel></Tabs>);
    case 'toast': return stage(<Interactive><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Show published toast' : 'Show saved toast'}</Button><ToastProvider position="bottom-center"><Box data-preview-toast hidden width="full"><Toast variant={variant ? 'success' : 'default'}><ToastTitle>{variant ? 'Published' : 'Saved'}</ToastTitle><ToastDescription>{variant ? 'Your changes are live.' : 'Your draft is safe.'}</ToastDescription><ToastClose onClick={(event) => setPreviewOpen(event, false)}>Dismiss</ToastClose></Toast></Box></ToastProvider></Interactive>);
    case 'tooltip': return stage(<Interactive menu><Tooltip><TooltipTrigger onMouseEnter={(event) => setPreviewOpen(event, true)} onMouseLeave={(event) => setPreviewOpen(event, false)} onFocus={(event) => setPreviewOpen(event, true)} onBlur={(event) => setPreviewOpen(event, false)}><Button variant="outline">Hover or focus me</Button></TooltipTrigger><TooltipContent data-preview-layer data-state="closed">{variant ? 'More details' : 'Helpful context'}</TooltipContent></Tooltip></Interactive>);
    case 'anchor': return stage(<Anchor href={variant ? '/getting-started' : '/docs'}>{variant ? 'Get started' : 'Read the documentation'}</Anchor>);
    case 'heading': return stage(variant ? <YStack gap="small"><H3>Section</H3><H4>Detail</H4><H5>Note</H5><H6>Fine print</H6></YStack> : <YStack gap="small"><H1>Build with confidence</H1><H2>Composable foundations</H2></YStack>);
    case 'paragraph': return stage(<Paragraph>{variant ? 'Clear prose makes component APIs easier to adopt.' : 'Documentation examples stay close to their implementation.'}</Paragraph>);
    case 'sizableText': return stage(<SizableText size={variant ? 'sm' : 'lg'}>{variant ? 'A smaller piece of text' : 'A larger piece of text'}</SizableText>);
    case 'text': return stage(<Text color={variant ? 'muted' : undefined}>{variant ? 'Muted supporting text' : 'Token-driven text'}</Text>);
    default: return stage(<Text>Unknown preview</Text>);
  }
}

const previews: Record<string, () => any> = {
  'api-installation-a': () => <ApiExample api="installation" variant={0} />,
  ...Object.fromEntries(Array.from({ length: 38 }, (_, index) => {
    const api = ['avatar', 'card', 'image', 'listItem', 'loader', 'spinner', 'button', 'checkbox', 'field', 'form', 'input', 'label', 'progress', 'radioGroup', 'select', 'slider', 'switch', 'textArea', 'toggleGroup', 'box', 'separator', 'stacks', 'xGroup', 'accordion', 'alertDialog', 'contextMenu', 'dialog', 'menu', 'popover', 'sheet', 'tabs', 'toast', 'tooltip', 'anchor', 'heading', 'paragraph', 'sizableText', 'text'][index];
    const number = String(index + 1).padStart(2, '0');
    return [[`api-${number}-a`, () => <ApiExample api={api} variant={0} />], [`api-${number}-b`, () => <ApiExample api={api} variant={1} />]];
  }).flat()),
};
function App() {
  const id = new URLSearchParams(window.location.search).get('example') || 'api-01-a';
  const Preview = previews[id];
  return <Theme name="light">{Preview ? <Preview /> : stage(<Box p="medium" borderWidth="1" borderStyle="dashed" borderColor="muted" borderRadius="large" color="muted">Unknown preview: {id}</Box>)}</Theme>;
}
render(<App />, document.getElementById('root')!);
