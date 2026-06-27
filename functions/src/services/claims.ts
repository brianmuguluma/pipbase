import { getAuth } from 'firebase-admin/auth';

export const setCustomUserClaims = async (
  uid: string,
  customUserClaims: object,
) => {
  const { customClaims } = await getAuth().getUser(uid);
  await getAuth().setCustomUserClaims(uid, {
    ...customClaims,
    ...customUserClaims,
  });
};
