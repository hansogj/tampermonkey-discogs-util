import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act, waitFor } from "@testing-library/react"; // Keep act for MO test
import React from "react";
import { LabelHighlighter } from "./LabelHighlighter";
import {
  DEFAULT_HIGHLIGHTED_LABELS,
  CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
  LABEL_QUALITY_COLORS,
  LabelQuality,
} from "../constants";
import type { HighlightedLabels } from "../types";
import { hexToRgb } from "../test/utils"; // Import the helper

// Mock Tampermonkey globals
global.GM_getValue = vi.fn();

// Mock MutationObserver methods
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

// Mock MutationObserver as a constructor function that returns mock instances
const MockMutationObserver = vi.fn(function (
  this: any,
  callback: MutationCallback
) {
  this.observe = mockObserve;
  this.disconnect = mockDisconnect;
  // Store callback if needed for direct triggering by tests
  this.callback = callback;
});
global.MutationObserver =
  MockMutationObserver as unknown as typeof MutationObserver;

describe("LabelHighlighter", () => {
  let mockLabelLink: HTMLElement;

  const createMockLabelLink = (
    labelName: string,
    href: string = "/label/Some-Label"
  ): HTMLElement => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = labelName;
    return a;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = ""; // Clean up DOM for each test
    (global.GM_getValue as vi.Mock).mockReturnValue(DEFAULT_HIGHLIGHTED_LABELS); // Default: no custom labels
    mockObserve.mockClear(); // Clear observe history
    mockDisconnect.mockClear(); // Clear disconnect history
    MockMutationObserver.mockClear(); // Clear constructor history
    vi.useFakeTimers(); // Start fake timers
  });

  afterEach(() => {
    vi.runOnlyPendingTimers(); // Clear any remaining timers
    vi.useRealTimers(); // Restore real timers
  });

  it("diagnostic: element reference is same", () => {
    const originalElement = document.createElement("a");
    originalElement.href = "/label/test";
    originalElement.textContent = "Test Label";
    document.body.appendChild(originalElement);

    const foundElements = document.querySelectorAll('a[href*="/label/"]');
    expect(foundElements.length).toBe(1);
    const foundElement = foundElements[0] as HTMLElement;

    expect(foundElement).toBe(originalElement); // This must pass
    foundElement.style.backgroundColor = "red";
    expect(originalElement.style.backgroundColor).toBe("red"); // This must pass
  });

  it("should initialize MutationObserver and observe document.body", () => {
    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Trigger useEffect
    expect(MockMutationObserver).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledWith(document.body, {
      childList: true,
      subtree: true,
    });
  });

  it("should disconnect MutationObserver on unmount", () => {
    const { unmount } = render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Trigger useEffect
    unmount();
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });

  it("should use DEFAULT_HIGHLIGHTED_LABELS if no custom labels are stored", () => {
    // Removed async
    const labelName = DEFAULT_HIGHLIGHTED_LABELS.poor[0]; // e.g., 'Abkco'
    mockLabelLink = createMockLabelLink(labelName);
    document.body.appendChild(mockLabelLink);

    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(global.GM_getValue).toHaveBeenCalledWith(
      CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
      DEFAULT_HIGHLIGHTED_LABELS
    );
    expect(mockLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.poor)
    );
    expect(mockLabelLink.style.color).toBe("white");
    expect(mockLabelLink.style.padding).toBe("2px 4px");
    expect(mockLabelLink.style.borderRadius).toBe("3px");
  });

  it("should use custom highlighted labels if they are stored", () => {
    // Removed async
    const customLabels: HighlightedLabels = {
      ...DEFAULT_HIGHLIGHTED_LABELS,
      good: ["My Custom Good Label"],
    };
    (global.GM_getValue as vi.Mock).mockReturnValue(customLabels);

    mockLabelLink = createMockLabelLink("My Custom Good Label");
    document.body.appendChild(mockLabelLink);

    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(global.GM_getValue).toHaveBeenCalledWith(
      CUSTOM_HIGHLIGHTED_LABELS_STORAGE_KEY,
      DEFAULT_HIGHLIGHTED_LABELS
    ); // Default argument
    expect(mockLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.good)
    );
    expect(mockLabelLink.style.color).toBe("black"); // Good labels should have black text
  });

  it('should correctly apply styles for "poor" quality', () => {
    // Removed async
    const labelName = DEFAULT_HIGHLIGHTED_LABELS.poor[0];
    mockLabelLink = createMockLabelLink(labelName);
    document.body.appendChild(mockLabelLink);

    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(mockLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.poor)
    );
    expect(mockLabelLink.style.color).toBe("white");
  });

  it('should correctly apply styles for "fair" quality', () => {
    // Removed async
    const labelName = DEFAULT_HIGHLIGHTED_LABELS.fair[0];
    mockLabelLink = createMockLabelLink(labelName);
    document.body.appendChild(mockLabelLink);

    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(mockLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.fair)
    );
    expect(mockLabelLink.style.color).toBe("black");
  });

  it('should correctly apply styles for "good" quality', () => {
    // Removed async
    const labelName = DEFAULT_HIGHLIGHTED_LABELS.good[0];
    mockLabelLink = createMockLabelLink(labelName);
    document.body.appendChild(mockLabelLink);

    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(mockLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.good)
    );
    expect(mockLabelLink.style.color).toBe("black");
  });

  it('should correctly apply styles for "veryGood" quality', () => {
    // Removed async
    const labelName = DEFAULT_HIGHLIGHTED_LABELS.veryGood[0];
    mockLabelLink = createMockLabelLink(labelName);
    document.body.appendChild(mockLabelLink);
    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(mockLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.veryGood)
    );
    expect(mockLabelLink.style.color).toBe("white");
  });

  it("should re-highlight labels when MutationObserver triggers", async () => {
    // Keep async for act
    // Prepare initial DOM
    const initialLabelLink = createMockLabelLink(
      DEFAULT_HIGHLIGHTED_LABELS.good[0]
    );
    document.body.appendChild(initialLabelLink);

    // Initial render and highlight
    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(MockMutationObserver).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledWith(document.body, {
      childList: true,
      subtree: true,
    });

    // Simulate a DOM change - new label is added
    const newLabelName = "New Label";
    const newLabelLink = createMockLabelLink(newLabelName);
    document.body.appendChild(newLabelLink);

    // Ensure no highlight initially (as it's not in defaults)
    expect(newLabelLink.style.backgroundColor).toBe(""); // No background color

    // Configure GM_getValue to return custom labels including 'New Label'
    const customLabels: HighlightedLabels = {
      ...DEFAULT_HIGHLIGHTED_LABELS,
      poor: [...DEFAULT_HIGHLIGHTED_LABELS.poor, newLabelName],
    };
    (global.GM_getValue as vi.Mock).mockReturnValue(customLabels); // This will affect future GM_getValue calls

    // Manually trigger the callback passed to MutationObserver constructor
    // Access the callback from the spy's first call
    const observerInstance = (MockMutationObserver as vi.Mock).mock
      .instances[0];
    const observerCallback = observerInstance.callback; // Assuming callback is stored in instance

    // This triggers highlightLabels again, it should now use the new customLabels
    await act(async () => {
      // Ensure act is used around state updates or effects triggered by user interaction
      observerCallback([{ type: "childList", addedNodes: [newLabelLink] }]);
    });
    vi.runOnlyPendingTimers(); // Force useEffect to run again after MO callback

    // Now, the newLabelLink should be styled
    expect(newLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.poor)
    );
    expect(newLabelLink.style.color).toBe("white");

    // Initial label should still be styled
    expect(initialLabelLink.style.backgroundColor).toBe(
      hexToRgb(LABEL_QUALITY_COLORS.good)
    );
  });

  it("should not apply styles if label is not in highlighted list", () => {
    // Removed async
    mockLabelLink = createMockLabelLink("Unknown Label");
    document.body.appendChild(mockLabelLink);

    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(mockLabelLink.style.backgroundColor).toBe(""); // Should be empty
    expect(mockLabelLink.style.color).toBe(""); // Should be empty
  });

  it("should not highlight links that are not label links", () => {
    // Removed async
    const regularLink = document.createElement("a");
    regularLink.href = "/artist/Some-Artist"; // Not a label link
    regularLink.textContent = "Artist Link";
    document.body.appendChild(regularLink);

    render(<LabelHighlighter />);
    vi.runOnlyPendingTimers(); // Force useEffect to run

    expect(regularLink.style.backgroundColor).toBe(""); // Should be empty
  });
});
