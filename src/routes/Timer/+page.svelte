<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { linear } from 'svelte/easing';

	let duration = $state(10);
	let elapsedTime = $state(0);
	let interval: number;

	$effect(() => {
		if (interval) {
			clearInterval(interval);
		}

		if (elapsedTime < duration) {
			interval = setInterval(() => {
				if (elapsedTime < duration) {
					elapsedTime += 1;
				} else {
					clearInterval(interval);
					interval = 0;
				}
			}, 1000);
		}

		// runs when the component unmounts or when the effect re-runs
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	});
</script>

<div class="page-container">
	<div class="page-content-container grid min-w-sm gap-3">
		<div class="flex">
			<span>Elapsed Time:</span>
			<div class="flex h-5 w-full items-center rounded-full border bg-gray-200 px-0.5">
				<div
					class="h-4 rounded-full bg-blue-600"
					style="width: {(elapsedTime / duration) * 100}%;"
				></div>
			</div>
		</div>
		<span>{elapsedTime}</span>
		<label class="flex gap-2">
			<span> Duration: </span>
			<input type="range" class="grow" bind:value={duration} max="300" />
		</label>
		<button
			onclick={() => {
				elapsedTime = 0;
			}}
			class="rounded border p-2"
		>
			Reset
		</button>
	</div>
	<div class="page-icon-container">
		<img src="/assets/images/icon-time.svg" alt="Timer icon" />
	</div>
</div>
