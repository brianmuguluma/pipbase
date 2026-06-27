/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { initialize } from '@vultr/vultr-node';
import { getSecret } from '../../services/secrets';

export async function rebootInstance(
  data: any,
  context: functions.https.CallableContext,
) {
  const { uid, token } = context.auth!;
  const { parameters } = data;

  if (uid !== parameters.uid && !token.admin) return;

  try {
    const apiKey = await getSecret('VULTR_PERSONAL_ACCESS_TOKEN');
    const { rebootInstance } = initialize({ apiKey }).instances;
    return await rebootInstance(parameters);
  } catch (error) {
    return error;
  }
}
