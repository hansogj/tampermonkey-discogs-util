import { useEffect } from 'react';
import {
  CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
  DEFAULT_HIGHLIGHTED_LABELS,
  LABEL_QUALITY_COLORS,
  LabelQuality,
} from '../constants';
import type { HighlightedLabels } from '../types';

function buildLabelMap(customLabels: HighlightedLabels): Map<string, LabelQuality> {
  const map = new Map<string, LabelQuality>();
  for (const quality in customLabels) {
    for (const label of customLabels[quality as LabelQuality]) {
      map.set(label.toLowerCase(), quality as LabelQuality);
    }
  }
  return map;
}

// Exported for testing. Pass a list of elements to process only those; omit to process all label links.
export const highlightLabels = (elements?: HTMLElement[]) => {
  const customLabels: HighlightedLabels = GM_getValue(
    CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
    DEFAULT_HIGHLIGHTED_LABELS,
  );
  const labelMap = buildLabelMap(customLabels);

  const targets =
    elements ?? (Array.from(document.querySelectorAll('a[href*="/label/"]')) as HTMLElement[]);

  targets.forEach((labelElement) => {
    const labelName = labelElement.textContent?.trim().toLowerCase() || '';
    const foundQuality = labelMap.get(labelName);

    if (foundQuality) {
      const color = LABEL_QUALITY_COLORS[foundQuality];
      labelElement.style.backgroundColor = color;
      labelElement.style.color =
        foundQuality === 'good' || foundQuality === 'fair' ? 'black' : 'white';
      labelElement.style.padding = '2px 4px';
      labelElement.style.borderRadius = '3px';
      labelElement.style.boxShadow = '2px 2px 2px #aaaaaa';
    } else {
      labelElement.style.backgroundColor = '';
      labelElement.style.color = '';
      labelElement.style.padding = '';
      labelElement.style.borderRadius = '';
      labelElement.style.boxShadow = '';
    }
  });
};

export function LabelHighlighter() {
  useEffect(() => {
    // Initial run — highlight everything already in the DOM
    highlightLabels();

    // On subsequent mutations, only process newly added nodes instead of
    // re-scanning the entire document. This avoids main-thread stalls when
    // the MUI DataGrid adds/removes many rows during scroll or filtering.
    const observer = new MutationObserver((mutations) => {
      const newLinks: HTMLElement[] = [];
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          const el = node as Element;
          if (el.matches('a[href*="/label/"]')) {
            newLinks.push(el as HTMLElement);
          }
          el.querySelectorAll('a[href*="/label/"]').forEach((link) => {
            newLinks.push(link as HTMLElement);
          });
        }
      }
      if (newLinks.length > 0) {
        highlightLabels(newLinks);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll('a[href*="/label/"]').forEach((link) => {
        const labelElement = link as HTMLElement;
        labelElement.style.backgroundColor = '';
        labelElement.style.color = '';
        labelElement.style.padding = '';
        labelElement.style.borderRadius = '';
      });
    };
  }, []);

  return null;
}
