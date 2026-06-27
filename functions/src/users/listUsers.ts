/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { getAuth } from 'firebase-admin/auth';

export async function listUsers(
  data: any,
  context: functions.https.CallableContext,
) {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.',
    );
  }

  try {
    const { maxResults, pageToken } = data;
    return await getAuth().listUsers(maxResults, pageToken);
  } catch (error: any) {
    return error;
  }
}
