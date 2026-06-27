/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from 'firebase-functions';
import { initialize } from '@vultr/vultr-node';
import { getSecret } from '../../services/secrets';
import { listInstances } from '../../services/vultr';

export async function startInstance(
  data: any,
  context: functions.https.CallableContext,
) {
  const { uid, token } = context.auth!;
  const { parameters } = data;

  if (uid !== parameters.uid && !token.admin) return;

  try {
    const { instances } = await listInstances({ label: uid });
    const apiKey = await getSecret('VULTR_PERSONAL_ACCESS_TOKEN');
    const { startInstance } = initialize({ apiKey }).instances;
    for await (const instance of instances) {
      await startInstance({ 'instance-id': instance.id });
    }
    return;
  } catch (error) {
    return error;
  }
}
