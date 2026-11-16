import { createTheme } from '@vanilla-extract/css';
import { themeColors } from '../src/core/theme.css';
import { lightColors } from '../src/core/themes';

export const brand = createTheme(themeColors, { ...lightColors, primary: 'rgb(1, 2, 3)', background: 'rgb(4, 5, 6)' });
export const tuple = createTheme({ custom: 'rgb(7, 8, 9)' });
