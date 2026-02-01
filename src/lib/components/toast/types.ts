// src/lib/components/toast/types.ts

/**
 * Visual style variants for toast notifications.
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/**
 * Position options for the toast viewport.
 */
export type ToastPosition =
	| 'top-right'
	| 'top-left'
	| 'top-center'
	| 'bottom-right'
	| 'bottom-left'
	| 'bottom-center';

/**
 * A single toast notification instance.
 */
export interface Toast {
	readonly id: string;
	readonly message: string;
	readonly type: ToastType;
	readonly duration: number;
	readonly createdAt: number;
}

/**
 * Options for creating a new toast.
 */
export interface ToastOptions {
	message: string;
	type?: ToastType;
	duration?: number;
}

/**
 * The public API exposed by the toast context.
 */
export interface ToastContext {
	/** Currently visible toasts */
	readonly toasts: readonly Toast[];

	/** Show a toast with full options */
	show(options: ToastOptions): string;

	/** Dismiss a specific toast by ID */
	dismiss(id: string): void;

	/** Dismiss all visible toasts */
	dismissAll(): void;

	/** Convenience: Show info toast */
	info(message: string, duration?: number): string;

	/** Convenience: Show success toast */
	success(message: string, duration?: number): string;

	/** Convenience: Show warning toast */
	warning(message: string, duration?: number): string;

	/** Convenience: Show error toast */
	error(message: string, duration?: number): string;
}

/**
 * Configuration for the ToastProvider.
 */
export interface ToastProviderConfig {
	defaultDuration?: number;
	maxToasts?: number;
	position?: ToastPosition;
}
