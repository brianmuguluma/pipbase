/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { getAuth } from 'firebase-admin/auth';

export async function getUser(
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
    const { uid } = data;
    return await getAuth().getUser(uid);
  } catch (error: any) {
    return error;
  }
}
