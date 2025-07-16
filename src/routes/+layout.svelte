<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto] bg-neutral-200">
	<nav class="flex items-center justify-center self-start border-b p-4">
		<ul class="flex gap-4">
			<li><a href="/Counter">Counter</a></li>
			<li><a href="/TempratureConverter">Temprature</a></li>
			<li><a href="/Flight">Flight</a></li>
			<li><a href="/Timer">Timer</a></li>
			<li><a href="/CRUD">CRUD</a></li>
			<li><a href="/CircleDrawer">Circle Drawer</a></li>
			<li><a href="/Cells">Cells</a></li>
			<li><a href="/Comments">Comments</a></li>
		</ul>
	</nav>
	<main class="flex h-full w-full">
		{@render children()}
	</main>
	<footer class="self-end border-t p-4 text-center">
		<p>Built by <a href="/">@temesgen-982</a></p>
	</footer>
</div>
