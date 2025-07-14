import { fail } from '@sveltejs/kit';

const post = {
	Title: 'Hey there nigga',
	Text: '<p>How you doing nigga</p>'
};
const comments = [{ id: 1, author: 'Alice', text: 'Great post! Very informative.' }];

export async function load() {
	return { post, comments };
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const author = data.get('author')?.toString().trim();
		const commentText = data.get('commentText')?.toString().trim();

		const errors: { author?: boolean; commentText?: boolean } = {};
		let isInvalid = false;

		if (!author) {
			isInvalid = true;
			errors.author = true;
		}

		if (!commentText) {
			isInvalid = true;
			errors.commentText = true;
		}

		if (isInvalid) {
			return fail(400, {
				author,
				commentText,
				errors
			});
		}
		const newComment = {
			id: comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
			author: author!,
			text: commentText!
		};

		comments.push(newComment);

		return { success: true };
	}
};
