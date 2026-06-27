/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { initialize } from '@vultr/vultr-node';
import { getSecret } from '../../services/secrets';

export async function getAccountInfo(
  data: any,
  context: functions.https.CallableContext,
) {
  if (!context.auth) return;

  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.',
    );
  }

  try {
    const { parameters } = data;
    const apiKey = await getSecret('VULTR_PERSONAL_ACCESS_TOKEN');
    const { getAccountInfo } = initialize({ apiKey }).account;

    return await getAccountInfo(parameters);
  } catch (error: any) {
    return error;
  }
}
