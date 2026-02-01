// src/lib/components/tabs/tabs-context.svelte.ts

import { getContext, hasContext, setContext } from 'svelte';
// Use SvelteKit's `dev` flag to emit helpful warnings during development.
import { dev } from '$app/environment';

/**
 * Symbol key ensures no collisions with other contexts.
 */
const TABS_KEY = Symbol('tabs');

/**
 * The shape of the tabs context available to child components.
 */
export interface TabsContext {
	/** The ID of the currently active tab */
	readonly activeTabId: string;

	/** Orientation affects keyboard navigation */
	readonly orientation: 'horizontal' | 'vertical';

	/** Register a tab (called when Tab mounts) */
	registerTab(id: string): void;

	/** Unregister a tab (called when Tab unmounts) */
	unregisterTab(id: string): void;

	/** Change the active tab */
	setActiveTab(id: string): void;

	/** Check if a specific tab is active */
	isActive(id: string): boolean;

	/** Get all registered tab IDs in order */
	readonly tabIds: readonly string[];
}

/**
 * Options for creating the tabs context.
 */
export interface TabsOptions {
	/** Initially active tab ID */
	defaultTab?: string;

	/** Tab orientation for styling and keyboard nav */
	orientation?: 'horizontal' | 'vertical';

	/** Callback when active tab changes */
	onTabChange?: (tabId: string) => void;
}

/**
 * Creates and provides the tabs context.
 * Call this in the Tabs container component.
 */
export function createTabsContext(options: TabsOptions = {}): TabsContext {
	const { defaultTab, onTabChange } = options;

	// Orientation derives from the parent option; no local setter to avoid effect loops
	const orientation = $derived(options.orientation ?? 'horizontal');

	// Track registered tabs in order
	let tabIds = $state<string[]>([]);

	// Currently active tab
	let activeTabId = $state(defaultTab ?? '');

	// Initial active tab will be set on first register if none is selected

	const context: TabsContext = {
		get activeTabId() {
			return activeTabId;
		},

		get orientation() {
			return orientation;
		},

		get tabIds() {
			return tabIds;
		},

		registerTab(id: string) {
			// Dev-only guard: avoid registering duplicate tab ids (helps catch mistakes)
			if (tabIds.includes(id)) {
				if (dev) console.warn(`[Tabs] Duplicate tab id "${id}" ignored.`);
				return;
			}
			// Add to the end, preserving DOM order
			tabIds = [...tabIds, id];
			// If no active tab yet, select the first registered
			if (!activeTabId) {
				activeTabId = id;
			}
		},

		unregisterTab(id: string) {
			tabIds = tabIds.filter((tabId) => tabId !== id);

			// If the active tab was removed, select the first available
			if (activeTabId === id && tabIds.length > 0) {
				activeTabId = tabIds[0];
			}
		},

		setActiveTab(id: string) {
			if (tabIds.includes(id) && id !== activeTabId) {
				activeTabId = id;
				onTabChange?.(id);
			}
		},

		isActive(id: string) {
			return activeTabId === id;
		}

		// orientation is derived from parent option; no local update method
	};

	return setContext(TABS_KEY, context);
}

/**
 * Retrieves the tabs context.
 * Must be called from a component inside Tabs.
 */
export function getTabsContext(): TabsContext {
	if (!hasContext(TABS_KEY)) {
		throw new Error(
			'Tabs context not found. ' + 'Ensure this component is inside a <Tabs> container.'
		);
	}
	return getContext(TABS_KEY);
}
