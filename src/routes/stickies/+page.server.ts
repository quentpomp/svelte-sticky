import { prisma } from '$lib/server/database';
import { toggle_toast } from '$lib/store/store.js';
import { decrypt_data, encrypt_data } from '$lib/utils/encryption.js';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/auth');
	let folder_id = (url.searchParams.get('folder') as string) || '-1';
	const stickies = await prisma.sticky_notes.findMany({
		where: {
			user_id: locals.user.id,
			folder_id: parseInt(folder_id)
		},
		orderBy: {
			created_at: 'desc'
		}
	});
	

	for (const sticky of stickies) {
		sticky.title = decrypt_data(sticky.title, locals.user.encryption_key);
		sticky.description = decrypt_data(sticky.description ?? '', locals.user.encryption_key);
	}
	return {
		stickies
	};
};

export const actions = {
	add_sticky: async ({ request, locals }) => {
		console.log(`adding a sticky to account: ${locals.user?.id}`);
		if (!locals.user) {
			return fail(400, { user: true });
		}
		const data = await request.formData();
		const title = data.get('title');
		const description = data.get('description');
		const type = data.get('type');
		const is_private = data.get('is_private');
		const folder_id = data.get('folder_id');
		const files = data.getAll('files');
		console.log(files);
		if (
			typeof title !== 'string' ||
			typeof description !== 'string' ||
			typeof type !== 'string' ||
			typeof is_private !== 'string' ||
			typeof folder_id !== 'string' ||
			!folder_id ||
			!parseInt(folder_id) ||
			!title ||
			!description ||
			!type ||
			!is_private
		) {
			console.log(`failed to add a sticky to account: ${locals.user?.id}`);
			return fail(400, { invalid: true });
		}

		if (locals.user.tier == 'FREE') {
			const count_current_stickies = await prisma.sticky_notes.findMany({
				where: { user_id: locals.user.id}
			})
			if (count_current_stickies.length >= 20) {
				console.log(
					'subscription level action only. cannot add new sticky to account:',
					locals.user.id
				);

				return fail(400, { subscription: true });
			}
		}

		const encrypted_title = encrypt_data(title, locals.user.encryption_key);
		const encrypted_description = encrypt_data(description, locals.user.encryption_key);

		const new_sticky = await prisma.sticky_notes.create({
			data: {
				title: encrypted_title,
				description: encrypted_description,
				file_urls: [],
				type,
				is_private: is_private === 'true' ? true : false,
				user_id: locals.user?.id,
				folder_id: parseInt(folder_id),
				updated_at: new Date()
			}
		});
	},
	update_sticky: async ({ request, locals }) => {
		console.log(`updating a sticky for account: ${locals.user?.id}`);
		if (!locals.user) {
			console.log('fail no user');
			return fail(400, { user: true });
		}
		const data = await request.formData();
		const id = data.get('id');
		const title = data.get('title');
		const description = data.get('description');
		const is_private = data.get('is_private');

		if (
			typeof id !== 'string' ||
			!parseInt(id) ||
			typeof title !== 'string' ||
			typeof description !== 'string' ||
			typeof is_private !== 'string' ||
			!title ||
			!is_private ||
			!id
		) {
			console.log(`failed to update a sticky for account: ${locals.user?.id}`);
			return fail(400, { invalid: true });
		}
		const encrypted_title = encrypt_data(title, locals.user.encryption_key);
		const encrypted_description = encrypt_data(description, locals.user.encryption_key);

		const update_sticky = await prisma.sticky_notes.update({
			where: { id: parseInt(id) },
			data: {
				title: encrypted_title,
				description: encrypted_description,
				is_private: is_private === 'true' ? true : false,
				updated_at: new Date()
			}
		});
		console.log(update_sticky)
	},
	delete_sticky: async ({ request, locals }) => {
		console.log(`deleting a sticky from account: ${locals.user?.id}`);
		if (!locals.user) {
			return fail(400, { user: true });
		}
		const data = await request.formData();
		const id = data.get('id');

		if (typeof id !== 'string' || !id || !parseInt(id)) return fail(400, { invalid: true });

		const delete_sticky = await prisma.sticky_notes.delete({
			where: { id: parseInt(id) }
		});
	},
	add_folder: async ({ request, locals }) => {
		console.log(`adding a folder to account: ${locals.user?.id}`);
		if (!locals.user) {
			return fail(400, { user: true });
		}

		const data = await request.formData();
		const parent_id = data.get('parent_id');

		if (typeof parent_id !== 'string' || !parent_id || !parseInt(parent_id))
			return fail(400, { invalid: true });

		const add_folder = await prisma.folder.create({
			data: {
				name: 'New folder',
				user_id: locals.user.id,
				parent_id: parseInt(parent_id)
			}
		});
	},
	update_folder: async ({ request, locals }) => {
		console.log(`updating a folder for account: ${locals.user?.id}`);
		if (!locals.user) {
			return fail(400, { user: true });
		}

		const data = await request.formData();
		const name = data.get('name');
		const id = data.get('id');
		const parent_id = data.get('parent_id');

		if (
			typeof parent_id !== 'string' ||
			!parent_id ||
			!parseInt(parent_id) ||
			typeof id !== 'string' ||
			!id ||
			!parseInt(id) ||
			typeof name !== 'string' ||
			!name
		)
			return fail(400, { invalid: true });

		const update_folder = await prisma.folder.update({
			where: { id: parseInt(id) },
			data: {
				name,
				parent_id: parseInt(parent_id)
			}
		});
	},
	delete_folder: async ({ request, locals }) => {
		console.log(`deleting a folder for account: ${locals.user?.id}`);
		if (!locals.user) {
			return fail(400, { user: true });
		}

		const data = await request.formData();
		const name = data.get('name');
		const id = data.get('id');
		const parent_id = data.get('parent_id');

		if (
			typeof parent_id !== 'string' ||
			!parent_id ||
			!parseInt(parent_id) ||
			typeof id !== 'string' ||
			!id ||
			!parseInt(id) ||
			typeof name !== 'string' ||
			!name
		)
			return fail(400, { invalid: true });

		const delete_folder = await prisma.folder.delete({
			where: { id: parseInt(id) }
		});

		const delete_stickies = await prisma.sticky_notes.deleteMany({
			where: {
				folder_id: parseInt(id)
			}
		});
		throw redirect(302, "/stickies")
	}
} satisfies Actions;
