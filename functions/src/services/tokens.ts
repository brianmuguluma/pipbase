import { firestore } from 'firebase-admin';

export const getTokens = async (uid: string) => {
  const devices = await firestore()
    .collection('devices')
    .where('uid', '==', uid)
    .get();
  return devices.docs.map((token) => token.id);
};

export const deleteDeviceTokens = async (uid: string) => {
  const devices = await getTokens(uid);

  for await (const device of devices) {
    await firestore().doc(`devices/${device}`).delete();
  }
};
