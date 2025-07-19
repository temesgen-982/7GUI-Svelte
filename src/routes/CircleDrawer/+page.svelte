<script lang="ts">
	import DiameterSlider from './DiameterSlider.svelte';
	import type { Circle } from '$lib/types';

	import { createHistory } from '$lib/history.svelte';

	const circleHistory = createHistory<Circle[]>([]);

	// this is out canvas
	let svgElement: SVGSVGElement;

	// currently selected circle
	let selectedCircle = $state<Circle | null>(null);

	function handleClick(event: MouseEvent) {
		const svgRect = svgElement.getBoundingClientRect();

		const x = event.clientX - svgRect.left;
		const y = event.clientY - svgRect.top;
		const newCircle: Circle = {
			id: Date.now(),
			x: x,
			y: y,
			r: 25
		};

		// we create a new array and 'update' the history
		const newCircles = [...circleHistory.current, newCircle];
		console.log(circleHistory.current);
		circleHistory.update(newCircles);
	}

	// this function is passed to the diameter slider
	// and will update our radius
	function handleRadiusUpdate(newRadius: number) {
		if (selectedCircle) {
			// to update a circle, we map over the current
			// state to create a new one
			const newCircles = circleHistory.current.map((c) =>
				c.id === selectedCircle?.id ? { ...c, r: newRadius } : c
			);
			circleHistory.update(newCircles);
		}
	}
</script>

<div class="page-container">
	<div class="page-content-container">
		<div class="relative container">
			<div class="flex gap-2 py-2">
				<button
					onclick={circleHistory.undo}
					disabled={!circleHistory.canUndo}
					class="rounded border bg-white px-2 py-1">Undo</button
				>
				<button
					onclick={circleHistory.redo}
					disabled={!circleHistory.canRedo}
					class="rounded border bg-white px-2 py-1">Redo</button
				>
			</div>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<svg
				width="600"
				height="200"
				class=" rounded border bg-white/90"
				role="img"
				bind:this={svgElement}
				onclick={handleClick}
			>
				{#each circleHistory.current as circle (circle.id)}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<circle
						cx={circle.x}
						cy={circle.y}
						r={circle.r}
						stroke="blue"
						stroke-width="2"
						fill={selectedCircle?.id === circle.id ? '#ccc' : 'transparent'}
						oncontextmenu={(event) => {
							event.preventDefault();
							selectedCircle = circle;
						}}
					/>
				{/each}
			</svg>
			{#if selectedCircle}
				<div
					class="absolute z-20"
					style="top: {selectedCircle.y + 80}px; left: {selectedCircle.x - 70}px;"
				>
					<DiameterSlider
						initialRadius={selectedCircle.r}
						onUpdate={handleRadiusUpdate}
						onClose={() => (selectedCircle = null)}
					/>
				</div>
			{/if}
		</div>
	</div>
	<div class="page-icon-container">
		<img src="/assets/images/icon-circles.svg" alt="Circles icon" />
	</div>
</div>
