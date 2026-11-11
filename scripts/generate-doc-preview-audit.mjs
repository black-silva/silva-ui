import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sections = ['display', 'forms', 'layout', 'overlays', 'typography'];
const files = (await Promise.all(sections.map(async section => {
  const entries = await readdir(path.join(root, 'docs', section));
  return entries.filter(file => file.endsWith('.mdx')).map(file => path.join(section, file));
}))).flat().sort();

const apiForFile = Object.fromEntries([
  ['display/avatar.mdx', 'avatar'], ['display/card.mdx', 'card'], ['display/image.mdx', 'image'], ['display/list-item.mdx', 'listItem'], ['display/loader.mdx', 'loader'], ['display/spinner.mdx', 'spinner'],
  ['forms/button.mdx', 'button'], ['forms/checkbox.mdx', 'checkbox'], ['forms/field.mdx', 'field'], ['forms/form.mdx', 'form'], ['forms/input.mdx', 'input'], ['forms/label.mdx', 'label'], ['forms/progress.mdx', 'progress'], ['forms/radio-group.mdx', 'radioGroup'], ['forms/select.mdx', 'select'], ['forms/slider.mdx', 'slider'], ['forms/switch.mdx', 'switch'], ['forms/text-area.mdx', 'textArea'], ['forms/toggle-group.mdx', 'toggleGroup'],
  ['layout/box.mdx', 'box'], ['layout/separator.mdx', 'separator'], ['layout/stacks.mdx', 'stacks'], ['layout/x-group.mdx', 'xGroup'],
  ['overlays/accordion.mdx', 'accordion'], ['overlays/alert-dialog.mdx', 'alertDialog'], ['overlays/context-menu.mdx', 'contextMenu'], ['overlays/dialog.mdx', 'dialog'], ['overlays/menu.mdx', 'menu'], ['overlays/popover.mdx', 'popover'], ['overlays/sheet.mdx', 'sheet'], ['overlays/tabs.mdx', 'tabs'], ['overlays/toast.mdx', 'toast'], ['overlays/tooltip.mdx', 'tooltip'],
  ['typography/anchor.mdx', 'anchor'], ['typography/heading.mdx', 'heading'], ['typography/paragraph.mdx', 'paragraph'], ['typography/sizable-text.mdx', 'sizableText'], ['typography/text.mdx', 'text'],
]);

const snippets = {
  avatar: [`import { Avatar, AvatarImage, AvatarFallback } from "silva-ui"\n\n<Avatar><AvatarImage src="https://placehold.co/48" alt="BlackSilva" /><AvatarFallback>BS</AvatarFallback></Avatar>`, `import { Avatar, AvatarFallback } from "silva-ui"\n\n<Avatar><AvatarFallback>UI</AvatarFallback></Avatar>`],
  card: [`import { Card, CardHeader, CardFooter, Text, Button } from "silva-ui"\n\n<Card><CardHeader>Release</CardHeader><Text>Ready to ship.</Text><CardFooter><Button>Open</Button></CardFooter></Card>`, `import { Card, CardHeader, Text } from "silva-ui"\n\n<Card><CardHeader>Silva UI</CardHeader><Text>Composable components.</Text></Card>`],
  image: [`import { Image } from "silva-ui"\n\n<Image src="https://placehold.co/640x360" alt="Placeholder preview" />`, `import { Image } from "silva-ui"\n\n<Image src="https://placehold.co/320x180" alt="Small placeholder preview" />`],
  listItem: [`import { ListItem } from "silva-ui"\n\n<ListItem title="Release notes" subTitle="Updated today" />`, `import { ListItem } from "silva-ui"\n\n<ListItem title="Documentation" subTitle="Two matched examples" />`],
  loader: [`import { Loader } from "silva-ui"\n\n<Loader />`, `import { Loader } from "silva-ui"\n\n<Loader size="lg" />`],
  spinner: [`import { Spinner } from "silva-ui"\n\n<Spinner />`, `import { Spinner } from "silva-ui"\n\n<Spinner size="lg" />`],
  button: [`import { Button } from "silva-ui"\n\n<Button>Save changes</Button>`, `import { Button } from "silva-ui"\n\n<Button variant="outline">Cancel</Button>`],
  checkbox: [`import { Checkbox } from "silva-ui"\n\n<Checkbox>Send updates</Checkbox>`, `import { Checkbox } from "silva-ui"\n\n<Checkbox disabled>Unavailable option</Checkbox>`],
  field: [`import { Field, Input, FieldHelper } from "silva-ui"\n\n<Field><Input placeholder="Project name" /><FieldHelper>Choose a clear name.</FieldHelper></Field>`, `import { Field, Input, FieldError } from "silva-ui"\n\n<Field><Input aria-invalid="true" placeholder="Email" /><FieldError>Enter a valid email address.</FieldError></Field>`],
  form: [`import { Form, Input, Button } from "silva-ui"

<Form onSubmit={(event) => event.preventDefault()}><Input placeholder="Email" /><Button type="submit">Subscribe</Button></Form>`, `import { Form, Input, Button } from "silva-ui"

<Form onSubmit={(event) => event.preventDefault()}><Input placeholder="Search" /><Button type="submit">Search</Button></Form>`],
  input: [`import { Input } from "silva-ui"\n\n<Input placeholder="you@example.com" type="email" />`, `import { Input } from "silva-ui"\n\n<Input placeholder="Project name" />`],
  label: [`import { Label, Input } from "silva-ui"\n\n<><Label htmlFor="email">Email</Label><Input id="email" type="email" /></>`, `import { Label, Input } from "silva-ui"\n\n<><Label htmlFor="project-name">Project name</Label><Input id="project-name" /></>`],
  progress: [`import { Progress } from "silva-ui"

<Progress value={72} aria-label="Upload progress" />`, `import { Progress } from "silva-ui"

<Progress value={40} aria-label="Profile completion" />`],
  radioGroup: [`import { RadioGroup, RadioGroupItem } from "silva-ui"

<RadioGroup name="plan" defaultValue="starter" aria-label="Plan"><RadioGroupItem value="starter">Starter</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup>`, `import { RadioGroup, RadioGroupItem } from "silva-ui"

<RadioGroup name="billing" defaultValue="monthly" aria-label="Billing interval"><RadioGroupItem value="monthly">Monthly</RadioGroupItem><RadioGroupItem value="yearly">Yearly</RadioGroupItem></RadioGroup>`],
  select: [`import { Select } from "silva-ui"\n\n<Select><option>Starter</option><option>Pro</option></Select>`, `import { Select } from "silva-ui"\n\n<Select><option>South Africa</option><option>Other</option></Select>`],
  slider: [`import { Slider } from "silva-ui"\n\n<Slider value={50} />`, `import { Slider } from "silva-ui"\n\n<Slider value={80} />`],
  switch: [`import { Switch } from "silva-ui"\n\n<Switch checked />`, `import { Switch } from "silva-ui"\n\n<Switch />`],
  textArea: [`import { TextArea } from "silva-ui"\n\n<TextArea placeholder="Write release notes" rows={3} />`, `import { TextArea } from "silva-ui"\n\n<TextArea placeholder="Leave a comment" rows={3} />`],
  toggleGroup: [`import { ToggleGroup, ToggleGroupItem } from "silva-ui"

<ToggleGroup><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>`, `import { ToggleGroup, ToggleGroupItem } from "silva-ui"

<ToggleGroup><ToggleGroupItem value="grid">Grid</ToggleGroupItem><ToggleGroupItem value="list">List</ToggleGroupItem></ToggleGroup>`],
  box: [`import { Box, Card, CardHeader, CardFooter, Image, Text, Button } from "silva-ui"\n\n<Box as="article" p="medium"><Card><Image src="https://placehold.co/640x360" alt="Everyday carry bag" /><CardHeader>Everyday carry bag</CardHeader><Text>R699 · Built for daily essentials.</Text><CardFooter><Button>Add to cart</Button></CardFooter></Card></Box>`, `import { Box, Card, CardHeader, CardFooter, Image, Text, Button } from "silva-ui"\n\n<Box as="article" p="medium"><Card><Image src="https://placehold.co/640x360" alt="Studio headphones" /><CardHeader>Studio headphones</CardHeader><Text>R1,999 · Clear sound, all day.</Text><CardFooter><Button variant="outline">View product</Button></CardFooter></Card></Box>`],
  separator: [`import { YStack, Text, Separator } from "silva-ui"

<YStack><Text>Profile</Text><Separator /><Text>Security</Text></YStack>`, `import { YStack, Text, Separator } from "silva-ui"

<YStack><Text>Billing</Text><Separator /><Text>Invoices</Text></YStack>`],
  stacks: [`import { YStack, Text } from "silva-ui"\n\n<YStack><Text>First</Text><Text>Second</Text></YStack>`, `import { XStack, Button } from "silva-ui"\n\n<XStack><Button>Save</Button><Button variant="outline">Cancel</Button></XStack>`],
  xGroup: [`import { XGroup, Button } from "silva-ui"\n\n<XGroup><Button>Day</Button><Button>Week</Button></XGroup>`, `import { XGroup, Button } from "silva-ui"\n\n<XGroup><Button>Grid</Button><Button>List</Button></XGroup>`],
  accordion: [`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "silva-ui"

<Accordion><AccordionItem value="one"><AccordionTrigger data-state="open">What is Silva UI?</AccordionTrigger><AccordionContent data-state="open">Composable UI for Hono JSX.</AccordionContent></AccordionItem></Accordion>`, `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "silva-ui"

<Accordion><AccordionItem value="two"><AccordionTrigger data-state="open">Is it typed?</AccordionTrigger><AccordionContent data-state="open">Yes, it is TypeScript-first.</AccordionContent></AccordionItem></Accordion>`],
  alertDialog: [`import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "silva-ui"\n\n<AlertDialog open><AlertDialogOverlay /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>`, `import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "silva-ui"\n\n<AlertDialog open><AlertDialogOverlay /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Discard changes?</AlertDialogTitle><AlertDialogDescription>Keep your current draft.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep editing</AlertDialogCancel><AlertDialogAction>Discard</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>`],
  contextMenu: [`import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "silva-ui"

<ContextMenu><ContextMenuTrigger>Context target</ContextMenuTrigger><ContextMenuContent data-state="open" style={{ position: "static" }}><ContextMenuItem>Edit</ContextMenuItem></ContextMenuContent></ContextMenu>`, `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuLabel, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator } from "silva-ui"

<ContextMenu><ContextMenuTrigger>Context target</ContextMenuTrigger><ContextMenuContent data-state="open" style={{ position: "static" }}><ContextMenuLabel>Actions</ContextMenuLabel><ContextMenuGroup><ContextMenuItem>Edit</ContextMenuItem></ContextMenuGroup><ContextMenuSeparator /><ContextMenuItem>Delete</ContextMenuItem></ContextMenuContent></ContextMenu>`],
  dialog: [`import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, Button } from "silva-ui"\n\n<Dialog open><DialogOverlay /><DialogContent><DialogHeader><DialogTitle>Publish changes?</DialogTitle><DialogDescription>Your documentation will update.</DialogDescription></DialogHeader><DialogFooter><DialogClose>Cancel</DialogClose><Button>Publish</Button></DialogFooter></DialogContent></Dialog>`, `import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, Button } from "silva-ui"\n\n<Dialog open><DialogOverlay /><DialogContent><DialogHeader><DialogTitle>Settings</DialogTitle><DialogDescription>Choose how this project appears.</DialogDescription></DialogHeader><DialogFooter><DialogClose>Done</DialogClose></DialogFooter></DialogContent></Dialog>`],
  menu: [`import { Menu, MenuTrigger, MenuContent, MenuItem } from "silva-ui"

<Menu><MenuTrigger>Menu trigger</MenuTrigger><MenuContent data-state="open"><MenuItem>Edit</MenuItem></MenuContent></Menu>`, `import { Menu, MenuTrigger, MenuContent, MenuLabel, MenuGroup, MenuItem, MenuSeparator } from "silva-ui"

<Menu><MenuTrigger>Menu trigger</MenuTrigger><MenuContent data-state="open"><MenuLabel>Actions</MenuLabel><MenuGroup><MenuItem>Edit</MenuItem></MenuGroup><MenuSeparator /><MenuItem>Delete</MenuItem></MenuContent></Menu>`],
  popover: [`import { Popover, PopoverTrigger, PopoverContent } from "silva-ui"

<Popover><PopoverTrigger>Popover trigger</PopoverTrigger><PopoverContent data-state="open">Useful context.</PopoverContent></Popover>`, `import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "silva-ui"

<Popover><PopoverTrigger>Popover trigger</PopoverTrigger><PopoverContent data-state="open">Helpful text.<PopoverClose>Close</PopoverClose></PopoverContent></Popover>`],
  sheet: [`import { Sheet, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose } from "silva-ui"\n\n<Sheet open><SheetOverlay /><SheetContent><SheetHeader><SheetTitle>Account settings</SheetTitle><SheetDescription>Manage your profile.</SheetDescription></SheetHeader><SheetFooter><SheetClose>Done</SheetClose></SheetFooter></SheetContent></Sheet>`, `import { Sheet, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose } from "silva-ui"\n\n<Sheet open><SheetOverlay /><SheetContent><SheetHeader><SheetTitle>Notifications</SheetTitle><SheetDescription>Choose what reaches you.</SheetDescription></SheetHeader><SheetFooter><SheetClose>Save</SheetClose></SheetFooter></SheetContent></Sheet>`],
  tabs: [`import { Tabs, TabList, Tab, TabPanel } from "silva-ui"

<Tabs><TabList aria-label="Project"><Tab id="overview-tab" value="overview" data-active aria-controls="overview-panel">Overview</Tab></TabList><TabPanel id="overview-panel" value="overview" aria-labelledby="overview-tab">Project overview</TabPanel></Tabs>`, `import { Tabs, TabList, Tab, TabPanel } from "silva-ui"

<Tabs><TabList aria-label="Project"><Tab id="activity-tab" value="activity" data-active aria-controls="activity-panel">Activity</Tab></TabList><TabPanel id="activity-panel" value="activity" aria-labelledby="activity-tab">Recent activity</TabPanel></Tabs>`],
  toast: [`import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose } from "silva-ui"\n\n<ToastProvider><Toast><ToastTitle>Saved</ToastTitle><ToastDescription>Your draft is safe.</ToastDescription><ToastClose>Dismiss</ToastClose></Toast></ToastProvider>`, `import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose } from "silva-ui"\n\n<ToastProvider><Toast><ToastTitle>Published</ToastTitle><ToastDescription>Your changes are live.</ToastDescription><ToastClose>Dismiss</ToastClose></Toast></ToastProvider>`],
  tooltip: [`import { Tooltip, TooltipTrigger, TooltipContent } from "silva-ui"

<Tooltip><TooltipTrigger>Tooltip trigger</TooltipTrigger><TooltipContent data-state="open">Helpful context</TooltipContent></Tooltip>`, `import { Tooltip, TooltipTrigger, TooltipContent } from "silva-ui"

<Tooltip><TooltipTrigger>Tooltip trigger</TooltipTrigger><TooltipContent data-state="open">More details</TooltipContent></Tooltip>`],
  anchor: [`import { Anchor } from "silva-ui"\n\n<Anchor href="/docs">Read the documentation</Anchor>`, `import { Anchor } from "silva-ui"\n\n<Anchor href="/getting-started">Get started</Anchor>`],
  heading: [`import { YStack, H1, H2 } from "silva-ui"

<YStack><H1>Build with confidence</H1><H2>Composable foundations</H2></YStack>`, `import { YStack, H3, H4, H5, H6 } from "silva-ui"

<YStack><H3>Section</H3><H4>Detail</H4><H5>Note</H5><H6>Fine print</H6></YStack>`],
  paragraph: [`import { Paragraph } from "silva-ui"\n\n<Paragraph>Documentation examples stay close to their implementation.</Paragraph>`, `import { Paragraph } from "silva-ui"\n\n<Paragraph>Clear prose makes component APIs easier to adopt.</Paragraph>`],
  sizableText: [`import { SizableText } from "silva-ui"\n\n<SizableText size="lg">A larger piece of text</SizableText>`, `import { SizableText } from "silva-ui"\n\n<SizableText size="sm">A smaller piece of text</SizableText>`],
  text: [`import { Text } from "silva-ui"\n\n<Text>Token-driven text</Text>`, `import { Text } from "silva-ui"\n\n<Text color="muted">Muted supporting text</Text>`],
};

const frame = (id, title, code) => `## ${title}\n\n<Tabs sync={false}>\n  <Tab title="Preview">\n\n<Frame>\n  <iframe src="https://black-silva.github.io/silva-ui/previews/?example=${id}" title="${id} preview" className="w-full h-80 rounded-xl"></iframe>\n</Frame>\n\n  </Tab>\n  <Tab title="Code">\n\n\`\`\`tsx\n${code}\n\`\`\`\n\n  </Tab>\n</Tabs>`;

for (const file of files) {
  const absolute = path.join(root, 'docs', file);
  const original = await readFile(absolute, 'utf8');
  const frontmatter = original.match(/^---[\s\S]*?---\n/)?.[0] ?? '';
  const title = original.match(/^title: (.+)$/m)?.[1] ?? path.basename(file, '.mdx');
  const api = apiForFile[file];
  const index = files.indexOf(file);
  const prefix = `api-${String(index + 1).padStart(2, '0')}`;
  const props = original.match(/\n## Props[\s\S]*$/)?.[0] ?? '\n## Props\n\nSee the component API for supported props and shared base props.\n';
  const body = `# ${title}\n\nTwo rendered compositions using exported Silva UI components. The code beside each preview is the implementation rendered by that preview. Components that need application state use an explicit static state here.\n\n${frame(`${prefix}-a`, 'Preview', snippets[api][0])}\n\n${frame(`${prefix}-b`, 'Composition', snippets[api][1])}${props}`;
  await writeFile(absolute, `${frontmatter}\n${body}`);
}

const ids = files.flatMap((file, index) => {
  const api = apiForFile[file]; const prefix = `api-${String(index + 1).padStart(2, '0')}`;
  return [`  '${prefix}-a': () => <ApiExample api="${api}" variant={0} />,`, `  '${prefix}-b': () => <ApiExample api="${api}" variant={1} />,`];
}).join('\n');
const main = `import { render } from 'hono/jsx/dom';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle,
  Anchor, Avatar, AvatarFallback, AvatarImage, Box, Button, Card, CardFooter, CardHeader, Checkbox, ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger,
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, Field, FieldError, FieldHelper, Form, H1, H2, H3, H4, H5, H6, Image, Input, Label, ListItem, Loader, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger,
  Paragraph, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, Select, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle, SizableText, Slider, Spinner, Switch, Tab, TabList, TabPanel, Tabs, Text, TextArea, Theme, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipTrigger, XGroup, XStack, YStack,
} from 'silva-ui';
import './styles.css';

const stage = (children: any) => <main class="preview"><div class="preview-stage">{children}</div></main>;
function ApiExample({ api, variant }: { api: string; variant: number }) {
  switch (api) {
    case 'avatar': return stage(variant ? <Avatar><AvatarFallback>UI</AvatarFallback></Avatar> : <Avatar><AvatarImage src="https://placehold.co/48" alt="BlackSilva" /><AvatarFallback>BS</AvatarFallback></Avatar>);
    case 'card': return stage(<Card><CardHeader>{variant ? 'Silva UI' : 'Release'}</CardHeader><Text>{variant ? 'Composable components.' : 'Ready to ship.'}</Text>{!variant && <CardFooter><Button>Open</Button></CardFooter>}</Card>);
    case 'image': return stage(<Image src={variant ? 'https://placehold.co/320x180' : 'https://placehold.co/640x360'} alt={variant ? 'Small placeholder preview' : 'Placeholder preview'} />);
    case 'listItem': return stage(<ListItem title={variant ? 'Documentation' : 'Release notes'} subTitle={variant ? 'Two matched examples' : 'Updated today'} />);
    case 'loader': return stage(<Loader size={variant ? 'lg' : undefined} />);
    case 'spinner': return stage(<Spinner size={variant ? 'lg' : undefined} />);
    case 'button': return stage(<Button variant={variant ? 'outline' : undefined}>{variant ? 'Cancel' : 'Save changes'}</Button>);
    case 'checkbox': return stage(<Checkbox disabled={!!variant}>{variant ? 'Unavailable option' : 'Send updates'}</Checkbox>);
    case 'field': return stage(variant ? <Field><Input aria-invalid="true" placeholder="Email" /><FieldError>Enter a valid email address.</FieldError></Field> : <Field><Input placeholder="Project name" /><FieldHelper>Choose a clear name.</FieldHelper></Field>);
    case 'form': return stage(<Form onSubmit={(event) => event.preventDefault()}><Input placeholder={variant ? 'Search' : 'Email'} /><Button type="submit">{variant ? 'Search' : 'Subscribe'}</Button></Form>);
    case 'input': return stage(<Input placeholder={variant ? 'Project name' : 'you@example.com'} type={variant ? undefined : 'email'} />);
    case 'label': return stage(variant ? <><Label htmlFor="project-name">Project name</Label><Input id="project-name" /></> : <><Label htmlFor="email">Email</Label><Input id="email" type="email" /></>);
    case 'progress': return stage(<Progress value={variant ? 40 : 72} aria-label={variant ? 'Profile completion' : 'Upload progress'} />);
    case 'radioGroup': return stage(variant ? <RadioGroup name="billing" defaultValue="monthly" aria-label="Billing interval"><RadioGroupItem value="monthly">Monthly</RadioGroupItem><RadioGroupItem value="yearly">Yearly</RadioGroupItem></RadioGroup> : <RadioGroup name="plan" defaultValue="starter" aria-label="Plan"><RadioGroupItem value="starter">Starter</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup>);
    case 'select': return stage(<Select><option>{variant ? 'South Africa' : 'Starter'}</option><option>{variant ? 'Other' : 'Pro'}</option></Select>);
    case 'slider': return stage(<Slider value={variant ? 80 : 50} />);
    case 'switch': return stage(<Switch checked={!variant} />);
    case 'textArea': return stage(<TextArea placeholder={variant ? 'Leave a comment' : 'Write release notes'} rows={3} />);
    case 'toggleGroup': return stage(variant ? <ToggleGroup><ToggleGroupItem value="grid">Grid</ToggleGroupItem><ToggleGroupItem value="list">List</ToggleGroupItem></ToggleGroup> : <ToggleGroup><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>);
    case 'box': return stage(<Box as="article" p="medium"><Card><Image src="https://placehold.co/640x360" alt={variant ? 'Studio headphones' : 'Everyday carry bag'} /><CardHeader>{variant ? 'Studio headphones' : 'Everyday carry bag'}</CardHeader><Text>{variant ? 'R1,999 · Clear sound, all day.' : 'R699 · Built for daily essentials.'}</Text><CardFooter><Button variant={variant ? 'outline' : undefined}>{variant ? 'View product' : 'Add to cart'}</Button></CardFooter></Card></Box>);
    case 'separator': return stage(<YStack><Text>{variant ? 'Billing' : 'Profile'}</Text><Separator /><Text>{variant ? 'Invoices' : 'Security'}</Text></YStack>);
    case 'stacks': return stage(variant ? <XStack><Button>Save</Button><Button variant="outline">Cancel</Button></XStack> : <YStack><Text>First</Text><Text>Second</Text></YStack>);
    case 'xGroup': return stage(<XGroup><Button>{variant ? 'Grid' : 'Day'}</Button><Button>{variant ? 'List' : 'Week'}</Button></XGroup>);
    case 'accordion': return stage(<Accordion><AccordionItem value={variant ? 'two' : 'one'}><AccordionTrigger data-state="open">{variant ? 'Is it typed?' : 'What is Silva UI?'}</AccordionTrigger><AccordionContent data-state="open">{variant ? 'Yes, it is TypeScript-first.' : 'Composable UI for Hono JSX.'}</AccordionContent></AccordionItem></Accordion>);
    case 'alertDialog': return stage(<AlertDialog open><AlertDialogOverlay /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{variant ? 'Discard changes?' : 'Delete project?'}</AlertDialogTitle><AlertDialogDescription>{variant ? 'Keep your current draft.' : 'This cannot be undone.'}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>{variant ? 'Keep editing' : 'Cancel'}</AlertDialogCancel><AlertDialogAction>{variant ? 'Discard' : 'Delete'}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>);
    case 'contextMenu': return stage(<ContextMenu><ContextMenuTrigger>Context target</ContextMenuTrigger><ContextMenuContent data-state="open" style={{ position: 'static' }}>{variant ? <><ContextMenuLabel>Actions</ContextMenuLabel><ContextMenuGroup><ContextMenuItem>Edit</ContextMenuItem></ContextMenuGroup><ContextMenuSeparator /><ContextMenuItem>Delete</ContextMenuItem></> : <ContextMenuItem>Edit</ContextMenuItem>}</ContextMenuContent></ContextMenu>);
    case 'dialog': return stage(<Dialog open><DialogOverlay /><DialogContent><DialogHeader><DialogTitle>{variant ? 'Settings' : 'Publish changes?'}</DialogTitle><DialogDescription>{variant ? 'Choose how this project appears.' : 'Your documentation will update.'}</DialogDescription></DialogHeader><DialogFooter><DialogClose>{variant ? 'Done' : 'Cancel'}</DialogClose>{!variant && <Button>Publish</Button>}</DialogFooter></DialogContent></Dialog>);
    case 'menu': return stage(<Menu><MenuTrigger>Menu trigger</MenuTrigger><MenuContent data-state="open">{variant ? <><MenuLabel>Actions</MenuLabel><MenuGroup><MenuItem>Edit</MenuItem></MenuGroup><MenuSeparator /><MenuItem>Delete</MenuItem></> : <MenuItem>Edit</MenuItem>}</MenuContent></Menu>);
    case 'popover': return stage(<Popover><PopoverTrigger>Popover trigger</PopoverTrigger><PopoverContent data-state="open">{variant ? <>Helpful text.<PopoverClose>Close</PopoverClose></> : 'Useful context.'}</PopoverContent></Popover>);
    case 'sheet': return stage(<Sheet open><SheetOverlay /><SheetContent><SheetHeader><SheetTitle>{variant ? 'Notifications' : 'Account settings'}</SheetTitle><SheetDescription>{variant ? 'Choose what reaches you.' : 'Manage your profile.'}</SheetDescription></SheetHeader><SheetFooter><SheetClose>{variant ? 'Save' : 'Done'}</SheetClose></SheetFooter></SheetContent></Sheet>);
    case 'tabs': return stage(variant ? <Tabs><TabList aria-label="Project"><Tab id="activity-tab" value="activity" data-active aria-controls="activity-panel">Activity</Tab></TabList><TabPanel id="activity-panel" value="activity" aria-labelledby="activity-tab">Recent activity</TabPanel></Tabs> : <Tabs><TabList aria-label="Project"><Tab id="overview-tab" value="overview" data-active aria-controls="overview-panel">Overview</Tab></TabList><TabPanel id="overview-panel" value="overview" aria-labelledby="overview-tab">Project overview</TabPanel></Tabs>);
    case 'toast': return stage(<ToastProvider><Toast><ToastTitle>{variant ? 'Published' : 'Saved'}</ToastTitle><ToastDescription>{variant ? 'Your changes are live.' : 'Your draft is safe.'}</ToastDescription><ToastClose>Dismiss</ToastClose></Toast></ToastProvider>);
    case 'tooltip': return stage(<Tooltip><TooltipTrigger>Tooltip trigger</TooltipTrigger><TooltipContent data-state="open">{variant ? 'More details' : 'Helpful context'}</TooltipContent></Tooltip>);
    case 'anchor': return stage(<Anchor href={variant ? '/getting-started' : '/docs'}>{variant ? 'Get started' : 'Read the documentation'}</Anchor>);
    case 'heading': return stage(variant ? <YStack><H3>Section</H3><H4>Detail</H4><H5>Note</H5><H6>Fine print</H6></YStack> : <YStack><H1>Build with confidence</H1><H2>Composable foundations</H2></YStack>);
    case 'paragraph': return stage(<Paragraph>{variant ? 'Clear prose makes component APIs easier to adopt.' : 'Documentation examples stay close to their implementation.'}</Paragraph>);
    case 'sizableText': return stage(<SizableText size={variant ? 'sm' : 'lg'}>{variant ? 'A smaller piece of text' : 'A larger piece of text'}</SizableText>);
    case 'text': return stage(<Text color={variant ? 'muted' : undefined}>{variant ? 'Muted supporting text' : 'Token-driven text'}</Text>);
    default: return stage(<Text>Unknown preview</Text>);
  }
}
const previews: Record<string, () => any> = {
${ids}
};
function App() { const id = new URLSearchParams(window.location.search).get('example') || 'api-01-a'; return <Theme name="light">{(previews[id] || previews['api-01-a'])()}</Theme>; }
render(<App />, document.getElementById('root')!);
`;
await writeFile(path.join(root, 'preview/main.tsx'), main);
console.log(`Generated ${files.length} API pages and ${files.length * 2} preview IDs.`);
