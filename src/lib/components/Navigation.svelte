<script lang="ts">
	let activeLink = 'home';

	const links = [
		{ name: 'Home', href: '/', id: 'home' },
		{ name: 'About', href: '/about', id: 'about' },
		{ name: 'Services', href: '/services', id: 'services' },
		{ name: 'Contact', href: '/contact', id: 'contact' }
	];

	function handleNavClick(linkId: string) {
		activeLink = linkId;
	}
</script>

<nav class="navigation">
	<ul>
		{#each links as link (link.id)}
			<li>
				<a
					href={link.href}
					class:active={activeLink === link.id}
					onclick={() => handleNavClick(link.id)}
				>
					{link.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.navigation {
		/* background-color: #333; */
		padding: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: 2rem;
	}

	a {
		color: #fff;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		transition: background-color 0.2s;
	}

	a:hover {
		background-color: #555;
	}

	a.active {
		background-color: #0066cc;
		font-weight: bold;
	}
</style>
