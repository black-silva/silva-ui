export type ThemeValues = Record<string, string>;
export type ThemePalette = readonly string[];
export type ThemeTemplate = Record<string, number>;

export type SimpleThemeDefinition = {
  palette?: string;
  template?: string;
  values?: ThemeValues;
};

export type CreateThemesOptions = {
  palettes: Record<string, ThemePalette>;
  templates: Record<string, ThemeTemplate>;
  base: {
    palette: string;
    template: string;
    values?: ThemeValues;
  };
  accent?: {
    palette: string;
    template?: string;
    values?: ThemeValues;
  };
  childrenThemes?: Record<string, SimpleThemeDefinition>;
  grandChildrenThemes?: Record<string, SimpleThemeDefinition>;
};

export type CreatedThemes = Record<string, ThemeValues>;

function resolvePaletteValue(palette: ThemePalette, index: number) {
  const resolvedIndex = index < 0 ? palette.length + index : index - 1;
  return palette[Math.max(0, Math.min(palette.length - 1, resolvedIndex))] ?? '';
}

export function applyThemeTemplate(
  palette: ThemePalette,
  template: ThemeTemplate,
  values: ThemeValues = {},
): ThemeValues {
  return Object.fromEntries(
    Object.entries(template).map(([name, index]) => [
      name,
      values[name] ?? resolvePaletteValue(palette, index),
    ]),
  );
}

function createThemeValues(
  palette: ThemePalette,
  template: ThemeTemplate,
  values?: ThemeValues,
) {
  return {
    ...applyThemeTemplate(palette, template, values),
    ...values,
  };
}

/**
 * Creates Tamagui-style theme names from palettes, templates, and child
 * definitions without coupling the theme model to a rendering framework.
 */
export function createThemes(options: CreateThemesOptions): CreatedThemes {
  const {
    palettes,
    templates,
    base,
    accent,
    childrenThemes = {},
    grandChildrenThemes = {},
  } = options;
  const themes: CreatedThemes = {};

  const addTheme = (
    name: string,
    definition: {
      palette: string;
      template: string;
      values?: ThemeValues;
    },
  ) => {
    const palette = palettes[definition.palette];
    const template = templates[definition.template];
    if (!palette) throw new Error(`Unknown theme palette "${definition.palette}"`);
    if (!template) throw new Error(`Unknown theme template "${definition.template}"`);
    themes[name] = createThemeValues(palette, template, definition.values);
  };

  addTheme('base', {
    palette: base.palette,
    template: base.template,
    values: base.values,
  });

  if (accent) {
    addTheme('accent', {
      palette: accent.palette,
      template: accent.template ?? base.template,
      values: accent.values,
    });
  }

  for (const [name, definition] of Object.entries(childrenThemes)) {
    addTheme(name, {
      palette: definition.palette ?? base.palette,
      template: definition.template ?? base.template,
      values: definition.values,
    });
  }

  for (const [parentName, parentValues] of Object.entries(themes)) {
    for (const [name, definition] of Object.entries(grandChildrenThemes)) {
      const childName = `${parentName}_${name}`;
      addTheme(childName, {
        palette: definition.palette ?? (parentName === 'accent' ? accent?.palette ?? base.palette : base.palette),
        template: definition.template ?? base.template,
        values: { ...parentValues, ...definition.values },
      });
    }
  }

  return themes;
}

export function buildThemeSet<
  Values extends Record<string, string>,
  Definitions extends Record<string, Partial<Values>>,
>(
  createThemeClass: (values: Values) => string,
  sharedTokens: Values,
  definitions: Definitions,
): { [Name in keyof Definitions]: string } {
  return Object.fromEntries(
    Object.entries(definitions).map(([name, values]) => [
      name,
      createThemeClass({ ...sharedTokens, ...values }),
    ]),
  ) as { [Name in keyof Definitions]: string };
}
