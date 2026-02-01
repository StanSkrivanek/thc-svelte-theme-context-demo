<!-- src/lib/components/accordion/AccordionContent.svelte -->
<script lang="ts">
	import { getAccordionContext } from './accordion-context.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		/** ID of the accordion item this content belongs to */
		itemId: string

		/** Additional CSS class */
		class?: string

		/** Content to show when expanded */
		children: Snippet
	}

	let { itemId, class: className = '', children }: Props = $props()

	const accordion = getAccordionContext()

	let isExpanded = $derived(accordion.isExpanded(itemId))
</script>

<div
	id="accordion-content-{itemId}"
	class="accordion-content {className}"
	class:expanded={isExpanded}
	role="region"
	aria-labelledby="accordion-trigger-{itemId}"
	hidden={!isExpanded}
>
	<div class="content-inner">
		{@render children()}
	</div>
</div>

<style>
	.accordion-content {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.2s ease;
	}

	.accordion-content.expanded {
		grid-template-rows: 1fr;
	}

	.content-inner {
		overflow: hidden;
	}

	.accordion-content.expanded .content-inner {
		padding: 0 1.25rem 1rem;
	}
</style>