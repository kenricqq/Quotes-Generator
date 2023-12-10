<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	
	let taggedObj: Writable<Record<string, boolean>> = writable({});

	let tags: Record<string, boolean> = {
		Age: false,
		Athletics: false,
		Business: false,
		Change: false,
		Character: false,
		Competition: false,
		Conservative: false,
		Courage: false,
		Creativity: false,
		Education: false,
		Ethics: false,
		Failure: false,
		Faith: false,
		Family: false,
		'Famous Quotes': false,
		Film: false,
		Freedom: false,
		Friendship: false,
		Future: false,
		Generosity: false,
		Genius: false,
		Gratitude: false,
		Happiness: false,
		Health: false,
		History: false,
		Honor: false,
		Humor: false,
		Humorous: false,
		Imagination: false,
		Inspirational: false,
		Knowledge: false,
		Leadership: false,
		Life: false,
		Literature: false,
		Love: false,
		Mathematics: false,
		Motivational: false,
		Nature: false,
		Opportunity: false,
		Pain: false,
		Perseverance: false,
		Philosophy: false,
		Politics: false,
		'Power Quotes': false,
		Proverb: false,
		Religion: false,
		Sadness: false,
		Science: false,
		Self: false,
		'Self Help': false,
		'Social Justice': false,
		Society: false,
		Spirituality: false,
		Sports: false,
		Stupidity: false,
		Success: false,
		Technology: false,
		Time: false,
		Tolerance: false,
		Truth: false,
		Virtue: false,
		War: false,
		Weakness: false,
		Wellness: false,
		Wisdom: false,
		Work: false
	};
	
	// initiliaze taggedObj with tags
	taggedObj.set(tags);

	function toggleTag(tag: string): void {
		tags[tag] = !tags[tag];
		const updatedTags = Object.keys(tags).filter((key) => tags[key] == true);
		taggedObj.set(tags);
		taggedObj.subscribe((value) => console.log(value))
	}

	const resetTags = () => {
		Object.keys(tags).forEach((key) => (tags[key] = false));
		console.log('reset');
	};
</script>

<main>
	<div class="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 bg-slate-800 rounded-md p-2">
		{#each Object.keys(tags) as f}
			<button
				class="chip p-5 text-base sm:text-lg {tags[f] ? 'variant-filled' : 'bg-slate-700'}"
				on:click={() => {
					toggleTag(f);
				}}
				on:keypress
			>
				<!-- {#if tags[f]}<span>(icon)</span>{/if} -->
				<span class="capitalize">{f}</span>
			</button>
		{/each}
	</div>

	<section class="flex justify-end">
		<button on:click={() => resetTags} class="p-5">Reset</button>
	</section>
</main>
