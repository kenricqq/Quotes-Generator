<script lang="ts">
	import '../app.postcss'

	// Floating UI for Popups
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow,
	} from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

	import { onMount } from 'svelte'
	import { setupThree } from '$lib/threeSetup'

	let canvasElement: HTMLCanvasElement

	onMount(() => {
		if (window.innerHeight > 500 && window.innerWidth > 500) {
			setupThree(canvasElement)
		}
	})
</script>

<canvas class="webgl" bind:this={canvasElement} />

<slot />

<style>
	.webgl {
		position: fixed;
		z-index: -1;
	}
</style>
