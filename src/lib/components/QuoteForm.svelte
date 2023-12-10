<script lang="ts">
	import { addQuote, deleteQuote } from '../../stores/quoteStore.ts';
	import { Bookmark, RefreshCcw, Settings } from 'lucide-svelte';
	import { bookmark, quote, generateRandomQuote } from '../../stores/quoteStore.ts';

	const showSettings = () => {
		console.log('show settings');
	};

	generateRandomQuote();

	// toggleBookmark via Bookmark icon
	const toggleBookmark = () => {
		if ($bookmark) {
			deleteQuote($quote);
		} else {
			addQuote($quote);
		}
	};
</script>

<div class="flex h-fit min-h-[12rem] sm:h-48 justify-between m-5 sm:m-10 rounded-lg bg-slate-800">
	<h1 class="p-9 pr-1 m-auto text-center text-xl sm:text-2xl">{$quote}</h1>

	<section class="m-6 flex flex-col justify-between">
		<button on:click={() => generateRandomQuote()}>
			<RefreshCcw />
		</button>

		<button on:click={() => showSettings()}>
			<Settings />
		</button>

		<button on:click={() => toggleBookmark()}>
			<Bookmark class={`${$bookmark ? 'fill-current' : 'fill-none'}`} />
		</button>
	</section>
</div>
