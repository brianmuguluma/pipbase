import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const secretmanagerClient = new SecretManagerServiceClient();

export const getSecret = async (
  secret: string,
): Promise<string | undefined> => {
  const project = 'pipbase';
  const version = 'latest';
  const name = `projects/${project}/secrets/${secret}/versions/${version}`;

  const [response] = await secretmanagerClient.accessSecretVersion({ name });
  return response.payload?.data?.toString();
};
