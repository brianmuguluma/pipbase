/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';
import { Realtime, Types } from 'ably';
import { getSecret } from '../services/secrets';

export const deleteDevice = async (
  event: FirestoreEvent<QueryDocumentSnapshot | undefined>,
) => {
  const { data } = event;
  if (!data) return;

  const command = 'REMOVE_DEVICE_TOKEN';
  const { token, uid } = data.data();

  try {
    const key = await getSecret('ABLY_PUBLISHER_API_KEY');
    const options: Types.ClientOptions = { key };
    const client = new Realtime(options);
    const channel = client.channels.get('signals');
    await client.connection.once('connected');

    return channel.publish(uid, { command, token });
  } catch (e) {
    console.log(JSON.stringify(e));
    return;
  }
};
