<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	// TABS DEMO
	import { Tab, TabList, TabPanel, Tabs } from '$lib/components/tabs';

	function handleTabChange(tabId: string) {
		console.log('Active tab:', tabId);
	}

	// TOAST DEMO
	import { getToastContext } from '$lib/components/toast';

	const toast = getToastContext();

	// Simulated async operation
	async function saveDocument() {
		return new Promise((resolve) => setTimeout(resolve, 500));
	}

	async function handleSave() {
		try {
			await saveDocument();
			toast.success('Document saved successfully!');
		} catch (err) {
			toast.error('Failed to save document. Please try again.');
		}
	}

	function showExamples() {
		toast.info('This is an informational message');
		toast.success('Operation completed!');
		toast.warning('Your session expires in 5 minutes', 10000);
		toast.error('Something went wrong');
	}

	function showCustom() {
		// Using the full options API
		const id = toast.show({
			message: 'This toast stays until dismissed',
			type: 'info',
			duration: 0 // 0 = no auto-dismiss
		});

		// You can dismiss programmatically later
		// setTimeout(() => toast.dismiss(id), 8000);
	}

// ACCORDION DEMO
		import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/accordion'

</script>

<div class="demo">
	<h1>Toast Demo</h1>

	<div class="buttons">
		<button onclick={handleSave}>Save Document</button>
		<button onclick={showExamples}>Show All Types</button>
		<button onclick={showCustom}>Custom Duration</button>
		<button onclick={() => toast.dismissAll()}>Dismiss All</button>
	</div>
</div>

<!-- Single mode: only one item open at a time -->
<Accordion single defaultExpanded={['item-1']}>
	<AccordionItem id="item-1">
		<AccordionTrigger itemId="item-1">What is your return policy?</AccordionTrigger>
		<AccordionContent itemId="item-1">
			<p>
				We offer a 30-day return policy for all unused items in their original packaging. Simply
				contact our support team to initiate a return.
			</p>
		</AccordionContent>
	</AccordionItem>

	<AccordionItem id="item-2">
		<AccordionTrigger itemId="item-2">How long does shipping take?</AccordionTrigger>
		<AccordionContent itemId="item-2">
			<p>
				Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business
				day delivery.
			</p>
		</AccordionContent>
	</AccordionItem>

	<AccordionItem id="item-3">
		<AccordionTrigger itemId="item-3">Do you ship internationally?</AccordionTrigger>
		<AccordionContent itemId="item-3">
			<p>
				Yes! We ship to over 50 countries. International shipping typically takes 10-14 business
				days.
			</p>
		</AccordionContent>
	</AccordionItem>
</Accordion>



<div class="grid">
	<!-- Works standalone -->
	<Card title="Hello World">
		<p>This card uses default styling.</p>
	</Card>

	<!-- Adapts to theme context -->
	<Card title="Themed Card" variant="primary">
		<p>This card uses your app's primary color.</p>
	</Card>

	<!-- Inside a dark-themed section -->
	<Card title="Dark Mode" subtitle="Automatically adapts">
		<p>Border and shadow adjust for dark backgrounds.</p>
	</Card>
</div>

<Tabs defaultTab="overview" onTabChange={handleTabChange} orientation="horizontal">

	<TabList >
		<Tab id="overview">Overview</Tab>
		<Tab id="features">Features</Tab>
		<Tab id="pricing">Pricing</Tab>
		<Tab id="faq" disabled>FAQ (Coming Soon)</Tab>
	</TabList>

	<TabPanel id="overview">
		<h3>Product Overview</h3>
		<p>Welcome to our amazing product. Here's what you need to know...</p>
	</TabPanel>

	<TabPanel id="features">
		<h3>Key Features</h3>
		<ul>
			<li>Feature one with detailed explanation</li>
			<li>Feature two that makes life easier</li>
			<li>Feature three for power users</li>
		</ul>
	</TabPanel>

	<TabPanel id="pricing">
		<h3>Pricing Plans</h3>
		<p>Choose the plan that fits your needs.</p>
	</TabPanel>

	<TabPanel id="faq">
		<h3>Frequently Asked Questions</h3>
		<p>Coming soon!</p>
	</TabPanel>
</Tabs>

<style>
	.grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		margin-top: 2rem;
	}
	.demo {
		padding: 2rem;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		border-radius: 6px;
		border: none;
		background: #3b82f6;
		color: white;
		cursor: pointer;
		transition: background-color 0.15s;
	}

	button:hover {
		background: #2563eb;
	}
</style>
