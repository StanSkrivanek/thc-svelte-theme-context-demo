<!-- src/lib/components/CounterProvider.svelte -->
<script lang="ts">
	import { createCounterContext } from '$lib/context/counter.svelte'
	import { untrack } from 'svelte'
	import type { Snippet } from 'svelte'

	// Define props inline - cleaner than extending imported types
	interface Props {
		initial?: number
		step?: number
		min?: number
		max?: number
		children: Snippet
	}

	let {
		initial = 0,
		step = 1,
		min = -Infinity,
		max = Infinity,
		children
	}: Props = $props()

	// Create the context - this runs during component initialization
	// Using untrack() explicitly shows we intend to capture initial values
	// Context is created once and the instance is available to all descendants
	untrack(() => {
		createCounterContext({ initial, step, min, max })
	})
</script>

<!-- Render children - they can now access the counter context -->
{@render children()}