<!-- src/lib/components/accordion/AccordionTrigger.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getAccordionContext } from './accordion-context.svelte';

	interface Props {
		/** ID of the accordion item this trigger controls */
		itemId: string;

		/** Additional CSS class */
		class?: string;

		/** Trigger label content */
		children: Snippet;
	}

	let { itemId, class: className = '', children }: Props = $props();

	const accordion = getAccordionContext();

	let isExpanded = $derived(accordion.isExpanded(itemId));

	function handleClick() {
		accordion.toggle(itemId);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			accordion.toggle(itemId);
		}
	}
</script>

<button
	type="button"
	id="accordion-trigger-{itemId}"
	class="accordion-trigger {className}"
	aria-expanded={isExpanded}
	aria-controls="accordion-content-{itemId}"
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	<span class="trigger-text">
		{@render children()}
	</span>

	<svg
		class="trigger-icon"
		class:rotated={isExpanded}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		aria-hidden="true"
	>
		<polyline points="6 9 12 15 18 9" />
	</svg>
</button>

<style>
	.accordion-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		text-align: left;
		color: var(--color-foreground);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.accordion-trigger:hover {
		background-color: var(--color-muted);
	}

	.accordion-trigger:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.trigger-text {
		flex: 1;
		line-height: 1.5;
	}

	.trigger-icon {
		width: 18px;
		height: 18px;
		color: var(--color-muted-foreground);
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
		margin-left: 0.5rem;
	}

	.trigger-icon.rotated {
		transform: rotate(180deg);
	}
</style>
