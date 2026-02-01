<!-- src/lib/components/accordion/AccordionTrigger.svelte -->
<script lang="ts">
	import { getAccordionContext } from './accordion-context.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		/** ID of the accordion item this trigger controls */
		itemId: string

		/** Additional CSS class */
		class?: string

		/** Trigger label content */
		children: Snippet
	}

	let { itemId, class: className = '', children }: Props = $props()

	const accordion = getAccordionContext()

	let isExpanded = $derived(accordion.isExpanded(itemId))

	function handleClick() {
		accordion.toggle(itemId)
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			accordion.toggle(itemId)
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
		padding: 1rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		text-align: left;
		color: var(--color-foreground, #1e293b);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.accordion-trigger:hover {
		background-color: var(--color-surface, #f8fafc);
	}

	.accordion-trigger:focus-visible {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: -2px;
	}

	.trigger-text {
		flex: 1;
	}

	.trigger-icon {
		width: 20px;
		height: 20px;
		color: var(--color-foreground-muted, #64748b);
		transition: transform 0.2s ease;
		flex-shrink: 0;
	}

	.trigger-icon.rotated {
		transform: rotate(180deg);
	}
</style>