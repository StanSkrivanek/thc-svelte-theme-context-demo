<!-- SomeComponent.svelte -->
<script lang="ts">
	import { getCounterContext } from '$lib/context/counter.svelte'

	// Get the context instance - it's a full class with methods and properties
	const counter = getCounterContext()
</script>

<div class="counter">
	<!-- Methods can be called directly in event handlers -->
	<button onclick={() => counter.decrement()} disabled={!counter.canDecrement}>
		−{counter.step}
	</button>

	<!-- Properties are reactive - this updates when count changes -->
	<span class="value">{counter.count}</span>

	<button onclick={() => counter.increment()} disabled={!counter.canIncrement}>
		+{counter.step}
	</button>
</div>

<!-- Derived properties work seamlessly -->
<p>
	Range: {counter.min} to {counter.max}
	{#if counter.isAtMin}(at minimum){/if}
	{#if counter.isAtMax}(at maximum){/if}
</p>