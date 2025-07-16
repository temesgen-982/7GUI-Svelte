<script lang="ts">
	import DiameterSlider from './DiameterSlider.svelte';

	type Circle = {
		id: number;
		x: number;
		y: number;
		r: number;
		color: string;
	};

	// visible circles
	let circles = $state<Circle[]>([
		{
			id: 0,
			x: 150,
			y: 100,
			r: 50,
			color: 'white'
		}
	]);
	let nextId = $state(1); // Simple ID counter

	// the clicked on circle
	let selectedCircleId = $state<number | null>(null);

	// diameter modal
	let showDiameterModal = $state(false);
	let modalX = $state(0);
	let modalY = $state(0);

	// undo/redo
	let history = $state<Circle[][]>()!;
	let historyIndex = $state<number>(-1); // -1 means no history yet

	// Initialize history with the current circles
	$effect(() => {
		if (historyIndex === -1) {
			pushHistory();
		}
	});

	// add the current visible 'circles' to history
	function pushHistory() {
		// If undo is clicked, discard future history
		if (historyIndex < history.length - 1) {
			history = history?.slice(0, historyIndex + 1);
		}

		history = [...history, JSON.parse(JSON.stringify(circles))];
		historyIndex++;

		console.log('history pushed. New index: ', historyIndex, 'History length: ', history.length);
	}

	function findCircleById(id: number): Circle | undefined {
		return circles.find((c) => c.id === id);
	}

	function distance(x1: number, y1: number, x2: number, y2: number) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	function findNearestCircle(mouseX: number, mouseY: number): Circle | null {
		let nearest: Circle | null = null;
		let minDistance = Infinity;
		const clickTolerance = 5;

		for (const circle of circles) {
			const dist = distance(mouseX, mouseY, circle.x, circle.y);
			if (dist <= circle.r + clickTolerance && dist < minDistance) {
				minDistance = dist;
				nearest = circle;
			}
		}

		return nearest;
	}

	function updateCircle(id: number, updates: Partial<Circle>) {
		circles = circles.map((c) => (c.id === id ? { ...c, ...updates } : c));
	}

	function handleSvgClick(event: MouseEvent) {
		const svgElement = event.currentTarget as SVGSVGElement;
		const svgRect = svgElement.getBoundingClientRect();

		const mouseX = event.clientX - svgRect.left;
		const mouseY = event.clientY - svgRect.top;

		const nearestCircle = findNearestCircle(mouseX, mouseY);

		if (nearestCircle) {
			selectedCircleId = nearestCircle.id;
		} else {
			selectedCircleId = null;
			circles = [...circles, { id: ++nextId, x: mouseX, y: mouseY, r: 20, color: 'none' }];
		}
	}

	function handleSvgContextMenu(event: MouseEvent) {
		event.preventDefault();

		const svgElement = event.currentTarget as SVGSVGElement;
		const svgRect = svgElement.getBoundingClientRect();

		const mouseX = event.clientX - svgRect.left;
		const mouseY = event.clientY - svgRect.top;

		const nearestCircle = findNearestCircle(mouseX, mouseY);

		if (nearestCircle) {
			selectedCircleId = nearestCircle.id;
			showDiameterModal = true;
			modalX = event.clientX;
			modalY = event.clientY;
		} else {
			selectedCircleId = null;
		}
	}

	function handleRadiusChange(newRadius: number) {
		if (selectedCircleId !== null) {
			updateCircle(selectedCircleId, { r: newRadius });
		}
	}

	function handleCloseModal() {
		showDiameterModal = false;
	}
</script>

<div class="page-container">
	<div class="page-content-container">
		<div class="relative container">
			<div class="flex gap-2 py-2">
				<button disabled class="rounded border bg-white px-2 py-1">Undo</button>
				<button disabled class="rounded border bg-white px-2 py-1">Redo</button>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<svg
				width="600"
				height="200"
				class="rounded border bg-white/90"
				onclick={handleSvgClick}
				oncontextmenu={handleSvgContextMenu}
				role="img"
			>
				{#each circles as circle (circle.id)}
					<circle
						cx={circle.x}
						cy={circle.y}
						r={circle.r}
						fill={selectedCircleId === circle.id ? 'rgba(0, 0, 0, 0.2)' : 'none'}
						stroke="blue"
						stroke-width="2"
					/>
				{/each}
			</svg>
			{#if showDiameterModal && selectedCircleId !== null}
				{@const selectedCircle = findCircleById(selectedCircleId)}
				{#if selectedCircle}
					<DiameterSlider
						initialRadius={selectedCircle.r}
						onRadiusChange={handleRadiusChange}
						onClose={handleCloseModal}
						{modalX}
						{modalY}
					/>
				{/if}
			{/if}
		</div>
	</div>
	<div class="page-icon-container">
		<img src="/assets/images/icon-circles.svg" alt="Circles icon" />
	</div>
</div>
