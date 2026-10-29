# silva-ui Component Library

[![Publish to npm](https://github.com/black-silva/silva-ui/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/black-silva/silva-ui/actions/workflows/publish-npm.yml)

[![Bundle size](https://badgen.net/bundlephobia/min/silva-ui)](https://bundlephobia.com/package/silva-ui)
[![Minified + gzipped size](https://badgen.net/bundlephobia/minzip/silva-ui)](https://bundlephobia.com/package/silva-ui)
[![TypeScript](https://badgen.net/badge/built%20with/TypeScript/blue)](https://www.typescriptlang.org/)
[![License](https://badgen.net/badge/license/MIT/green)](./LICENSE)

A Hono JSX UI component library with framework-neutral styling and Tamagui-inspired theming, built on `@vanilla-extract/css` and `@vanilla-extract/sprinkles`.

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

## Colors and themes

Theme styling is generated at build time with Vanilla Extract. `Theme` scopes the
selected theme to a subtree, so nested themes override their parent without
runtime style injection:

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

Color ramps are exported as `colorScales` and are also registered as sprinkles
color tokens. They follow the Tamagui/Radix convention: the same numbered token
has a light-palette value in light themes and a dark-palette value in dark
themes. The referenced `colors` source provides 28 hue ramps plus `blackA` and
`whiteA`, each with 12 numbered stops.

For example, `color="blue12"` is dark on light themes and light on dark themes;
`bg="blue6"` adapts with the rest of the ramp. Use tokens such as `bg="blue6"`,
`color="gray11"`, `borderColor="teal4"`, or alpha tokens such as
`backgroundColor="blackA4"`. Semantic names such as `background`, `card`,
`primary`, `muted`, and `border` also adapt to the active theme and are
preferred when a semantic role is clearer than a specific hue.

Built-in themes are `light`, `dark`, `emerald`, `emerald-dark`, and `midnight`.
Their semantic values are defined in `src/core/themes`; the token contract and
CSS variables are in `src/core/theme`; `src/core/theme-builder` combines theme
definitions with the palette tokens. To add a theme, add a complete semantic
color map to `themeDefinitions` in `src/core/themes` and register dark variants
in `darkThemeNames` there so their ramps reverse. The theme class and
`data-theme` selector are generated from those maps. Add a switcher control in
`example/App.tsx` if you want it available in the demo. Theme classes and CSS
variables are emitted at build time.

`Theme` can be nested to switch a subtree back to any built-in theme. For inline styles, use the exported contract values such as
`themeColors.background` or `themeColors.blue6`; Vanilla Extract can then keep
the variable names consistent through production builds.

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
custom theme. Pass a supported color scale directly to `Theme`, or prefix it
with `light-` or `dark-`:

```tsx
<Theme name="red">
  <Button>Light red theme</Button>
</Theme>

<Theme name="dark-blue">
  <Button>Dark blue theme</Button>
</Theme>
```

These names are resolved from the existing color ramps at runtime and scoped
to that `Theme` subtree. Built-in names such as `dark`, `emerald`, and
`midnight` continue to use their precompiled theme classes. Supported palette
names are the exported color scales, including `red`, `blue`, `green`,
`purple`, and the other Radix scales.
