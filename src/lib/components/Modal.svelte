<script lang="ts">
	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="bg-inherit"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click|stopPropagation
		class="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 bg-slate-800 rounded-md p-2"
	>
		<slot />
	</div>

	<section class="flex justify-end items-center mx-3">
		<slot name="reset" />

		<div class="bg-slate-100 p-3 my-2 mx-1 rounded-lg">
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog.close()}>Close</button>
		</div>
	</section>
</dialog>
