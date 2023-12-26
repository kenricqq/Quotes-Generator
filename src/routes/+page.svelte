<script>
	import { onMount } from 'svelte';
	import { quotes } from '../stores/quoteStore.ts';
	import SavedQuote from '$lib/components/SavedQuote.svelte';
	import QuoteForm from '$lib/components/QuoteForm.svelte';

	onMount(() => {
		// get saved quotes
		const savedQuotes = localStorage.getItem('quotes');
		if (savedQuotes) {
			quotes.set(JSON.parse(savedQuotes));
		}
	});
</script>

<div class="container h-[0vh] flex flex-col p-3 pb-9 mx-auto max-w-4xl">
	<!-- add quote to list -->
	<div class="flex-shrink-0">
		<QuoteForm />
	</div>

	<h2 class="text-xl p-3 underline decoration-4">Bookmarked Quotes</h2>

	<section class="px-3 flex-grow ">
		{#each $quotes as quoteObj}
			<!-- pass quote object to SavedQuote -->
			<SavedQuote {quoteObj} />
		{/each}
	</section>
</div>
