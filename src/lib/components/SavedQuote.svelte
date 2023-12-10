<script lang="ts">
	import { deleteQuote } from '../../stores/quoteStore.ts';

	interface Quote {
		quoteText: string;
		id: number;
	}

	export let quoteObj: Quote;
</script>

<blockquote class="flex flex-col sm:flex-row justify-between gap-3 m-2 p-5 text-lg bg-slate-800 rounded-md">
	<!-- quote text -->
	{quoteObj.quoteText}

	<!-- delete button -->
	<button on:click={() => deleteQuote(quoteObj.quoteText)}>delete</button>
</blockquote>
