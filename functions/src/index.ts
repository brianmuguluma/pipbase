import * as functions from 'firebase-functions';
import { onCall } from 'firebase-functions/v1/https';
// import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { firestore } from 'firebase-admin';

import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
// import { defineSecret } from 'firebase-functions/params';
initializeApp();
firestore().settings({ timestampsInSnapshots: true });

// const vultr = defineSecret('VULTR_PERSONAL_ACCESS_TOKEN');
// export const ably = defineSecret('ABLY_PUBLISHER_API_KEY');

// const minInstances = 0;

/**
 *
 * Users
 *
 */

import { createUser } from './users/createUser';
exports.createUser = functions.auth.user().onCreate(createUser);

import { deleteUser } from './users/deleteUser';
exports.deleteUser = functions.auth.user().onDelete(deleteUser);

import { listUsers } from './users/listUsers';
exports.listUsers = onCall(listUsers);

import { getUser } from './users/getUser';
exports.getUser = onCall(getUser);

import { getUserByEmail } from './users/getUserByEmail';
exports.getUserByEmail = onCall(getUserByEmail);

import { updateUser } from './users/updateUser';
exports.updateUser = onCall(updateUser);

/**
 *
 * Devices
 *
 */

import { createDevice } from './devices/createDevice';
exports.createDevice = onDocumentCreated('devices/{device}', createDevice);

import { deleteDevice } from './devices/deleteDevice';
exports.deleteDevice = onDocumentCreated('devices/{device}', deleteDevice);

/**
 *
 * Claims
 *
 */

import { setCustomUserClaims } from './claims/setCustomUserClaims';
exports.setCustomUserClaims = onCall(setCustomUserClaims);

/**
 *
 * Vultr
 *
 */

// Account

import { getAccountInfo } from './vultr/account/getAccountInfo';
exports.getAccountInfo = onCall(getAccountInfo);

// Instances

import { createInstance } from './vultr/instances/createInstance';
exports.createInstance = onCall(createInstance);

import { startInstance } from './vultr/instances/startInstance';
exports.startInstance = onCall(startInstance);

import { haltInstance } from './vultr/instances/haltInstance';
exports.haltInstance = onCall(haltInstance);

import { getInstance } from './vultr/instances/getInstance';
exports.getInstance = onCall(getInstance);

import { listInstances } from './vultr/instances/listInstances';
exports.listInstances = onCall(listInstances);

import { deleteInstance } from './vultr/instances/deleteInstance';
exports.deleteInstance = onCall(deleteInstance);

import { rebootInstance } from './vultr/instances/rebootInstance';
exports.rebootInstance = onCall(rebootInstance);

import { reinstallInstance } from './vultr/instances/reinstallInstance';
exports.reinstallInstance = onCall(reinstallInstance);

/**
 *
 * Stripe
 *
 */

// Customers

import { retrieveCustomer } from './stripe/customers/retrieveCustomer';
exports.retrieveCustomer = onCall(retrieveCustomer);

import { updateCustomer } from './stripe/customers/updateCustomer';
exports.updateCustomer = onCall(updateCustomer);

// Products

import { listProducts } from './stripe/products/listProducts';
exports.listProducts = onCall(listProducts);

// Prices

import { listPrices } from './stripe/prices/listPrices';
exports.listPrices = onCall(listPrices);

// Checkouts

import { createCheckoutSession } from './stripe/checkouts/createCheckoutSession';
exports.createCheckoutSession = onCall(createCheckoutSession);

// Billing

import { createSubscription } from './stripe/billing/createSubscription';
exports.createSubscription = onDocumentCreated(
  'users/{uid}/subscriptions/{subscription}',
  createSubscription,
);

import { updateSubscription } from './stripe/billing/updateSubscription';
exports.updateSubscription = onDocumentUpdated(
  'users/{uid}/subscriptions/{subscription}',
  updateSubscription,
);

import { listSubscriptions } from './stripe/subscriptions/listSubscriptions';
exports.listSubscriptions = onCall(listSubscriptions);

/**
 *
 * Ably
 *
 */

// import { createTokenRequest } from './ably/createTokenRequest';
// exports.createTokenRequest = onRequest({ secrets: [ably] }, createTokenRequest);
