/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { getAuth } from 'firebase-admin/auth';

export async function getUserByEmail(
  data: any,
  context: functions.https.CallableContext,
) {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called by an admin.',
    );
  }

  try {
    const { email } = data;
    return await getAuth().getUserByEmail(email);
  } catch (error: any) {
    return error;
  }
}
