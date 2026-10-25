import { useEffect, useState } from 'hono/jsx/dom';
import './docs.css';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  AlertDialogTitle, Anchor, Avatar, AvatarFallback, AvatarImage, Box, Button,
  Card, CardFooter, CardHeader, Checkbox, ContextMenu, ContextMenuContent,
  ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger, Dialog, DialogClose,
  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay,
  DialogTitle, Field, FieldError, FieldHelper, Form, H1, H2, H3, H4, H5, H6,
  Heading, Image, Input, Label, ListItem, Loader, Menu, MenuContent, MenuItem,
  MenuGroup, MenuLabel, MenuSeparator, MenuTrigger, Paragraph, Popover, PopoverClose,
  PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, Select,
  Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetOverlay, SheetTitle, SizableText, Slider, Spinner, Switch,
  Tab, TabList, TabPanel, Tabs, Text, TextArea, Theme, ToggleGroup,
  ToggleGroupItem, Toast, ToastClose, ToastDescription, ToastProvider,
  ToastTitle, Tooltip, TooltipContent, TooltipTrigger, XGroup, XStack, YStack,
  colorScales, type ColorTokenName, type ThemeName,
} from 'silva-ui';

type PropDoc = {
  name: string;
  type: string;
  defaultValue: string;
  values: string;
  description: string;
};
type ComponentDoc = {
  explanation: string;
  anatomy?: string;
  props: PropDoc[];
  children?: Array<{ name: string; description: string; props: PropDoc[] }>;
};
type DocItem = { name: string; slug: string; description: string; group: string };
type DocGroup = { name: string; slug: string; items: DocItem[] };

const docGroups: DocGroup[] = [
  {
    name: 'Foundations',
    slug: 'foundations',
    items: [
      { name: 'Colors', slug: 'colors', group: 'foundations', description: 'Theme-aware numbered color ramps and semantic color tokens.' },
      { name: 'Themes', slug: 'themes', group: 'foundations', description: 'Switch themes globally or scope a different theme to any subtree.' },
    ],
  },
  {
    name: 'Layout',
    slug: 'layout',
    items: [
      { name: 'Box', slug: 'box', group: 'layout', description: 'The polymorphic foundation for layout and visual styling.' },
      { name: 'YStack', slug: 'ystack', group: 'layout', description: 'A vertical flex stack with token-based spacing.' },
      { name: 'XStack', slug: 'xstack', group: 'layout', description: 'A horizontal flex stack for arranging content.' },
      { name: 'XGroup', slug: 'xgroup', group: 'layout', description: 'Connect adjacent controls into a compact group.' },
      { name: 'Separator', slug: 'separator', group: 'layout', description: 'A horizontal or vertical divider.' },
    ],
  },
  {
    name: 'Typography',
    slug: 'typography',
    items: [
      { name: 'Text', slug: 'text', group: 'typography', description: 'Base text primitive with color and typography sprinkles.' },
      { name: 'SizableText', slug: 'sizable-text', group: 'typography', description: 'Text with a coordinated size and line-height scale.' },
      { name: 'Paragraph', slug: 'paragraph', group: 'typography', description: 'A readable paragraph primitive.' },
      { name: 'Heading', slug: 'heading', group: 'typography', description: 'A heading with a selectable semantic level.' },
      { name: 'H1', slug: 'h1', group: 'typography', description: 'Semantic level-one heading.' },
      { name: 'H2', slug: 'h2', group: 'typography', description: 'Semantic level-two heading.' },
      { name: 'H3', slug: 'h3', group: 'typography', description: 'Semantic level-three heading.' },
      { name: 'H4', slug: 'h4', group: 'typography', description: 'Semantic level-four heading.' },
      { name: 'H5', slug: 'h5', group: 'typography', description: 'Semantic level-five heading.' },
      { name: 'H6', slug: 'h6', group: 'typography', description: 'Semantic level-six heading.' },
      { name: 'Anchor', slug: 'anchor', group: 'typography', description: 'A styled link with a visible keyboard focus state.' },
    ],
  },
  {
    name: 'Forms',
    slug: 'forms',
    items: [
      { name: 'Button', slug: 'button', group: 'forms', description: 'Action button with size and visual variants.' },
      { name: 'Input', slug: 'input', group: 'forms', description: 'Styled single-line text input.' },
      { name: 'TextArea', slug: 'text-area', group: 'forms', description: 'Styled multi-line text input.' },
      { name: 'Label', slug: 'label', group: 'forms', description: 'Accessible label for a form control.' },
      { name: 'Form', slug: 'form', group: 'forms', description: 'A vertical form layout primitive.' },
      { name: 'Field', slug: 'field', group: 'forms', description: 'Compose a label, control, and helper message.' },
      { name: 'FieldError', slug: 'field-error', group: 'forms', description: 'An error message associated with a field.' },
      { name: 'FieldHelper', slug: 'field-helper', group: 'forms', description: 'Supporting helper text for a field.' },
      { name: 'Checkbox', slug: 'checkbox', group: 'forms', description: 'A styled native checkbox with a label.' },
      { name: 'RadioGroup', slug: 'radio-group', group: 'forms', description: 'A group of mutually exclusive choices.' },
      { name: 'RadioGroupItem', slug: 'radio-group-item', group: 'forms', description: 'A selectable item within a radio group.' },
      { name: 'Select', slug: 'select', group: 'forms', description: 'A themed, keyboard-accessible select with a rounded options panel.' },
      { name: 'Slider', slug: 'slider', group: 'forms', description: 'A range input for selecting a numeric value.' },
      { name: 'Switch', slug: 'switch', group: 'forms', description: 'A compact binary setting control.' },
      { name: 'ToggleGroup', slug: 'toggle-group', group: 'forms', description: 'A connected group of toggle choices.' },
      { name: 'ToggleGroupItem', slug: 'toggle-group-item', group: 'forms', description: 'An individual toggle option.' },
      { name: 'Progress', slug: 'progress', group: 'forms', description: 'A visual indicator of task completion.' },
    ],
  },
  {
    name: 'Display',
    slug: 'display',
    items: [
      { name: 'Avatar', slug: 'avatar', group: 'display', description: 'A compact user or entity identity mark.' },
      { name: 'AvatarImage', slug: 'avatar-image', group: 'display', description: 'The image portion of an avatar.' },
      { name: 'AvatarFallback', slug: 'avatar-fallback', group: 'display', description: 'Initials or a placeholder shown in an avatar.' },
      { name: 'Card', slug: 'card', group: 'display', description: 'A card composition with header, content, and footer regions.' },
      { name: 'Image', slug: 'image', group: 'display', description: 'An image primitive with sizing and object-fit sprinkles.' },
      { name: 'ListItem', slug: 'list-item', group: 'display', description: 'A structured row with title, subtitle, and optional icon.' },
      { name: 'Spinner', slug: 'spinner', group: 'display', description: 'An animated loading indicator.' },
      { name: 'Loader', slug: 'loader', group: 'display', description: 'An animated horizontal loading indicator.' },
    ],
  },
  {
    name: 'Overlays',
    slug: 'overlays',
    items: [
      { name: 'Tabs', slug: 'tabs', group: 'overlays', description: 'A state-controlled tab interface with tab list, triggers, and panels.' },
      { name: 'Dialog', slug: 'dialog', group: 'overlays', description: 'A complete modal composition with accessible title, description, and actions.' },
      { name: 'AlertDialog', slug: 'alert-dialog', group: 'overlays', description: 'A complete confirmation dialog with accessible actions.' },
      { name: 'Popover', slug: 'popover', group: 'overlays', description: 'A contextual floating panel with trigger and close control.' },
      { name: 'Sheet', slug: 'sheet', group: 'overlays', description: 'A complete slide-over panel for contextual tasks.' },
      { name: 'Tooltip', slug: 'tooltip', group: 'overlays', description: 'A concise hint attached to an interactive trigger.' },
      { name: 'Toast', slug: 'toast', group: 'overlays', description: 'A complete notification composition with provider, title, description, and close control.' },
      { name: 'Menu', slug: 'menu', group: 'overlays', description: 'A dropdown menu composition with triggers, groups, labels, and actions.' },
      { name: 'ContextMenu', slug: 'context-menu', group: 'overlays', description: 'A contextual menu composition with trigger, group, label, and actions.' },
      { name: 'Accordion', slug: 'accordion', group: 'overlays', description: 'A state-controlled disclosure composition with trigger and content.' },
    ],
  },
];

const commonProps: PropDoc[] = [
  { name: 'color', type: 'ColorTokenName', defaultValue: '—', values: 'Semantic or numbered color token', description: 'Sets the foreground color from the active theme.' },
  { name: 'bg', type: 'ColorTokenName', defaultValue: '—', values: 'Semantic or numbered color token', description: 'Sets the background color from the active theme.' },
  { name: 'borderColor', type: 'ColorTokenName', defaultValue: '—', values: 'Semantic or numbered color token', description: 'Sets the border color from the active theme.' },
  { name: 'p / px / py / pt / pb / pl / pr', type: 'SpaceToken', defaultValue: '—', values: 'none, xs, small, medium, large, xl, 2xl, auto', description: 'Controls padding on all sides or a selected axis/side.' },
  { name: 'm / mx / my / mt / mb / ml / mr', type: 'SpaceToken', defaultValue: '—', values: 'none, xs, small, medium, large, xl, 2xl, auto', description: 'Controls margin on all sides or a selected axis/side.' },
  { name: 'w / width', type: 'SizeToken', defaultValue: '—', values: 'auto, full, half, fit, min, max, screenW, or numeric size', description: 'Controls the component width.' },
  { name: 'h / height', type: 'SizeToken', defaultValue: '—', values: 'auto, full, fit, min, max, screenH, or numeric size', description: 'Controls the component height.' },
  { name: 'minWidth / minHeight / maxWidth / maxHeight', type: 'SizeToken', defaultValue: '—', values: 'SizeToken', description: 'Constrains the component dimensions.' },
  { name: 'borderRadius', type: 'RadiusToken', defaultValue: '—', values: 'none, xs, small, medium, large, xl, full', description: 'Rounds the component corners.' },
  { name: 'borderWidth', type: 'BorderWidthToken', defaultValue: '—', values: '0, 1, 2, 4', description: 'Sets the border thickness.' },
  { name: 'borderStyle', type: 'string', defaultValue: '—', values: 'none, solid, dashed, dotted', description: 'Sets the border line style.' },
  { name: 'display', type: 'string', defaultValue: '—', values: 'flex, block, inline-flex, grid, none, and more', description: 'Controls how the component participates in layout.' },
  { name: 'flexDirection / flexWrap', type: 'string', defaultValue: '—', values: 'row, column, wrap, nowrap, and related values', description: 'Controls flex layout direction and wrapping.' },
  { name: 'alignItems / alignSelf / justifyContent', type: 'string', defaultValue: '—', values: 'Flex alignment values', description: 'Controls alignment and distribution in flex layouts.' },
  { name: 'gap', type: 'SpaceToken', defaultValue: '—', values: 'SpaceToken', description: 'Adds consistent space between layout children.' },
  { name: 'fontSize / fontWeight / lineHeight', type: 'TypographyToken', defaultValue: '—', values: 'Typography token values', description: 'Controls text scale, weight, and line spacing.' },
  { name: 'textAlign / textDecoration / textTransform', type: 'string', defaultValue: '—', values: 'Supported text style values', description: 'Controls text alignment and presentation.' },
  { name: 'letterSpacing / whiteSpace / wordBreak', type: 'TypographyToken | string', defaultValue: '—', values: 'Supported typography values', description: 'Controls tracking, whitespace preservation, and line breaking.' },
  { name: 'position', type: 'string', defaultValue: '—', values: 'relative, absolute, fixed, sticky', description: 'Sets the positioning mode.' },
  { name: 'top / right / bottom / left', type: 'SpaceToken', defaultValue: '—', values: 'SpaceToken', description: 'Offsets a positioned component.' },
  { name: 'zIndex', type: 'ZIndexToken', defaultValue: '—', values: '0, 10, 20, 30, 40, 50, overlay, modal, popover, toast, tooltip, max', description: 'Controls stacking order.' },
  { name: 'overflow / overflowX / overflowY', type: 'string', defaultValue: '—', values: 'visible, hidden, scroll, auto', description: 'Controls how overflowing content is handled.' },
  { name: 'opacity', type: 'OpacityToken', defaultValue: '—', values: '0, 5, 10, 25, 50, 75, 100', description: 'Controls visual opacity.' },
  { name: 'visibility', type: 'string', defaultValue: '—', values: 'visible, hidden', description: 'Controls whether the component is visible while preserving layout.' },
  { name: 'objectFit', type: 'string', defaultValue: '—', values: 'contain, cover, fill, none, scale-down', description: 'Controls how media content fits its box.' },
  { name: 'cursor / pointerEvents / userSelect', type: 'string', defaultValue: '—', values: 'Supported interaction values', description: 'Controls pointer, selection, and text interaction behavior.' },
  { name: 'native HTML attributes', type: 'HTML attribute', defaultValue: '—', values: 'Attributes supported by the rendered element', description: 'Additional native attributes and event handlers are forwarded to the rendered element.' },
  { name: 'class', type: 'string', defaultValue: '—', values: 'CSS class name', description: 'Adds a class to the rendered element.' },
  { name: 'style', type: 'object', defaultValue: '—', values: 'Inline CSS properties', description: 'Adds a small one-off style when a token is not appropriate.' },
  { name: 'children', type: 'UI content', defaultValue: '—', values: 'Text, elements, or components', description: 'Content rendered inside the component.' },
];

const componentDocs: Record<string, ComponentDoc> = {
  box: {
    explanation: 'Box is the lowest-level layout primitive. Use it when you need one element that accepts spacing, sizing, color, border, and positioning tokens.',
    anatomy: 'Box renders a div by default and can render another HTML element with `as`.',
    props: [
      { name: 'as', type: 'string', defaultValue: 'div', values: 'Any HTML tag', description: 'Changes the rendered element without changing its styles.' },
      { name: 'bg', type: 'ColorTokenName', defaultValue: '—', values: 'Semantic or numbered color token', description: 'Sets the background color through the active theme.' },
      { name: 'p / px / py', type: 'SpaceToken', defaultValue: '—', values: 'none, xs, small, medium, large, xl', description: 'Applies padding using the spacing scale.' },
      ...commonProps,
    ],
  },
  ystack: {
    explanation: 'YStack arranges children vertically with flexbox. It is the usual starting point for page sections, forms, and card content.',
    props: [
      { name: 'gap', type: 'SpaceToken', defaultValue: '—', values: 'none, xs, small, medium, large, xl', description: 'Sets the space between children.' },
      { name: 'alignItems', type: 'string', defaultValue: 'stretch', values: 'stretch, flex-start, center, flex-end', description: 'Controls horizontal alignment of children.' },
      { name: 'justifyContent', type: 'string', defaultValue: 'flex-start', values: 'flex-start, center, flex-end, space-between', description: 'Controls vertical distribution of children.' },
      ...commonProps,
    ],
  },
  xstack: {
    explanation: 'XStack arranges children horizontally with flexbox. Use it for toolbars, inline actions, and responsive rows.',
    props: [
      { name: 'gap', type: 'SpaceToken', defaultValue: '—', values: 'none, xs, small, medium, large, xl', description: 'Sets the space between children.' },
      { name: 'flexWrap', type: 'string', defaultValue: 'nowrap', values: 'nowrap, wrap, wrap-reverse', description: 'Allows children to move onto another line.' },
      { name: 'alignItems', type: 'string', defaultValue: 'stretch', values: 'stretch, flex-start, center, flex-end', description: 'Controls vertical alignment of children.' },
      ...commonProps,
    ],
  },
  xgroup: {
    explanation: 'XGroup joins adjacent controls into one compact horizontal group. Children keep their own behavior while the group coordinates the shared visual boundary.',
    props: commonProps,
  },
  button: {
    explanation: 'Button is an interactive action control. It supports visual variants, consistent sizes, keyboard focus, and native button behavior.',
    props: [
      { name: 'variant', type: 'string', defaultValue: 'solid', values: 'solid, outline, ghost, link', description: 'Chooses the visual treatment.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'xs, sm, md, lg, xl', description: 'Changes height, padding, and text size together.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents interaction and applies disabled styling.' },
      { name: 'type', type: 'string', defaultValue: 'button', values: 'button, submit, reset', description: 'Sets native form behavior.' },
      { name: 'onClick', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the button is activated.' },
      ...commonProps,
    ],
  },
  text: {
    explanation: 'Text is the base typography primitive. It renders inline text and accepts the same theme and typography tokens as the rest of the library.',
    props: [
      { name: 'color', type: 'ColorTokenName', defaultValue: 'secondary', values: 'Semantic or numbered color token', description: 'Sets text color from the active theme.' },
      { name: 'fontSize', type: 'FontSizeToken', defaultValue: 'base', values: 'xs, sm, base, lg, xl, 2xl–6xl', description: 'Selects a type scale step.' },
      { name: 'fontWeight', type: 'string', defaultValue: 'normal', values: 'light, normal, medium, semibold, bold', description: 'Sets text weight.' },
      { name: 'as', type: 'string', defaultValue: 'span', values: 'Any HTML tag', description: 'Changes the semantic element.' },
      ...commonProps,
    ],
  },
  heading: {
    explanation: 'Heading provides one component for semantic heading levels while keeping typography consistent across the documentation and your application.',
    props: [
      { name: 'level', type: 'number', defaultValue: '2', values: '1, 2, 3, 4, 5, 6', description: 'Selects the rendered h1–h6 element and matching size.' },
      { name: 'color', type: 'ColorTokenName', defaultValue: 'secondary', values: 'Semantic or numbered color token', description: 'Sets heading color from the active theme.' },
      ...commonProps,
    ],
  },
  anchor: {
    explanation: 'Anchor is a styled native link with theme-aware typography and visible keyboard focus treatment.',
    props: [
      { name: 'href', type: 'string', defaultValue: '—', values: 'URL or fragment', description: 'Sets the destination.' },
      { name: 'target', type: 'string', defaultValue: '—', values: '_self, _blank, _parent, _top, or browsing context', description: 'Controls where the destination opens.' },
      { name: 'rel', type: 'string', defaultValue: '—', values: 'Link relationship', description: 'Describes the relationship to the destination.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Disables link interaction styling and behavior.' },
      ...commonProps,
    ],
  },
  paragraph: {
    explanation: 'Paragraph is the long-form text primitive. It applies readable line-height and spacing defaults while still accepting the shared typography and color tokens.',
    props: [
      { name: 'size', type: 'string', defaultValue: 'md', values: 'sm, md, lg', description: 'Chooses a comfortable reading size.' },
      { name: 'color', type: 'ColorTokenName', defaultValue: 'secondary', values: 'Semantic or numbered color token', description: 'Sets paragraph color from the active theme.' },
      ...commonProps,
    ],
  },
  'sizable-text': {
    explanation: 'SizableText is a compact text primitive for labels, metadata, and UI copy where the size should be selected from the component scale.',
    props: [
      { name: 'size', type: 'string', defaultValue: 'md', values: 'xs, sm, md, lg, xl', description: 'Selects the coordinated font size and line height.' },
      { name: 'color', type: 'ColorTokenName', defaultValue: 'secondary', values: 'Semantic or numbered color token', description: 'Sets text color from the active theme.' },
      ...commonProps,
    ],
  },
  separator: {
    explanation: 'Separator creates a visual boundary between related content. Use horizontal separators for sections and vertical separators inside compact rows.',
    props: [
      { name: 'orientation', type: 'string', defaultValue: 'horizontal', values: 'horizontal, vertical', description: 'Chooses the divider direction.' },
      { name: 'color', type: 'ColorTokenName', defaultValue: 'border', values: 'Semantic or numbered color token', description: 'Sets the divider color.' },
      ...commonProps,
    ],
  },
  input: {
    explanation: 'Input is a styled native single-line input. It keeps native form semantics while adding theme-aware borders, focus rings, sizing, and states.',
    props: [
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes control height and text size.' },
      { name: 'type', type: 'string', defaultValue: 'text', values: 'text, email, password, number, search, url', description: 'Selects the native input mode.' },
      { name: 'placeholder', type: 'string', defaultValue: '—', values: 'Any string', description: 'Shows a hint while the field is empty.' },
      { name: 'value / defaultValue', type: 'string | number', defaultValue: '—', values: 'Input value', description: 'Controls or initializes the input value.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents editing and interaction.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Marks the input as required for native form validation.' },
      { name: 'name / id', type: 'string', defaultValue: '—', values: 'Any valid form name or element id', description: 'Associates the input with form submission and labels.' },
      { name: 'onChange / onInput', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Responds to value changes.' },
      ...commonProps,
    ],
  },
  'text-area': {
    explanation: 'TextArea is a styled native multiline input that preserves native form behavior while adding theme-aware sizing and focus styling.',
    props: [
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes control padding and text size.' },
      { name: 'placeholder', type: 'string', defaultValue: '—', values: 'Any string', description: 'Shows a hint while the field is empty.' },
      { name: 'value / defaultValue', type: 'string', defaultValue: '—', values: 'Text value', description: 'Controls or initializes the text.' },
      { name: 'rows', type: 'number', defaultValue: '3', values: 'Positive integer', description: 'Sets the initial visible row count.' },
      { name: 'disabled / required', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Disables editing or enables native required validation.' },
      { name: 'name / id', type: 'string', defaultValue: '—', values: 'Valid form name or element id', description: 'Controls form submission and label association.' },
      ...commonProps,
    ],
  },
  label: {
    explanation: 'Label provides an accessible name for a form control and can indicate required fields.',
    props: [
      { name: 'htmlFor', type: 'string', defaultValue: '—', values: 'Matching control id', description: 'Associates the label with a form control.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes label text size.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Displays required-field treatment.' },
      ...commonProps,
    ],
  },
  form: {
    explanation: 'Form is a native form wrapper with a vertical layout. Use Field and its message parts to keep labels and validation content consistent.',
    props: [
      { name: 'action', type: 'string', defaultValue: '—', values: 'URL', description: 'Sets the native form submission URL.' },
      { name: 'method', type: 'string', defaultValue: '—', values: 'get, post, dialog, or browser-supported method', description: 'Sets the native submission method.' },
      { name: 'onSubmit', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the form is submitted.' },
      ...commonProps,
    ],
  },
  field: {
    explanation: 'Field groups a label, control, helper text, and error message into one consistent form region.',
    props: [
      { name: 'error', type: 'string', defaultValue: '—', values: 'Error message', description: 'Provides an error message for the field.' },
      { name: 'helperText', type: 'string', defaultValue: '—', values: 'Supporting text', description: 'Provides non-error guidance for the field.' },
      ...commonProps,
    ],
  },
  'radio-group': {
    explanation: 'RadioGroup coordinates mutually exclusive choices and preserves the native radio name/value model.',
    props: [
      { name: 'name', type: 'string', defaultValue: '—', values: 'Form field name', description: 'Groups radio items for native form submission and exclusive selection.' },
      { name: 'value / defaultValue', type: 'string', defaultValue: '—', values: 'One item value', description: 'Controls or initializes the selected item.' },
      ...commonProps,
    ],
  },
  'radio-group-item': {
    explanation: 'RadioGroupItem is one native radio choice inside a RadioGroup.',
    props: [
      { name: 'value', type: 'string', defaultValue: '—', values: 'Unique item value', description: 'Identifies this choice.' },
      { name: 'name', type: 'string', defaultValue: '—', values: 'Form field name', description: 'Associates the item with a native radio group.' },
      { name: 'checked / defaultChecked', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Controls or initializes the selected state.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents selecting this item.' },
      { name: 'id', type: 'string', defaultValue: '—', values: 'Element id', description: 'Associates the item with a label.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes the radio dimensions.' },
      ...commonProps,
    ],
  },
  'toggle-group': {
    explanation: 'ToggleGroup coordinates one or more toggle choices and can operate in single- or multiple-selection mode.',
    props: [
      { name: 'type', type: 'string', defaultValue: 'single', values: 'single, multiple', description: 'Chooses whether one or many items can be active.' },
      ...commonProps,
    ],
  },
  'toggle-group-item': {
    explanation: 'ToggleGroupItem is an individual selectable toggle inside a ToggleGroup.',
    props: [
      { name: 'value', type: 'string', defaultValue: '—', values: 'Unique item value', description: 'Identifies this toggle choice.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents interaction.' },
      { name: 'onClick', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the item is activated.' },
      ...commonProps,
    ],
  },
  select: {
    explanation: 'Select combines a form-compatible hidden native select with a themed keyboard-accessible listbox. This keeps form submission behavior while allowing a rounded, theme-aware options panel.',
    props: [
      { name: 'value', type: 'string | number', defaultValue: '—', values: 'One option value', description: 'Controls the selected option.' },
      { name: 'defaultValue', type: 'string | number', defaultValue: '—', values: 'One option value', description: 'Sets the initial option for an uncontrolled Select.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes trigger height and text size.' },
      { name: 'onChange', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs after an option is selected.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Disables the trigger and options.' },
      { name: 'name / id', type: 'string', defaultValue: '—', values: 'Any valid form name or element id', description: 'Associates the select with form submission and labels.' },
      ...commonProps,
    ],
  },
  slider: {
    explanation: 'Slider is a native range control with themed track and thumb styling. Keep the value in application state when the UI needs to display it elsewhere.',
    props: [
      { name: 'min', type: 'number', defaultValue: '0', values: 'Any number', description: 'Sets the minimum allowed value.' },
      { name: 'max', type: 'number', defaultValue: '100', values: 'Any number greater than min', description: 'Sets the maximum allowed value.' },
      { name: 'step', type: 'number', defaultValue: '1', values: 'Positive number', description: 'Sets the increment between values.' },
      { name: 'value / defaultValue', type: 'number', defaultValue: '—', values: 'Number within min/max', description: 'Controls or initializes the slider position.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents changing the value.' },
      { name: 'name / id', type: 'string', defaultValue: '—', values: 'Any valid form name or element id', description: 'Associates the slider with form submission and labels.' },
      { name: 'onChange / onInput', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Responds to slider changes.' },
      ...commonProps,
    ],
  },
  checkbox: {
    explanation: 'Checkbox is a native boolean form control with a themed indicator. Use it when several independent choices may be selected at once.',
    props: [
      { name: 'checked', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Controls whether the checkbox is selected.' },
      { name: 'defaultChecked', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Sets the initial uncontrolled state.' },
      { name: 'name / value / id', type: 'string', defaultValue: '—', values: 'Valid form name, value, or element id', description: 'Controls form submission and label association.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes the checkbox dimensions.' },
      { name: 'onChange', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the checked state changes.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents changing the value.' },
      ...commonProps,
    ],
  },
  switch: {
    explanation: 'Switch is a compact binary setting control. Its label should describe the setting that changes when the switch is toggled.',
    props: [
      { name: 'checked', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Controls the current setting.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes the switch dimensions.' },
      { name: 'onChange', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the setting changes.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents changing the setting.' },
      { name: 'defaultChecked', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Sets the initial uncontrolled state.' },
      { name: 'name / value / id', type: 'string', defaultValue: '—', values: 'Valid form name, value, or element id', description: 'Controls form submission and label association.' },
      ...commonProps,
    ],
  },
  progress: {
    explanation: 'Progress communicates a known amount of completion. Use Loader or Spinner instead when the total progress is not known.',
    props: [
      { name: 'value', type: 'number', defaultValue: '0', values: '0 through max', description: 'Sets the completed amount.' },
      { name: 'max', type: 'number', defaultValue: '100', values: 'Positive number', description: 'Sets the total amount represented by the track.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'xs, sm, md, lg, xl', description: 'Changes track thickness.' },
      ...commonProps,
    ],
  },
  avatar: {
    explanation: 'Avatar provides a clipped, consistently sized identity surface that can contain an image or fallback content.',
    props: [
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'xs, sm, md, lg, xl', description: 'Controls the avatar dimensions.' },
      ...commonProps,
    ],
  },
  'avatar-image': {
    explanation: 'AvatarImage renders the image portion of an Avatar and preserves an accessible alternative description.',
    props: [
      { name: 'src', type: 'string', defaultValue: '—', values: 'Image URL', description: 'Sets the image source.' },
      { name: 'alt', type: 'string', defaultValue: '—', values: 'Accessible image description', description: 'Describes the image to assistive technology.' },
      ...commonProps,
    ],
  },
  'avatar-fallback': {
    explanation: 'AvatarFallback provides initials or another placeholder when an avatar image is unavailable.',
    props: commonProps,
  },
  image: {
    explanation: 'Image is a themed image primitive with native loading and object-fit controls plus layout sizing tokens.',
    props: [
      { name: 'src', type: 'string', defaultValue: '—', values: 'Image URL', description: 'Sets the image source.' },
      { name: 'alt', type: 'string', defaultValue: '—', values: 'Accessible image description', description: 'Describes the image to assistive technology.' },
      { name: 'width / height', type: 'SizeToken | number', defaultValue: '—', values: 'Size token or pixel value', description: 'Sets the intrinsic image dimensions.' },
      { name: 'loading', type: 'string', defaultValue: 'eager', values: 'lazy, eager', description: 'Controls when the browser loads the image.' },
      { name: 'objectFit', type: 'string', defaultValue: '—', values: 'contain, cover, fill, none, scale-down', description: 'Controls how the image fits its box.' },
      ...commonProps,
    ],
  },
  'list-item': {
    explanation: 'ListItem presents a structured row with optional title, supporting text, icon, and press behavior.',
    props: [
      { name: 'title / subTitle / icon', type: 'UI content', defaultValue: '—', values: 'Text, elements, or components', description: 'Provides the row content and leading visual.' },
      { name: 'pressable', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Enables pressable interaction styling.' },
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'sm, md, lg', description: 'Changes row spacing and text scale.' },
      { name: 'onClick', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the row is activated.' },
      ...commonProps,
    ],
  },
  card: {
    explanation: 'Card is a surface composition for grouping related content. CardHeader and CardFooter provide predictable spacing for common card layouts.',
    props: [
      { name: 'bordered', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Adds a theme-aware border.' },
      { name: 'elevated', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Adds a theme-aware shadow.' },
      { name: 'bg', type: 'ColorTokenName', defaultValue: 'card', values: 'Semantic or numbered color token', description: 'Sets the surface color.' },
      { name: 'p', type: 'SpaceToken', defaultValue: '—', values: 'Any spacing token', description: 'Controls card padding.' },
      ...commonProps,
    ],
  },
  spinner: {
    explanation: 'Spinner communicates an indeterminate wait state when the size of the loading area is small.',
    props: [
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'xs, sm, md, lg, xl', description: 'Changes the spinner diameter.' },
      { name: 'label', type: 'string', defaultValue: 'Loading...', values: 'Accessible status text', description: 'Provides the screen-reader status label.' },
      ...commonProps,
    ],
  },
  loader: {
    explanation: 'Loader is an indeterminate horizontal progress indicator for loading content across a wider area. Its animated bar uses the same continuous CSS animation approach as Spinner.',
    props: [
      { name: 'size', type: 'ComponentSize', defaultValue: 'md', values: 'xs, sm, md, lg, xl', description: 'Changes the track thickness.' },
      { name: 'label', type: 'string', defaultValue: 'Loading...', values: 'Accessible status text', description: 'Provides the screen-reader status label.' },
      ...commonProps,
    ],
  },
  themes: {
    explanation: 'Theme scopes CSS variables to a subtree. Nested Themes override their parent, which makes it possible to compose light, dark, accent, and surface contexts without runtime style injection.',
    anatomy: 'Use a base theme such as light or dark, then nest generated surface themes such as dark_surface1 for elevated regions.',
    props: [
      { name: 'name', type: 'ThemeName | string', defaultValue: 'light', values: 'light, dark, emerald, emerald-dark, midnight, generated surface theme', description: 'Selects the theme variables applied to the subtree.' },
      { name: 'as', type: 'string', defaultValue: 'div', values: 'Any HTML tag', description: 'Changes the wrapper element.' },
      ...commonProps,
    ],
  },
  accordion: {
    explanation: 'Accordion reveals and hides related content. It is stateless: your application toggles the item state and passes the corresponding data-state attribute.',
    anatomy: 'Compose AccordionItem, AccordionTrigger, and AccordionContent. Keep the trigger text descriptive so the collapsed state remains understandable.',
    props: [
      { name: 'value', type: 'string', defaultValue: '—', values: 'Unique item identifier', description: 'Identifies an accordion item in application state.' },
      { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls the trigger and content visual state.' },
      ...commonProps,
    ],
  },
  dialog: {
    explanation: 'Dialog is a modal composition for focused tasks. The overlay blocks the page behind it while the content provides an accessible title, description, and actions.',
    anatomy: 'Use DialogOverlay and DialogContent together. DialogHeader, DialogTitle, DialogDescription, DialogFooter, and DialogClose provide the conventional structure.',
    props: [
      { name: 'open', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Controls whether the modal is visible.' },
      { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Drives overlay and content transitions.' },
      ...commonProps,
    ],
  },
  popover: {
    explanation: 'Popover anchors a compact floating surface to a trigger. Use it for contextual actions or short forms that should not interrupt the whole page.',
    anatomy: 'Compose PopoverTrigger and PopoverContent, then place PopoverClose inside the content when users need an explicit dismissal action.',
    props: [
      { name: 'side', type: 'string', defaultValue: 'bottom', values: 'top, bottom, left, right', description: 'Chooses the preferred side of the trigger.' },
      { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls content visibility and styling.' },
      ...commonProps,
    ],
  },
  tooltip: {
    explanation: 'Tooltip gives brief, non-essential context to an interactive control. It appears on hover and focus and should not contain actions or required information.',
    anatomy: 'Compose TooltipTrigger and TooltipContent. Keep the message short and ensure the trigger has an accessible name independently.',
    props: [
      { name: 'side', type: 'string', defaultValue: 'top', values: 'top, bottom, left, right', description: 'Chooses the preferred side of the trigger.' },
      { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls tooltip visibility.' },
      ...commonProps,
    ],
  },
};

const childProps = (props: PropDoc[]): PropDoc[] => [...props, ...commonProps];
const compoundChildren: Record<string, ComponentDoc['children']> = {
  select: [
    { name: 'option', description: 'A selectable item. Pass these as native option children; Select uses their value, label, and disabled state.', props: childProps([
      { name: 'value', type: 'string', defaultValue: '—', values: 'Any string', description: 'The value returned when this option is selected.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents this option from being selected.' },
    ]) },
  ],
  card: [
    { name: 'CardHeader', description: 'Top region for a title, description, or leading actions.', props: childProps([]) },
    { name: 'CardFooter', description: 'Bottom region for actions, metadata, or secondary controls.', props: childProps([]) },
  ],
  tabs: [
    { name: 'Tabs', description: 'Root wrapper for a tab interface.', props: childProps([]) },
    { name: 'TabList', description: 'Groups the tab triggers and should have an accessible label.', props: childProps([
      { name: 'aria-label', type: 'string', defaultValue: '—', values: 'Accessible label', description: 'Describes the set of tabs to assistive technology.' },
    ]) },
    { name: 'Tab', description: 'Interactive trigger that selects a panel.', props: childProps([
      { name: 'value', type: 'string', defaultValue: '—', values: 'Tab identifier', description: 'Associates this trigger with a panel.' },
      { name: 'id', type: 'string', defaultValue: '—', values: 'Element id', description: 'Provides a stable id for linking and labels.' },
      { name: 'data-active', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Marks the active tab for theme-aware styling.' },
      { name: 'onClick', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the tab is activated.' },
    ]) },
    { name: 'TabPanel', description: 'Content region associated with a tab.', props: childProps([
      { name: 'value', type: 'string', defaultValue: '—', values: 'Tab identifier', description: 'Associates this panel with a tab.' },
      { name: 'hidden', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Hides inactive panel content.' },
      { name: 'id', type: 'string', defaultValue: '—', values: 'Element id', description: 'Provides a stable id for linking and labels.' },
    ]) },
  ],
  dialog: [
    { name: 'Dialog', description: 'Root wrapper that groups the modal parts.', props: childProps([
      { name: 'open', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Controls the dialog state in your application.' },
    ]) },
    { name: 'DialogOverlay', description: 'Backdrop that visually separates the modal from the page.', props: childProps([
      { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Drives the overlay visibility and transition.' },
    ]) },
    { name: 'DialogContent', description: 'The modal surface containing the task content.', props: childProps([
      { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Drives content visibility and transition.' },
    ]) },
    { name: 'DialogHeader', description: 'Groups the title and description.', props: childProps([]) },
    { name: 'DialogTitle', description: 'Required accessible heading for the dialog.', props: childProps([]) },
    { name: 'DialogDescription', description: 'Explains the dialog task or consequence.', props: childProps([]) },
    { name: 'DialogFooter', description: 'Groups the available actions.', props: childProps([]) },
    { name: 'DialogClose', description: 'Action that closes the dialog.', props: childProps([]) },
  ],
  'alert-dialog': [
    { name: 'AlertDialog', description: 'Root wrapper for a confirmation flow.', props: childProps([{ name: 'open', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Controls the dialog state.' }]) },
    { name: 'AlertDialogOverlay', description: 'Backdrop behind the confirmation surface.', props: childProps([{ name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Drives visibility and transition.' }]) },
    { name: 'AlertDialogContent', description: 'Confirmation surface containing the decision.', props: childProps([{ name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Drives visibility and transition.' }]) },
    { name: 'AlertDialogHeader', description: 'Groups the confirmation title and explanation.', props: childProps([]) },
    { name: 'AlertDialogTitle', description: 'Required accessible confirmation heading.', props: childProps([]) },
    { name: 'AlertDialogDescription', description: 'Explains the consequence of the action.', props: childProps([]) },
    { name: 'AlertDialogFooter', description: 'Groups cancel and confirm actions.', props: childProps([]) },
    { name: 'AlertDialogCancel', description: 'Safe action that dismisses the confirmation.', props: childProps([]) },
    { name: 'AlertDialogAction', description: 'Action that confirms the destructive or important operation.', props: childProps([]) },
  ],
  popover: [
    { name: 'Popover', description: 'Root wrapper for the trigger and floating content.', props: childProps([]) },
    { name: 'PopoverTrigger', description: 'Interactive element that opens the popover.', props: childProps([]) },
    { name: 'PopoverContent', description: 'Floating contextual surface.', props: childProps([{ name: 'side', type: 'string', defaultValue: 'bottom', values: 'top, bottom, left, right', description: 'Chooses the preferred placement.' }, { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls visibility styling.' }]) },
    { name: 'PopoverClose', description: 'Action that closes the popover.', props: childProps([]) },
  ],
  sheet: [
    { name: 'Sheet', description: 'Root wrapper for a slide-over task.', props: childProps([{ name: 'open', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Controls whether the sheet is visible.' }]) },
    { name: 'SheetOverlay', description: 'Backdrop behind the sheet.', props: childProps([{ name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Drives backdrop visibility.' }]) },
    { name: 'SheetContent', description: 'Slide-over surface containing the task.', props: childProps([{ name: 'side', type: 'string', defaultValue: 'right', values: 'top, bottom, left, right', description: 'Chooses the edge from which the sheet enters.' }, { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Drives content visibility and transition.' }]) },
    { name: 'SheetHeader', description: 'Groups the sheet title and description.', props: childProps([]) },
    { name: 'SheetTitle', description: 'Accessible heading for the sheet task.', props: childProps([]) },
    { name: 'SheetDescription', description: 'Supporting explanation for the sheet task.', props: childProps([]) },
    { name: 'SheetFooter', description: 'Groups sheet actions.', props: childProps([]) },
    { name: 'SheetClose', description: 'Action that closes the sheet.', props: childProps([]) },
  ],
  tooltip: [
    { name: 'Tooltip', description: 'Root wrapper for a hint and its trigger.', props: childProps([]) },
    { name: 'TooltipTrigger', description: 'Interactive element that receives the hint.', props: childProps([]) },
    { name: 'TooltipContent', description: 'Short non-essential contextual message.', props: childProps([{ name: 'side', type: 'string', defaultValue: 'top', values: 'top, bottom, left, right', description: 'Chooses the preferred placement.' }, { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls visibility styling.' }]) },
  ],
  toast: [
    { name: 'ToastProvider', description: 'Positions and groups toast notifications.', props: childProps([{ name: 'position', type: 'string', defaultValue: 'bottom-right', values: 'top-left, top-right, bottom-left, bottom-right, top-center, bottom-center', description: 'Chooses the viewport position.' }]) },
    { name: 'Toast', description: 'Notification surface with optional semantic variant.', props: childProps([{ name: 'variant', type: 'string', defaultValue: 'default', values: 'default, success, error, warning', description: 'Communicates the notification tone.' }]) },
    { name: 'ToastTitle', description: 'Short notification heading.', props: childProps([]) },
    { name: 'ToastDescription', description: 'Supporting notification message.', props: childProps([]) },
    { name: 'ToastClose', description: 'Dismiss action for the notification.', props: childProps([]) },
  ],
  menu: [
    { name: 'Menu', description: 'Root wrapper for a menu interaction.', props: childProps([]) },
    { name: 'MenuTrigger', description: 'Interactive element that opens the menu.', props: childProps([]) },
    { name: 'MenuContent', description: 'Floating menu surface.', props: childProps([{ name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls visibility styling.' }]) },
    { name: 'MenuGroup', description: 'Groups related menu items.', props: childProps([]) },
    { name: 'MenuLabel', description: 'Non-interactive label for a group.', props: childProps([]) },
    { name: 'MenuItem', description: 'Action row in the menu.', props: childProps([{ name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents selection.' }, { name: 'onClick', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the item is selected.' }]) },
    { name: 'MenuSeparator', description: 'Visual divider between menu groups.', props: childProps([]) },
  ],
  'context-menu': [
    { name: 'ContextMenu', description: 'Root wrapper for right-click interactions.', props: childProps([]) },
    { name: 'ContextMenuTrigger', description: 'Region that receives the context-menu gesture.', props: childProps([]) },
    { name: 'ContextMenuContent', description: 'Menu surface positioned at the pointer.', props: childProps([{ name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls visibility styling.' }]) },
    { name: 'ContextMenuGroup', description: 'Groups related context actions.', props: childProps([]) },
    { name: 'ContextMenuLabel', description: 'Non-interactive context-menu label.', props: childProps([]) },
    { name: 'ContextMenuItem', description: 'Context action row.', props: childProps([{ name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents selection.' }, { name: 'onClick', type: '(event: Event) => void', defaultValue: '—', values: 'Function', description: 'Runs when the item is selected.' }]) },
    { name: 'ContextMenuSeparator', description: 'Visual divider between context actions.', props: childProps([]) },
  ],
  accordion: [
    { name: 'Accordion', description: 'Root wrapper that controls one or more disclosures.', props: childProps([{ name: 'type', type: 'string', defaultValue: 'single', values: 'single, multiple', description: 'Chooses whether one or many items can be open.' }]) },
    { name: 'AccordionItem', description: 'Groups one trigger and its content.', props: childProps([{ name: 'value', type: 'string', defaultValue: '—', values: 'Unique identifier', description: 'Identifies the item in application state.' }]) },
    { name: 'AccordionTrigger', description: 'Interactive heading that toggles its item.', props: childProps([{ name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls trigger styling.' }]) },
    { name: 'AccordionContent', description: 'Collapsible content region.', props: childProps([{ name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed', description: 'Controls content visibility styling.' }]) },
  ],
  'radio-group': [
    { name: 'RadioGroup', description: 'Root that coordinates one selected radio item.', props: childProps([{ name: 'name', type: 'string', defaultValue: '—', values: 'Form field name', description: 'Groups radio items for native form submission.' }, { name: 'value / defaultValue', type: 'string', defaultValue: '—', values: 'Item value', description: 'Controls or initializes the selected item.' }]) },
    { name: 'RadioGroupItem', description: 'One mutually exclusive choice inside the group.', props: childProps([{ name: 'value', type: 'string', defaultValue: '—', values: 'Unique identifier', description: 'Identifies this choice.' }, { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents selection.' }]) },
  ],
  'toggle-group': [
    { name: 'ToggleGroup', description: 'Root that coordinates one or more toggle items.', props: childProps([{ name: 'type', type: 'string', defaultValue: 'single', values: 'single, multiple', description: 'Chooses whether one or many items can be active.' }]) },
    { name: 'ToggleGroupItem', description: 'A selectable toggle choice inside the group.', props: childProps([{ name: 'value', type: 'string', defaultValue: '—', values: 'Unique identifier', description: 'Identifies this choice.' }, { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Prevents interaction.' }]) },
  ],
  avatar: [
    { name: 'Avatar', description: 'Root that clips and sizes an identity mark.', props: childProps([]) },
    { name: 'AvatarImage', description: 'Image shown when the source can be loaded.', props: childProps([{ name: 'src', type: 'string', defaultValue: '—', values: 'Image URL', description: 'Source URL for the image.' }, { name: 'alt', type: 'string', defaultValue: '—', values: 'Accessible text', description: 'Describes the image.' }]) },
    { name: 'AvatarFallback', description: 'Fallback content shown when no image is available.', props: childProps([]) },
  ],
  field: [
    { name: 'Field', description: 'Layout wrapper for a label, control, and supporting messages.', props: childProps([]) },
    { name: 'FieldError', description: 'Validation message associated with a field.', props: childProps([]) },
    { name: 'FieldHelper', description: 'Non-error supporting guidance for a field.', props: childProps([]) },
  ],
  form: [
    { name: 'Form', description: 'Vertical layout wrapper for related controls and actions.', props: childProps([]) },
    { name: 'Field', description: 'Groups a label, control, and supporting messages.', props: childProps([]) },
    { name: 'FieldError', description: 'Validation message associated with a field.', props: childProps([]) },
    { name: 'FieldHelper', description: 'Non-error supporting guidance for a field.', props: childProps([]) },
  ],
};

for (const [slug, children] of Object.entries(compoundChildren)) {
  if (componentDocs[slug]) componentDocs[slug].children = children;
}

function getComponentDoc(item: DocItem): ComponentDoc {
  const doc = componentDocs[item.slug] ?? {
    explanation: `${item.name} is a composable ${item.group} primitive. It owns structure and theme-aware styling, while your application owns state and event handlers.`,
    anatomy: item.group === 'overlays'
      ? 'Compound overlay components are intentionally stateless. Compose the related parts and pass `data-state="open"` or `data-state="closed"` when the CSS needs to reflect state.'
      : 'Compose this component with its related parts and use the shared layout, color, spacing, and typography tokens.',
    props: [
      { name: 'data-state', type: 'string', defaultValue: '—', values: 'open, closed, active, inactive', description: 'Communicates application state to the component styles.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', values: 'true, false', description: 'Disables interaction when supported by the component.' },
      ...commonProps,
    ],
  };
  return { ...doc, children: doc.children ?? compoundChildren[item.slug] };
}

function PropsTable({ props }: { props: PropDoc[] }) {
  const uniqueProps = props.filter((prop, index) => props.findIndex((candidate) => candidate.name === prop.name) === index);
  return (
    <Box as="table" width="full" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="medium" style={{ minWidth: '720px', borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden' }}>
      <Box as="thead" bg="subtle">
        <Box as="tr">
          <Box as="th" p="small" style={{ textAlign: 'left' }}>Prop</Box>
          <Box as="th" p="small" style={{ textAlign: 'left' }}>Type</Box>
          <Box as="th" p="small" style={{ textAlign: 'left' }}>Default</Box>
          <Box as="th" p="small" style={{ textAlign: 'left' }}>Possible values</Box>
          <Box as="th" p="small" style={{ textAlign: 'left' }}>Description</Box>
        </Box>
      </Box>
      <Box as="tbody">
        {uniqueProps.map((prop) => (
          <Box as="tr" borderTopWidth={1} borderStyle="solid" borderColor="border">
            <Box as="td" p="small"><Text fontFamily="monospace" fontSize="sm" color="primary">{prop.name}</Text></Box>
            <Box as="td" p="small"><Text fontSize="sm">{prop.type}</Text></Box>
            <Box as="td" p="small"><Text fontSize="sm" color="muted">{prop.defaultValue}</Text></Box>
            <Box as="td" p="small"><Text fontSize="sm" color="muted">{prop.values}</Text></Box>
            <Box as="td" p="small"><Text fontSize="sm">{prop.description}</Text></Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const allDocs = docGroups.flatMap((group) => group.items);
const themes: string[] = [
  'light',
  'dark',
  'emerald',
  'emerald-dark',
  'midnight',
  'red',
  'light-blue',
  'dark-red',
];
const routeAliases: Record<string, string> = {
  theme: 'themes',
  'card-header': 'card',
  'card-footer': 'card',
  'tab-list': 'tabs',
  tab: 'tabs',
  'tab-panel': 'tabs',
  'dialog-close': 'dialog',
  'dialog-content': 'dialog',
  'dialog-description': 'dialog',
  'dialog-footer': 'dialog',
  'dialog-header': 'dialog',
  'dialog-overlay': 'dialog',
  'dialog-title': 'dialog',
  'alert-dialog-action': 'alert-dialog',
  'alert-dialog-cancel': 'alert-dialog',
  'alert-dialog-content': 'alert-dialog',
  'alert-dialog-description': 'alert-dialog',
  'alert-dialog-footer': 'alert-dialog',
  'alert-dialog-header': 'alert-dialog',
  'alert-dialog-overlay': 'alert-dialog',
  'alert-dialog-title': 'alert-dialog',
  'popover-close': 'popover',
  'popover-content': 'popover',
  'popover-trigger': 'popover',
  'sheet-close': 'sheet',
  'sheet-content': 'sheet',
  'sheet-description': 'sheet',
  'sheet-footer': 'sheet',
  'sheet-header': 'sheet',
  'sheet-overlay': 'sheet',
  'sheet-title': 'sheet',
  'tooltip-content': 'tooltip',
  'tooltip-trigger': 'tooltip',
  'toast-close': 'toast',
  'toast-description': 'toast',
  'toast-provider': 'toast',
  'toast-title': 'toast',
  'menu-content': 'menu',
  'menu-group': 'menu',
  'menu-item': 'menu',
  'menu-label': 'menu',
  'menu-separator': 'menu',
  'menu-trigger': 'menu',
  'context-menu-content': 'context-menu',
  'context-menu-group': 'context-menu',
  'context-menu-item': 'context-menu',
  'context-menu-label': 'context-menu',
  'context-menu-separator': 'context-menu',
  'context-menu-trigger': 'context-menu',
  'accordion-content': 'accordion',
  'accordion-item': 'accordion',
  'accordion-trigger': 'accordion',
};

function highlightCode(value: string) {
  const pattern = /(<\/?[A-Za-z][\w.]*(?=[\s/>])|<\/?|\/?>|<\/|>|[A-Za-z_$][\w$]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|from|export|const|function|return|true|false|null)\b)/g;
  const tokens: { text: string; color: 'blue8' | 'teal8' | 'amber8' | 'secondary' }[] = [];
  let lastIndex = 0;

  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ text: value.slice(lastIndex, index), color: 'secondary' });

    const token = match[0];
    const color = token.startsWith('<') || token === '>' || token === '/>' || token === '</'
      ? 'blue8'
      : token.startsWith('"') || token.startsWith("'") || token.startsWith('`')
        ? 'teal8'
        : /^(import|from|export|const|function|return|true|false|null)$/.test(token)
          ? 'amber8'
          : 'secondary';
    tokens.push({ text: token, color });
    lastIndex = index + token.length;
  }

  if (lastIndex < value.length) tokens.push({ text: value.slice(lastIndex), color: 'secondary' });
  return tokens;
}

function CodeBlock({ value }: { value: string }) {
  return (
    <Box as="pre" bg="subtle" borderRadius="medium" p="medium" overflow="auto" style={{ margin: 0 }}>
      <Text as="code" fontSize="sm" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', whiteSpace: 'pre' }}>
        {highlightCode(value).map(({ text, color }) => <Text as="span" color={color}>{text}</Text>)}
      </Text>
    </Box>
  );
}

function PreviewCard({ children }: { children: any }) {
  return (
    <Card bordered elevated p="large" bg="card" style={{ overflow: 'visible' }}>
      {children}
    </Card>
  );
}

function getPreviewCodeContent(item: DocItem, theme: string) {
  if (item.slug === 'slider') {
    return `const [range, setRange] = useState(56);\n\n<YStack gap="medium">\n  <Text>Completion: {range}%</Text>\n  <Slider\n    min={0}\n    max={100}\n    value={range}\n    onInput={(event) => setRange(Number(event.target.value))}\n  />\n  <Progress value={range} max={100} />\n  <XStack gap="small">\n    <Button variant="outline" onClick={() => setRange(20)}>20%</Button>\n    <Button variant="outline" onClick={() => setRange(56)}>56%</Button>\n    <Button variant="outline" onClick={() => setRange(85)}>85%</Button>\n  </XStack>\n</YStack>`;
  }

  if (item.slug === 'spinner') {
    return `<XStack gap="medium" alignItems="center">\n  <YStack gap="xs" alignItems="center">\n    <Spinner size="xs" />\n    <Text fontSize="xs" color="muted">xs</Text>\n  </YStack>\n  <YStack gap="xs" alignItems="center">\n    <Spinner size="sm" />\n    <Text fontSize="xs" color="muted">sm</Text>\n  </YStack>\n  <YStack gap="xs" alignItems="center">\n    <Spinner size="md" />\n    <Text fontSize="xs" color="muted">md</Text>\n  </YStack>\n  <YStack gap="xs" alignItems="center">\n    <Spinner size="lg" />\n    <Text fontSize="xs" color="muted">lg</Text>\n  </YStack>\n</XStack>`;
  }

  if (item.slug === 'loader') {
    return `<YStack gap="medium">\n  <Loader size="sm" />\n  <Loader size="md" />\n  <Loader size="lg" />\n</YStack>`;
  }

  if (item.slug === 'card') {
    return `const [added, setAdded] = useState(false);\n\n<Card bordered elevated p="medium" bg="card">\n  <CardHeader>\n    <H3>Project summary</H3>\n    <Paragraph color="muted">A composed card surface.</Paragraph>\n  </CardHeader>\n\n  <YStack gap="small">\n    <Text>3 components updated</Text>\n    <Progress value={72} max={100} />\n  </YStack>\n\n  <CardFooter>\n    <Button variant="outline" onClick={() => setAdded(!added)}>\n      {added ? 'Added' : 'View details'}\n    </Button>\n  </CardFooter>\n</Card>`;
  }

  if (item.slug === 'tabs') {
    return `const [activeTab, setActiveTab] = useState('preview');\n\n<Tabs>\n  <TabList aria-label="Demo sections">\n    <Tab data-active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>Preview</Tab>\n    <Tab data-active={activeTab === 'usage'} onClick={() => setActiveTab('usage')}>Usage</Tab>\n    <Tab data-active={activeTab === 'notes'} onClick={() => setActiveTab('notes')}>Notes</Tab>\n  </TabList>\n\n  <TabPanel hidden={activeTab !== 'preview'}>\n    <Text>This is the live preview panel.</Text>\n  </TabPanel>\n  <TabPanel hidden={activeTab !== 'usage'}>\n    <Text>Tabs are stateless; your app owns the active tab.</Text>\n  </TabPanel>\n  <TabPanel hidden={activeTab !== 'notes'}>\n    <Text>Use accessible labels and keep one panel active.</Text>\n  </TabPanel>\n</Tabs>`;
  }

  if (item.slug === 'dialog') {
    return `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open dialog</Button>\n\n<Dialog open={open}>\n  <DialogOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />\n  <DialogContent data-state={open ? 'open' : 'closed'}>\n    <DialogHeader>\n      <DialogTitle>Example dialog</DialogTitle>\n      <DialogDescription>Compose a dialog from small presentational parts.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose onClick={() => setOpen(false)}>Close</DialogClose>\n      <Button onClick={() => setOpen(false)}>Done</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`;
  }

  if (item.slug === 'alert-dialog') {
    return `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open confirmation</Button>\n\n<AlertDialog open={open}>\n  <AlertDialogOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />\n  <AlertDialogContent data-state={open ? 'open' : 'closed'}>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Continue?</AlertDialogTitle>\n      <AlertDialogDescription>This action is only a documentation demo.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>\n      <AlertDialogAction onClick={() => setOpen(false)}>Confirm</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`;
  }

  if (item.slug === 'popover') {
    return `const [open, setOpen] = useState(false);\n\n<Popover>\n  <PopoverTrigger>\n    <Button variant="outline" onClick={() => setOpen(!open)}>Toggle popover</Button>\n  </PopoverTrigger>\n  <PopoverContent side="bottom" data-state={open ? 'open' : 'closed'}>\n    <YStack gap="small">\n      <Text fontWeight="semibold">Popover content</Text>\n      <Text color="muted" fontSize="sm">A floating panel near its trigger.</Text>\n      <PopoverClose onClick={() => setOpen(false)}>Close</PopoverClose>\n    </YStack>\n  </PopoverContent>\n</Popover>`;
  }

  if (item.slug === 'sheet') {
    return `const [open, setOpen] = useState(false);\nconst [checked, setChecked] = useState(true);\n\n<Button onClick={() => setOpen(true)}>Open sheet</Button>\n\n<Sheet open={open}>\n  <SheetOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />\n  <SheetContent side="right" data-state={open ? 'open' : 'closed'}>\n    <SheetHeader>\n      <SheetTitle>Quick settings</SheetTitle>\n      <SheetDescription>This is a live sheet example.</SheetDescription>\n    </SheetHeader>\n    <YStack gap="medium" my="large">\n      <Switch checked={checked} onChange={(event) => setChecked(event.target.checked)}>\n        Enable setting\n      </Switch>\n    </YStack>\n    <SheetFooter>\n      <SheetClose onClick={() => setOpen(false)}>Close</SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>`;
  }

  if (item.slug === 'tooltip') {
    return `const [open, setOpen] = useState(false);\n\n<Tooltip onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>\n  <TooltipTrigger>\n    <Button variant="outline" onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>\n      Hover or focus me\n    </Button>\n  </TooltipTrigger>\n  <TooltipContent side="top" data-state={open ? 'open' : 'closed'}>\n    Helpful additional context\n  </TooltipContent>\n</Tooltip>`;
  }

  if (item.slug === 'toast') {
    return `const [toastOpen, setToastOpen] = useState(false);\n\n<Button onClick={() => setToastOpen(true)}>Show toast</Button>\n\n{toastOpen && (\n  <ToastProvider position="bottom-right">\n    <Toast variant="success">\n      <YStack gap="xs">\n        <ToastTitle>Saved</ToastTitle>\n        <ToastDescription>Your example is interactive.</ToastDescription>\n      </YStack>\n      <ToastClose color="secondary" onClick={() => setToastOpen(false)}>Dismiss</ToastClose>\n    </Toast>\n  </ToastProvider>\n)}`;
  }

  if (item.slug === 'menu') {
    return `const [open, setOpen] = useState(false);\nconst [selected, setSelected] = useState('None');\n\n<Menu>\n  <MenuTrigger>\n    <Button variant="outline" onClick={() => setOpen(!open)}>Actions</Button>\n  </MenuTrigger>\n  <MenuContent data-state={open ? 'open' : 'closed'}>\n    <MenuLabel>Workspace</MenuLabel>\n    <MenuGroup>\n      <MenuItem onClick={() => setSelected('Profile')}>Profile</MenuItem>\n      <MenuItem onClick={() => setSelected('Settings')}>Settings</MenuItem>\n    </MenuGroup>\n    <MenuSeparator />\n    <MenuItem onClick={() => setOpen(false)}>Close menu</MenuItem>\n  </MenuContent>\n  <Text color="muted">Last action: {selected}</Text>\n</Menu>`;
  }

  if (item.slug === 'context-menu') {
    return `const [open, setOpen] = useState(false);\nconst [selected, setSelected] = useState('None');\n\n<Box style={{ position: 'relative' }}>\n  <ContextMenu>\n    <ContextMenuTrigger>\n      <Box p="large" bg="subtle" borderRadius="medium"\n        onContextMenu={(event) => { event.preventDefault(); setOpen(true); }}>\n        Right-click this region to open its menu.\n      </Box>\n    </ContextMenuTrigger>\n    <ContextMenuContent data-state={open ? 'open' : 'closed'}\n      style={{ position: 'absolute', top: '48px', left: '0px', zIndex: 1200 }}>\n      <ContextMenuLabel>Actions</ContextMenuLabel>\n      <ContextMenuGroup>\n        <ContextMenuItem onClick={() => setSelected('Copied')}>Copy</ContextMenuItem>\n        <ContextMenuSeparator />\n        <ContextMenuItem onClick={() => setOpen(false)}>Dismiss</ContextMenuItem>\n      </ContextMenuGroup>\n    </ContextMenuContent>\n  </ContextMenu>\n</Box>`;
  }

  if (item.slug === 'accordion') {
    return `const [expanded, setExpanded] = useState(true);\n\n<Accordion>\n  <AccordionItem value="docs-item">\n    <AccordionTrigger data-state={expanded ? 'open' : 'closed'} onClick={() => setExpanded(!expanded)}>\n      How does interactive state work?\n    </AccordionTrigger>\n    <AccordionContent data-state={expanded ? 'open' : 'closed'}>\n      <Text color="muted">Your app owns state and passes the active data attributes.</Text>\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`;
  }

  if (item.slug === 'separator') {
    return `<XStack gap="medium" alignItems="center">\n  <Text>First</Text>\n  <Separator orientation="vertical" style={{ width: '2px', height: '32px' }} />\n  <Text>Second</Text>\n  <Separator orientation="vertical" style={{ width: '2px', height: '32px' }} />\n  <Text>Third</Text>\n</XStack>`;
  }

  if (item.slug === 'xgroup') {
    return `<XGroup>\n  <Button variant="outline">Day</Button>\n  <Button variant="outline">Week</Button>\n  <Button variant="outline">Month</Button>\n</XGroup>`;
  }

  if (item.slug === 'heading') {
    return `<Heading level={3}>\n  A section heading\n</Heading>`;
  }

  if (item.slug.startsWith('h') && /^h[1-6]$/.test(item.slug)) {
    return `<${item.name}>A level-${item.slug.slice(1)} heading</${item.name}>`;
  }

  if (item.slug === 'text') {
    return '<Text color="primary">Theme-aware primary text</Text>';
  }

  if (item.slug === 'sizable-text') {
    return '<SizableText size="lg">Large, readable text</SizableText>';
  }

  if (item.slug === 'paragraph') {
    return '<Paragraph color="muted">A paragraph with comfortable reading rhythm for longer copy.</Paragraph>';
  }

  if (item.slug === 'colors') {
    return `const [previewTheme, setPreviewTheme] = useState<ThemeName>('${theme}');\n\n<YStack gap="medium">\n  <Text>Preview theme</Text>\n  <Select value={previewTheme} onChange={(event) => setPreviewTheme(event.target.value as ThemeName)}>\n    <option value="light">Light</option>\n    <option value="dark">Dark</option>\n    <option value="emerald">Emerald</option>\n    <option value="emerald-dark">Emerald dark</option>\n    <option value="midnight">Midnight</option>\n  </Select>\n  <Theme name={previewTheme}>\n    <YStack gap="small">\n      <H4 color="secondary">Blue shades</H4>\n      <XStack gap="small" alignItems="center">\n        <Box bg="blue4" p="medium">blue4</Box>\n        <Box bg="blue8" p="medium">blue8</Box>\n        <Text color="blue12">blue12 text</Text>\n      </XStack>\n          <Text color="muted">The same token names receive light or dark palette values from the active theme.</Text>\n    </YStack>\n  </Theme>\n</YStack>`;
  }

  if (item.slug === 'themes') {
    return `const [previewTheme, setPreviewTheme] = useState<ThemeName>('${theme}');\n\n<YStack gap="medium">\n  <XStack gap="small" flexWrap="wrap">\n    <Button variant={previewTheme === 'light' ? 'solid' : 'outline'} onClick={() => setPreviewTheme('light')}>light</Button>\n    <Button variant={previewTheme === 'dark' ? 'solid' : 'outline'} onClick={() => setPreviewTheme('dark')}>dark</Button>\n    <Button variant={previewTheme === 'emerald' ? 'solid' : 'outline'} onClick={() => setPreviewTheme('emerald')}>emerald</Button>\n    <Button variant={previewTheme === 'emerald-dark' ? 'solid' : 'outline'} onClick={() => setPreviewTheme('emerald-dark')}>emerald-dark</Button>\n    <Button variant={previewTheme === 'midnight' ? 'solid' : 'outline'} onClick={() => setPreviewTheme('midnight')}>midnight</Button>\n  </XStack>\n  <Theme name={previewTheme}>\n    <Box bg="background" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="medium" p="large">\n      <H3 color="secondary">{previewTheme} theme</H3>\n          <Paragraph color="muted">Semantic tokens and Tamagui-style numbered color ramps respond to this theme.</Paragraph>\n      <XStack gap="small" mt="medium">\n        <Box bg="blue6" p="medium" borderRadius="small" color="white">blue6</Box>\n        <Text color="blue12">blue12 text</Text>\n        <Box bg="blackA4" p="medium" borderRadius="small" color="secondary">blackA4</Box>\n      </XStack>\n    </Box>\n  </Theme>\n      <XStack gap="small">\n            <Theme name={\`\${previewTheme}_surface1\`}>\n      <Box bg="background" p="small">{previewTheme}_surface1</Box>\n    </Theme>\n        <Theme name={\`\${previewTheme}_surface2\`}>\n      <Box bg="background" p="small">{previewTheme}_surface2</Box>\n    </Theme>\n  </XStack>\n  <Text color="muted">The selected theme is scoped to this preview only.</Text>\n</YStack>`;
  }

  if (item.slug === 'button') {
    return `const [clicked, setClicked] = useState(false);\n\n<YStack gap="medium">\n  <XStack gap="small" flexWrap="wrap">\n    <Button onClick={() => setClicked(!clicked)}>Solid action</Button>\n    <Button variant="outline">Outline</Button>\n    <Button variant="ghost">Ghost</Button>\n    <Button variant="link">Link</Button>\n  </XStack>\n  <Text color="muted">{clicked ? 'Action clicked — state updated.' : 'Click the solid button to update this message.'}</Text>\n      <XStack gap="small">\n    <Button size="xs">xs</Button>\n    <Button size="sm">sm</Button>\n    <Button size="md">md</Button>\n    <Button size="lg">lg</Button>\n    <Button size="xl">xl</Button>\n  </XStack>\n</YStack>`;
  }

  if (['input', 'text-area', 'label', 'field', 'field-error', 'field-helper', 'form'].includes(item.slug)) {
    return `const [clicked, setClicked] = useState(false);\n\n<Form>\n  <Field>\n    <Label htmlFor="docs-name" required>Display name</Label>\n    ${item.slug === 'text-area' ? '<TextArea id="docs-name" rows={3} placeholder="Write a short bio" />' : '<Input id="docs-name" placeholder="Ada Lovelace" />'}\n    <FieldHelper>This helper text belongs to the field.</FieldHelper>\n  </Field>\n  ${item.slug === 'field-error' ? '<FieldError>This field has an example validation error.</FieldError>' : ''}\n  <XStack gap="small" mt="small">\n    <Button type="button" variant="outline" onClick={() => setClicked(false)}>Reset</Button>\n    <Button type="button" onClick={() => setClicked(true)}>Save</Button>\n  </XStack>\n  {clicked && <Text color="success">Saved locally for this demo.</Text>}\n</Form>`;
  }

  if (['checkbox', 'switch'].includes(item.slug)) {
    return `const [checked, setChecked] = useState(true);\n\n<YStack gap="medium">\n  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)}>Email me product updates</Checkbox>\n  <Switch checked={checked} onChange={(event) => setChecked(event.target.checked)}>Enabled ({checked ? 'yes' : 'no'})</Switch>\n  <Text color="muted">Both controls share interactive state.</Text>\n</YStack>`;
  }

  if (item.slug === 'select') {
    return `const [selected, setSelected] = useState('standard');\n\n<Select value={selected} onChange={(event) => setSelected(event.target.value)}>\n  <option value="standard">Standard</option>\n  <option value="express">Express</option>\n  <option value="overnight" disabled>Overnight (unavailable)</option>\n</Select>\n\n<Text color="muted">Selected: {selected}</Text>`;
  }

  if (['radio-group', 'radio-group-item'].includes(item.slug)) {
    return `const [selected, setSelected] = useState('standard');\n\n<YStack gap="medium">\n  <RadioGroup name="plan">\n    <RadioGroupItem\n      name="plan"\n      value="standard"\n      checked={selected === 'standard'}\n      onChange={() => setSelected('standard')}\n    >\n      Standard\n    </RadioGroupItem>\n    <RadioGroupItem\n      name="plan"\n      value="express"\n      checked={selected === 'express'}\n      onChange={() => setSelected('express')}\n    >\n      Express\n    </RadioGroupItem>\n    <RadioGroupItem\n      name="plan"\n      value="overnight"\n      checked={selected === 'overnight'}\n      onChange={() => setSelected('overnight')}\n    >\n      Overnight\n    </RadioGroupItem>\n  </RadioGroup>\n      <Text color="muted">Selected: {selected}</Text>\n</YStack>`;
  }

  if (['slider', 'progress'].includes(item.slug)) {
    return `const [range, setRange] = useState(56);\n\n<YStack gap="medium">\n  <Text>Completion: {range}%</Text>\n  <Slider min={0} max={100} value={range} onInput={(event) => setRange(Number(event.target.value))} />\n  <Progress value={range} max={100} />\n  <XStack gap="small">\n    <Button variant="outline" onClick={() => setRange(20)}>20%</Button>\n    <Button variant="outline" onClick={() => setRange(56)}>56%</Button>\n    <Button variant="outline" onClick={() => setRange(85)}>85%</Button>\n  </XStack>\n</YStack>`;
  }

  if (['toggle-group', 'toggle-group-item'].includes(item.slug)) {
    return `const [selected, setSelected] = useState('left');\n\n<ToggleGroup type="single">\n  <ToggleGroupItem value="left" data-active={selected === 'left'} onClick={() => setSelected('left')}>Left</ToggleGroupItem>\n  <ToggleGroupItem value="center" data-active={selected === 'center'} onClick={() => setSelected('center')}>Center</ToggleGroupItem>\n  <ToggleGroupItem value="right" data-active={selected === 'right'} onClick={() => setSelected('right')}>Right</ToggleGroupItem>\n</ToggleGroup>`;
  }

  if (['tabs', 'tab-list', 'tab', 'tab-panel'].includes(item.slug)) {
    return `const [activeTab, setActiveTab] = useState('preview');\n\n<Tabs>\n  <TabList aria-label="Demo sections">\n    <Tab data-active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>preview</Tab>\n    <Tab data-active={activeTab === 'usage'} onClick={() => setActiveTab('usage')}>usage</Tab>\n    <Tab data-active={activeTab === 'notes'} onClick={() => setActiveTab('notes')}>notes</Tab>\n  </TabList>\n  <TabPanel hidden={activeTab !== 'preview'}><Text>This is the live preview panel.</Text></TabPanel>\n  <TabPanel hidden={activeTab !== 'usage'}><Text>Tabs are stateless; control data-active and hidden from your app.</Text></TabPanel>\n  <TabPanel hidden={activeTab !== 'notes'}><Text>Use accessible labels and maintain one active tab.</Text></TabPanel>\n</Tabs>`;
  }

  if (item.slug.startsWith('accordion')) {
    return `const [expanded, setExpanded] = useState(true);\n\n<Accordion>\n  <AccordionItem value="docs-item">\n    <AccordionTrigger data-state={expanded ? 'open' : 'closed'} onClick={() => setExpanded(!expanded)}>\n      How does interactive state work?\n    </AccordionTrigger>\n    <AccordionContent data-state={expanded ? 'open' : 'closed'}>\n      <Text color="muted">The component provides styled markup; your app owns state and passes the active data attributes.</Text>\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`;
  }

  if (item.slug.startsWith('dialog') || item.slug.startsWith('alert-dialog')) {
    const isAlert = item.slug.startsWith('alert-dialog');
    return isAlert
      ? `const [open, setOpen] = useState(false);\n\n<YStack gap="small">\n  <Button onClick={() => setOpen(true)}>Open confirmation</Button>\n  <AlertDialog open={open}>\n    <AlertDialogOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />\n    <AlertDialogContent data-state={open ? 'open' : 'closed'}>\n      <AlertDialogHeader>\n        <AlertDialogTitle>Continue?</AlertDialogTitle>\n        <AlertDialogDescription>This action is only a documentation demo.</AlertDialogDescription>\n      </AlertDialogHeader>\n      <AlertDialogFooter>\n        <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>\n        <AlertDialogAction onClick={() => setOpen(false)}>Confirm</AlertDialogAction>\n      </AlertDialogFooter>\n    </AlertDialogContent>\n  </AlertDialog>\n</YStack>`
      : `const [open, setOpen] = useState(false);\n\n<YStack gap="small">\n  <Button onClick={() => setOpen(true)}>Open dialog</Button>\n  <Dialog open={open}>\n    <DialogOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />\n    <DialogContent data-state={open ? 'open' : 'closed'}>\n      <DialogHeader>\n        <DialogTitle>Example dialog</DialogTitle>\n        <DialogDescription>Compose a dialog from small presentational parts.</DialogDescription>\n      </DialogHeader>\n      <DialogFooter>\n        <DialogClose onClick={() => setOpen(false)}>Close</DialogClose>\n        <Button onClick={() => setOpen(false)}>Done</Button>\n      </DialogFooter>\n    </DialogContent>\n  </Dialog>\n</YStack>`;
  }

  if (item.slug.startsWith('popover')) {
    return `const [open, setOpen] = useState(false);\n\n<Popover>\n  <PopoverTrigger>\n    <Button variant="outline" onClick={() => setOpen(!open)}>Toggle popover</Button>\n  </PopoverTrigger>\n  <PopoverContent side="bottom" data-state={open ? 'open' : 'closed'}>\n    <YStack gap="small">\n      <Text fontWeight="semibold">Popover content</Text>\n      <Text color="muted" fontSize="sm">A floating panel positioned near its trigger.</Text>\n      <PopoverClose onClick={() => setOpen(false)}>Close</PopoverClose>\n    </YStack>\n  </PopoverContent>\n</Popover>`;
  }

  if (item.slug.startsWith('sheet')) {
    return `const [open, setOpen] = useState(false);\nconst [checked, setChecked] = useState(true);\n\n<YStack gap="small">\n  <Button onClick={() => setOpen(true)}>Open sheet</Button>\n  <Sheet open={open}>\n    <SheetOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />\n    <SheetContent side="right" data-state={open ? 'open' : 'closed'}>\n      <SheetHeader>\n        <SheetTitle>Quick settings</SheetTitle>\n        <SheetDescription>This is a live sheet example.</SheetDescription>\n      </SheetHeader>\n      <YStack gap="medium" my="large">\n        <Switch checked={checked} onChange={(event) => setChecked(event.target.checked)}>Enable setting</Switch>\n      </YStack>\n      <SheetFooter><SheetClose onClick={() => setOpen(false)}>Close</SheetClose></SheetFooter>\n    </SheetContent>\n  </Sheet>\n</YStack>`;
  }

  if (item.slug.startsWith('tooltip')) {
    return `const [open, setOpen] = useState(false);\n\n<Tooltip>\n  <TooltipTrigger>\n    <Button variant="outline" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>\n      Hover or focus me\n    </Button>\n  </TooltipTrigger>\n  <TooltipContent side="top" data-state={open ? 'open' : 'closed'}>\n    Helpful additional context\n  </TooltipContent>\n</Tooltip>`;
  }

  if (item.slug.startsWith('toast')) {
    return `const [toastOpen, setToastOpen] = useState(false);\n\n<YStack gap="small">\n  <Button onClick={() => setToastOpen(true)}>Show toast</Button>\n  {toastOpen && (\n    <ToastProvider position="bottom-right">\n      <Toast variant="success">\n        <YStack gap="xs">\n          <ToastTitle>Saved</ToastTitle>\n          <ToastDescription>Your example is interactive.</ToastDescription>\n        </YStack>\n        <ToastClose onClick={() => setToastOpen(false)}>Dismiss</ToastClose>\n      </Toast>\n    </ToastProvider>\n  )}\n</YStack>`;
  }

  if (item.slug.startsWith('menu')) {
    return `const [open, setOpen] = useState(false);\nconst [selected, setSelected] = useState('standard');\n\n<Menu>\n  <MenuTrigger>\n    <Button variant="outline" onClick={() => setOpen(!open)}>Actions ▾</Button>\n  </MenuTrigger>\n  <MenuContent data-state={open ? 'open' : 'closed'}>\n    <MenuLabel>Workspace</MenuLabel>\n    <MenuGroup>\n      <MenuItem onClick={() => setSelected('Profile')}>Profile</MenuItem>\n      <MenuItem onClick={() => setSelected('Settings')}>Settings</MenuItem>\n    </MenuGroup>\n    <MenuSeparator />\n    <MenuItem onClick={() => setOpen(false)}>Close menu</MenuItem>\n  </MenuContent>\n  <Text color="muted">Last action: {selected}</Text>\n</Menu>`;
  }

  if (item.slug.startsWith('context-menu')) {
    return `const [open, setOpen] = useState(false);\nconst [selected, setSelected] = useState('standard');\n\n<ContextMenu>\n  <ContextMenuTrigger>\n    <Box p="large" bg="subtle" borderRadius="medium"\n      onContextMenu={(event) => { event.preventDefault(); setOpen(true); }}>\n      Right-click this region to open its menu.\n    </Box>\n  </ContextMenuTrigger>\n  <ContextMenuContent data-state={open ? 'open' : 'closed'}\n    style={{ '--context-menu-x': '24px', '--context-menu-y': '24px' }}>\n    <ContextMenuLabel>Actions</ContextMenuLabel>\n    <ContextMenuGroup>\n      <ContextMenuItem onClick={() => setSelected('Copied')}>Copy</ContextMenuItem>\n      <ContextMenuSeparator />\n      <ContextMenuItem onClick={() => setOpen(false)}>Dismiss</ContextMenuItem>\n    </ContextMenuGroup>\n  </ContextMenuContent>\n</ContextMenu>`;
  }

  if (item.slug.startsWith('avatar')) {
    return `<XStack gap="medium" alignItems="center">\n  <Avatar size="lg">\n    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Profile example" />\n    <AvatarFallback>JD</AvatarFallback>\n  </Avatar>\n  <Avatar size="lg"><AvatarFallback>SU</AvatarFallback></Avatar>\n  <Text color="muted">Image and fallback states</Text>\n</XStack>`;
  }

  if (item.slug.startsWith('card')) {
    return `const [clicked, setClicked] = useState(false);\n\n<Card bordered elevated p="medium" bg="card">\n  <CardHeader><H3>Project summary</H3><Paragraph color="muted">A composed card surface.</Paragraph></CardHeader>\n  <YStack gap="small"><Text>3 components updated</Text><Progress value={72} max={100} /></YStack>\n  <CardFooter>\n    <Button variant="outline" onClick={() => setClicked(!clicked)}>{clicked ? 'Added' : 'View details'}</Button>\n  </CardFooter>\n</Card>`;
  }

  if (item.slug === 'image') {
    return `<Image\n  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=480&h=240&fit=crop"\n  alt="Abstract colorful gradient art"\n  objectFit="cover"\n  borderRadius="medium"\n  style={{ width: '100%', maxWidth: '480px', height: '240px' }}\n/>`;
  }

  if (item.slug === 'list-item') {
    return `<YStack gap="xs">\n  <ListItem pressable title="Account settings"\n    subTitle="Manage your profile and preferences"\n    icon={<Avatar size="sm"><AvatarFallback>AS</AvatarFallback></Avatar>} />\n  <ListItem pressable title="Notifications"\n    subTitle="Choose what updates you receive" />\n</YStack>`;
  }

  if (item.slug === 'spinner') {
    return `<XStack gap="medium" alignItems="center">\n  <YStack gap="xs" alignItems="center"><Spinner size="xs" /><Text fontSize="xs" color="muted">xs</Text></YStack>\n  <YStack gap="xs" alignItems="center"><Spinner size="sm" /><Text fontSize="xs" color="muted">sm</Text></YStack>\n  <YStack gap="xs" alignItems="center"><Spinner size="md" /><Text fontSize="xs" color="muted">md</Text></YStack>\n  <YStack gap="xs" alignItems="center"><Spinner size="lg" /><Text fontSize="xs" color="muted">lg</Text></YStack>\n</XStack>`;
  }

  if (item.slug === 'separator') return `<XStack gap="medium" alignItems="center">\n  <Text>First</Text>\n  <Separator orientation="vertical" style={{ width: '2px', height: '32px' }} />\n  <Text>Second</Text>\n  <Separator orientation="vertical" style={{ width: '2px', height: '32px' }} />\n  <Text>Third</Text>\n</XStack>`;
  if (item.slug === 'xgroup') return `<XGroup>\n  <Button variant="outline">Day</Button>\n  <Button variant="outline">Week</Button>\n  <Button variant="outline">Month</Button>\n</XGroup>`;
  if (item.slug === 'ystack') return `<YStack gap="small">\n  <Box bg="subtle" p="small" borderRadius="small">First item</Box>\n  <Box bg="subtle" p="small" borderRadius="small">Second item</Box>\n  <Box bg="subtle" p="small" borderRadius="small">Third item</Box>\n</YStack>`;
  if (item.slug === 'xstack') return `<XStack gap="small" flexWrap="wrap">\n  <Box bg="subtle" p="small" borderRadius="small">First item</Box>\n  <Box bg="subtle" p="small" borderRadius="small">Second item</Box>\n  <Box bg="subtle" p="small" borderRadius="small">Third item</Box>\n</XStack>`;
  if (item.slug === 'box') return '<Box bg="subtle" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="medium" p="large">\n  A Box with spacing, border, and color tokens.\n</Box>';
  if (item.slug === 'anchor') return '<Anchor href="#/">Back to documentation home</Anchor>';
  if (item.slug === 'heading') return `<Heading level={3}>\n  A section heading\n</Heading>`;
  if (item.slug.startsWith('h') && /^h[1-6]$/.test(item.slug)) return `<${item.name}>A level-${item.slug.slice(1)} heading</${item.name}>`;
  if (item.slug === 'text') return '<Text color="primary">Theme-aware primary text</Text>';
  if (item.slug === 'sizable-text') return '<SizableText size="lg">Large, readable text</SizableText>';
  if (item.slug === 'paragraph') return '<Paragraph color="muted">A paragraph with comfortable reading rhythm for longer copy.</Paragraph>';

  return `const [clicked, setClicked] = useState(false);\n\n<YStack gap="medium">\n  <Text>${item.name} is a composable, zero-runtime component. Use it with its related parts and wire state in your application.</Text>\n  <XStack gap="small" alignItems="center">\n    <Button onClick={() => setClicked(!clicked)}>{clicked ? 'Active' : 'Try interaction'}</Button>\n    <Text color="muted">{clicked ? 'Interactive state is on.' : 'Click to change the example state.'}</Text>\n  </XStack>\n</YStack>`;
}

const previewComponentImports = [
  'Accordion', 'AccordionContent', 'AccordionItem', 'AccordionTrigger',
  'AlertDialog', 'AlertDialogAction', 'AlertDialogCancel', 'AlertDialogContent',
  'AlertDialogDescription', 'AlertDialogFooter', 'AlertDialogHeader', 'AlertDialogOverlay',
  'AlertDialogTitle', 'Anchor', 'Avatar', 'AvatarFallback', 'AvatarImage', 'Box',
  'Button', 'Card', 'CardFooter', 'CardHeader', 'Checkbox', 'ContextMenu',
  'ContextMenuContent', 'ContextMenuGroup', 'ContextMenuItem', 'ContextMenuLabel',
  'ContextMenuSeparator', 'ContextMenuTrigger', 'Dialog', 'DialogClose', 'DialogContent',
  'DialogDescription', 'DialogFooter', 'DialogHeader', 'DialogOverlay', 'DialogTitle',
  'Field', 'FieldError', 'FieldHelper', 'Form', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'Heading', 'Image', 'Input', 'Label', 'ListItem', 'Loader', 'Menu', 'MenuContent', 'MenuGroup',
  'MenuItem', 'MenuLabel', 'MenuSeparator', 'MenuTrigger', 'Paragraph', 'Popover',
  'PopoverClose', 'PopoverContent', 'PopoverTrigger', 'Progress', 'RadioGroup',
  'RadioGroupItem', 'Select', 'Separator', 'Sheet', 'SheetClose', 'SheetContent',
  'SheetDescription', 'SheetFooter', 'SheetHeader', 'SheetOverlay', 'SheetTitle',
  'SizableText', 'Slider', 'Spinner', 'Switch', 'Tab', 'TabList', 'TabPanel', 'Tabs',
  'Text', 'TextArea', 'Theme', 'ToggleGroup', 'ToggleGroupItem', 'Toast', 'ToastClose',
  'ToastDescription', 'ToastProvider', 'ToastTitle', 'Tooltip', 'TooltipContent',
  'TooltipTrigger', 'XGroup', 'XStack', 'YStack',
];

function getPreviewCode(item: DocItem, theme: string) {
  const code = getPreviewCodeContent(item, theme);
  const withoutImports = code.replace(/^import .*;\r?\n/gm, '');
  const existingImports = new Set(
    [...code.matchAll(/import(?: type)? \{ ([^}]+) \} from/g)]
      .flatMap((match) => match[1].split(',').map((name) => name.trim())),
  );
  const usedComponents = previewComponentImports.filter((name) =>
    new RegExp(`<\\/?${name}(?=[\\s/>])`).test(withoutImports) && !existingImports.has(name),
  );
  const imports = [];

  if (/\buseState(?:<[^>\n]+>)?\s*\(/.test(withoutImports) && !code.includes("from 'hono/jsx/dom'")) {
    imports.push("import { useState } from 'hono/jsx/dom';");
  }
  if (usedComponents.length > 0 || /\bcolorScales\b/.test(withoutImports)) {
    const values = [...usedComponents];
    if (/\bcolorScales\b/.test(withoutImports) && !existingImports.has('colorScales')) values.push('colorScales');
    imports.push(`import { ${values.join(', ')} } from 'silva-ui';`);
  }
  const types = ['ColorTokenName', 'ThemeName'].filter((name) =>
    new RegExp(`\\b${name}\\b`).test(withoutImports) && !existingImports.has(name),
  );
  if (types.length > 0) imports.push(`import type { ${types.join(', ')} } from 'silva-ui';`);

  return [...imports, withoutImports].join('\n');
}

function Demo({ item, previewTheme, setPreviewTheme }: { item: DocItem; previewTheme: string; setPreviewTheme: (theme: string) => void }) {
  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(true);
  const [selected, setSelected] = useState('standard');
  const [range, setRange] = useState(56);
  const [activeTab, setActiveTab] = useState('preview');
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    setClicked(false);
    setChecked(true);
    setSelected('standard');
    setRange(56);
    setActiveTab('preview');
    setExpanded(true);
    setOpen(false);
    setToastOpen(false);
  }, [item.slug]);

  if (item.slug === 'colors') {
    return (
      <YStack gap="large">
        <XStack gap="small" alignItems="center">
          <Text>Preview theme</Text>
          <Select value={previewTheme} onChange={(event: any) => setPreviewTheme(event.target.value as ThemeName)}>
            {themes.map((name) => <option value={name}>{name}</option>)}
          </Select>
        </XStack>
        <Theme name={previewTheme}>
          <YStack gap="large">
            {Object.entries(colorScales).map(([family, shades]) => (
              <YStack gap="xs">
                <H4 color="secondary">{family} scale</H4>
                <XStack gap="xs" flexWrap="wrap">
                  {shades.map((_, index) => {
                    const shade = index + 1;
                    const token = `${family}${shade}`;
                    return (
                      <YStack gap="xs" alignItems="center">
                        <Box bg={token as ColorTokenName} borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="small" style={{ width: '42px', height: '42px' }} />
                        <Text fontSize="xs" color="muted">{shade}</Text>
                      </YStack>
                    );
                  })}
                </XStack>
              </YStack>
            ))}
            <Text color="muted">
              These are Tamagui/Radix color scales. The token names stay the same,
              but light and dark themes provide different values for each shade.
              Alpha scales such as blackA and whiteA are included too.
            </Text>
          </YStack>
        </Theme>
      </YStack>
    );
  }

  if (item.slug === 'themes') {
    return (
      <YStack gap="medium">
        <XStack gap="small" flexWrap="wrap">
          {themes.map((name) => (
            <Button variant={previewTheme === name ? 'solid' : 'outline'} onClick={() => setPreviewTheme(name)}>{name}</Button>
          ))}
        </XStack>
        <Theme name={previewTheme}>
          <Box bg="background" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="medium" p="large">
            <H3 color="secondary">{previewTheme} theme</H3>
            <Paragraph color="muted">Semantic tokens and Tamagui-style numbered color ramps respond to this theme.</Paragraph>
            <XStack gap="small" mt="medium">
              <Box bg="blue6" p="medium" borderRadius="small" color="white">blue6</Box>
              <Text color="blue12">blue12 text</Text>
              <Box bg="blackA4" p="medium" borderRadius="small" color="secondary">blackA4</Box>
            </XStack>
          </Box>
        </Theme>
        <XStack gap="small" mt="medium">
          <Theme name={`${previewTheme}_surface1`}>
            <Box bg="background" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="small" p="small">
              <Text color="secondary">{previewTheme}_surface1</Text>
            </Box>
          </Theme>
          <Theme name={`${previewTheme}_surface2`}>
            <Box bg="background" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="small" p="small">
              <Text color="secondary">{previewTheme}_surface2</Text>
            </Box>
          </Theme>
        </XStack>
        <Text color="muted">Surface themes are generated from the parent palette and can be nested inside any built-in theme.</Text>
      </YStack>
    );
  }

  if (['button'].includes(item.slug)) {
    return (
      <YStack gap="medium">
        <XStack gap="small" flexWrap="wrap">
          <Button onClick={() => setClicked(!clicked)}>Solid action</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </XStack>
        <Text color="muted">{clicked ? 'Action clicked — state updated.' : 'Click the solid button to update this message.'}</Text>
        <XStack gap="small">{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => <Button size={size}>{size}</Button>)}</XStack>
      </YStack>
    );
  }

  if (['input', 'text-area', 'label', 'field', 'field-error', 'field-helper', 'form'].includes(item.slug)) {
    return (
      <Form>
        <Field>
          <Label htmlFor="docs-name" required>Display name</Label>
          {item.slug === 'text-area' ? <TextArea id="docs-name" rows={3} placeholder="Write a short bio" /> : <Input id="docs-name" placeholder="Ada Lovelace" />}
          <FieldHelper>This helper text belongs to the field.</FieldHelper>
        </Field>
        {item.slug === 'field-error' && <FieldError>This field has an example validation error.</FieldError>}
        <XStack gap="small" mt="small">
          <Button type="button" variant="outline" onClick={() => setClicked(false)}>Reset</Button>
          <Button type="button" onClick={() => setClicked(true)}>Save</Button>
        </XStack>
        {clicked && <Text color="success">Saved locally for this demo.</Text>}
      </Form>
    );
  }

  if (['checkbox', 'switch'].includes(item.slug)) {
    return (
      <YStack gap="medium">
        <Checkbox checked={checked} onChange={(event: any) => setChecked(event.target.checked)}>Email me product updates</Checkbox>
        <Switch checked={checked} onChange={(event: any) => setChecked(event.target.checked)}>Enabled ({checked ? 'yes' : 'no'})</Switch>
        <Text color="muted">Both controls share interactive state.</Text>
      </YStack>
    );
  }

  if (item.slug === 'select') {
    return (
      <YStack gap="medium">
        <Select value={selected} onChange={(event: any) => setSelected(event.target.value)}>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
          <option value="overnight" disabled>Overnight (unavailable)</option>
        </Select>
        <Text color="muted">Selected: {selected}</Text>
      </YStack>
    );
  }

  if (['radio-group', 'radio-group-item'].includes(item.slug)) {
    return (
      <YStack gap="medium">
        <RadioGroup name="plan">
          {['standard', 'express', 'overnight'].map((value) => (
            <RadioGroupItem name="plan" value={value} checked={selected === value} onChange={() => setSelected(value)}>{value}</RadioGroupItem>
          ))}
        </RadioGroup>
      </YStack>
    );
  }

  if (['slider', 'progress'].includes(item.slug)) {
    return (
      <YStack gap="medium">
        <Text>Completion: {range}%</Text>
        <Slider min={0} max={100} value={range} onInput={(event: any) => setRange(Number(event.target.value))} />
        <Progress value={range} max={100} />
        <XStack gap="small">{[20, 56, 85].map((value) => <Button variant="outline" onClick={() => setRange(value)}>{value}%</Button>)}</XStack>
      </YStack>
    );
  }

  if (['toggle-group', 'toggle-group-item'].includes(item.slug)) {
    return (
      <ToggleGroup type="single">
        {['Left', 'Center', 'Right'].map((label) => (
          <ToggleGroupItem value={label.toLowerCase()} data-active={selected === label.toLowerCase()} onClick={() => setSelected(label.toLowerCase())}>{label}</ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  }

  if (['tabs', 'tab-list', 'tab', 'tab-panel'].includes(item.slug)) {
    return (
      <Tabs>
        <TabList aria-label="Demo sections">
          {['preview', 'usage', 'notes'].map((tab) => <Tab data-active={activeTab === tab} onClick={() => setActiveTab(tab)}>{tab}</Tab>)}
        </TabList>
        {['preview', 'usage', 'notes'].map((tab) => <TabPanel hidden={activeTab !== tab}><Text>{tab === 'preview' ? 'This is the live preview panel.' : tab === 'usage' ? 'Tabs are stateless; control data-active and hidden from your app.' : 'Use accessible labels and maintain one active tab.'}</Text></TabPanel>)}
      </Tabs>
    );
  }

  if (['accordion', 'accordion-item', 'accordion-trigger', 'accordion-content'].includes(item.slug)) {
    return (
      <Accordion>
        <AccordionItem value="docs-item">
          <AccordionTrigger data-state={expanded ? 'open' : 'closed'} onClick={() => setExpanded(!expanded)}>How does interactive state work?</AccordionTrigger>
          <AccordionContent data-state={expanded ? 'open' : 'closed'}><Text color="muted">The component provides styled markup; your app owns state and passes the active data attributes.</Text></AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (['dialog', 'dialog-overlay', 'dialog-content', 'dialog-header', 'dialog-footer', 'dialog-title', 'dialog-description', 'dialog-close', 'alert-dialog', 'alert-dialog-overlay', 'alert-dialog-content', 'alert-dialog-header', 'alert-dialog-footer', 'alert-dialog-title', 'alert-dialog-description', 'alert-dialog-action', 'alert-dialog-cancel'].includes(item.slug)) {
    return (
      <YStack gap="small">
        <Button onClick={() => setOpen(true)}>Open {item.slug.startsWith('alert') ? 'confirmation' : 'dialog'}</Button>
        {item.slug.startsWith('alert') ? (
          <AlertDialog open={open}>
            <AlertDialogOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />
            <AlertDialogContent data-state={open ? 'open' : 'closed'}>
              <AlertDialogHeader><AlertDialogTitle>Continue?</AlertDialogTitle><AlertDialogDescription>This action is only a documentation demo.</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => setOpen(false)}>Confirm</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Dialog open={open}>
            <DialogOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />
            <DialogContent data-state={open ? 'open' : 'closed'}>
              <DialogHeader><DialogTitle>Example dialog</DialogTitle><DialogDescription>Compose a dialog from small presentational parts.</DialogDescription></DialogHeader>
              <DialogFooter><DialogClose onClick={() => setOpen(false)}>Close</DialogClose><Button onClick={() => setOpen(false)}>Done</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </YStack>
    );
  }

  if (['popover', 'popover-trigger', 'popover-content', 'popover-close'].includes(item.slug)) {
    return (
      <Popover>
        <PopoverTrigger><Button variant="outline" onClick={() => setOpen(!open)}>Toggle popover</Button></PopoverTrigger>
        <PopoverContent side="bottom" data-state={open ? 'open' : 'closed'}>
          <YStack gap="small"><Text fontWeight="semibold">Popover content</Text><Text color="muted" fontSize="sm">A floating panel positioned near its trigger.</Text><PopoverClose onClick={() => setOpen(false)}>Close</PopoverClose></YStack>
        </PopoverContent>
      </Popover>
    );
  }

  if (['sheet', 'sheet-overlay', 'sheet-content', 'sheet-header', 'sheet-footer', 'sheet-title', 'sheet-description', 'sheet-close'].includes(item.slug)) {
    return (
      <YStack gap="small">
        <Button onClick={() => setOpen(true)}>Open sheet</Button>
        <Sheet open={open}>
          <SheetOverlay data-state={open ? 'open' : 'closed'} onClick={() => setOpen(false)} />
          <SheetContent side="right" data-state={open ? 'open' : 'closed'}>
            <SheetHeader><SheetTitle>Quick settings</SheetTitle><SheetDescription>This is a live sheet example.</SheetDescription></SheetHeader>
            <YStack gap="medium" my="large"><Switch checked={checked} onChange={(event: any) => setChecked(event.target.checked)}>Enable setting</Switch></YStack>
            <SheetFooter><SheetClose onClick={() => setOpen(false)}>Close</SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </YStack>
    );
  }

  if (['tooltip', 'tooltip-trigger', 'tooltip-content'].includes(item.slug)) {
    return (
      <Tooltip onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <TooltipTrigger><Button variant="outline" onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>Hover or focus me</Button></TooltipTrigger>
        <TooltipContent side="top" data-state={open ? 'open' : 'closed'}>Helpful additional context</TooltipContent>
      </Tooltip>
    );
  }

  if (['toast-provider', 'toast', 'toast-title', 'toast-description', 'toast-close'].includes(item.slug)) {
    return (
      <YStack gap="small">
        <Button onClick={() => setToastOpen(true)}>Show toast</Button>
        {toastOpen && <ToastProvider position="bottom-right"><Toast variant="success"><YStack gap="xs"><ToastTitle>Saved</ToastTitle><ToastDescription>Your example is interactive.</ToastDescription></YStack><ToastClose color="secondary" onClick={() => setToastOpen(false)}>Dismiss</ToastClose></Toast></ToastProvider>}
      </YStack>
    );
  }

  if (['menu', 'menu-trigger', 'menu-content', 'menu-item', 'menu-separator', 'menu-label', 'menu-group'].includes(item.slug)) {
    return (
      <Menu>
        <MenuTrigger><Button variant="outline" onClick={() => setOpen(!open)}>Actions ▾</Button></MenuTrigger>
        <MenuContent data-state={open ? 'open' : 'closed'}>
          <MenuLabel>Workspace</MenuLabel>
          <MenuGroup>
            <MenuItem onClick={() => setSelected('Profile')}>Profile</MenuItem>
            <MenuItem onClick={() => setSelected('Settings')}>Settings</MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem onClick={() => setOpen(false)}>Close menu</MenuItem>
        </MenuContent>
        <Text color="muted">Last action: {selected}</Text>
      </Menu>
    );
  }

  if (['context-menu', 'context-menu-trigger', 'context-menu-content', 'context-menu-item', 'context-menu-separator', 'context-menu-label', 'context-menu-group'].includes(item.slug)) {
    return (
      <Box style={{ position: 'relative' }}>
        <ContextMenu>
          <ContextMenuTrigger>
            <Box p="large" bg="subtle" borderRadius="medium" onContextMenu={(event: any) => { event.preventDefault(); setOpen(true); }}>
              Right-click this region to open its menu.
            </Box>
          </ContextMenuTrigger>
          <ContextMenuContent data-state={open ? 'open' : 'closed'} style={{ position: 'absolute', top: '48px', left: '0px', zIndex: 1200 }}>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuGroup>
              <ContextMenuItem onClick={() => setSelected('Copied')}>Copy</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => setOpen(false)}>Dismiss</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </Box>
    );
  }

  if (['avatar', 'avatar-image', 'avatar-fallback'].includes(item.slug)) {
    return (
      <XStack gap="medium" alignItems="center">
        <Avatar size="lg"><AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Profile example" /><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar size="lg"><AvatarFallback>SU</AvatarFallback></Avatar>
        <Text color="muted">Image and fallback states</Text>
      </XStack>
    );
  }

  if (['card', 'card-header', 'card-footer'].includes(item.slug)) {
    return (
      <Card bordered elevated p="medium" bg="card">
        <CardHeader><H3>Project summary</H3><Paragraph color="muted">A composed card surface.</Paragraph></CardHeader>
        <YStack gap="small"><Text>3 components updated</Text><Progress value={72} max={100} /></YStack>
        <CardFooter><Button variant="outline" onClick={() => setClicked(!clicked)}>{clicked ? 'Added' : 'View details'}</Button></CardFooter>
      </Card>
    );
  }

  if (item.slug === 'image') {
    return <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=480&h=240&fit=crop" alt="Abstract colorful gradient art" objectFit="cover" borderRadius="medium" style={{ width: '100%', maxWidth: '480px', height: '240px' }} />;
  }

  if (item.slug === 'list-item') {
    return <YStack gap="xs"><ListItem pressable title="Account settings" subTitle="Manage your profile and preferences" icon={<Avatar size="sm"><AvatarFallback>AS</AvatarFallback></Avatar>} /><ListItem pressable title="Notifications" subTitle="Choose what updates you receive" /></YStack>;
  }

  if (item.slug === 'spinner') {
    return <XStack gap="medium" alignItems="center">{(['xs', 'sm', 'md', 'lg'] as const).map((size) => <YStack gap="xs" alignItems="center"><Spinner size={size} /><Text fontSize="xs" color="muted">{size}</Text></YStack>)}</XStack>;
  }

  if (item.slug === 'loader') {
    return <YStack gap="medium"><Loader size="sm" /><Loader size="md" /><Loader size="lg" /></YStack>;
  }

  if (item.slug === 'separator') {
    return <XStack gap="medium" alignItems="center"><Text>First</Text><Separator orientation="vertical" style={{ width: '2px', height: '32px' }} /><Text>Second</Text><Separator orientation="vertical" style={{ width: '2px', height: '32px' }} /><Text>Third</Text></XStack>;
  }

  if (['xgroup'].includes(item.slug)) {
    return <XGroup><Button variant="outline">Day</Button><Button variant="outline">Week</Button><Button variant="outline">Month</Button></XGroup>;
  }

  if (['ystack'].includes(item.slug)) {
    return <YStack gap="small">{['First item', 'Second item', 'Third item'].map((label) => <Box bg="subtle" p="small" borderRadius="small">{label}</Box>)}</YStack>;
  }

  if (['xstack'].includes(item.slug)) {
    return <XStack gap="small" flexWrap="wrap">{['First item', 'Second item', 'Third item'].map((label) => <Box bg="subtle" p="small" borderRadius="small">{label}</Box>)}</XStack>;
  }

  if (['box'].includes(item.slug)) {
    return <Box bg="subtle" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="medium" p="large">A Box with spacing, border, and color tokens.</Box>;
  }

  if (['anchor'].includes(item.slug)) {
    return <Anchor href="#/">Back to documentation home</Anchor>;
  }

  if (item.slug === 'heading') {
    return <Heading level={3}>A section heading</Heading>;
  }

  if (item.slug.startsWith('h') && /^h[1-6]$/.test(item.slug)) {
    const HeadingComponent = { h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6 }[item.slug as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'];
    return <HeadingComponent>A level-{item.slug.slice(1)} heading</HeadingComponent>;
  }

  if (item.slug === 'text') return <Text color="primary">Theme-aware primary text</Text>;
  if (item.slug === 'sizable-text') return <SizableText size="lg">Large, readable text</SizableText>;
  if (item.slug === 'paragraph') return <Paragraph color="muted">A paragraph with comfortable reading rhythm for longer copy.</Paragraph>;
  return (
    <YStack gap="medium">
      <Text>{item.name} is a composable, zero-runtime component. Use it with its related parts and wire state in your application.</Text>
      <XStack gap="small" alignItems="center">
        <Button onClick={() => setClicked(!clicked)}>{clicked ? 'Active' : 'Try interaction'}</Button>
        <Text color="muted">{clicked ? 'Interactive state is on.' : 'Click to change the example state.'}</Text>
      </XStack>
    </YStack>
  );
}

function getUsageCode(item: DocItem) {
  const examples: Record<string, string> = {
    colors: `import { Box, Text } from 'silva-ui';\n\n<Text color="blue12">Readable text in every theme</Text>\n<Text color="gray11">Secondary text</Text>\n<Box bg="blackA4">A translucent surface</Box>`,
    themes: `import { Card, Theme } from 'silva-ui';\n\n<Theme name="dark">\n  <Card bg="card">Theme-scoped content</Card>\n  <Theme name="dark_surface1">\n    <Card bg="card">Nested surface theme</Card>\n  </Theme>\n</Theme>`,
    select: `import { Select } from 'silva-ui';\n\n<Select defaultValue="standard">\n  <option value="standard">Standard</option>\n  <option value="express">Express</option>\n  <option value="overnight" disabled>Overnight (unavailable)</option>\n</Select>`,
    slider: `import { Slider } from 'silva-ui';\n\n<Slider min={0} max={100} defaultValue={56} />`,
    spinner: `import { Spinner } from 'silva-ui';\n\n<Spinner size="md" />`,
    loader: `import { Loader } from 'silva-ui';\n\n<Loader size="md" />`,
    card: `import { Button, Card, CardFooter, CardHeader, H3, Paragraph, Progress, Text, YStack } from 'silva-ui';\n\n<Card bordered elevated p="medium" bg="card">\n  <CardHeader>\n    <H3>Project summary</H3>\n    <Paragraph color="muted">A composed card surface.</Paragraph>\n  </CardHeader>\n  <YStack gap="small">\n    <Text>3 components updated</Text>\n    <Progress value={72} max={100} />\n  </YStack>\n  <CardFooter>\n    <Button variant="outline">View details</Button>\n  </CardFooter>\n</Card>`,
    tabs: `import { Tab, TabList, TabPanel, Tabs, Text } from 'silva-ui';\n\n<Tabs>\n  <TabList aria-label="Sections">\n    <Tab data-active>Overview</Tab>\n    <Tab>Details</Tab>\n  </TabList>\n  <TabPanel>\n    <Text>Overview content</Text>\n  </TabPanel>\n  <TabPanel hidden>\n    <Text>Details content</Text>\n  </TabPanel>\n</Tabs>`,
    dialog: `import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from 'silva-ui';\n\n<Dialog open={open}>\n  <DialogOverlay data-state={open ? 'open' : 'closed'} />\n  <DialogContent data-state={open ? 'open' : 'closed'}>\n    <DialogHeader>\n      <DialogTitle>Example dialog</DialogTitle>\n      <DialogDescription>Compose a dialog from accessible parts.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose onClick={closeDialog}>Close</DialogClose>\n      <Button onClick={closeDialog}>Done</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
    'alert-dialog': `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from 'silva-ui';\n\n<AlertDialog open={open}>\n  <AlertDialogOverlay data-state={open ? 'open' : 'closed'} />\n  <AlertDialogContent data-state={open ? 'open' : 'closed'}>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete this item?</AlertDialogTitle>\n      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>\n      <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
    popover: `import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger, Text, YStack } from 'silva-ui';\n\n<Popover>\n  <PopoverTrigger>\n    <Button>Open options</Button>\n  </PopoverTrigger>\n  <PopoverContent data-state={open ? 'open' : 'closed'}>\n    <YStack gap="small">\n      <Text>Popover content</Text>\n      <PopoverClose onClick={closePopover}>Close</PopoverClose>\n    </YStack>\n  </PopoverContent>\n</Popover>`,
    sheet: `import { Button, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle } from 'silva-ui';\n\n<Sheet open={open}>\n  <SheetOverlay data-state={open ? 'open' : 'closed'} />\n  <SheetContent side="right" data-state={open ? 'open' : 'closed'}>\n    <SheetHeader>\n      <SheetTitle>Quick settings</SheetTitle>\n      <SheetDescription>Update your preferences.</SheetDescription>\n    </SheetHeader>\n    <SheetFooter>\n      <SheetClose onClick={closeSheet}>Close</SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>`,
    tooltip: `import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'silva-ui';\n\n<Tooltip>\n  <TooltipTrigger>\n    <Button>Hover or focus me</Button>\n  </TooltipTrigger>\n  <TooltipContent data-state={open ? 'open' : 'closed'}>\n    Helpful additional context\n  </TooltipContent>\n</Tooltip>`,
    toast: `import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, YStack } from 'silva-ui';\n\n<ToastProvider position="bottom-right">\n  <Toast variant="success">\n    <YStack gap="xs">\n      <ToastTitle>Saved</ToastTitle>\n      <ToastDescription>Your changes are ready.</ToastDescription>\n    </YStack>\n    <ToastClose color="secondary" onClick={dismissToast}>Dismiss</ToastClose>\n  </Toast>\n</ToastProvider>`,
    menu: `import { Button, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from 'silva-ui';\n\n<Menu>\n  <MenuTrigger>\n    <Button>Actions</Button>\n  </MenuTrigger>\n  <MenuContent data-state={open ? 'open' : 'closed'}>\n    <MenuLabel>Workspace</MenuLabel>\n    <MenuGroup>\n      <MenuItem onClick={openProfile}>Profile</MenuItem>\n      <MenuItem onClick={openSettings}>Settings</MenuItem>\n    </MenuGroup>\n    <MenuSeparator />\n    <MenuItem onClick={closeMenu}>Close menu</MenuItem>\n  </MenuContent>\n</Menu>`,
    'context-menu': `import { Box, ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from 'silva-ui';\n\n<ContextMenu>\n  <ContextMenuTrigger>\n    <Box onContextMenu={openContextMenu}>Right-click this region</Box>\n  </ContextMenuTrigger>\n  <ContextMenuContent data-state={open ? 'open' : 'closed'}>\n    <ContextMenuLabel>Actions</ContextMenuLabel>\n    <ContextMenuGroup>\n      <ContextMenuItem onClick={copyItem}>Copy</ContextMenuItem>\n      <ContextMenuSeparator />\n      <ContextMenuItem onClick={closeContextMenu}>Dismiss</ContextMenuItem>\n    </ContextMenuGroup>\n  </ContextMenuContent>\n</ContextMenu>`,
    accordion: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Text } from 'silva-ui';\n\n<Accordion>\n  <AccordionItem value="details">\n    <AccordionTrigger data-state={expanded ? 'open' : 'closed'} onClick={toggleExpanded}>\n      How does this work?\n    </AccordionTrigger>\n    <AccordionContent data-state={expanded ? 'open' : 'closed'}>\n      <Text>Your app controls the expanded state.</Text>\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    xgroup: `import { Button, XGroup } from 'silva-ui';\n\n<XGroup>\n  <Button variant="outline">Day</Button>\n  <Button variant="outline">Week</Button>\n  <Button variant="outline">Month</Button>\n</XGroup>`,
    separator: `import { Separator } from 'silva-ui';\n\n<Separator orientation="horizontal" />`,
    heading: `import { Heading } from 'silva-ui';\n\n<Heading level={3}>\n  A section heading\n</Heading>`,
    text: `import { Text } from 'silva-ui';\n\n<Text color="primary">Theme-aware primary text</Text>`,
    'sizable-text': `import { SizableText } from 'silva-ui';\n\n<SizableText size="lg">Large, readable text</SizableText>`,
    paragraph: `import { Paragraph } from 'silva-ui';\n\n<Paragraph color="muted">A paragraph with comfortable reading rhythm for longer copy.</Paragraph>`,
  };
  return examples[item.slug] ?? `import { ${item.name} } from 'silva-ui';\n\n<${item.name}>...</${item.name}>`;
}

function DocsPage({ item, theme }: { item: DocItem; theme: string }) {
  const [previewMode, setPreviewMode] = useState<'preview' | 'code'>('preview');
  const [previewTheme, setPreviewTheme] = useState<string>(theme);
  useEffect(() => {
    setPreviewTheme(theme);
  }, [theme, item.slug]);
  const usage = getUsageCode(item);
  const componentDoc = getComponentDoc(item);

  return (
    <YStack gap="large">
      <YStack gap="small">
        <Text fontSize="sm" color="primary" fontWeight="semibold">{item.group.toUpperCase()}</Text>
        <H1 fontSize="4xl">{item.name}</H1>
        <Paragraph color="muted" size="lg">{item.description}</Paragraph>
      </YStack>

      <Card bordered p="large" bg="card">
        <YStack gap="medium">
          <H2 fontSize="2xl">How it works</H2>
          <Paragraph>{componentDoc.explanation}</Paragraph>
          {componentDoc.anatomy && <Paragraph color="muted">{componentDoc.anatomy}</Paragraph>}
          <XStack gap="small" flexWrap="wrap">
            <Box bg="subtle" borderRadius="small" px="small" py="xs">
              <Text fontSize="sm" color="muted">Theme-aware CSS</Text>
            </Box>
            <Box bg="subtle" borderRadius="small" px="small" py="xs">
              <Text fontSize="sm" color="muted">Framework agnostic</Text>
            </Box>
            <Box bg="subtle" borderRadius="small" px="small" py="xs">
              <Text fontSize="sm" color="muted">State owned by your app</Text>
            </Box>
          </XStack>
        </YStack>
      </Card>

      <YStack gap="small">
        <H2 fontSize="xl">Interactive preview</H2>
        <PreviewCard>
          <YStack gap="medium">
            <XStack gap="small" role="tablist" aria-label="Preview display">
              <Button
                variant={previewMode === 'preview' ? 'solid' : 'outline'}
                role="tab"
                aria-selected={previewMode === 'preview'}
                onClick={() => setPreviewMode('preview')}
              >
                Preview
              </Button>
              <Button
                variant={previewMode === 'code' ? 'solid' : 'outline'}
                role="tab"
                aria-selected={previewMode === 'code'}
                onClick={() => setPreviewMode('code')}
              >
                Code
              </Button>
            </XStack>
            {previewMode === 'preview'
              ? <Demo item={item} previewTheme={previewTheme} setPreviewTheme={setPreviewTheme} />
              : <CodeBlock value={getPreviewCode(item, previewTheme)} />}
          </YStack>
        </PreviewCard>
      </YStack>

      <YStack gap="small">
        <H2 fontSize="xl">Usage</H2>
        <CodeBlock value={usage} />
      </YStack>

      <YStack gap="small">
        <H2 fontSize="xl">Props</H2>
        <Paragraph color="muted">
          Props marked with a token type use Silva UI’s theme and design scales.
          Native HTML attributes and event handlers can also be passed through to
          the rendered element where the component supports them.
        </Paragraph>
        <Box overflow="auto">
          <PropsTable props={componentDoc.props} />
        </Box>
      </YStack>

      {componentDoc.children && componentDoc.children.length > 0 && (
        <YStack gap="large">
          <YStack gap="small">
            <H2 fontSize="xl">Composition</H2>
            <Paragraph color="muted">
              This component is designed as a family. Use the parts below together;
              each child owns a focused responsibility and accepts its own props.
            </Paragraph>
          </YStack>
          {componentDoc.children.map((child) => (
            <YStack gap="small">
              <H3 fontSize="lg">{child.name}</H3>
              <Paragraph color="muted">{child.description}</Paragraph>
              <Box overflow="auto">
                <PropsTable props={child.props} />
              </Box>
            </YStack>
          ))}
        </YStack>
      )}

      <XStack gap="small" flexWrap="wrap">
        <Button variant="outline" onClick={() => { const index = allDocs.findIndex((doc) => doc.slug === item.slug); window.location.hash = `/components/${allDocs[Math.max(0, index - 1)].slug}`; }}>Previous</Button>
        <Button variant="outline" onClick={() => { const index = allDocs.findIndex((doc) => doc.slug === item.slug); window.location.hash = `/components/${allDocs[Math.min(allDocs.length - 1, index + 1)].slug}`; }}>Next</Button>
      </XStack>
    </YStack>
  );
}

function QuickStartPage() {
  return (
    <YStack gap="large">
      <YStack gap="small">
        <Text fontSize="sm" color="primary" fontWeight="semibold">GET STARTED</Text>
        <H1 fontSize="4xl">Quick start</H1>
        <Paragraph color="muted" size="lg">
          Install silva-ui, configure the CSS extraction plugin, then compose your first themed component.
        </Paragraph>
      </YStack>

      <Card bordered elevated p="large" bg="card">
        <YStack gap="medium">
          <H2 fontSize="2xl">1. Install</H2>
          <Paragraph color="muted">
            In a project using the published package, add silva-ui and its peer build dependencies:
          </Paragraph>
          <CodeBlock value="npm install silva-ui @vanilla-extract/css @vanilla-extract/sprinkles" />
          <Paragraph color="muted">
            To run this repository instead, install the dependencies from its package manifest:
          </Paragraph>
          <CodeBlock value="npm install\nnpm run dev" />
        </YStack>
      </Card>

      <Card bordered elevated p="large" bg="card">
        <YStack gap="medium">
          <H2 fontSize="2xl">2. Configure Vite</H2>
          <Paragraph color="muted">
            Add Vanilla Extract’s Vite plugin so component styles and theme variables are extracted at build time.
          </Paragraph>
          <CodeBlock value={`import { defineConfig } from 'vite';\nimport { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';\n\nexport default defineConfig({\n  plugins: [vanillaExtractPlugin()],\n});`} />
          <Paragraph color="muted">
            For Hono JSX, configure the JSX runtime in your TypeScript or Vite setup:
          </Paragraph>
          <CodeBlock value={`// tsconfig.json\n{\n  "compilerOptions": {\n    "jsx": "react-jsx",\n    "jsxImportSource": "hono/jsx"\n  }\n}`} />
        </YStack>
      </Card>

      <Card bordered elevated p="large" bg="card">
        <YStack gap="medium">
          <H2 fontSize="2xl">3. Render a themed app</H2>
          <Paragraph color="muted">
            Wrap your application with Theme and use semantic tokens such as background, card, primary, and muted.
          </Paragraph>
          <CodeBlock value={`import { render } from 'hono/jsx/dom';\nimport { Button, Card, H1, Theme, YStack } from 'silva-ui';\n\nfunction App() {\n  return (\n    <Theme name="light">\n      <YStack minHeight="screenH" bg="background" p="large">\n        <Card bg="card" p="large">\n          <H1>Welcome</H1>\n          <Button>Get started</Button>\n        </Card>\n      </YStack>\n    </Theme>\n  );\n}\n\nrender(<App />, document.getElementById('root')!);`} />
        </YStack>
      </Card>

      <Card bordered elevated p="large" bg="card">
        <YStack gap="medium">
          <H2 fontSize="2xl">4. Switch themes and use colors</H2>
          <Paragraph color="muted">
            Choose a built-in theme or nest Theme for a local color context.             Color tokens follow the Tamagui/Radix convention: the same token name
            receives a light-palette or dark-palette value from the active theme.
            Alpha scales such as blackA and whiteA are available for translucent surfaces.
          </Paragraph>
          <CodeBlock value={`<Theme name="dark">\n  <Card bg="card" p="large">\n    <Text color="blue12">Readable themed text</Text>\n    <Theme name="emerald">\n      <Button>Local emerald theme</Button>\n    </Theme>\n  </Card>\n</Theme>`} />
          <XStack gap="small" flexWrap="wrap">
            <Button variant="outline" onClick={() => { window.location.hash = '/components/themes'; }}>Explore themes</Button>
            <Button variant="outline" onClick={() => { window.location.hash = '/components/colors'; }}>Explore color tokens</Button>
          </XStack>
        </YStack>
      </Card>

      <Card bordered p="large" bg="subtle">
        <YStack gap="small">
          <H2 fontSize="xl">Useful project commands</H2>
          <CodeBlock value="npm run dev       # run the example app\nnpm run typecheck # check TypeScript\nnpm run build     # build the example app" />
          <Text color="muted" fontSize="sm">
            Component state is intentionally controlled by your app. Wire values and callbacks to the form controls, tabs, and disclosure primitives as needed.
          </Text>
        </YStack>
      </Card>
    </YStack>
  );
}

function HomePage() {
  return (
    <YStack gap="2xl">
      <Card elevated p="large" bg="card">
        <YStack gap="large">
          <Text fontSize="sm" color="primary" fontWeight="semibold">COMPONENT DOCUMENTATION</Text>
          <H1 fontSize="5xl">Build interfaces, <Text color="primary">beautifully.</Text></H1>
          <Paragraph color="muted" size="lg">A zero-runtime component library for Hono JSX with theme-aware tokens, composable primitives, and interactive examples.</Paragraph>
          <XStack gap="small" flexWrap="wrap">
            <Button variant="outline" onClick={() => { window.location.hash = '/quickstart'; }}>Get started</Button>
            <Button onClick={() => { window.location.hash = '/components/button'; }}>Explore components</Button>
            <Button variant="outline" onClick={() => { window.location.hash = '/components/themes'; }}>Explore themes</Button>
          </XStack>
        </YStack>
      </Card>

      <XStack gap="medium" flexWrap="wrap">
        {[
          ['Zero runtime', 'CSS is extracted at build time with Vanilla Extract.'],
          ['Theme aware', 'Semantic tokens and numbered color ramps adapt to light and dark themes.'],
          ['Composable', 'Small primitives can be combined into the patterns your product needs.'],
        ].map(([title, description]) => (
          <Card bordered elevated p="medium" bg="card" style={{ flex: '1 1 220px' }}>
            <YStack gap="small"><H3 fontSize="lg">{title}</H3><Paragraph color="muted">{description}</Paragraph></YStack>
          </Card>
        ))}
      </XStack>

      <YStack gap="medium">
        <H2 fontSize="2xl">Browse the library</H2>
        {docGroups.map((group) => (
          <Card bordered p="medium" bg="card">
            <YStack gap="small">
              <H3 fontSize="lg">{group.name}</H3>
              <XStack gap="xs" flexWrap="wrap">
                {group.items.map((item) => (
                  <Anchor
                    href={`#/components/${item.slug}`}
                    bg="subtle"
                    borderWidth={1}
                    borderStyle="solid"
                    borderColor="border"
                    borderRadius="small"
                    px="small"
                    py="xs"
                    fontSize="sm"
                  >
                    {item.name}
                  </Anchor>
                ))}
              </XStack>
            </YStack>
          </Card>
        ))}
      </YStack>

    </YStack>
  );
}

export function App() {
  const [route, setRoute] = useState(window.location.hash.replace(/^#/, '') || '/');
  const [currentTheme, setCurrentTheme] = useState<string>('light');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const requestedSlug = route.startsWith('/components/') ? route.slice('/components/'.length) : '';
  const activeSlug = routeAliases[requestedSlug] ?? requestedSlug;
  const activeItem = allDocs.find((item) => item.slug === activeSlug);

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash.replace(/^#/, '') || '/');
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  const nav = (
    <YStack gap="medium">
      <Anchor href="#/" onClick={() => setMobileNavOpen(false)}><Text fontWeight="semibold">Home</Text></Anchor>
      <Anchor
        href="#/quickstart"
        onClick={() => setMobileNavOpen(false)}
        color={route === '/quickstart' ? 'primary' : 'secondary'}
      >
        <Text fontWeight="semibold">Get started</Text>
      </Anchor>
      {docGroups.map((group) => (
        <YStack gap="xs">
          <Text fontSize="xs" fontWeight="semibold" color="muted">{group.name.toUpperCase()}</Text>
          {group.items.map((item) => (
            <Anchor
              href={`#/components/${item.slug}`}
              onClick={() => setMobileNavOpen(false)}
              color={activeItem?.slug === item.slug ? 'primary' : 'secondary'}
            >
              <Text fontSize="sm">{item.name}</Text>
            </Anchor>
          ))}
        </YStack>
      ))}
    </YStack>
  );

  return (
    <Theme name={currentTheme}>
      <YStack minHeight="screenH" bg="background" color="secondary">
        <Box bg="card" borderBottomWidth={1} borderStyle="solid" borderColor="border" px="medium" py="small" style={{ position: 'sticky', top: 0, zIndex: 40 }}>
          <XStack alignItems="center" justifyContent="space-between" gap="medium">
            <XStack alignItems="center" gap="small">
              <Button
                variant="ghost"
                aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
              >
                {mobileNavOpen ? '✕' : '☰'}
              </Button>
              <Anchor href="#/" onClick={() => setRoute('/')}><H3 fontSize="lg" color="secondary">silva-ui</H3></Anchor>
              <Text fontSize="sm" color="muted">Docs</Text>
            </XStack>
            <XStack alignItems="center" gap="small">
              <Text fontSize="sm" color="muted">Theme</Text>
              <Box style={{ width: '150px', flexShrink: 0 }}>
                <Select value={currentTheme} onChange={(event: any) => setCurrentTheme(event.target.value)}>
                  {themes.map((name) => <option value={name}>{name}</option>)}
                </Select>
              </Box>
            </XStack>
          </XStack>
        </Box>

        {mobileNavOpen && (
          <>
            <Box
              aria-hidden="true"
              onClick={() => setMobileNavOpen(false)}
              style={{ position: 'fixed', zIndex: 1190, top: '57px', right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
            />
            <Box
              role="navigation"
              aria-label="Documentation"
              p="medium"
              bg="card"
              borderRightWidth={1}
              borderStyle="solid"
              borderColor="border"
              style={{ position: 'fixed', zIndex: 1200, top: '57px', bottom: 0, left: 0, width: 'min(280px, 85vw)', overflowY: 'auto', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)' }}
            >
              {nav}
            </Box>
          </>
        )}
        <XStack flexGrow={1} alignItems="stretch">
          <Box flexGrow={1} p="large" style={{ minWidth: 0, flex: '1 1 320px' }}>
            <Box mx="auto" style={{ width: '100%', maxWidth: '960px' }}>
              {activeItem
                ? <DocsPage item={activeItem} theme={currentTheme} />
                : route === '/quickstart'
                  ? <QuickStartPage />
                : route === '/' || route === '/home'
                  ? <HomePage />
                  : <YStack gap="medium"><H1>Page not found</H1><Paragraph color="muted">Choose a component from the navigation.</Paragraph><Anchor href="#/"><Button>Return home</Button></Anchor></YStack>}
            </Box>
          </Box>
        </XStack>
      </YStack>
    </Theme>
  );
}
