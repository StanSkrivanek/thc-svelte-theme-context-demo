// src/lib/context/counter.svelte.ts (continued)
import { setContext, getContext, hasContext } from 'svelte';

// Symbol keys prevent collision with other contexts
// Even if another library uses 'counter', our Symbol is unique
const COUNTER_KEY = Symbol('counter');

// Factory function - creates and registers the context
// This is what providers call
export function createCounterContext(options?: CounterOptions): CounterContext {
	const context = new CounterContext(options);
	// setContext returns what you pass it, so we can return in one line
	return setContext(COUNTER_KEY, context);
}

// Getter function - retrieves the context
// This is what consumers call
export function getCounterContext(): CounterContext {
	// Fail fast with helpful error if context is missing
	if (!hasContext(COUNTER_KEY)) {
		throw new Error(
			'Counter context not found. ' + 'Ensure this component is wrapped with CounterProvider.'
		);
	}
	return getContext(COUNTER_KEY);
}

export class CounterContext {
	// Private reactive state using class fields
	// The # prefix makes these truly private - not accessible outside the class
	#count = $state(0);
	#step = $state(1);

	// Configuration passed in constructor - these are read-only after creation
	// We use 'readonly' to prevent accidental modification
	readonly min: number;
	readonly max: number;

	constructor(options: CounterOptions = {}) {
		// Destructure with defaults - clean way to handle optional config
		const { initial = 0, step = 1, min = -Infinity, max = Infinity } = options;

		// Initialize state from options
		this.#count = initial;
		this.#step = step;
		this.min = min;
		this.max = max;
	}

	// PUBLIC GETTERS - how consumers read state
	// These run every time they're accessed, always returning current values
	get count() {
		return this.#count;
	}

	get step() {
		return this.#step;
	}

	// DERIVED VALUES - computed from state
	// These are like $derived but as getters
	// They automatically recalculate when the underlying state changes
	get isAtMin() {
		return this.#count <= this.min;
	}

	get isAtMax() {
		return this.#count >= this.max;
	}

	// Business logic in derived values - keeps UI code clean
	get canIncrement() {
		return this.#count + this.#step <= this.max;
	}

	get canDecrement() {
		return this.#count - this.#step >= this.min;
	}

	// PUBLIC METHODS - how consumers modify state
	// All mutations go through these controlled entry points
	increment() {
		// Guard clause prevents invalid state
		if (this.canIncrement) {
			this.#count += this.#step;
		}
		// If we can't increment, silently do nothing
		// (Could also throw or return false - design choice)
	}

	decrement() {
		if (this.canDecrement) {
			this.#count -= this.#step;
		}
	}

	// Allow direct value setting, but enforce bounds
	set(value: number) {
		// Math.max/min clamps the value to valid range
		// This ensures state is ALWAYS valid, no matter what value is passed
		this.#count = Math.max(this.min, Math.min(this.max, value));
	}

	setStep(step: number) {
		// Step must be at least 1
		this.#step = Math.max(1, step);
	}

	reset() {
		this.#count = 0;
	}
}

// Type for constructor options
export interface CounterOptions {
	initial?: number;
	step?: number;
	min?: number;
	max?: number;
}
