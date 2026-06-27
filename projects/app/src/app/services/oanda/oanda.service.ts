import { Injectable } from '@angular/core';
import {
  CapacitorHttp,
  HttpHeaders,
  HttpOptions,
  HttpParams,
  HttpResponse,
} from '@capacitor/core';
import { AlertController } from '@ionic/angular/standalone';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Settings, User } from 'src/app/interfaces/user';
import { AblyService } from '../ably/ably.service';

@Injectable({
  providedIn: 'root',
})
export class OandaService {
  constructor(
    private app: AppComponent,
    private auth: AuthService,
    private ably: AblyService,
    private functions: Functions,
    private firestore: Firestore,
    private alertController: AlertController,
  ) {}

  async resetBot(instrument: string) {
    return await httpsCallable(this.functions, 'resetBot')({ instrument });
  }

  /**
   * @returns void
   */
  async setApiKey(apiKey: string) {
    const command = 'UPDATE_SETTINGS';
    const data = {
      oanda: {
        credentials: {
          apiKey,
          accountId: '',
        },
      },
    } as Partial<Settings>;
    await setDoc(
      doc(this.firestore, `settings/${this.auth?.profile()?.uid}`),
      data,
      { merge: true },
    );
    await this.ably.sendUserSignal({ command, ...data });
  }

  /**
   * @returns void
   */
  async setAccountID(accountID: string) {
    await setDoc(
      doc(this.firestore, `users/${this.auth?.profile()?.uid}`),
      {
        credentials: {
          accountID: accountID,
        },
      } as Partial<User>,
      { merge: true },
    );
  }

  isPaperTrading(): boolean | undefined {
    return this.app.isPaperTrading();
  }

  getEnvironment(): string | undefined {
    return this.isPaperTrading() ? 'fxpractice' : 'fxtrade';
  }

  getBaseUrl() {
    return this.app.isEnvironmentSet()
      ? `https://api-${this.getEnvironment()}.oanda.com/v3`
      : undefined;
  }

  getApiKey(): string | undefined {
    return this.auth?.settings()?.oanda?.credentials?.apiKey;
  }

  getHeaders() {
    return { Authorization: `Bearer ${this.getApiKey()}` };
  }

  /**
   * @returns Get a list of all Accounts authorized for the provided token.
   */
  async getAccounts() {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a list of all Accounts authorized for the provided token.
   */
  async getAccount(accountID: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${accountID}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a list of all Accounts authorized for the provided token.
   */
  async getAccountSummary(): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/summary`,
    };
    return await CapacitorHttp.get(options);
  }

  /** */
  async getOrders(params: HttpParams): Promise<HttpResponse> {
    const options: HttpOptions = {
      params,
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/orders`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @param orderSpecifier The Order Specifier
   *
   * @returns Get details for a single Order in an Account
   */
  async getOrder(orderSpecifier: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/orders/${orderSpecifier}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @param instrument Name of the Instrument
   *
   * @returns Closeout the open Position for a specific instrument in an Account.
   */
  async closeShortPosition(instrument: string): Promise<HttpResponse> {
    const headers: HttpHeaders = {
      Authorization: `Bearer ${this.getApiKey()}`,
      'Content-Type': 'application/json',
    };
    const options: HttpOptions = {
      headers,
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/positions/${instrument}/close`,
      data: { shortUnits: 'ALL' },
    };
    await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.put(options);
  }

  /**
   * @param instrument Name of the Instrument
   *
   * @returns Closeout the open Position for a specific instrument in an Account.
   */
  async closeOpenPositions() {
    const alert = await this.alertController.create({
      header: 'Close all positions?',
      message: 'Are you sure you want to close all open positions?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: async () => {},
        },
      ],
    });
    await alert.present();
  }

  /**
   * @param instrument Name of the Instrument
   *
   * @returns Closeout the open Position for a specific instrument in an Account.
   */
  async closeLongPosition(instrument: string): Promise<HttpResponse> {
    const headers: HttpHeaders = {
      Authorization: `Bearer ${this.getApiKey()}`,
      'Content-Type': 'application/json',
    };
    const options: HttpOptions = {
      headers,
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/positions/${instrument}/close`,
      data: { longUnits: 'ALL' },
    };
    await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.put(options);
  }

  /**
   * @param state The state to filter the requested Trades by.
   * @param count The maximum number of Trades to return. [default=50, maximum=500]
   *
   * @returns Get a list of Trades for an Account.
   */
  async getTrades(params: HttpParams): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/trades`,
      params,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @param tradeSpecifier Specifier for the Trade
   *
   * @returns Get the details of a specific Trade in an Account
   */
  async getTrade(tradeSpecifier: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/trades/${tradeSpecifier}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   *
   * @param tradeSpecifier Specifier for the trade
   * @param data Modified dependants
   *
   * @returns Create, replace and cancel a Trade’s dependent Orders
   * (Take Profit, Stop Loss and Trailing Stop Loss) through the Trade itself.
   */
  async modifyTrade(tradeSpecifier: string, data: any) {
    const headers: HttpHeaders = {
      Authorization: `Bearer ${this.getApiKey()}`,
      'Content-Type': 'application/json',
    };
    const options: HttpOptions = {
      headers,
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/trades/${tradeSpecifier}/orders`,
      data,
    };
    await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.put(options);
  }

  /**
   *
   * @param tradeSpecifier Specifier for the Trade
   * @param units Indication of how much of the Trade to close. Either the string “ALL”
   * (indicating that all of the Trade should be closed), or a DecimalNumber representing
   * the number of units of the open Trade to Close using a TradeClose MarketOrder.
   * The units specified must always be positive, and the magnitude of the value
   * cannot exceed the magnitude of the Trade's open units.
   *
   * @returns Close (partially or fully) a specific open Trade in an Account
   */
  async closeTrade(tradeSpecifier: string, units: string) {
    const headers: HttpHeaders = {
      Authorization: `Bearer ${this.getApiKey()}`,
      'Content-Type': 'application/json',
    };
    const options: HttpOptions = {
      headers,
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/trades/${tradeSpecifier}/close`,
      data: { units },
    };
    await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.put(options);
  }

  /**
   * @param instrument Name of the Instrument
   * @returns Fetch candlestick data for an instrument.
   */
  async getCandlesticks(
    instrument: string,
    params: HttpParams,
  ): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      params,
      url: `${this.getBaseUrl()}/instruments/${instrument}/candles`,
    };
    await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.get(options);
  }

  /**
   * @param transactionID A Transaction ID
   * @returns Get the details of a single Account Transaction.
   */
  async getTransaction(transactionID: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/transactions/${transactionID}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a list of Transactions pages that satisfy a time-based Transaction query.
   */
  async getTransactions(params: HttpParams): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      params,
      url: `${this.getBaseUrl()}/accounts/${
        this.auth.settings()?.oanda?.credentials?.accountId
      }/transactions`,
    };
    await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a range of Transactions for an Account based on the Transaction IDs.
   */
  async getTransactionsIDRange(url: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url,
    };
    await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.get(options);
  }
}
