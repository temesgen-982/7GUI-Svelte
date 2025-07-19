<script lang="ts">
	import { onMount } from 'svelte';

	let { initialRadius, onUpdate, onClose } = $props();
	let radius = $state(initialRadius);

	let dialogElement: HTMLDialogElement;

	onMount(() => {
		dialogElement.showModal();
	});

	$effect(() => {
		onUpdate(radius);
	});
</script>

<dialog bind:this={dialogElement} onclose={onClose}>
	<h3>Adjust Diameter</h3>
	<input type="range" min="5" max="200" bind:value={radius} />
	<p>Radius: {radius}px</p>
	<button onclick={onClose}>Close</button>
</dialog>
