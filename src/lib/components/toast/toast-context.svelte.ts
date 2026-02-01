// src/lib/components/toast/toast-context.svelte.ts

import { setContext, getContext, hasContext } from 'svelte';
import type {
	Toast,
	ToastType,
	ToastOptions,
	ToastContext,
	ToastPosition,
	ToastProviderConfig
} from './types.js';

// Re-export types for consumer convenience
export type { Toast, ToastType, ToastOptions, ToastContext, ToastPosition, ToastProviderConfig };

/**
 * Symbol keys for context isolation.
 */
const TOAST_CONTEXT_KEY = Symbol('toast-context');
const TOAST_POSITION_KEY = Symbol('toast-position');

/**
 * Generates a unique ID for each toast.
 */
function generateToastId(): string {
	const timestamp = Date.now().toString(36);
	const random = Math.random().toString(36).substring(2, 9);
	return `toast-${timestamp}-${random}`;
}

/**
 * Internal class that manages toast state and timers.
 * Encapsulating in a class ensures the timer Map is properly
 * scoped and avoids closure issues with $state.
 */
class ToastStateManager {
	/** Reactive state for the toasts array */
	private _toasts = $state<Toast[]>([]);

	/** Non-reactive Map for tracking auto-dismiss timers */
	private timerRegistry: Map<string, ReturnType<typeof setTimeout>>;

	/** Configuration values */
	private readonly defaultDuration: number;
	private readonly maxToasts: number;

	constructor(defaultDuration: number, maxToasts: number) {
		this.defaultDuration = defaultDuration;
		this.maxToasts = maxToasts;
		this.timerRegistry = new Map();
	}

	/** Read-only access to toasts */
	get toasts(): readonly Toast[] {
		return this._toasts;
	}

	/** Create and show a new toast */
	show(options: ToastOptions): string {
		const toast: Toast = {
			id: generateToastId(),
			message: options.message,
			type: options.type ?? 'info',
			duration: options.duration ?? this.defaultDuration,
			createdAt: Date.now()
		};

		// Add new toast, enforce maxToasts by keeping newest
		this._toasts = [...this._toasts, toast].slice(-this.maxToasts);

		// Schedule auto-dismiss if duration > 0
		if (toast.duration > 0) {
			const timerId = setTimeout(() => {
				this.dismiss(toast.id);
			}, toast.duration);
			this.timerRegistry.set(toast.id, timerId);
		}

		return toast.id;
	}

	/** Dismiss a specific toast by ID */
	dismiss(id: string): void {
		// Clear timer first to prevent race conditions
		const timerId = this.timerRegistry.get(id);
		if (timerId !== undefined) {
			clearTimeout(timerId);
			this.timerRegistry.delete(id);
		}

		// Remove from reactive state
		this._toasts = this._toasts.filter((t) => t.id !== id);
	}

	/** Dismiss all toasts and clear all timers */
	dismissAll(): void {
		// Clear all pending timers
		for (const timerId of this.timerRegistry.values()) {
			clearTimeout(timerId);
		}
		this.timerRegistry.clear();

		// Clear toasts array
		this._toasts = [];
	}

	/** Cleanup method for when provider unmounts */
	destroy(): void {
		this.dismissAll();
	}
}

/**
 * Creates and provides the toast context.
 * Call this in ToastProvider during component initialization.
 */
export function createToastContext(
	defaultDuration: number,
	maxToasts: number,
	position: ToastPosition
): ToastContext {
	const manager = new ToastStateManager(defaultDuration, maxToasts);

	// Set up cleanup when provider unmounts
	$effect(() => {
		return () => manager.destroy();
	});

	const context: ToastContext = {
		get toasts() {
			return manager.toasts;
		},

		show(options: ToastOptions): string {
			return manager.show(options);
		},

		dismiss(id: string): void {
			manager.dismiss(id);
		},

		dismissAll(): void {
			manager.dismissAll();
		},

		// Convenience methods
		info(message: string, duration?: number): string {
			return manager.show({ message, type: 'info', duration });
		},

		success(message: string, duration?: number): string {
			return manager.show({ message, type: 'success', duration });
		},

		warning(message: string, duration?: number): string {
			return manager.show({ message, type: 'warning', duration });
		},

		error(message: string, duration?: number): string {
			return manager.show({ message, type: 'error', duration });
		}
	};

	// Store position in separate context for viewport
	setContext(TOAST_POSITION_KEY, position);

	// Store and return main context
	return setContext(TOAST_CONTEXT_KEY, context);
}

/**
 * Retrieves the toast context.
 * Must be called from a component inside ToastProvider.
 */
export function getToastContext(): ToastContext {
	if (!hasContext(TOAST_CONTEXT_KEY)) {
		throw new Error(
			'Toast context not found. ' + 'Ensure this component is inside a <ToastProvider>.'
		);
	}
	return getContext<ToastContext>(TOAST_CONTEXT_KEY);
}

/**
 * Retrieves the toast position configuration.
 * Used internally by ToastViewport.
 */
export function getToastPosition(): ToastPosition {
	if (!hasContext(TOAST_POSITION_KEY)) {
		return 'bottom-right';
	}
	return getContext<ToastPosition>(TOAST_POSITION_KEY);
}
