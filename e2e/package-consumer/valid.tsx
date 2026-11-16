import * as silva from 'silva-ui';
import { Button, sprinkles, type ButtonProps, type ThemeName, type ProjectionToken } from 'silva-ui';
import 'silva-ui/style.css';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assert<T extends true> = T;
type NotAny<T> = IsAny<T> extends false ? true : false;
type AnyValueExports = { [K in keyof typeof silva]: IsAny<(typeof silva)[K]> extends true ? K : never }[keyof typeof silva];
type AllValuesTyped = Assert<[AnyValueExports] extends [never] ? true : false>;
type ButtonType = Assert<NotAny<typeof Button>>;
type SprinklesType = Assert<NotAny<typeof sprinkles>>;
type ButtonPropsType = Assert<NotAny<ButtonProps>>;
type ThemeType = Assert<NotAny<ThemeName>>;
type ProjectionType = Assert<NotAny<ProjectionToken>>;

const props: ButtonProps = { size: 'md', variant: 'solid' };
const button = <Button size="md" variant="outline">Click</Button>;
const classes: string = sprinkles({ display: 'flex' });
const theme: ThemeName = 'dark-red';
// @ts-expect-error ButtonProps must not accept arbitrary primitive values.
const badProps: ButtonProps = 123;
// @ts-expect-error Invalid size must be rejected.
const badSize = <Button size="not-a-size" />;
// @ts-expect-error Invalid variant must be rejected.
const badVariant = <Button variant="not-a-variant" />;
// @ts-expect-error sprinkles must be a function rather than any.
const badSprinkles: symbol = sprinkles;
void [props, button, classes, theme, badProps, badSize, badVariant, badSprinkles];
