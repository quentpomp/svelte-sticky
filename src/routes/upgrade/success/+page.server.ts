import { prisma } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import stripe from '../_stripe';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
    if (!locals.user) throw redirect(302, '/auth')
    
	const checkout_session_id = url.searchParams.get('session_id') ?? '';

	const checkout_response = await stripe.checkout.sessions.retrieve(checkout_session_id);

	const update_subscription = await prisma.users.update({
	    where: { id: locals.user.id },
	    data: {
	        tier: "PRO",
            subscription: checkout_response.subscription?.toString() ?? null
	    }
	})
	throw redirect(303, '/settings');
};
