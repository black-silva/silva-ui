import { expect, test } from '@playwright/test';

const previews = [
  'display-1', 'display-2', 'display-3', 'display-4',
  'forms-1', 'forms-2', 'forms-3', 'forms-4', 'forms-5', 'forms-6', 'forms-7', 'forms-8',
  'layout-1', 'layout-2', 'layout-3', 'layout-4',
  'typography-1', 'typography-2', 'typography-3',
  'sprinkles-1', 'sprinkles-2', 'sprinkles-3',
  'gradient-1', 'gradient-2', 'gradient-3', 'gradient-4',
  'visuals-1', 'visuals-2', 'visuals-3', 'theming-1', 'theming-2',
  'overlay-1', 'overlay-2', 'overlay-3', 'overlay-4', 'overlay-5',
  'overlay-6', 'overlay-7', 'overlay-8', 'overlay-9', 'overlay-10',
  'intro-1', 'install-2',
];

test.describe('preview smoke audit', () => {
  for (const example of previews) {
    test(`${example} mounts without page errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`?example=${example}`);
      await expect(page.locator('#root > *').first()).toBeAttached();
      expect(errors).toEqual([]);
    });
  }
});

test.describe('interactive preview audit', () => {
  test('dialog opens and closes', async ({ page }) => {
    await page.goto('?example=overlay-1');
    await page.getByRole('button', { name: 'Open dialog' }).click();
    await expect(page.getByText('Delete project?')).toBeVisible();
    await page.getByText('Cancel').click();
    await expect(page.getByText('Delete project?')).toHaveCount(0);
  });

  test('tabs switch panels', async ({ page }) => {
    await page.goto('?example=overlay-2');
    await page.getByText('Security', { exact: true }).click();
    await expect(page.getByText('Security content')).toBeVisible();
    await expect(page.getByText('Profile content')).toBeHidden();
  });

  test('alert can be dismissed', async ({ page }) => {
    await page.goto('?example=overlay-3');
    await page.getByRole('button', { name: 'Discard changes' }).click();
    await expect(page.getByText('Discard changes?')).toBeVisible();
    await page.getByText('Keep editing').click();
    await expect(page.getByText('Discard changes?')).toHaveCount(0);
  });

  test('sheet opens and closes', async ({ page }) => {
    await page.goto('?example=overlay-5');
    await page.getByRole('button', { name: 'Open sheet' }).click();
    await expect(page.getByText('Project settings')).toBeVisible();
    await page.getByText('Done').click();
    await expect(page.getByText('Project settings')).toHaveCount(0);
  });

  for (const overlay of [
    { example: 'overlay-1', button: 'Open dialog', role: 'dialog' as const },
    { example: 'overlay-3', button: 'Discard changes', role: 'alertdialog' as const },
    { example: 'overlay-5', button: 'Open sheet', role: 'dialog' as const },
  ]) {
    test(`${overlay.example} has an opaque, bounded panel that its backdrop dismisses`, async ({ page }) => {
      await page.goto(`?example=${overlay.example}`);
      await page.getByRole('button', { name: overlay.button }).click();
      const panel = page.getByRole(overlay.role);
      await expect(panel).toBeVisible();
      await expect(panel).toHaveCSS('opacity', '1');
      await expect(panel).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      const bounds = await panel.boundingBox();
      expect(bounds?.width).toBeLessThan(page.viewportSize()!.width);
      await page.mouse.click(8, 8);
      await expect(panel).toHaveCount(0);
    });
  }

  test('toast appears and closes', async ({ page }) => {
    await page.goto('?example=overlay-7');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Changes saved')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText('Changes saved')).toBeHidden();
  });

  test('accordion toggles its content', async ({ page }) => {
    await page.goto('?example=overlay-10');
    await page.getByText('When does my order ship?').click();
    await expect(page.getByText('Orders leave our warehouse')).toBeVisible();
  });
});
