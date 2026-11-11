import { render } from 'hono/jsx/dom';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle,
  Anchor, Avatar, AvatarFallback, AvatarImage, Box, Button, Card, CardFooter, CardHeader, Checkbox, ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger,
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, Field, FieldError, FieldHelper, Form, H1, H2, H3, H4, H5, H6, Image, Input, Label, ListItem, Loader, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger,
  Paragraph, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, Select, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle, SizableText, Slider, Spinner, Switch, Tab, TabList, TabPanel, Tabs, Text, TextArea, Theme, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipTrigger, XGroup, XStack, YStack,
} from 'silva-ui';
import './styles.css';

const stage = (children: any, kind = '') => <main class={`preview ${kind}`}><div class="preview-stage">{children}</div></main>;

function previewControl(event: Event) {
  return (event.currentTarget as HTMLElement).closest<HTMLElement>('[data-preview-control]');
}
function setPreviewOpen(event: Event, open: boolean) {
  const root = previewControl(event);
  if (!root) return;
  root.dataset.open = String(open);
  root.querySelectorAll<HTMLElement>('[data-preview-layer]').forEach((layer) => layer.setAttribute('data-state', open ? 'open' : 'closed'));
  const toast = root.querySelector<HTMLElement>('[data-preview-toast]');
  if (toast) toast.hidden = !open;
}
function choosePreviewTab(event: Event) {
  const tab = event.currentTarget as HTMLElement;
  const root = tab.closest<HTMLElement>('[data-preview-tabs]');
  if (!root) return;
  const value = tab.dataset.value;
  root.querySelectorAll<HTMLElement>('[role="tab"]').forEach((item) => {
    const active = item.dataset.value === value;
    item.dataset.active = String(active);
    item.setAttribute('aria-selected', String(active));
  });
  root.querySelectorAll<HTMLElement>('[role="tabpanel"]').forEach((panel) => {
    panel.hidden = panel.dataset.value !== value;
  });
}
function ApiExample({ api, variant }: { api: string; variant: number }) {
  switch (api) {
    case 'avatar': return stage(variant ? <Avatar><AvatarFallback>UI</AvatarFallback></Avatar> : <Avatar><AvatarImage src="https://placehold.co/48" alt="BlackSilva" /><AvatarFallback>BS</AvatarFallback></Avatar>);
    case 'card': return stage(<Card elevated class="preview-showcase-card"><Box class="preview-card-hero"><span class="preview-orb preview-orb-one" /><span class="preview-orb preview-orb-two" /><Text class="preview-card-eyebrow">{variant ? 'DESIGN SYSTEM' : 'SHIP FASTER'}</Text><H3>{variant ? 'Silva UI' : 'Release 1.3'}</H3></Box><CardHeader class="preview-card-copy"><Text class="preview-card-title">{variant ? 'The calm way to build' : 'A polished starting point'}</Text><Text class="preview-card-description">{variant ? 'Typed primitives that stay out of your way.' : 'Composable Hono JSX, ready for your next idea.'}</Text></CardHeader><CardFooter class="preview-card-footer"><Text class="preview-card-meta">{variant ? '38 components' : 'Just published'}</Text><Button variant={variant ? 'outline' : undefined}>{variant ? 'Explore' : 'View notes'}</Button></CardFooter></Card>);
    case 'image': return stage(<Image class="preview-image" src={variant ? 'https://placehold.co/320x180' : 'https://placehold.co/640x360'} alt={variant ? 'Small placeholder preview' : 'Placeholder preview'} />);
    case 'listItem': return stage(<ListItem title={variant ? 'Documentation' : 'Release notes'} subTitle={variant ? 'Two matched examples' : 'Updated today'} />);
    case 'loader': return stage(<Loader size={variant ? 'lg' : undefined} />);
    case 'spinner': return stage(<Spinner size={variant ? 'lg' : undefined} />);
    case 'button': return stage(<Button variant={variant ? 'outline' : undefined}>{variant ? 'Cancel' : 'Save changes'}</Button>);
    case 'checkbox': return stage(<Checkbox disabled={!!variant}>{variant ? 'Unavailable option' : 'Send updates'}</Checkbox>);
    case 'field': return stage(variant ? <Field><Input aria-invalid="true" placeholder="Email" /><FieldError>Enter a valid email address.</FieldError></Field> : <Field><Input placeholder="Project name" /><FieldHelper>Choose a clear name.</FieldHelper></Field>);
    case 'form': return stage(<Form onSubmit={(event) => event.preventDefault()}><Input placeholder={variant ? 'Search' : 'Email'} /><Button type="submit">{variant ? 'Search' : 'Subscribe'}</Button></Form>);
    case 'installation': return stage(<Theme name="emerald" p="large"><YStack gap="medium" maxWidth={400}><H1>Hello, Silva</H1><Paragraph color="muted">Your UI is ready to grow.</Paragraph><Button type="button">Get started</Button></YStack></Theme>);
    case 'input': return stage(<Input placeholder={variant ? 'Project name' : 'you@example.com'} type={variant ? undefined : 'email'} />);
    case 'label': return stage(variant ? <div class="preview-field"><Label htmlFor="project-name">Project name</Label><Input id="project-name" /></div> : <div class="preview-field"><Label htmlFor="email">Email</Label><Input id="email" type="email" /></div>);
    case 'progress': return stage(<Progress value={variant ? 40 : 72} aria-label={variant ? 'Profile completion' : 'Upload progress'} />);
    case 'radioGroup': return stage(variant ? <RadioGroup name="billing" defaultValue="monthly" aria-label="Billing interval"><RadioGroupItem value="monthly">Monthly</RadioGroupItem><RadioGroupItem value="yearly">Yearly</RadioGroupItem></RadioGroup> : <RadioGroup name="plan" defaultValue="starter" aria-label="Plan"><RadioGroupItem value="starter">Starter</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup>);
    case 'select': return stage(<Select><option>{variant ? 'South Africa' : 'Starter'}</option><option>{variant ? 'Other' : 'Pro'}</option></Select>);
    case 'slider': return stage(<Slider value={variant ? 80 : 50} />);
    case 'switch': return stage(<Switch checked={!variant} />);
    case 'textArea': return stage(<TextArea placeholder={variant ? 'Leave a comment' : 'Write release notes'} rows={3} />);
    case 'toggleGroup': return stage(variant ? <ToggleGroup><ToggleGroupItem value="grid">Grid</ToggleGroupItem><ToggleGroupItem value="list">List</ToggleGroupItem></ToggleGroup> : <ToggleGroup><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>);
    case 'box': return stage(<Box as="article" p="large" borderRadius="large" class="preview-box-showcase"><div class="preview-box-grid" /><div class="preview-box-content"><Text class="preview-card-eyebrow">{variant ? 'WORKSPACE' : 'FOUNDATION'}</Text><H3>{variant ? 'Everything in its place' : 'Build from one good Box'}</H3><Text>{variant ? 'A focused layout for your next session.' : 'Spacing, colour and radius through tokens.'}</Text><XStack class="preview-box-stats"><div><strong>{variant ? '12' : '24'}</strong><span>{variant ? 'projects' : 'tokens'}</span></div><div><strong>{variant ? '4.8' : '100%'}</strong><span>{variant ? 'rating' : 'composable'}</span></div></XStack></div></Box>);
    case 'separator': return stage(<YStack><Text>{variant ? 'Billing' : 'Profile'}</Text><Separator /><Text>{variant ? 'Invoices' : 'Security'}</Text></YStack>);
    case 'stacks': return stage(variant ? <XStack><Button>Save</Button><Button variant="outline">Cancel</Button></XStack> : <YStack><Text>First</Text><Text>Second</Text></YStack>);
    case 'xGroup': return stage(<XGroup><Button>{variant ? 'Grid' : 'Day'}</Button><Button>{variant ? 'List' : 'Week'}</Button></XGroup>);
    case 'accordion': return stage(<Accordion class="preview-accordion"><AccordionItem value={variant ? 'two' : 'one'}><AccordionTrigger data-state="open">{variant ? 'Is it typed?' : 'What is Silva UI?'}</AccordionTrigger><AccordionContent data-state="open">{variant ? 'Yes, it is TypeScript-first.' : 'Composable UI for Hono JSX.'}</AccordionContent></AccordionItem></Accordion>);
    case 'alertDialog': return stage(<div class="preview-interactive" data-preview-control><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Discard draft' : 'Delete project'}</Button><AlertDialog open={false}><AlertDialogOverlay class="preview-overlay" data-preview-layer onClick={(event) => setPreviewOpen(event, false)} /><AlertDialogContent class="preview-modal preview-alert" data-preview-layer><AlertDialogHeader><AlertDialogTitle>{variant ? 'Discard changes?' : 'Delete project?'}</AlertDialogTitle><AlertDialogDescription>{variant ? 'Keep your current draft.' : 'This cannot be undone.'}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Keep editing' : 'Cancel'}</AlertDialogCancel><AlertDialogAction onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Discard' : 'Delete'}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div>);
    case 'contextMenu': return stage(<div class="preview-menu preview-interactive" data-preview-control><ContextMenu><ContextMenuTrigger onContextMenu={(event) => { event.preventDefault(); setPreviewOpen(event, true); }} onClick={(event) => setPreviewOpen(event, true)}><Button variant="outline">{variant ? 'Right-click for actions' : 'Right-click this card'}</Button></ContextMenuTrigger><ContextMenuContent class="preview-popout" data-preview-layer data-state="closed" style={{ position: 'static' }}>{variant ? <><ContextMenuLabel>Actions</ContextMenuLabel><ContextMenuGroup><ContextMenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</ContextMenuItem></ContextMenuGroup><ContextMenuSeparator /><ContextMenuItem onClick={(event) => setPreviewOpen(event, false)}>Delete</ContextMenuItem></> : <ContextMenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</ContextMenuItem>}</ContextMenuContent></ContextMenu></div>);
    case 'dialog': return stage(<div class="preview-interactive" data-preview-control><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Open settings' : 'Publish changes'}</Button><Dialog open={false}><DialogOverlay class="preview-overlay" data-preview-layer onClick={(event) => setPreviewOpen(event, false)} /><DialogContent class="preview-modal" data-preview-layer><DialogHeader><DialogTitle>{variant ? 'Settings' : 'Publish changes?'}</DialogTitle><DialogDescription>{variant ? 'Choose how this project appears.' : 'Your documentation will update.'}</DialogDescription></DialogHeader><DialogFooter><DialogClose onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Done' : 'Cancel'}</DialogClose>{!variant && <Button onClick={(event) => setPreviewOpen(event, false)}>Publish</Button>}</DialogFooter></DialogContent></Dialog></div>);
    case 'menu': return stage(<div class="preview-menu preview-interactive" data-preview-control><Menu><MenuTrigger><Button variant="outline" onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Project actions' : 'Open menu'}</Button></MenuTrigger><MenuContent class="preview-popout" data-preview-layer data-state="closed" style={{ position: 'static' }}>{variant ? <><MenuLabel>Actions</MenuLabel><MenuGroup><MenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</MenuItem></MenuGroup><MenuSeparator /><MenuItem onClick={(event) => setPreviewOpen(event, false)}>Delete</MenuItem></> : <MenuItem onClick={(event) => setPreviewOpen(event, false)}>Edit</MenuItem>}</MenuContent></Menu></div>);
    case 'popover': return stage(<div class="preview-menu preview-interactive" data-preview-control><Popover><PopoverTrigger><Button variant="outline" onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Show details' : 'Open popover'}</Button></PopoverTrigger><PopoverContent class="preview-popout preview-popover" data-preview-layer data-state="closed" style={{ position: 'static' }}><Text>{variant ? 'This is where supporting detail belongs.' : 'A little context, right when you need it.'}</Text><PopoverClose onClick={(event) => setPreviewOpen(event, false)}>Close</PopoverClose></PopoverContent></Popover></div>);
    case 'sheet': return stage(<div class="preview-interactive" data-preview-control><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Notification settings' : 'Open account settings'}</Button><Sheet open={false}><SheetOverlay class="preview-overlay" data-preview-layer onClick={(event) => setPreviewOpen(event, false)} /><SheetContent side="bottom" class="preview-sheet" data-preview-layer><SheetHeader><SheetTitle>{variant ? 'Notifications' : 'Account settings'}</SheetTitle><SheetDescription>{variant ? 'Choose what reaches you.' : 'Manage your profile.'}</SheetDescription></SheetHeader><SheetFooter><SheetClose onClick={(event) => setPreviewOpen(event, false)}>{variant ? 'Save' : 'Done'}</SheetClose></SheetFooter></SheetContent></Sheet></div>);
    case 'tabs': return stage(<Tabs class="preview-tabs" data-preview-tabs><TabList aria-label={variant ? 'Workspace' : 'Project'}><Tab id="overview-tab" value="overview" data-active aria-controls="overview-panel" onClick={choosePreviewTab}>Overview</Tab><Tab id="activity-tab" value="activity" aria-controls="activity-panel" onClick={choosePreviewTab}>Activity</Tab></TabList><TabPanel id="overview-panel" value="overview" aria-labelledby="overview-tab">{variant ? 'Workspace preferences and collaborators.' : 'Everything is ready for your next release.'}</TabPanel><TabPanel id="activity-panel" value="activity" aria-labelledby="activity-tab" hidden>{variant ? 'Three team members are online.' : 'No pending updates. You are all caught up.'}</TabPanel></Tabs>);
    case 'toast': return stage(<div class="preview-interactive" data-preview-control><Button onClick={(event) => setPreviewOpen(event, true)}>{variant ? 'Show published toast' : 'Show saved toast'}</Button><ToastProvider position="bottom-center" class="preview-toast"><div data-preview-toast hidden><Toast variant={variant ? 'success' : 'default'}><ToastTitle>{variant ? 'Published' : 'Saved'}</ToastTitle><ToastDescription>{variant ? 'Your changes are live.' : 'Your draft is safe.'}</ToastDescription><ToastClose onClick={(event) => setPreviewOpen(event, false)}>Dismiss</ToastClose></Toast></div></ToastProvider></div>);
    case 'tooltip': return stage(<div class="preview-menu preview-interactive" data-preview-control><Tooltip><TooltipTrigger onMouseEnter={(event) => setPreviewOpen(event, true)} onMouseLeave={(event) => setPreviewOpen(event, false)} onFocus={(event) => setPreviewOpen(event, true)} onBlur={(event) => setPreviewOpen(event, false)}><Button variant="outline">Hover or focus me</Button></TooltipTrigger><TooltipContent class="preview-popout preview-tooltip" data-preview-layer data-state="closed" style={{ position: 'static' }}>{variant ? 'More details' : 'Helpful context'}</TooltipContent></Tooltip></div>);
    case 'anchor': return stage(<Anchor href={variant ? '/getting-started' : '/docs'}>{variant ? 'Get started' : 'Read the documentation'}</Anchor>);
    case 'heading': return stage(variant ? <YStack class="preview-heading"><H3>Section</H3><H4>Detail</H4><H5>Note</H5><H6>Fine print</H6></YStack> : <YStack class="preview-heading"><H1>Build with confidence</H1><H2>Composable foundations</H2></YStack>);
    case 'paragraph': return stage(<Paragraph>{variant ? 'Clear prose makes component APIs easier to adopt.' : 'Documentation examples stay close to their implementation.'}</Paragraph>);
    case 'sizableText': return stage(<SizableText size={variant ? 'sm' : 'lg'}>{variant ? 'A smaller piece of text' : 'A larger piece of text'}</SizableText>);
    case 'text': return stage(<Text color={variant ? 'muted' : undefined}>{variant ? 'Muted supporting text' : 'Token-driven text'}</Text>);
    default: return stage(<Text>Unknown preview</Text>);
  }
}
const previews: Record<string, () => any> = {
  'api-installation-a': () => <ApiExample api="installation" variant={0} />,
  'api-01-a': () => <ApiExample api="avatar" variant={0} />,
  'api-01-b': () => <ApiExample api="avatar" variant={1} />,
  'api-02-a': () => <ApiExample api="card" variant={0} />,
  'api-02-b': () => <ApiExample api="card" variant={1} />,
  'api-03-a': () => <ApiExample api="image" variant={0} />,
  'api-03-b': () => <ApiExample api="image" variant={1} />,
  'api-04-a': () => <ApiExample api="listItem" variant={0} />,
  'api-04-b': () => <ApiExample api="listItem" variant={1} />,
  'api-05-a': () => <ApiExample api="loader" variant={0} />,
  'api-05-b': () => <ApiExample api="loader" variant={1} />,
  'api-06-a': () => <ApiExample api="spinner" variant={0} />,
  'api-06-b': () => <ApiExample api="spinner" variant={1} />,
  'api-07-a': () => <ApiExample api="button" variant={0} />,
  'api-07-b': () => <ApiExample api="button" variant={1} />,
  'api-08-a': () => <ApiExample api="checkbox" variant={0} />,
  'api-08-b': () => <ApiExample api="checkbox" variant={1} />,
  'api-09-a': () => <ApiExample api="field" variant={0} />,
  'api-09-b': () => <ApiExample api="field" variant={1} />,
  'api-10-a': () => <ApiExample api="form" variant={0} />,
  'api-10-b': () => <ApiExample api="form" variant={1} />,
  'api-11-a': () => <ApiExample api="input" variant={0} />,
  'api-11-b': () => <ApiExample api="input" variant={1} />,
  'api-12-a': () => <ApiExample api="label" variant={0} />,
  'api-12-b': () => <ApiExample api="label" variant={1} />,
  'api-13-a': () => <ApiExample api="progress" variant={0} />,
  'api-13-b': () => <ApiExample api="progress" variant={1} />,
  'api-14-a': () => <ApiExample api="radioGroup" variant={0} />,
  'api-14-b': () => <ApiExample api="radioGroup" variant={1} />,
  'api-15-a': () => <ApiExample api="select" variant={0} />,
  'api-15-b': () => <ApiExample api="select" variant={1} />,
  'api-16-a': () => <ApiExample api="slider" variant={0} />,
  'api-16-b': () => <ApiExample api="slider" variant={1} />,
  'api-17-a': () => <ApiExample api="switch" variant={0} />,
  'api-17-b': () => <ApiExample api="switch" variant={1} />,
  'api-18-a': () => <ApiExample api="textArea" variant={0} />,
  'api-18-b': () => <ApiExample api="textArea" variant={1} />,
  'api-19-a': () => <ApiExample api="toggleGroup" variant={0} />,
  'api-19-b': () => <ApiExample api="toggleGroup" variant={1} />,
  'api-20-a': () => <ApiExample api="box" variant={0} />,
  'api-20-b': () => <ApiExample api="box" variant={1} />,
  'api-21-a': () => <ApiExample api="separator" variant={0} />,
  'api-21-b': () => <ApiExample api="separator" variant={1} />,
  'api-22-a': () => <ApiExample api="stacks" variant={0} />,
  'api-22-b': () => <ApiExample api="stacks" variant={1} />,
  'api-23-a': () => <ApiExample api="xGroup" variant={0} />,
  'api-23-b': () => <ApiExample api="xGroup" variant={1} />,
  'api-24-a': () => <ApiExample api="accordion" variant={0} />,
  'api-24-b': () => <ApiExample api="accordion" variant={1} />,
  'api-25-a': () => <ApiExample api="alertDialog" variant={0} />,
  'api-25-b': () => <ApiExample api="alertDialog" variant={1} />,
  'api-26-a': () => <ApiExample api="contextMenu" variant={0} />,
  'api-26-b': () => <ApiExample api="contextMenu" variant={1} />,
  'api-27-a': () => <ApiExample api="dialog" variant={0} />,
  'api-27-b': () => <ApiExample api="dialog" variant={1} />,
  'api-28-a': () => <ApiExample api="menu" variant={0} />,
  'api-28-b': () => <ApiExample api="menu" variant={1} />,
  'api-29-a': () => <ApiExample api="popover" variant={0} />,
  'api-29-b': () => <ApiExample api="popover" variant={1} />,
  'api-30-a': () => <ApiExample api="sheet" variant={0} />,
  'api-30-b': () => <ApiExample api="sheet" variant={1} />,
  'api-31-a': () => <ApiExample api="tabs" variant={0} />,
  'api-31-b': () => <ApiExample api="tabs" variant={1} />,
  'api-32-a': () => <ApiExample api="toast" variant={0} />,
  'api-32-b': () => <ApiExample api="toast" variant={1} />,
  'api-33-a': () => <ApiExample api="tooltip" variant={0} />,
  'api-33-b': () => <ApiExample api="tooltip" variant={1} />,
  'api-34-a': () => <ApiExample api="anchor" variant={0} />,
  'api-34-b': () => <ApiExample api="anchor" variant={1} />,
  'api-35-a': () => <ApiExample api="heading" variant={0} />,
  'api-35-b': () => <ApiExample api="heading" variant={1} />,
  'api-36-a': () => <ApiExample api="paragraph" variant={0} />,
  'api-36-b': () => <ApiExample api="paragraph" variant={1} />,
  'api-37-a': () => <ApiExample api="sizableText" variant={0} />,
  'api-37-b': () => <ApiExample api="sizableText" variant={1} />,
  'api-38-a': () => <ApiExample api="text" variant={0} />,
  'api-38-b': () => <ApiExample api="text" variant={1} />,
};
function App() {
  const id = new URLSearchParams(window.location.search).get('example') || 'api-01-a';
  const Preview = previews[id];
  return <Theme name="light">{Preview ? <Preview /> : stage(<div class="preview-fallback">Unknown preview: {id}</div>)}</Theme>;
}
render(<App />, document.getElementById('root')!);
