/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { setCustomUserClaims as setClaims } from '../services/claims';

export async function setCustomUserClaims(
  data: any,
  context: functions.https.CallableContext,
) {
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.',
    );
  }

  const { uid, customUserClaims } = data;

  try {
    return await setClaims(uid, customUserClaims);
  } catch (error: any) {
    return error;
  }
}
