/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { initialize } from '@vultr/vultr-node';
import { getSecret } from '../../services/secrets';

export async function reinstallInstance(
  data: any,
  context: functions.https.CallableContext,
) {
  const { uid, token } = context.auth!;
  const { parameters } = data;

  if (uid !== parameters.uid && !token.admin) return;

  try {
    const apiKey = await getSecret('VULTR_PERSONAL_ACCESS_TOKEN');
    const { reinstallInstance } = initialize({ apiKey }).instances;
    return await reinstallInstance(parameters);
  } catch (error) {
    return error;
  }
}
