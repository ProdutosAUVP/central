import { useEffect, useState, RefObject } from "react";

/**
 * Detects whether the element (or any ancestor) has the `.dark` class.
 * Useful for portal'd content (popovers, sheets) that escapes the local
 * dark-mode container in ComponentShowcase.
 */
export function useIsDark(ref: RefObject<HTMLElement>) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setIsDark(!!el.closest(".dark"));
    check();
    const observer = new MutationObserver(check);
    let node: HTMLElement | null = el;
    while (node) {
      observer.observe(node, { attributes: true, attributeFilter: ["class"] });
      node = node.parentElement;
    }
    return () => observer.disconnect();
  }, [ref]);

  return isDark;
}
