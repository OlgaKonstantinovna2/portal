export function clickOutside(node: HTMLElement, handler: () => void) {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // Don't trigger if clicking on portal dropdown
    if (target && target.closest && target.closest('.portal-dropdown')) {
      return;
    }

    if (!node.contains(target)) {
      handler();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
