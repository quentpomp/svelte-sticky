import { prisma } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import stripe from '../_stripe';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
    if (!locals.user) throw redirect(302, '/auth')


	throw redirect(303, '/stickies');
};
