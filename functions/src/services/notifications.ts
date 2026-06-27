import { messaging } from 'firebase-admin';
import { getTokens } from './tokens';

export const sendNotification = async (
  uid: string,
  message: messaging.MulticastMessage,
) => {
  const tokens = await getTokens(uid);
  if (!tokens.length) return;

  message.tokens = tokens;
  const title = message.notification?.title;
  const notification = { title: title ? title : 'Pipbase' };
  return await messaging().sendEachForMulticast({ ...message, notification });
};
