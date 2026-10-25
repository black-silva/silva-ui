import { globalStyle } from '@vanilla-extract/css';
import { tokens } from 'silva-ui';

globalStyle('html', {
  scrollbarColor: `${tokens.colors.border} ${tokens.colors.subtle}`,
  scrollbarWidth: 'thin',
});

globalStyle('html::-webkit-scrollbar', {
  width: '12px',
  height: '12px',
});

globalStyle('html::-webkit-scrollbar-track', {
  backgroundColor: tokens.colors.subtle,
});

globalStyle('html::-webkit-scrollbar-thumb', {
  backgroundColor: tokens.colors.border,
  border: `3px solid ${tokens.colors.subtle}`,
  borderRadius: '999px',
});

globalStyle('html::-webkit-scrollbar-thumb:hover', {
  backgroundColor: tokens.colors.primary,
});
