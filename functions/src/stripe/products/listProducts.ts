/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';
import { getSecret } from '../../services/secrets';

export async function listProducts(
  data: any,
  context: functions.https.CallableContext,
) {
  if (!context.auth) return;

  const config: Stripe.StripeConfig = { apiVersion: '2023-08-16' };
  const { params } = data;

  try {
    const secret = await getSecret('STRIPE_API_KEY');
    if (!secret) return;

    const stripe = new Stripe(secret, config);
    return await stripe.products.list(params);
  } catch (error) {
    return error;
  }
}
