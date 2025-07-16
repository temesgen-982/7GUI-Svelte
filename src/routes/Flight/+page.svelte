<script lang="ts">
	type FlightOption = 'one-way flight' | 'return flight';
	let flightType = $state<FlightOption>('one-way flight');

	let flightDate = $state<string>(formatDateLocal(new Date())); // Initialize with today's date as a string
	let returnDate = $state<string>(formatDateLocal(new Date())); // Initialize with today's date as a string

	const handleFlightBooking = (event: Event) => {
		event.preventDefault(); // to avoid page reload
		const msg =
			flightType === 'one-way flight'
				? `Flight booked: ${flightType} on ${flightDate}`
				: `Flight booked: ${flightType}\nDeparture: ${flightDate}\nReturn: ${returnDate}`;

		alert(msg);
	};

	function formatDateLocal(date: Date): string {
		// Change Date to string because input type="date" expects a string in YYYY-MM-DD format
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // converts month from 0-11 to 01-12
		const day = String(date.getDate()).padStart(2, '0'); // converts day from 1-31 to 01-31
		return `${year}-${month}-${day}`;
	}
</script>

<div class="page-container">
	<form class="page-content-container grid gap-3" onsubmit={handleFlightBooking}>
		<select bind:value={flightType} class="rounded border p-2">
			<option>one-way flight</option>
			<option>return flight</option>
		</select>
		<input
			bind:value={flightDate}
			type="date"
			min={formatDateLocal(new Date())}
			class="rounded border p-2"
		/>
		<input
			bind:value={returnDate}
			type="date"
			disabled={flightType === 'one-way flight'}
			min={formatDateLocal(new Date())}
			class="rounded border p-2"
		/>
		<button
			type="submit"
			disabled={new Date(returnDate) < new Date(flightDate)}
			class="rounded border bg-neutral-300 p-2 disabled:bg-red-300">Book</button
		>
	</form>
	<div class="page-icon-container">
		<img src="/assets/images/icon-airplane.svg" alt="Airplane icon" />
	</div>
</div>
