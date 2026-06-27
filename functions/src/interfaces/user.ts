export interface User {
  credentials: OandaCredentials;
  stripeId?: string;
  stripeLink?: string;
}

export interface OandaCredentials {
  apiKey?: string;
  accountID?: string;
}
