<script>
import "../app.css";
import { DarkMode } from 'flowbite-svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
	
</script>

<!-- <DarkMode /> -->
<main class="bg-slate-300 dark:bg-gray-900 min-h-screen">
	{@render children?.()}
</main>
6