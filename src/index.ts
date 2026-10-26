// silva-ui — zero-runtime CSS component library
// Built on @vanilla-extract/css + @vanilla-extract/sprinkles

// ============================================================================
// Core, Tokens & Theming
// ============================================================================
export { sprinkles, tokens } from './core/sprinkles.css';
export type { Sprinkles } from './core/sprinkles.css';
export { cls, splitSprinklesProps, toSprinklesClass } from './core/utils';
export type { BaseProps, ComponentSize } from './core/types';
export { colorScales, darkColorScales, colorTokens, darkColorTokens } from './core/colors';
export type { ColorTokenName } from './core/colors';

export {
  themeColors,
  lightTheme,
  darkTheme,
  emeraldTheme,
  emeraldDarkTheme,
  midnightTheme,
  themes,
  lightColors,
  darkColors,
  emeraldColors,
  emeraldDarkColors,
  midnightColors,
  themeDefinitions,
  TAMAGUI_EMERALD_PREVIEW_URL,
} from './core/theme.css';
export type { ThemeName } from './core/theme.css';
export {
  applyThemeTemplate,
  buildThemeSet,
  createThemes,
} from './core/theme-builder';
export type {
  CreateThemesOptions,
  CreatedThemes,
  SimpleThemeDefinition,
  ThemePalette,
  ThemeTemplate,
  ThemeValues,
} from './core/theme-builder';

export {
  addTheme,
  getTheme,
  getThemes,
  replaceTheme,
  updateTheme,
} from './core/theme/index';
export type { ThemeMutation, ThemeRecord } from './core/theme/index';

export { Theme } from './core/Theme';
export type { ThemeProps } from './core/Theme';

// ============================================================================
// Layout
// ============================================================================
export { Box } from './layout/Box';
export type { BoxProps } from './layout/Box';

export { YStack } from './layout/YStack';
export type { YStackProps } from './layout/YStack';

export { XStack } from './layout/XStack';
export type { XStackProps } from './layout/XStack';

export { XGroup } from './layout/XGroup';
export type { XGroupProps } from './layout/XGroup';

export { Separator } from './layout/Separator';
export type { SeparatorProps } from './layout/Separator';

// ============================================================================
// Typography
// ============================================================================
export { Text } from './typography/Text';
export type { TextProps } from './typography/Text';

export { SizableText } from './typography/SizableText';
export type { SizableTextProps } from './typography/SizableText';

export { Paragraph } from './typography/Paragraph';
export type { ParagraphProps } from './typography/Paragraph';

export { Heading } from './typography/Heading';
export type { HeadingProps } from './typography/Heading';

export { H1, H2, H3, H4, H5, H6 } from './typography/Headings';

export { Anchor } from './typography/Anchor';
export type { AnchorProps } from './typography/Anchor';

// ============================================================================
// Forms
// ============================================================================
export { Button } from './forms/Button';
export type { ButtonProps } from './forms/Button';

export { Input } from './forms/Input';
export type { InputProps } from './forms/Input';

export { TextArea } from './forms/TextArea';
export type { TextAreaProps } from './forms/TextArea';

export { Label } from './forms/Label';
export type { LabelProps } from './forms/Label';

export { Form } from './forms/Form';
export type { FormProps } from './forms/Form';

export { Field, FieldError, FieldHelper } from './forms/Field';
export type { FieldProps } from './forms/Field';

export { Checkbox } from './forms/Checkbox';
export type { CheckboxProps } from './forms/Checkbox';

export { RadioGroup, RadioGroupItem } from './forms/RadioGroup';
export type { RadioGroupProps, RadioGroupItemProps } from './forms/RadioGroup';

export { Select } from './forms/Select';
export type { SelectProps } from './forms/Select';

export { Slider } from './forms/Slider';
export type { SliderProps } from './forms/Slider';

export { Switch } from './forms/Switch';
export type { SwitchProps } from './forms/Switch';

export { ToggleGroup, ToggleGroupItem } from './forms/ToggleGroup';
export type { ToggleGroupProps, ToggleGroupItemProps } from './forms/ToggleGroup';

export { Progress } from './forms/Progress';
export type { ProgressProps } from './forms/Progress';

// ============================================================================
// Display & Media
// ============================================================================
export { Avatar, AvatarImage, AvatarFallback } from './display/Avatar';
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from './display/Avatar';

export { Card, CardHeader, CardFooter } from './display/Card';
export type { CardProps } from './display/Card';

export { Image } from './display/Image';
export type { ImageProps } from './display/Image';

export { ListItem } from './display/ListItem';
export type { ListItemProps } from './display/ListItem';

export { Spinner } from './display/Spinner';
export type { SpinnerProps } from './display/Spinner';

export { Loader } from './display/Loader';
export type { LoaderProps } from './display/Loader';

// ============================================================================
// Overlays & Compound Elements
// ============================================================================
export { Tabs, TabList, Tab, TabPanel } from './overlays/Tabs';
export type { TabsProps, TabListProps, TabProps, TabPanelProps } from './overlays/Tabs';

export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './overlays/Dialog';
export type {
  DialogProps,
  DialogOverlayProps,
  DialogContentProps,
} from './overlays/Dialog';

export {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './overlays/AlertDialog';
export type {
  AlertDialogProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
} from './overlays/AlertDialog';

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from './overlays/Popover';
export type {
  PopoverProps,
  PopoverContentProps,
} from './overlays/Popover';

export {
  Sheet,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './overlays/Sheet';
export type {
  SheetProps,
  SheetOverlayProps,
  SheetContentProps,
} from './overlays/Sheet';

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './overlays/Tooltip';
export type {
  TooltipProps,
  TooltipContentProps,
} from './overlays/Tooltip';

export {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './overlays/Toast';
export type {
  ToastProviderProps,
  ToastProps,
} from './overlays/Toast';

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuGroup,
} from './overlays/Menu';
export type {
  MenuProps,
  MenuContentProps,
  MenuItemProps,
} from './overlays/Menu';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuGroup,
} from './overlays/ContextMenu';
export type {
  ContextMenuProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
} from './overlays/ContextMenu';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './overlays/Accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './overlays/Accordion';
