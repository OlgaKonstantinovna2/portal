// Portal utility for rendering dropdowns outside of their containers
export class Portal {
  private container: HTMLElement | null = null;

  constructor(id: string = 'dropdown-portal') {
    // Only create container in browser
    if (typeof document !== 'undefined') {
      this.createContainer(id);
    }
  }

  private createContainer(id: string) {
    // Check if portal already exists
    this.container = document.getElementById(id) as HTMLElement;

    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = id;
      this.container.style.position = 'fixed';
      this.container.style.top = '0';
      this.container.style.left = '0';
      this.container.style.width = '100%';
      this.container.style.height = '0';
      this.container.style.pointerEvents = 'none';
      this.container.style.zIndex = '9999';
      document.body.appendChild(this.container);
    }
  }

  mount(element: HTMLElement) {
    if (this.container && typeof document !== 'undefined') {
      this.container.appendChild(element);
      this.container.style.pointerEvents = 'auto';
    }
  }

  unmount(element: HTMLElement) {
    if (this.container && this.container.contains(element)) {
      this.container.removeChild(element);
      // If no more elements, disable pointer events
      if (this.container.children.length === 0) {
        this.container.style.pointerEvents = 'none';
      }
      // Force cleanup of any remaining empty elements
      this.cleanup();
    }
  }

  cleanup() {
    if (this.container) {
      // Remove any empty or hidden elements
      const children = Array.from(this.container.children);
      children.forEach(child => {
        if (child instanceof HTMLElement) {
          if (!child.children.length || child.style.display === 'none') {
            this.container?.removeChild(child);
          }
        }
      });
    }
  }

  destroy() {
    if (this.container && this.container.parentNode && typeof document !== 'undefined') {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }
}

// Global portal instance - only create in browser
let dropdownPortal: Portal | null = null;

export function getDropdownPortal(): Portal {
  if (!dropdownPortal && typeof document !== 'undefined') {
    dropdownPortal = new Portal();
  }
  return dropdownPortal!;
}
