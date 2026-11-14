// Compile with --ignoreConfig after build:package to resolve the package's
// exported declarations rather than the source alias in tsconfig.json.
import { Theme, createThemeScope } from 'silva-ui';
import type { CSSNamedColor, ThemeName, ThemeProps } from 'silva-ui';

type Assert<T extends true> = T;
type AllColors = Assert<Exclude<CSSNamedColor | `light-${CSSNamedColor}` | `dark-${CSSNamedColor}`, ThemeName> extends never ? true : false>;
type NotString = Assert<string extends ThemeName ? false : true>;
const named: ThemeName = 'dark-rebeccapurple';
const accent: ThemeProps['accentColor'] = 'aliceblue';
Theme({ name: named, accentColor: accent });
const Brand = createThemeScope({ brand: 'theme_class', Alphabetic: 'another_class' });
Brand({ name: 'brand' });
Brand({ name: 'Alphabetic' });
Brand({ name: 'red' });
// @ts-expect-error Not a built-in or CSS named color.
Theme({ name: 'brand' });
// @ts-expect-error Other scopes' custom names are unavailable.
Brand({ name: 'other' });
// @ts-expect-error Built-in names are reserved.
createThemeScope({ dark: 'class' });
// @ts-expect-error Named colors are reserved.
createThemeScope({ red: 'class' });
// @ts-expect-error Prefixed names are reserved.
createThemeScope({ 'dark-blue': 'class' });
// @ts-expect-error Shade collisions are reserved even for removed shade numbers.
createThemeScope({ 'light-red11': 'class' });
// @ts-expect-error Widened records cannot prove their keys are safe.
createThemeScope({} as Record<string, string>);
declare const condition: boolean;
// @ts-expect-error A conditional spread does not guarantee the key is registered.
createThemeScope({ brand: 'theme_class', ...(condition ? { maybe: 'other_class' } : {}) });
// @ts-expect-error Optional keys do not guarantee the key is registered.
createThemeScope({} as { maybe?: string });
// @ts-expect-error Legacy runtime class strings are not statically valid names.
Theme({ name: 'theme_legacy' });
void [named, accent];
