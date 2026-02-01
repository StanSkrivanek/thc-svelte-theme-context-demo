<!-- src/lib/components/accordion/AccordionItem.svelte -->
<script lang="ts">
	import { getAccordionContext } from './accordion-context.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		/** Unique identifier for this item */
		id: string

		/** Additional CSS class */
		class?: string

		/** Item content (should contain AccordionTrigger and AccordionContent) */
		children: Snippet
	}

	let { id, class: className = '', children }: Props = $props()

	const accordion = getAccordionContext()

	let isExpanded = $derived(accordion.isExpanded(id))
</script>

<div
	class="accordion-item {className}"
	class:expanded={isExpanded}
	data-state={isExpanded ? 'open' : 'closed'}
>
	{@render children()}
</div>

<style>
	.accordion-item {
		border-bottom: 1px solid var(--color-border, #e2e8f0);
	}

	.accordion-item:last-child {
		border-bottom: none;
	}
</style>