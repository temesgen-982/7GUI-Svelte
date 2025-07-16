<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let celsius = $state(0);

	let fahrenheit = $derived((celsius * 9) / 5 + 32);

	function convertToCelsius(fahrenheit: number) {
		celsius = ((fahrenheit - 32) * 5) / 9;
	}

	let imageSrc = $derived(() => {
		if (celsius <= 0) return '/assets/images/icon-weather-cold.svg';
		if (celsius >= 100) return '/assets/images/icon-weather-hot.svg';
		return '/assets/images/icon-weather-normal.svg';
	});

	let imageAlt = $derived(() => {
		if (celsius <= 0) return 'Cold weather icon';
		if (celsius >= 100) return 'Hot weather icon';
		return 'Normal weather icon';
	});
</script>

<div class="page-container">
	<div class="page-content-container">
		<input bind:value={celsius} type="number" class="rounded border px-2" />
		<span>Celsius</span>
		<input
			bind:value={() => fahrenheit, convertToCelsius}
			type="number"
			class="rounded border px-2"
		/>
		<span>Fahrenheit</span>
	</div>
	<div class="page-icon-container">
		{#key imageSrc()}
			<img
				src={imageSrc()}
				alt={imageAlt()}
				in:fly={{ y: 50, duration: 300, easing: cubicOut }}
				out:fly={{ y: -50, duration: 400, easing: cubicOut }}
			/>
		{/key}
	</div>
</div>
