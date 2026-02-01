// src/lib/components/accordion/accordion-context.svelte.ts

import { getContext, hasContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { AccordionContext, AccordionOptions } from './types';

const ACCORDION_KEY = Symbol('accordion');


/**
 * Creates and provides the accordion context.
 */
export function createAccordionContext(options: AccordionOptions = {}): AccordionContext {
	const { defaultExpanded = [] } = options;
	let { single = false, onExpandedChange } = options;

	// Track which items are expanded (keep a single reactive instance)
	const expandedIds = new SvelteSet<string>(defaultExpanded);

	/**
	 * Notifies the callback when expanded items change.
	 */
	function notifyChange() {
		onExpandedChange?.([...expandedIds]);
	}

	const context: AccordionContext = {
		get expandedIds() {
			return expandedIds;
		},

		get single() {
			return single;
		},

		toggle(id: string) {
			if (expandedIds.has(id)) {
				this.collapse(id);
			} else {
				this.expand(id);
			}
		},

		isExpanded(id: string) {
			return expandedIds.has(id);
		},

		expand(id: string) {
			if (single) {
				// In single mode, close others when opening one
				expandedIds.clear();
				expandedIds.add(id);
			} else {
				expandedIds.add(id);
			}
			notifyChange();
		},

		collapse(id: string) {
			expandedIds.delete(id);
			notifyChange();
		},

		collapseAll() {
			expandedIds.clear();
			notifyChange();
		},

		setSingle(value: boolean) {
			single = value;
		},

		setOnExpandedChange(cb: ((expandedIds: string[]) => void) | undefined) {
			onExpandedChange = cb;
		}
	};

	return setContext(ACCORDION_KEY, context);
}

/**
 * Retrieves the accordion context.
 */
export function getAccordionContext(): AccordionContext {
	if (!hasContext(ACCORDION_KEY)) {
		throw new Error(
			'Accordion context not found. ' + 'Ensure this component is inside an <Accordion> container.'
		);
	}
	return getContext(ACCORDION_KEY);
}
