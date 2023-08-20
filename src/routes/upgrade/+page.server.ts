import { fail, type Actions, redirect } from '@sveltejs/kit';
import stripe from './_stripe';
import { prisma } from '$lib/server/database';

export const actions = {
	stripe_checkout_session: async ({ request, url, cookies }) => {
		const data = await request.formData();
		const price_id = data.get('price_id');
		if (!price_id || typeof price_id !== 'string') return fail(400, { invalid: true });

      
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
              {
                price: price_id,
                quantity: 1,
              },
            ],
            metadata: {
                session: cookies.get('session') ?? ''
            },
            success_url: `${url.origin}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url.origin}/upgrade/canceled`,
          });

          throw redirect(303, session.url ?? '/upgrade');

	},
    downgrade: async ({ locals }) => {
        if (!locals.user) throw redirect(302, '/auth');

        const subscription = await stripe.subscriptions.cancel(locals.user.subscription);

        const update_user = await prisma.users.update({
            where: { id: locals.user.id },
            data: {
                tier: "FREE",
                subscription: null
            }
        })

    }
} satisfies Actions;
