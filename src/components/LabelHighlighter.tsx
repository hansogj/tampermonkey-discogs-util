import { useEffect } from 'react';
import {
  CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
  DEFAULT_HIGHLIGHTED_LABELS,
  LABEL_QUALITY_COLORS,
  LabelQuality,
} from '../constants';
import type { HighlightedLabels } from '../types';

export const highlightLabels = () => {
  // Exported for testing
  const customLabels: HighlightedLabels = GM_getValue(
    CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
    DEFAULT_HIGHLIGHTED_LABELS,
  );
  const allLinks = document.querySelectorAll('a[href*="/label/"]');

  allLinks.forEach((link) => {
    const labelElement = link as HTMLElement;
    const labelName = labelElement.textContent?.trim() || '';

    // Reset styles first
    labelElement.style.backgroundColor = '';
    labelElement.style.color = '';
    labelElement.style.padding = ''; // for styling
    labelElement.style.borderRadius = ''; // for styling
    labelElement.style.boxShadow = ''; // for styling

    let foundQuality: LabelQuality | undefined;
    for (const quality in customLabels) {
      if (
        customLabels[quality as LabelQuality].some(
          (l: string) => l.toLowerCase() === labelName.toLowerCase(),
        )
      ) {
        foundQuality = quality as LabelQuality;
        break;
      }
    }

    if (foundQuality) {
      const color = LABEL_QUALITY_COLORS[foundQuality];
      labelElement.style.backgroundColor = color;
      if (foundQuality === 'good' || foundQuality === 'fair') {
        labelElement.style.color = 'black';
      } else {
        labelElement.style.color = 'white';
      }
      labelElement.style.padding = '2px 4px';
      labelElement.style.borderRadius = '3px';
      labelElement.style.boxShadow = '2px 2px 2px #aaaaaa'; // subtle shadow
    }
  });
};

export function LabelHighlighter() {
  useEffect(() => {
    // Initial run
    highlightLabels();
    // Observe the whole body for changes
    const observer = new MutationObserver(highlightLabels);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // Cleanup styles
      document.querySelectorAll('a[href*="/label/"]').forEach((link) => {
        const labelElement = link as HTMLElement;
        labelElement.style.backgroundColor = '';
        labelElement.style.color = '';
        labelElement.style.padding = '';
        labelElement.style.borderRadius = '';
      });
    };
  }, []); // Empty dependency array means it runs once on mount and cleans up on unmount.

  return null; // This component does not render anything
}
