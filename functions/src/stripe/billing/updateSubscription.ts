import { Change, FirestoreEvent } from 'firebase-functions/v2/firestore';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { deleteInstances } from '../../services/vultr';
import { setCustomUserClaims } from '../../services/claims';
import { getSecret } from '../../services/secrets';
import { Realtime, Types } from 'ably';

export const updateSubscription = async (
  event: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined>,
) => {
  let premium = false;
  const { data, params } = event;
  const { uid } = params;
  const status = data?.after.data().status;

  try {
    if (status === 'canceled') {
      premium = false;
      await deleteInstances(uid);
    } else {
      premium = true;
      const key = await getSecret('ABLY_PUBLISHER_API_KEY');
      const command = 'UPDATE_BILLING';
      const options: Types.ClientOptions = { key };
      const client = new Realtime(options);
      const channel = client.channels.get('signals');
      await client.connection.once('connected');

      channel.publish(uid, { command });
    }
    await setCustomUserClaims(uid, { premium });
  } catch (error) {
    console.log(error);
    return;
  }
};
