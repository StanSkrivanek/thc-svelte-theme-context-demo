// src/lib/theme/colors.ts

import type { ThemeColors } from './types';

export const lightColors: ThemeColors = {
	// Backgrounds
	background: '#ffffff',
	surface: '#f8fafc',
	surfaceHover: '#f1f5f9',

	// Text
	foreground: '#0f172a',
	foregroundMuted: '#475569',
	foregroundSubtle: '#94a3b8',

	// Interactive
	primary: '#2563eb',
	primaryHover: '#1d4ed8',
	primaryForeground: '#ffffff',

	// Semantic
	success: '#16a34a',
	warning: '#ca8a04',
	error: '#dc2626',
	info: '#0284c7',

	// Structural
	border: '#e2e8f0',
	borderFocus: '#3b82f6',
	shadow: 'rgba(0, 0, 0, 0.1)'
};

export const darkColors: ThemeColors = {
	// Backgrounds
	background: '#0f172a',
	surface: '#1e293b',
	surfaceHover: '#334155',

	// Text
	foreground: '#f8fafc',
	foregroundMuted: '#cbd5e1',
	foregroundSubtle: '#64748b',

	// Interactive
	primary: '#3b82f6',
	primaryHover: '#60a5fa',
	primaryForeground: '#ffffff',

	// Semantic
	success: '#22c55e',
	warning: '#eab308',
	error: '#ef4444',
	info: '#0ea5e9',

	// Structural
	border: '#334155',
	borderFocus: '#60a5fa',
	shadow: 'rgba(0, 0, 0, 0.4)'
};

export const themes = {
	light: lightColors,
	dark: darkColors
} as const;
