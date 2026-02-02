<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { ToastProvider, ToastViewport } from '$lib/components/toast';
	import ThemeProvider from '$lib/theme/ThemeProvider.svelte';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// Create a reactive theme context object
	const theme = $state({
		mode: 'light',
		colors: {
			primary: '#3b82f6',
			secondary: '#64748b',
			background: '#ffffff',
			text: '#1e293b'
		},
		spacing: {
			sm: '0.5rem',
			md: '1rem',
			lg: '2rem'
		}
	});

	// Set theme at the root - all descendants can access it
	setContext('theme', theme);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ThemeProvider>
	<ToastProvider position="top-center" defaultDuration={5000} maxToasts={5}>
		<div class="app-layout">
			<Header />
			<div class="app-body">
				<Sidebar />
				<main class="main-content">
					{@render children()}
				</main>
			</div>
		</div>

		<!-- Viewport renders all toasts -->
		<ToastViewport />
	</ToastProvider>
</ThemeProvider>

<style>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.app-body {
		display: flex;
		flex: 1;
	}

	.main-content {
		flex: 1;
		padding: 2rem;
	}
</style>
