<script lang="ts">
	let { initialRadius, onRadiusChange, onClose, modalX, modalY } = $props();
	let sliderValue = $state(initialRadius);

	$effect(() => {
		sliderValue = initialRadius;
	});

	function handleSliderInput(event: Event) {
		// Get the value from the input element and convert it to a number.
		const value = parseInt((event.target as HTMLInputElement).value, 10);

		// Update the internal state of the slider component for display.
		sliderValue = value;

		// Call the parent's callback function to update the circle's radius.
		onRadiusChange(value);
	}
</script>

<div class="absolute top-{modalY} left-{modalX}">
	<h3>Adjust Diameter</h3>
	<input type="range" min="5" max="200" value={sliderValue} oninput={handleSliderInput} />
	<p>Radius: {sliderValue}px</p>
	<button onclick={onClose}>Close</button>
</div>
