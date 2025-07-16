<script>
	let count = $state(0);
</script>

<div class="page-container">
	<div class="page-content-container">
		<button class="rounded border p-6" onclick={() => count++}>{count}</button>
	</div>
	<div class="page-icon-container">
		<img src="/assets/images/icon-time.svg" alt="Count Icon" />
	</div>
</div>
