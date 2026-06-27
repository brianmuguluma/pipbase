/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { listInstances as getInstances } from '../../services/vultr';

export async function listInstances(
  data: any,
  context: functions.https.CallableContext,
) {
  const { token, uid } = context.auth!;
  const { parameters } = data;

  if (uid !== parameters.label && !token.admin) return;

  try {
    return await getInstances(parameters);
  } catch (error: any) {
    return error;
  }
}
