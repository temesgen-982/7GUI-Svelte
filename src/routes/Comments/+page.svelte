<script>
	let { data, form } = $props();
</script>

<div class="grid grid-cols-2 gap-4 p-4">
	<div class="grid gap-3 rounded border bg-white p-2">
		<div>
			<h1>{data.post.Title}</h1>
			<article class="prose">
				{@html data.post.Text}
			</article>
		</div>
		<hr />
		<h2>Comments</h2>
		<div class="grid gap-2">
			{#if data.comments.length > 0}
				{#each data.comments as comment (comment.id)}
					<div class="rounded border p-2">
						<p><strong>{comment.author}</strong> says:</p>
						<p>{comment.text}</p>
					</div>
				{/each}
			{:else}
				<p>No comments yet. Be the first to comment!</p>
			{/if}
		</div>
	</div>

	<form method="post" class="grid content-start gap-4 rounded border bg-white p-4">
		{#if form?.errors?.author}
			<p>author field is required</p>
		{/if}
		<label>
			Author:
			<input
				type="text"
				name="author"
				required
				value={form?.author ?? ''}
				class="w-full rounded border p-2"
			/>
		</label>

		{#if form?.errors?.commentText}
			<p>comment error</p>
		{/if}
		<label>
			Comment:
			<input
				type="text"
				name="commentText"
				required
				value={form?.commentText ?? ''}
				class="w-full rounded border p-2"
			/>
		</label>
		<button type="submit" class="rounded border p-2">Submit Comment</button>
	</form>
</div>
