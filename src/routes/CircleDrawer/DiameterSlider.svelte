<script lang="ts">
	import { onMount } from 'svelte';

	let { initialRadius, onUpdate, onClose } = $props();
	let radius = $state(initialRadius);

	let dialogElement: HTMLDialogElement;

	onMount(() => {
		dialogElement.show();
	});

	$effect(() => {
		onUpdate(radius);
	});
</script>

<dialog bind:this={dialogElement} onclose={onClose} class="flex flex-col gap-2 rounded border p-3">
	<h3>Adjust Diameter</h3>
	<input type="range" min="5" max="200" bind:value={radius} />
	<p>Radius: {radius}px</p>
	<button onclick={onClose} class="rounded border p-2">Close</button>
</dialog>
