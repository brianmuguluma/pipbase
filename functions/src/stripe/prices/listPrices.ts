/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stripe } from 'stripe';
import { getSecret } from '../../services/secrets';

export async function listPrices(data: any) {
  const config: Stripe.StripeConfig = { apiVersion: '2023-08-16' };
  const { params } = data;

  try {
    const secret = await getSecret('STRIPE_API_KEY');
    if (!secret) return;

    const { prices } = new Stripe(secret, config);
    return await prices.list(params);
  } catch (error) {
    return error;
  }
}
