<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/silva-ui-logo-dark.svg">
    <img src="docs/assets/silva-ui-logo-light.svg" alt="Silva UI" width="360">
  </picture>
</p>

# silva-ui Component Library

[![Publish to npm](https://github.com/black-silva/silva-ui/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/black-silva/silva-ui/actions/workflows/publish-npm.yml)
[![Bundle size](https://deno.bundlejs.com/badge?q=silva-ui)](https://bundlejs.com/?q=silva-ui)
[![TypeScript](https://badgen.net/badge/built%20with/TypeScript/blue)](https://www.typescriptlang.org/)
[![License](https://badgen.net/badge/license/MIT/green)](./LICENSE)
[![Reddit](https://img.shields.io/badge/Reddit-black__silva-FF4500?logo=reddit&logoColor=white)](https://www.reddit.com/user/black_silva/)
[![GitHub](https://img.shields.io/badge/GitHub-black--silva-181717?logo=github&logoColor=white)](https://github.com/black-silva)
[![Discord](https://img.shields.io/badge/Discord-blacksilva-5865F2?logo=discord&logoColor=white)](https://discord.gg/KjkmHYpSec)
[![Patreon](https://img.shields.io/badge/Patreon-BlackSilva-000000?logo=patreon&logoColor=white)](https://www.patreon.com/c/BlackSilva)

A Hono JSX UI component library with framework-neutral styling and Tamagui-inspired theming, built on `@vanilla-extract/css` and `@vanilla-extract/sprinkles`.

Read the [Silva UI documentation](https://blacksilva.com/silva-ui) for installation, theming, foundations, components, and API guidance.

Try the [palette playground](https://black-silva.github.io/silva-ui-palette-playground/) to explore named colours, shades, themes, and gradients. It is a deployed snapshot of this palette branch; see the [playground README](./examples/palette-playground/README.md) to run it locally.

AI tools can use the [full Silva UI reference](https://blacksilva.com/silva-ui/llms-full.txt) for the complete published documentation in one file.

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for
development setup, validation commands, and pull request expectations.

---

## Component Inventory

### 1. Core Layout Primitives
- [`Box`](./src/layout/Box.tsx) — Foundation primitive with polymorphic `as` prop
- [`YStack`](./src/layout/YStack.tsx) — Vertical flex column container
- [`XStack`](./src/layout/XStack.tsx) — Horizontal flex row container
- [`XGroup`](./src/layout/XGroup.tsx) — Connected horizontal item grouping (collapsing adjacent borders)
- [`Separator`](./src/layout/Separator.tsx) — Horizontal or vertical dividing rule (`orientation="horizontal" | "vertical"`)

### 2. Typography
- [`Text`](./src/typography/Text.tsx) — Base inline/block text primitive with `as` prop
- [`SizableText`](./src/typography/SizableText.tsx) — Text with size scale (`xs`, `sm`, `md`, `lg`, `xl`) coordinating `fontSize` + `lineHeight`
- [`Paragraph`](./src/typography/Paragraph.tsx) — `<p>` wrapper with margin/spacing defaults
- [`Heading`](./src/typography/Heading.tsx) — Dynamic heading primitive (`level={1 | 2 | 3 | 4 | 5 | 6}`)
- [`H1`–`H6`](./src/typography/Headings.tsx) — Semantic heading shorthand components
- [`Anchor`](./src/typography/Anchor.tsx) — Styled accessible link (`<a>`) with focus ring and disabled states

### 3. Forms & Inputs
- [`Button`](./src/forms/Button.tsx) — Buttons with `size` (`xs`–`xl`) and `variant` (`solid`, `outline`, `ghost`, `link`)
- [`Input`](./src/forms/Input.tsx) — Styled text inputs with size variants (`sm`, `md`, `lg`)
- [`TextArea`](./src/forms/TextArea.tsx) — Multi-line text inputs with auto-resize support
- [`Label`](./src/forms/Label.tsx) — Accessible form labels with optional `required` asterisk indicator
- [`Form`](./src/forms/Form.tsx) — Flex column `<form>` wrapper
- [`Field`](./src/forms/Field.tsx), [`FieldError`](./src/forms/Field.tsx), [`FieldHelper`](./src/forms/Field.tsx) — Form field composition wrappers

### 4. Advanced Form Controls
- [`Checkbox`](./src/forms/Checkbox.tsx) — Custom-styled checkbox with checkmark SVG and native input
- [`RadioGroup`](./src/forms/RadioGroup.tsx), [`RadioGroupItem`](./src/forms/RadioGroup.tsx) — Accessible radio button group with circular dot indicator
- [`Select`](./src/forms/Select.tsx) — Styled native select with custom chevron indicator
- [`Slider`](./src/forms/Slider.tsx) — Range slider with styled track and thumb pseudo-elements
- [`Switch`](./src/forms/Switch.tsx) — Smooth toggle switch with pill track and sliding thumb
- [`ToggleGroup`](./src/forms/ToggleGroup.tsx), [`ToggleGroupItem`](./src/forms/ToggleGroup.tsx) — Single or multi-selection toggle button group
- [`Progress`](./src/forms/Progress.tsx) — Accessible progress bar (`role="progressbar"`)

### 5. Media & Display
- [`Avatar`](./src/display/Avatar.tsx), [`AvatarImage`](./src/display/Avatar.tsx), [`AvatarFallback`](./src/display/Avatar.tsx) — User avatar circle with image and initials fallback
- [`Card`](./src/display/Card.tsx), [`CardHeader`](./src/display/Card.tsx), [`CardFooter`](./src/display/Card.tsx) — Structured content container with `bordered` and `elevated` options
- [`Image`](./src/display/Image.tsx) — Lazy-loading `<img>` primitive with sprinkles sizing & objectFit
- [`ListItem`](./src/display/ListItem.tsx) — Structured list item with `title`, `subTitle`, `icon`, and optional `pressable` hover state
- [`Spinner`](./src/display/Spinner.tsx) — Keyframe-animated loading circle (`role="status"`)
- [`Loader`](./src/display/Loader.tsx) — Theme-aware horizontal indeterminate loader with size variants (`role="status"`)

### 6. Overlays & Compound Elements (Zero-Runtime, Stateless)
- [`Tabs`](./src/overlays/Tabs.tsx), [`TabList`](./src/overlays/Tabs.tsx), [`Tab`](./src/overlays/Tabs.tsx), [`TabPanel`](./src/overlays/Tabs.tsx) — Composable tabs controlled via `data-active` & `hidden`
- [`Dialog`](./src/overlays/Dialog.tsx) family (`Overlay`, `Content`, `Header`, `Footer`, `Title`, `Description`, `Close`)
- [`AlertDialog`](./src/overlays/AlertDialog.tsx) family (`Overlay`, `Content`, `Header`, `Footer`, `Title`, `Description`, `Action`, `Cancel`)
- [`Popover`](./src/overlays/Popover.tsx) family (`Trigger`, `Content` with `side="top"|"bottom"|"left"|"right"`, `Close`)
- [`Sheet`](./src/overlays/Sheet.tsx) family — Slide-over drawer with side positioning (`side="bottom"|"top"|"left"|"right"`)
- [`Tooltip`](./src/overlays/Tooltip.tsx) family (`Trigger`, `Content` with `side="top"|"bottom"|"left"|"right"`)
- [`ToastProvider`](./src/overlays/Toast.tsx), [`Toast`](./src/overlays/Toast.tsx) family (`Title`, `Description`, `Close`) with variant borders (`success`, `error`, `warning`)
- [`Menu`](./src/overlays/Menu.tsx) family (`Trigger`, `Content`, `Item`, `Separator`, `Label`, `Group`)
- [`ContextMenu`](./src/overlays/ContextMenu.tsx) family — Fixed positioning at coordinates via CSS custom properties
- [`Accordion`](./src/overlays/Accordion.tsx) family (`Item`, `Trigger` with rotating chevron, `Content`)


---

## Quick Example in Hono JSX

```tsx
import 'silva-ui/style.css';
import {
  YStack,
  XStack,
  H1,
  Paragraph,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Field,
  Label,
  Input,
  Checkbox,
  Switch,
  Badge,
} from 'silva-ui';

export function SignupCard() {
  return (
    <Card elevated p="large" maxWidth={400} bg="background">
      <CardHeader>
        <H1 fontSize="2xl">Create Account</H1>
        <Paragraph color="muted" size="sm">
          Enter your details below to get started.
        </Paragraph>
      </CardHeader>

      <YStack gap="medium" my="medium">
        <Field>
          <Label htmlFor="email" required>Email address</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </Field>

        <XStack alignItems="center" justifyContent="space-between">
          <Checkbox id="terms">I agree to terms</Checkbox>
          <Switch size="sm" />
        </XStack>
      </YStack>

      <CardFooter>
        <Button variant="solid" w="full">Sign Up</Button>
      </CardFooter>
    </Card>
  );
}
```

The published package includes prebuilt CSS. Import `silva-ui/style.css` once
from your application entry point.

Choose one sizing approach consistently wherever the relevant props support it.
Mixing named fixed tokens, numeric size tokens, and viewport-projected `$n`
tokens in a layout can cause breakages across browsers and screen sizes. For
apps designed to scale with screen width, prefer `$n` on supported props and
test across target screens. Component `size` variants are separate fixed recipes.
See the [sizing guide](https://blacksilva.com/silva-ui/docs/foundations/sprinkles#choose-a-sizing-approach).

## Colors and themes

Theme styling is generated at build time with Vanilla Extract. `Theme` scopes the
selected theme to a subtree, so nested themes override their parent:

```tsx
import { Box, Text, Theme } from 'silva-ui';

<Theme name="dark">
  <Box bg="card" p="large">
    <Text color="secondary">Semantic tokens follow the active theme.</Text>
    <Theme name="emerald">
      <Box bg="teal6" color="white" p="medium">
        A nested light emerald theme.
      </Box>
    </Theme>
  </Box>
</Theme>;
```

The palette provides typed scales for 148 CSS named colours, each with stops
`1`–`10`. A stop mixes the literal named colour with the theme base in linear
sRGB: `blue6` uses 60% blue, while `blue10` uses 100% blue. Built-in light
scopes use a white base and dark scopes use black; these colours do not preserve
the old Radix ramps. `colorScales` and `darkColorScales` lazily provide
ten-element arrays (index 0 is stop 1); `colorTokens` and `darkColorTokens`
lazily provide mix strings, with `blue` as an alias for `blue1`. These
accessors are not enumerable catalogues: spreading them or using `Object.keys`
does not yield the palette. No runtime named-colour catalogue is exported.

Named colours are resolved on demand by component `color`, `backgroundColor`,
`bg`, and `borderColor` props, including their state conditions. Direct
`sprinkles()` accepts semantic colour tokens, not named palette tokens;
`themeColors` and `tokens.colors` now contain semantic keys only. For a CSS
value outside component props, use `namedColorTokenToCss('blue6')` or
`colorTokens.blue6` instead of `themeColors.blue6`.

Use tokens such as `bg="blue6"` or `borderColor="teal4"` when a hue is
intentional. Semantic names such as `background`, `card`, `primary`, `muted`,
and `border` remain theme-aware and are preferred when the UI role is clearer.
`<Theme name="light" accentColor="rebeccapurple">` changes semantic accent
values such as `primary` and `ring`, but `blue6` still uses blue, not the accent.
`accentColor` accepts CSS named colours and selects a black or white contrast
input. Built-in semantic values use these inputs; fixed values in a custom
semantic class do not. Check text, focus and component contrast in every theme
rather than assuming a stop is accessible.

**Breaking migration:** numbered stops `11` and `12` and the predefined Radix
ramps are removed; the named-token resolver throws for invalid numbered shades.
`createThemes` and `applyThemeTemplate` now throw for zero, non-integer or
out-of-range palette indices instead of clamping them. Choose semantic tokens
for text and surfaces, or deliberately select and contrast-test a new stop or
explicit colour for each use. Old Radix-only names and alpha ramps
such as `grass` and `blackA4` have no automatic equivalent; audit and replace
them explicitly, using a custom theme or explicit colour where required. See
the [migration guide](docs/theming.mdx#palette-migration) for details and
browser compatibility.

Built-in base themes are `light`, `dark`, `emerald`, `emerald-dark`, and
`midnight`; each also has `surface1` and `surface2` variants such as
`dark_surface1`. The exported `ThemeName` type accepts these names, CSS named
colours, and `light-${CSSNamedColor}` / `dark-${CSSNamedColor}`; it does not
accept shade tokens such as `red5`, arbitrary strings, or generated class names.
This is a TypeScript breaking change: replace `name={darkTheme}` with
`name="dark"`, and apply other classes explicitly with `class` or use a custom
scope below. For JavaScript compatibility, legacy `name={classString}` values
whose string starts with `theme_` remain supported at runtime; this exception
does not make arbitrary class strings valid `ThemeName` values in TypeScript.

Their semantic values are defined in `src/core/themes`; the token contract and
CSS variables are in `src/core/theme`. Theme classes and `data-theme` selectors
are emitted at build time; switching `Theme` in the browser changes the active
scope. For application-specific semantic colours, see the
[custom theme guide](docs/theming.mdx#custom-themes-with-createtheme).

`Theme` can be nested to switch a subtree back to any built-in theme. For inline styles, use the exported contract values such as
`themeColors.background`; Vanilla Extract can then keep semantic variable names
consistent through production builds.

Silva UI follows Tamagui's palette/template model. The exported `createThemes` helper composes named palettes and
templates into theme records, and built-in themes include generated surface
variants such as `dark_surface1` and `light_surface2`:

```tsx
import { Card, Theme } from 'silva-ui';

<Theme name="dark">
  <Card bg="card">Base dark theme</Card>
  <Theme name="dark_surface1">
    <Card bg="card">A nested surface theme</Card>
  </Theme>
</Theme>;
```

Palette themes can also be selected without registering or prebuilding a
custom theme. Pass an unnumbered CSS named colour to `Theme`, or prefix it
with `light-` or `dark-`:

```tsx
<Theme name="red">
  <Button>Light red theme</Button>
</Theme>

<Theme name="dark-blue">
  <Button>Dark blue theme</Button>
</Theme>
```

These names are resolved on demand and scoped to that `Theme` subtree.
`CSSNamedColor` is a TypeScript-only union, not a runtime catalogue. JavaScript
and untrusted strings are not fully validated: runtime parsing does not verify
that an alphabetic name is a real CSS colour, so invalid names may generate
invalid CSS. Validate untrusted names against your own allowlist. Built-in
names such as `dark`, `emerald`, and `midnight` continue to use their
precompiled theme classes.

### Custom theme scopes

Create a Vanilla Extract class using Silva UI's semantic contract in a
`*.css.ts` file:

```ts
import { createTheme } from '@vanilla-extract/css';
import { lightColors, themeColors } from 'silva-ui';

export const brandTheme = createTheme(themeColors, {
  ...lightColors,
  primary: '#7c3aed',
  primaryHover: '#6d28d9',
  primaryActive: '#5b21b6',
  primaryContrast: '#ffffff',
  ring: '#7c3aed',
});
```

Bind it to a literal key in a locally typed component:

```tsx
import { Box, Text, createThemeScope } from 'silva-ui';
import { brandTheme } from './brand-theme.css';

const AppTheme = createThemeScope({
  brand: { className: brandTheme, mode: 'light' },
});

<AppTheme name="brand">
  <Box bg="card" color="primary"><Text>Brand theme</Text></Box>
</AppTheme>;
```

`AppTheme` accepts built-in and CSS-colour `ThemeName` values plus its own map's
literal keys; `Theme` and other scopes do not gain `brand`. Runtime theme
creation cannot mutate global TypeScript types. Scoped keys must not collide
with built-in names, CSS named colours or shades. `mode: 'light'` sets the
named-shade base to white; `mode: 'dark'` sets it to black. Omitting mode
inherits the surrounding base. You can instead apply the class explicitly to a
wrapper inside a suitable built-in `Theme`. The class itself supplies semantic
values, not the named-shade base.

`accentColor` sets the scope's `--silva-theme-color` and
`--silva-theme-contrast` inputs; it does not replace fixed semantic values in
the class. For example, the fixed `primary`, `primaryHover`, `primaryActive`,
`primaryContrast`, and `ring` above stay fixed even if `AppTheme` receives an
`accentColor`. To make a value respond, define it using the relevant accent or
contrast variable, or retain the corresponding variable-based `lightColors`
value instead of overriding it. `mode` controls the base and contrast
calculation, not whether fixed values respond.

`createThemes` generates plain value records, while the separate mutable theme
registry stores records. Neither creates or applies a CSS class or registers a
name/type. Pass a complete semantic record to Vanilla Extract's `createTheme`
and then apply the resulting class explicitly or bind it with `createThemeScope`.
