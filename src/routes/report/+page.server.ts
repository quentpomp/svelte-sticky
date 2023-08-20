import { prisma } from '$lib/server/database';
import { redirect, type Actions, fail } from '@sveltejs/kit';

export const actions = {
	report_bug: async ({ locals, request }) => {
		if (!locals.user) {
			throw redirect(302, '/auth');
		}
		console.log('creating a bug report by account:', locals.user.id);
		const data = await request.formData();
		const title = data.get('title');
		const description = data.get('description');
		if (typeof title !== 'string' || !title || typeof description !== 'string' || !description)
			return fail(400, { invalid: true });
		const add_bug_report = await prisma.bug_report.create({
			data: {
				user_id: locals.user.id,
				title,
				description
			}
		});
        
		throw redirect(302, '/stickies');
	}
} satisfies Actions;
