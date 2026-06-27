import { createInstance } from '../../services/vultr';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { setCustomUserClaims } from '../../services/claims';

export const createSubscription = async (
  event: FirestoreEvent<QueryDocumentSnapshot | undefined>,
) => {
  const { data, params } = event;
  const { uid } = params;

  if (data?.data().status !== 'active') return;

  try {
    await setCustomUserClaims(uid, { premium: true });
    await createInstance(uid);
  } catch (error) {
    console.log(error);
    return;
  }
};
