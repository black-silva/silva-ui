import {
  Box,
  Button,
  Card,
  CardHeader,
  H1,
  H2,
  H3,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  Theme,
  XStack,
  YStack,
} from 'silva-ui';

export type Page = 'dashboard' | 'components';

const navItems: Array<{ href: string; label: string; page: Page }> = [
  { href: '/', label: 'Dashboard', page: 'dashboard' },
  { href: '/components', label: 'Components', page: 'components' },
];

function Navigation({ page }: { page: Page }) {
  return (
    <XStack as="nav" aria-label="Main navigation" gap="small" alignItems="center">
      {navItems.map((item) => (
        <Box
          as="a"
          href={item.href}
          aria-current={page === item.page ? 'page' : undefined}
          px="medium"
          py="small"
          borderRadius="medium"
          backgroundColor={page === item.page ? 'subtle' : 'transparent'}
          color={page === item.page ? 'primary' : 'muted'}
          fontWeight="semibold"
          textDecoration="none"
        >
          {item.label}
        </Box>
      ))}
    </XStack>
  );
}

function MobileSheet() {
  return (
    <Box>
      <Button data-sheet-open="navigation" variant="outline" aria-controls="navigation-sheet" aria-expanded="false">
        Menu
      </Button>
      <Sheet id="navigation-sheet" data-sheet="navigation" open={false} aria-hidden="true">
        <SheetOverlay data-sheet-close="navigation" data-state="closed" aria-label="Close navigation" />
        <SheetContent side="right" data-state="closed" aria-labelledby="navigation-sheet-title">
          <SheetHeader>
            <XStack alignItems="center" justifyContent="space-between">
              <SheetTitle id="navigation-sheet-title">Navigate</SheetTitle>
              <SheetClose data-sheet-close="navigation" />
            </XStack>
            <SheetDescription>Server-rendered first, then enhanced in the browser.</SheetDescription>
          </SheetHeader>
          <YStack as="nav" gap="small" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Box as="a" href={item.href} px="medium" py="small" borderRadius="medium" backgroundColor="subtle" color="secondary">
                {item.label}
              </Box>
            ))}
          </YStack>
        </SheetContent>
      </Sheet>
    </Box>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <Card p="medium" backgroundColor="card" animation="slideUp">
      <YStack gap="xs">
        <Text as="span" fontSize="3xl" fontWeight="bold">{value}</Text>
        <Text as="span" fontSize="sm" color="muted">{label}</Text>
      </YStack>
    </Card>
  );
}

function Dashboard() {
  return (
    <YStack gap="xl">
      <YStack gap="small" animation="slideUp">
        <Text as="span" color="primary" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" fontSize="xs">Silva UI test app</Text>
        <H1 color="aurora">A server-rendered dashboard</H1>
        <Text as="p" color="muted" lineHeight="relaxed">Two routes, small client controllers, and no app-written CSS. The page is useful before JavaScript arrives.</Text>
      </YStack>

      <XStack gap="medium" flexWrap="wrap">
        <Box flexGrow={1} minWidth={48}><Metric value="24" label="Reusable primitives" /></Box>
        <Box flexGrow={1} minWidth={48}><Metric value="2" label="Hydrated controls" /></Box>
        <Box flexGrow={1} minWidth={48}><Metric value="0" label="Raw CSS files" /></Box>
      </XStack>

      <Card p="large" backgroundColor="midnight" animation="fadeIn">
        <YStack gap="small">
          <Text as="span" color="primaryContrast" fontWeight="bold">Gradient background</Text>
          <H2 color="primaryContrast">A visual primitive, not a one-off.</H2>
          <Text as="p" color="primaryContrast" opacity={75}>Named gradients work through the same backgroundColor and color props as theme colours.</Text>
        </YStack>
      </Card>

      <Card p="large">
        <CardHeader>
          <YStack gap="xs">
            <H2 fontSize="2xl">Progressive tabs</H2>
            <Text as="p" color="muted">The first panel is already visible in the HTML. Hydration only changes attributes.</Text>
          </YStack>
        </CardHeader>
        <Tabs data-tabs="overview" value="overview">
          <TabList aria-label="Dashboard views">
            <Tab id="overview-tab" value="overview" data-active="true" aria-controls="overview-panel">Overview</Tab>
            <Tab id="activity-tab" value="activity" aria-controls="activity-panel">Activity</Tab>
            <Tab id="notes-tab" value="notes" aria-controls="notes-panel">Notes</Tab>
          </TabList>
          <TabPanel id="overview-panel" value="overview" aria-labelledby="overview-tab">
            <YStack gap="medium" p="medium">
              <H3 fontSize="xl">Ready for interaction</H3>
              <Text as="p" color="muted">This markup is complete on the server. The client script gives keyboard and click interactions to the existing nodes.</Text>
            </YStack>
          </TabPanel>
          <TabPanel id="activity-panel" value="activity" aria-labelledby="activity-tab" hidden>
            <YStack gap="medium" p="medium">
              <H3 fontSize="xl">Tiny client footprint</H3>
              <Text as="p" color="muted">No component tree is re-rendered. The controller updates data-active, aria-selected, hidden, and focus.</Text>
            </YStack>
          </TabPanel>
          <TabPanel id="notes-panel" value="notes" aria-labelledby="notes-tab" hidden>
            <YStack gap="medium" p="medium">
              <H3 fontSize="xl">Accessible by default</H3>
              <Text as="p" color="muted">Native links still navigate and the first tab remains readable if scripts are blocked.</Text>
            </YStack>
          </TabPanel>
        </Tabs>
      </Card>
    </YStack>
  );
}

function Components() {
  return (
    <YStack gap="xl">
      <YStack gap="small" animation="slideUp">
        <Text as="span" color="primary" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" fontSize="xs">Visual API test</Text>
        <H1>Gradients and motion</H1>
        <Text as="p" color="muted" lineHeight="relaxed">The examples below run through Silva UI props, so this page is both a demo and an integration check.</Text>
      </YStack>

      <XStack gap="medium" flexWrap="wrap">
        {(['aurora', 'sunrise', 'ocean', 'forest'] as const).map((gradient) => (
          <Box flexGrow={1} minWidth={48}>
            <Card p="large" backgroundColor={gradient} animation="slideUp">
              <YStack gap="small">
                <Text as="span" color="primaryContrast" fontWeight="bold" textTransform="capitalize">{gradient}</Text>
                <Text as="span" color="primaryContrast" opacity={75}>backgroundColor=&quot;{gradient}&quot;</Text>
              </YStack>
            </Card>
          </Box>
        ))}
      </XStack>

      <Card p="large">
        <YStack gap="medium">
          <H2 color="ocean">Gradient text is built in</H2>
          <Text as="p" color="muted">Use color=&quot;ocean&quot; for a clipped text gradient or animation=&quot;pulse&quot; for a reusable motion token.</Text>
          <Box width="fit" animation="pulse">
            <Button>Animated native button</Button>
          </Box>
        </YStack>
      </Card>
    </YStack>
  );
}

export function App({ page }: { page: Page }) {
  const content = page === 'dashboard' ? <Dashboard /> : <Components />;
  const title = page === 'dashboard' ? 'Silva UI hydration template' : 'Silva UI component tests';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A multi-page, progressively hydrated Silva UI example." />
        <link rel="stylesheet" href="/silva-ui.css" />
        <title>{title}</title>
        <script type="module" src="/assets/client.js"></script>
      </head>
      <body>
        <Theme name="dark" as="main" minHeight="screenH" backgroundColor="background" color="secondary" p="large">
          <YStack gap="xl" maxWidth={64} mx="auto">
            <XStack as="header" alignItems="center" justifyContent="space-between" gap="medium" flexWrap="wrap">
              <Box as="a" href="/" textDecoration="none" color="secondary"><H2 fontSize="xl">silva-ui</H2></Box>
              <Navigation page={page} />
              <MobileSheet />
            </XStack>
            {content}
            <Box as="footer" pt="large" pb="small" borderWidth={1} borderStyle="solid" borderColor="border">
              <Text as="span" color="muted" fontSize="sm">SSR first. Browser controllers second. Silva UI throughout.</Text>
            </Box>
          </YStack>
        </Theme>
      </body>
    </html>
  );
}
