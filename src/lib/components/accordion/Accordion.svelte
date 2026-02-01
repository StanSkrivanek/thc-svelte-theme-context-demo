<!-- src/lib/components/accordion/Accordion.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createAccordionContext } from './accordion-context.svelte';

	interface Props {
		/** Only allow one item open at a time */
		single?: boolean;

		/** Initially expanded item IDs */
		defaultExpanded?: string[];

		/** Callback when expanded items change */
		onExpandedChange?: (expandedIds: string[]) => void;

		/** Additional CSS class */
		class?: string;

		/** Child content */
		children: Snippet;
	}

	let {
		single = false,
		defaultExpanded = [],
		onExpandedChange,
		class: className = '',
		children
	}: Props = $props();

	// Keep a reference to the context so we can react to prop changes
	const accordion = createAccordionContext({});

	// Enforce single-mode dynamically if `single` changes
	$effect(() => {
		// keep the change callback up to date
		accordion.setOnExpandedChange(onExpandedChange);
		// keep context's single in sync
		accordion.setSingle(single);
		if (single) {
			// If more than one is open, collapse extras
			let keep: string | undefined;
			for (const id of accordion.expandedIds) {
				keep = id;
				break;
			}
			for (const id of accordion.expandedIds) {
				if (keep && id !== keep) {
					accordion.collapse(id);
				}
			}
		}
	});

	// Reflect `defaultExpanded` updates by resetting expanded items
	$effect(() => {
		accordion.collapseAll();
		for (const id of defaultExpanded) {
			accordion.expand(id);
		}
	});
</script>

<div class="accordion {className}">
	{@render children()}
</div>

<style>
	.accordion {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border, #e2e8f0);
		border-radius: 8px;
		overflow: hidden;
	}
</style>
