<script lang="ts">
	import { onMount } from 'svelte';
	import { addQuote, deleteQuote } from '../../stores/quoteStore.ts';
	import { Bookmark, RefreshCcw, Settings } from 'lucide-svelte';
	import { bookmark, quote, generateQuote } from '../../stores/quoteStore.ts';
	import Modal from './Modal.svelte';

	let showModal = false;

	let tags: Record<string, boolean>;

	const initTags = () => {
		tags = {
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
	};

	initTags();

	onMount(() => {
		const preferTags = localStorage.getItem('preferTags');
		if (preferTags) {
			Object.keys(tags).forEach((key) => {
				if (preferTags.includes(key)) {
					tags[key] = true;
				}
			});
		}
		getQuote();
	});

	let toggleTag = (tag: string) => {
		tags[tag] = !tags[tag];
		console.log(Object.keys(tags).filter((key) => tags[key] == true));

		// filters out to only tags that are true, save to localStorage
		const preferTags = Object.keys(tags).filter((key) => tags[key] == true);
		localStorage.setItem('preferTags', JSON.stringify(preferTags));
	};

	const resetTags = () => {
		initTags();
		localStorage.removeItem('preferTags');
	};

	const getQuote = () => {
		const preferTags = localStorage.getItem('preferTags');
		const preferTagsArr = preferTags ? JSON.parse(preferTags) : [];

		if (preferTags) {
			generateQuote(preferTagsArr);
		} else {
			generateQuote();
		}
	};

	// toggleBookmark via Bookmark icon
	const toggleBookmark = () => {
		if ($bookmark) {
			deleteQuote($quote);
		} else {
			addQuote($quote);
		}
	};
</script>

<Modal bind:showModal>
	<h2 slot="header">modal</h2>

	<div class="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 bg-slate-800 rounded-md p-2">
		{#each Object.keys(tags) as tag}
			<button
				class="chip p-5 text-base text-slate-300 sm:text-lg {tags[tag]
					? 'variant-filled'
					: 'bg-slate-700'}"
				on:click={() => {
					toggleTag(tag);
				}}
				on:keypress
			>
				<!-- {#if tags[tag]}<span>(icon)</span>{/if} -->
				<span class="capitalize">{tag}</span>
			</button>
		{/each}
	</div>

	<section class="flex justify-end">
		<button on:click={() => resetTags()} class="p-5">Reset</button>
	</section>
</Modal>

<div class="flex h-fit min-h-[12rem] sm:h-48 justify-between m-5 sm:m-10 rounded-lg bg-slate-800">
	<h1 class="p-9 pr-1 m-auto text-center text-xl sm:text-2xl">{$quote}</h1>

	<section class="m-6 flex flex-col justify-between">
		<button on:click={() => getQuote()}>
			<RefreshCcw />
		</button>

		<button on:click={() => (showModal = true)}>
			<Settings />
		</button>

		<button on:click={() => toggleBookmark()}>
			<Bookmark class={`${$bookmark ? 'fill-current' : 'fill-none'}`} />
		</button>
	</section>
</div>
