<script lang="ts">
	import ThemeProvider from '$lib/theme/ThemeProvider.svelte';
	import ThemeSelector from '$lib/theme/ThemeSelector.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	import { getThemeContext } from '$lib/theme/theme-context.svelte.js';
	import { CircleCheck, Code, Moon, Palette, Sun, Zap } from 'lucide-svelte';

	const theme = getThemeContext();
</script>

<div class="page">
	<!-- Hero Section -->
	<div class="hero">
		<div class="container">
			<div class="hero-content">
				<div class="hero-badge">
					<Zap size={16} color="orangered" />
					<span>Production-Ready Theme System</span>
				</div>
				<h1 class="hero-title">
					Context-Based Theme Switching<br />for SvelteKit
				</h1>
				<p class="hero-description">
					A complete theme management system using Svelte 5's Context API. Supports light, dark, and
					system modes with nested theme overrides, SSR, and zero flash of wrong theme.
				</p>
				<div class="hero-controls">
					<ThemeSelector />
					<ThemeToggle />
				</div>
				<div class="hero-status">
					<div class="status-item">
						<div class="status-indicator status-{theme.mode}"></div>
						<span class="status-label">Current: <strong>{theme.mode}</strong></span>
					</div>
					<div class="status-item">
						<Code size={16} color="orangered" />
						<span class="status-label">Preference: <strong>{theme.preference}</strong></span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="container">
		<div class="section">
			<h2 class="section-title">
				<Palette size={24} color="orangered" />
				Key Features
			</h2>
			<div class="feature-grid">
				<div class="feature-card">
					<CircleCheck size={20} color="lightgreen" class="feature-icon" />
					<h3>CSS-First Architecture</h3>
					<p>All colors defined in CSS. JavaScript just sets <code>data-theme</code> attribute.</p>
				</div>
				<div class="feature-card">
					<CircleCheck size={20} color="lightgreen" class="feature-icon" />
					<h3>No Flash on Load</h3>
					<p>Inline script sets theme before first paint. Perfect SSR support.</p>
				</div>
				<div class="feature-card">
					<CircleCheck size={20} color="lightgreen" class="feature-icon" />
					<h3>System Preference Detection</h3>
					<p>Automatically detects and responds to OS theme changes in real-time.</p>
				</div>
				<div class="feature-card">
					<CircleCheck size={20} color="lightgreen" class="feature-icon" />
					<h3>localStorage Persistence</h3>
					<p>User preferences are saved and restored across sessions.</p>
				</div>
				<div class="feature-card">
					<CircleCheck size={20} color="lightgreen" class="feature-icon" />
					<h3>Nested Theme Overrides</h3>
					<p>Different parts of your app can use different themes simultaneously.</p>
				</div>
				<div class="feature-card">
					<CircleCheck size={20} color="lightgreen" class="feature-icon" />
					<h3>Type-Safe API</h3>
					<p>Full TypeScript support with type inference throughout.</p>
				</div>
			</div>
		</div>

		<!-- Demo Cards Section -->
		<div class="section">
			<h2 class="section-title">
				<Sun size={24} color="orangered" />
				Theme Variations
			</h2>
			<div class="demo-grid">
				<!-- Regular Card - Follows Page Theme -->
				<div class="demo-card">
					<div class="demo-card-header">
						<h3>Regular Card</h3>
						<span class="badge">Follows Page Theme</span>
					</div>
					<p>
						This card uses CSS variables and automatically adapts to the current theme. No
						JavaScript required.
					</p>
					<div class="demo-card-footer">
						<code>background: var(--color-card)</code>
					</div>
				</div>

				<!-- Forced Light Theme Card -->
				<ThemeProvider forceTheme="light">
					<div class="demo-card">
						<div class="demo-card-header">
							<h3>Always Light</h3>
							<span class="badge badge-light">
								<Sun size={14} color="orangered" />
								Forced Light
							</span>
						</div>
						<p>
							This card is wrapped in a <code>ThemeProvider</code> with
							<code>forceTheme="light"</code>. It stays light regardless of the page theme.
						</p>
						<div class="demo-card-footer">
							<code>&lt;ThemeProvider forceTheme="light"&gt;</code>
						</div>
					</div>
				</ThemeProvider>

				<!-- Forced Dark Theme Card -->
				<ThemeProvider forceTheme="dark">
					<div class="demo-card">
						<div class="demo-card-header">
							<h3>Always Dark</h3>
							<span class="badge badge-dark">
								<Moon size={14} color="orangered" />
								Forced Dark
							</span>
						</div>
						<p>
							This card is wrapped in a <code>ThemeProvider</code> with
							<code>forceTheme="dark"</code>. It stays dark regardless of the page theme.
						</p>
						<div class="demo-card-footer">
							<code>&lt;ThemeProvider forceTheme="dark"&gt;</code>
						</div>
					</div>
				</ThemeProvider>
			</div>
		</div>

		<!-- Color Palette Section -->
		<div class="section">
			<h2 class="section-title">
				<Palette size={24} color="orangered" />
				Color Palette
			</h2>
			<div class="color-grid">
				<div class="color-swatch">
					<div class="swatch swatch-background"></div>
					<div class="swatch-info">
						<code>--color-background</code>
						<span class="swatch-usage">Page background</span>
					</div>
				</div>
				<div class="color-swatch">
					<div class="swatch swatch-foreground"></div>
					<div class="swatch-info">
						<code>--color-foreground</code>
						<span class="swatch-usage">Primary text</span>
					</div>
				</div>
				<div class="color-swatch">
					<div class="swatch swatch-primary"></div>
					<div class="swatch-info">
						<code>--color-primary</code>
						<span class="swatch-usage">Brand color</span>
					</div>
				</div>
				<div class="color-swatch">
					<div class="swatch swatch-muted"></div>
					<div class="swatch-info">
						<code>--color-muted</code>
						<span class="swatch-usage">Subtle backgrounds</span>
					</div>
				</div>
				<div class="color-swatch">
					<div class="swatch swatch-border"></div>
					<div class="swatch-info">
						<code>--color-border</code>
						<span class="swatch-usage">Borders & dividers</span>
					</div>
				</div>
				<div class="color-swatch">
					<div class="swatch swatch-accent"></div>
					<div class="swatch-info">
						<code>--color-accent</code>
						<span class="swatch-usage">Accent elements</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Code Example Section -->
		<div class="section">
			<h2 class="section-title">
				<Code size={24} color="orangered" />
				Usage Example
			</h2>
			<div class="code-example">
				<pre><code
						>&lt;!-- Root Layout --&gt;
&lt;script&gt;
  import ThemeProvider from '$lib/theme/ThemeProvider.svelte'
  import '../app.css'
&lt;/script&gt;

&lt;ThemeProvider&gt;
  &#123;@render children()&#125;
&lt;/ThemeProvider&gt;

&lt;!-- Any Component --&gt;
&lt;script&gt;
  import &#123; getThemeContext &#125; from '$lib/theme/theme-context.svelte.js'
  const theme = getThemeContext()
&lt;/script&gt;

&lt;!-- Use CSS variables (recommended) --&gt;
&lt;div class="card"&gt;
  &lt;h2&gt;My Card&lt;/h2&gt;
&lt;/div&gt;

&lt;style&gt;
  .card &#123;
    background: var(--color-card);
    color: var(--color-card-foreground);
    border: 1px solid var(--color-border);
  &#125;
&lt;/style&gt;

&lt;!-- Or access theme programmatically --&gt;
&lt;p&gt;Current theme: &#123;theme.mode&#125;&lt;/p&gt;
&lt;button onclick=&#123;() =&gt; theme.toggle()&#125;&gt;
  Toggle Theme
&lt;/button&gt;</code
					></pre>
			</div>
		</div>
	</div>
</div>

<style>
	.page {
		min-height: 100vh;
		background-color: var(--color-background);
	}

	.hero {
		background: var(--color-muted);
		border-bottom: 1px solid var(--color-border);
		padding: 4rem 2rem;
		margin-bottom: 4rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-lg);
		background: var(--color-primary);
		color: var(--color-primary-foreground);
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		line-height: 1.1;
		margin: 0 0 1rem;
		color: orangered;
	}

	.hero-description {
		font-size: 1.125rem;
		color: var(--color-muted-foreground);
		max-width: 600px;
		margin: 0 auto 2rem;
		line-height: 1.6;
	}

	.hero-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.hero-status {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		padding: 1rem;
		border-radius: var(--radius);
		background: var(--color-card);
		border: 1px solid var(--color-border);
	}

	.status-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-muted-foreground);
		font-size: 0.875rem;
	}

	.status-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	.status-indicator.status-light {
		background: #f59e0b;
	}

	.status-indicator.status-dark {
		background: #3b82f6;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.status-label strong {
		color: var(--color-foreground);
		font-weight: 600;
	}

	.section {
		margin-bottom: 4rem;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: var(--color-foreground);
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.feature-card {
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		background: var(--color-card);
		border: 1px solid var(--color-border);
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.feature-card:hover {
		border-color: var(--color-ring);
		box-shadow: var(--shadow-md);
	}

	.feature-card :global(.feature-icon) {
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.feature-card h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--color-foreground);
	}

	.feature-card p {
		margin: 0;
		color: var(--color-muted-foreground);
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.feature-card code {
		background: var(--color-muted);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		font-family: var(--font-monospace-code, monospace);
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.demo-card {
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		background: var(--color-card);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow);
		transition: box-shadow 0.15s;
	}

	.demo-card:hover {
		box-shadow: var(--shadow-lg);
	}

	.demo-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.demo-card-header h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		color: var(--color-foreground);
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius);
		background: var(--color-muted);
		color: var(--color-muted-foreground);
		font-size: 0.75rem;
		font-weight: 600;
		border: 1px solid var(--color-border);
	}

	.badge-light {
		background: #fef3c7;
		color: #92400e;
		border-color: #fde68a;
	}

	.badge-dark {
		background: #1e293b;
		color: #e2e8f0;
		border-color: #334155;
	}

	.demo-card p {
		margin: 0 0 1rem;
		color: var(--color-muted-foreground);
		line-height: 1.6;
	}

	.demo-card-footer {
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.demo-card-footer code {
		display: block;
		background: var(--color-muted);
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-sm);
		font-size: 0.8125rem;
		font-family: var(--font-monospace-code, monospace);
		color: var(--color-foreground);
	}

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.color-swatch {
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--color-card);
		border: 1px solid var(--color-border);
	}

	.swatch {
		height: 100px;
		border-bottom: 1px solid var(--color-border);
	}

	.swatch-background {
		background: var(--color-background);
	}

	.swatch-foreground {
		background: var(--color-foreground);
	}

	.swatch-primary {
		background: var(--color-primary);
	}

	.swatch-muted {
		background: var(--color-muted);
	}

	.swatch-border {
		background: var(--color-border);
	}

	.swatch-accent {
		background: var(--color-accent);
	}

	.swatch-info {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.swatch-info code {
		font-size: 0.75rem;
		font-family: var(--font-monospace-code, monospace);
		color: var(--color-foreground);
	}

	.swatch-usage {
		font-size: 0.75rem;
		color: var(--color-muted-foreground);
	}

	.code-example {
		border-radius: var(--radius-lg);
		background: var(--color-muted);
		border: 1px solid var(--color-border);
		overflow: hidden;
	}

	.code-example pre {
		margin: 0;
		padding: 1.5rem;
		overflow-x: auto;
	}

	.code-example code {
		font-family: var(--font-monospace-code, monospace);
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-foreground);
	}

	code {
		background: var(--color-muted);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		font-family: var(--font-monospace-code, monospace);
		color: var(--color-foreground);
	}

	@media (max-width: 768px) {
		.hero {
			padding: 3rem 1rem;
		}

		.hero-status {
			flex-direction: column;
			gap: 1rem;
		}

		.feature-grid,
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
