export type ThemeRecord = Record<string, string>;
export type ThemeMutation = {
  name: string;
  theme: Partial<ThemeRecord>;
};

const customThemes = new Map<string, ThemeRecord>();

function normalizeTheme(theme: Partial<ThemeRecord>): ThemeRecord {
  return Object.fromEntries(
    Object.entries(theme).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  );
}

export function addTheme({ name, theme }: ThemeMutation): ThemeRecord {
  if (customThemes.has(name)) {
    throw new Error(`Theme "${name}" already exists`);
  }
  const next = normalizeTheme(theme);
  customThemes.set(name, next);
  return next;
}

export function updateTheme({ name, theme }: ThemeMutation): ThemeRecord {
  const current = customThemes.get(name);
  if (!current) {
    throw new Error(`Theme "${name}" does not exist`);
  }
  const next = { ...current, ...normalizeTheme(theme) };
  customThemes.set(name, next);
  return next;
}

export function replaceTheme({ name, theme }: ThemeMutation): ThemeRecord {
  if (!customThemes.has(name)) {
    throw new Error(`Theme "${name}" does not exist`);
  }
  const next = normalizeTheme(theme);
  customThemes.set(name, next);
  return next;
}

export function getTheme(name: string): ThemeRecord | undefined {
  const theme = customThemes.get(name);
  return theme ? { ...theme } : undefined;
}

export function getThemes(): Record<string, ThemeRecord> {
  return Object.fromEntries(
    [...customThemes.entries()].map(([name, theme]) => [name, { ...theme }]),
  );
}
