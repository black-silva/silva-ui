function activateTab(root: HTMLElement, value: string, focus = false) {
  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));

  tabs.forEach((tab) => {
    const active = tab.dataset.value === value;
    tab.dataset.active = String(active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });

  panels.forEach((panel) => {
    panel.hidden = panel.dataset.value !== value;
  });
  root.dataset.value = value;
}

function enhanceTabs(root: HTMLElement) {
  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]'));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(root, tab.dataset.value ?? ''));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0
        : event.key === 'End' ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      activateTab(root, tabs[next].dataset.value ?? '', true);
    });
  });
}

function setSheetState(root: HTMLElement, isOpen: boolean) {
  const state = isOpen ? 'open' : 'closed';
  root.dataset.state = state;
  root.setAttribute('aria-hidden', String(!isOpen));
  root.querySelectorAll<HTMLElement>('[data-state]').forEach((element) => {
    element.dataset.state = state;
  });
  document.querySelectorAll<HTMLElement>(`[data-sheet-open="${root.dataset.sheet}"]`).forEach((trigger) => {
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  if (isOpen) root.querySelector<HTMLElement>('[data-sheet-close]')?.focus();
}

function enhanceSheet(root: HTMLElement) {
  const name = root.dataset.sheet;
  document.querySelectorAll<HTMLElement>(`[data-sheet-open="${name}"]`).forEach((trigger) => {
    trigger.addEventListener('click', () => setSheetState(root, true));
  });
  root.querySelectorAll<HTMLElement>('[data-sheet-close]').forEach((closer) => {
    closer.addEventListener('click', () => setSheetState(root, false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.dataset.state === 'open') setSheetState(root, false);
  });
}

export function enhancePage() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach(enhanceTabs);
  document.querySelectorAll<HTMLElement>('[data-sheet]').forEach(enhanceSheet);
}
