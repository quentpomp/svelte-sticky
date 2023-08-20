import Stripe from 'stripe';
import { STRIPE_TEST_SKEY, STRIPE_SKEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SKEY, {
	apiVersion: '2022-11-15'
});

export default stripe;
