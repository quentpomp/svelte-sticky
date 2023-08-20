import { prisma } from '$lib/server/database';
import { generate_key } from '$lib/utils/encryption.js';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/stickies');
};

export const actions = {
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { invalid: true });
		}

		const user = await prisma.users.findUnique({
			where: { username }
		});

		if (user) {
			return fail(400, { user: true });
		}
		const session = crypto.randomUUID();
		const created_user = await prisma.users.create({
			data: {
				username,
				first_name: '',
				last_name: '',
				email: '',
				password_hash: await bcrypt.hash(password, 10),
				is_verified: true,
				tier: 'FREE',
				role: 'USER',
				profile_picture: '',
				last_login_at: new Date(),
				encryption_key: generate_key(),
				session: session,
				sessions: [session]
			}
		});
		console.log(created_user)
		cookies.set('session', created_user.session ?? '', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 30
		});
		throw redirect(302, '/settings');
	},
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { invalid: true });
		}

		const user = await prisma.users.findUnique({ where: { username: username } });

		if (!user) {
			return fail(400, { exists: true });
		}

		const authenticate = await bcrypt.compare(password, user.password_hash);

		if (!authenticate) {
			return fail(400, { credentials: true });
		}

		let session = crypto.randomUUID();
		const authenticated = await prisma.users.update({
			where: { username: user.username },
			data: {
				session,
				sessions: {
					push: session
				}
			}
		});

		cookies.set('session', authenticated.session ?? '', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 30
		});
		throw redirect(302, '/');
	},
	logout: async ({ cookies, locals }) => {
		cookies.set('session', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false
		});

		locals.user = undefined;
		throw redirect(302, '/auth');
	},
	delete_account: async ({cookies, locals}) => {
		if (!locals.user) throw redirect(302, '/auth');
		console.log('deleting account', locals.user?.id);

		const delete_stickies = await prisma.sticky_notes.deleteMany({
			where: {
				user_id: locals.user.id
			}
		})

		const delete_folders = await prisma.folder.deleteMany({
			where: {
				user_id: locals.user.id
			}
		})

		const delete_user = await prisma.users.delete({
			where: {
				id: locals.user.id
			}
		});

		cookies.set('session', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false
		});

		locals.user = undefined;
		throw redirect(302, '/auth');
	}
} satisfies Actions;
