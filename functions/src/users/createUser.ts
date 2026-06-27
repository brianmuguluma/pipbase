import { auth, firestore } from 'firebase-admin';

export async function createUser(user: auth.UserRecord) {
  const { uid } = user;

  try {
    await createSettings(uid);
  } catch (e) {
    return console.log(JSON.stringify(e));
  }
}

const createSettings = async (uid: string) => {
  const settings = {
    bot: {
      notifications: {
        onStart: true,
        onStop: true,
        onPing: true,
      },
      status: 'pending',
    },
    oanda: {
      credentials: {
        apiKey: '',
        accountId: '',
      },
      notifications: {
        orders: {
          ordersCancelled: true,
          ordersCreated: true,
          ordersFilled: true,
          ordersTriggered: true,
        },
        trades: {
          tradesClosed: true,
          tradesOpened: true,
          tradesReduced: true,
        },
      },
    },
  };
  await firestore().doc(`settings/${uid}`).set(settings);
};
