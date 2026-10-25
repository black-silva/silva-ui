import { radixDarkColors, radixLightColors } from './radix';

type Shade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColorScaleName =
  | 'amber'
  | 'blue'
  | 'bronze'
  | 'brown'
  | 'crimson'
  | 'cyan'
  | 'gold'
  | 'grass'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'mauve'
  | 'mint'
  | 'olive'
  | 'orange'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'red'
  | 'sage'
  | 'sand'
  | 'sky'
  | 'slate'
  | 'teal'
  | 'tomato'
  | 'violet'
  | 'yellow'
  | 'blackA'
  | 'whiteA';
export type ColorTokenName = `${ColorScaleName}${Shade}`;

export const colorTokens = radixLightColors as Record<ColorTokenName, string>;
export const darkColorTokens = {
  ...radixLightColors,
  ...radixDarkColors,
} as Record<ColorTokenName, string>;

function createColorScales(tokens: Record<string, string>) {
  const orderedScales = Object.entries(tokens).reduce<
    Record<string, Array<{ shade: number; value: string }>>
  >((scales, [tokenName, value]) => {
    const match = tokenName.match(/^(.+?)(A)?(12|11|10|[1-9])$/);
    if (!match) return scales;

    const scaleName = match[1] + (match[2] ?? '');
    (scales[scaleName] ??= []).push({ shade: Number(match[3]), value });
    return scales;
  }, {});

  return Object.fromEntries(
    Object.entries(orderedScales).map(([scaleName, values]) => [
      scaleName,
      values.sort((a, b) => a.shade - b.shade).map(({ value }) => value),
    ]),
  ) as Record<string, string[]>;
}

export const colorScales = createColorScales(colorTokens);
export const darkColorScales = createColorScales(darkColorTokens);

export const colorTokenContract = Object.fromEntries(
  Object.keys(colorTokens).map((name) => [name, '']),
) as Record<ColorTokenName, ''>;
