/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from 'firebase-admin';
import { deleteDeviceTokens } from '../services/tokens';
import { deleteInstances } from '../services/vultr';

export async function deleteUser(user: admin.auth.UserRecord): Promise<void> {
  const { uid } = user;

  try {
    await deleteInstances(uid);
    await deleteDeviceTokens(uid);
    return;
  } catch (e) {
    return console.log(JSON.stringify(e));
  }
}
