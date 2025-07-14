<script>
	let celsius = $state(0);
	let fahrenheit = $state(0);

	const changeToFahrenheit = () => {
		fahrenheit = (celsius * 5) / 9;
	};

	const changeToCelsius = () => {
		celsius = (fahrenheit * 5) / 9;
	};
</script>

<div class="flex gap-2">
	<input
		bind:value={celsius}
		onkeydown={changeToFahrenheit}
		type="number"
		class="rounded border px-2"
	/>
	<span>Celsius</span>
	<input
		bind:value={fahrenheit}
		onkeydown={changeToCelsius}
		type="number"
		class="rounded border px-2"
	/>
	<span>Fahrenheit</span>
</div>
