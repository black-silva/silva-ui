import { createTheme } from '../src/core/create-theme';
import { Theme, createThemeScope, themeColors } from '../src/index';

const brandClass = createTheme(themeColors, {} as { [K in keyof typeof themeColors]: string });
const tupleTheme = createTheme({ custom: 'red' });
const BrandTheme = createThemeScope({ brand: brandClass, custom: tupleTheme });
const OtherTheme = createThemeScope({ another: brandClass });

declare const condition: boolean;
// @ts-expect-error Conditional spreads do not guarantee that the custom name exists.
createThemeScope({ stable: brandClass, ...(condition ? { maybe: brandClass } : {}) });
// @ts-expect-error Explicit optional keys are not guaranteed to exist either.
createThemeScope({} as { optional?: string });
const RequiredTheme = createThemeScope({ stable: brandClass, required: brandClass });

const examples = [
  <Theme name="midnight_surface2" />,
  <Theme name="red" />,
  <Theme name="light-rebeccapurple" />,
  <Theme name="dark-blue" />,
  <BrandTheme name="brand" />,
  <BrandTheme name="custom" />,
  <BrandTheme name="dark-red" />,
  <RequiredTheme name="required" />,
  // @ts-expect-error Unknown names are not accepted by Theme.
  <Theme name="brand" />,
  // @ts-expect-error Shade tokens are not theme names.
  <Theme name="red5" />,
  // @ts-expect-error Legacy class strings remain outside the strict Theme name type.
  <Theme name="theme_legacy" />,
  // @ts-expect-error A dynamic class string is not a theme name.
  <BrandTheme name={brandClass} />,
  // @ts-expect-error Custom names are scoped to their own factory.
  <OtherTheme name="brand" />,
];
void examples;
