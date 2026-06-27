/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { createInstance as createNewInstance } from '../../services/vultr';

export async function createInstance(
  data: any,
  context: functions.https.CallableContext,
) {
  const { uid, token } = context.auth!;
  const { parameters } = data;

  if (uid !== parameters.uid && !token.admin) return;

  try {
    await createNewInstance(uid);
    return;
  } catch (error) {
    return error;
  }
}
