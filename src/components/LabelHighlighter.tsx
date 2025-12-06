import { useEffect } from 'react';
import { DEFAULT_HIGHLIGHTED_LABELS, LabelQuality } from '../constants';

const LABEL_QUALITY_COLORS: Record<LabelQuality, string> = {
    poor: '#8B0000',      // Dark Red
    fair: '#FF6347',      // Tomato/Light Red
    good: '#90EE90',      // Light Green
    veryGood: '#228B22',  // Forest Green/Dark Green
};

export function LabelHighlighter() {
    useEffect(() => {
        const highlightLabels = () => {
            const allLinks = document.querySelectorAll('a[href*="/label/"]');

            allLinks.forEach(link => {
                const labelElement = link as HTMLElement;
                const labelName = labelElement.textContent?.trim() || '';

                // Reset styles first
                labelElement.style.backgroundColor = '';
                labelElement.style.color = '';
                labelElement.style.padding = ''; // for styling
                labelElement.style.borderRadius = ''; // for styling

                let foundQuality: LabelQuality | undefined;
                for (const quality in DEFAULT_HIGHLIGHTED_LABELS) {
                    if (DEFAULT_HIGHLIGHTED_LABELS[quality as LabelQuality].some(l => l.toLowerCase() === labelName.toLowerCase())) {
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
                }
            });
        };

        // Initial run
        highlightLabels();

        // Observe the whole body for changes
        const observer = new MutationObserver(highlightLabels);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            // Cleanup styles
            document.querySelectorAll('a[href*="/label/"]').forEach(link => {
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
