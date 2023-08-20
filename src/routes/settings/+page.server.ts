import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { S3 } from '$lib/server/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3_BUCKET } from '$env/static/private';
import { prisma } from '$lib/server/database';
import { encrypt_data } from '$lib/utils/encryption';

export const load: PageServerLoad = ({ locals }) => {
    if (!locals.user) throw redirect(302, '/auth');

	return {
		user: locals.user
	};
};

export const actions = {
	update_user: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth');
		}
		console.log('updating user account: ', locals.user.id);
		const data = await request.formData();
		const profile_picture = data.get('profile_picture') as File;
		const first_name = data.get('first_name') as string;
		const last_name = data.get('last_name') as string;
		const username = data.get('username') as string;
		const email = data.get('email') as string;
		const delete_profile_pic = data.get('delete_profile_pic') as string;


		const encoded_profile_picture = encrypt_data(
			`${locals.user.id}${profile_picture.name ?? ''}`,
			locals.user.encryption_key
		);
		if (profile_picture.size > 0) {
			console.log('updating profile picture', profile_picture);
			const send = await S3.send(
				new PutObjectCommand({
					Bucket: S3_BUCKET,
					Key: encoded_profile_picture,
					Body: (await profile_picture.arrayBuffer()) as Buffer
				})
			);
		}

        const user = await prisma.users.findUnique({
			where: { username }
		});

		if (user && user.id !== locals.user.id) {
			return fail(400, { user: true });
		}

		if (delete_profile_pic === 'true') {
			const update_user = await prisma.users.update({
				where: {
					id: locals.user.id
				},
				data: {
					profile_picture: '',
					first_name,
                    username,
					last_name,
					email
				}
			});
		} else {
			const update_user = await prisma.users.update({
				where: {
					id: locals.user.id
				},
				data: {
					profile_picture:
						profile_picture.size > 0
							? new URL(`https://cdn.nassaulabs.xyz/${encoded_profile_picture}`).href
							: locals.user.profile_picture,
                    username,
					first_name,
					last_name,
					email
				}
			});
		}
	}
} satisfies Actions;
