/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialize } from '@vultr/vultr-node';
import { getSecret } from './secrets';
import { Instance } from '../interfaces/vultr';

const VULTR = 'VULTR_PERSONAL_ACCESS_TOKEN';
const SCRIPT_ID = 'cd7b1fa8-2383-43d2-b757-df8564221551';

export const createInstance = async (
  uid: string,
): Promise<Instance | undefined> => {
  if (await hasInstance(uid)) return;

  const apiKey = await getSecret(VULTR);

  const parameters = {
    label: uid,
    hostname: uid,
    script_id: SCRIPT_ID,
    region: 'lhr',
    plan: 'vc2-1c-1gb',
    os_id: '477',
    backups: 'disabled',
  };
  const { createInstance } = initialize({ apiKey }).instances;

  return (await createInstance(parameters)) as Instance;
};

const hasInstance = async (uid: string) => {
  return (await listInstances({ label: uid }))?.length;
};

export const listInstances = async (parameters: any) => {
  const apiKey = await getSecret(VULTR);
  const { listInstances } = initialize({ apiKey }).instances;
  return await listInstances(parameters);
};

export const deleteInstance = async (parameters: any) => {
  const apiKey = await getSecret(VULTR);
  const { deleteInstance } = initialize({ apiKey }).instances;
  await deleteInstance(parameters);
};

export const deleteInstances = async (uid: string) => {
  try {
    const apiKey = await getSecret(VULTR);
    const { listInstances } = initialize({ apiKey }).instances;
    const { instances } = await listInstances({ label: uid });

    for await (const instance of instances) {
      await deleteInstance({ 'instance-id': instance.id });
    }
  } catch (error) {
    return;
  }
};
