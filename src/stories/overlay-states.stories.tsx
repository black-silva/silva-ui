import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle, Button, ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger, Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle, Text, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, XStack, YStack } from '../index';
import { renderStory } from './render';

export default { title: 'Components/Overlays/States' };

export const AlertDialogOpen = () => renderStory(<AlertDialog open><AlertDialogOverlay /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>);

export const SheetOpen = () => renderStory(<Sheet open><SheetOverlay /><SheetContent side="right"><SheetHeader><SheetTitle>Project settings</SheetTitle><SheetDescription>Manage project preferences.</SheetDescription></SheetHeader><Text>Settings content goes here.</Text><SheetFooter><SheetClose>Close</SheetClose></SheetFooter></SheetContent></Sheet>);

export const ToastVariants = () => renderStory(<ToastProvider position="top-right"><YStack gap="small"><Toast variant="success"><ToastTitle>Published</ToastTitle><ToastDescription>Your changes are live.</ToastDescription><ToastClose /></Toast><Toast variant="warning"><ToastTitle>Draft saved</ToastTitle><ToastDescription>Remember to publish when ready.</ToastDescription><ToastClose /></Toast><Toast variant="error"><ToastTitle>Upload failed</ToastTitle><ToastDescription>Try again in a moment.</ToastDescription><ToastClose /></Toast></YStack></ToastProvider>);

export const MenuOpen = () => renderStory(<Menu><MenuTrigger><Button variant="outline">Open menu</Button></MenuTrigger><MenuContent data-state="open"><MenuLabel>Project</MenuLabel><MenuGroup><MenuItem>Rename</MenuItem><MenuItem>Duplicate</MenuItem><MenuSeparator /><MenuItem disabled>Archive</MenuItem></MenuGroup></MenuContent></Menu>);

export const ContextMenuOpen = () => renderStory(<ContextMenu><ContextMenuTrigger><Button variant="outline">Right-click target</Button></ContextMenuTrigger><ContextMenuContent data-state="open"><ContextMenuLabel>Canvas</ContextMenuLabel><ContextMenuGroup><ContextMenuItem>Paste</ContextMenuItem><ContextMenuItem>Select all</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem disabled>Delete</ContextMenuItem></ContextMenuGroup></ContextMenuContent></ContextMenu>);

export const OverlayComposition = () => renderStory(<XStack gap="small"><Button>Trigger</Button><Text color="muted">Overlay primitives expose their state through markup so app code owns interactions.</Text></XStack>);
