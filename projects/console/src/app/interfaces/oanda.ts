export interface AccountProperty {
  /** The Accounts identifier */
  id: string;

  /**
   * The Account's associated MT4 Account ID. This field will not be present
   * if the Account is not an MT4 account.
   */
  mt4AccountID?: number;

  /** The Accounts tags */
  tags: string[];
}
/** A tag associated with an entity. */
interface Tag {
  /**The type of the tag. */
  type: string;

  /**The name of the tag. */
  name: string;
}

/** The type of an Instrument. */
export type InstrumentType = 'CURRENCY' | 'CFD' | 'METAL';

export interface CandlestickResponse {
  /**
   * The instrument whose Prices are represented by the candlesticks.
   */
  instrument: string;

  /**
   * The granularity of the candlesticks provided.
   */
  granularity: CandlestickGranularity;

  /**
   * The list of candlesticks that satisfy the request.
   */
  candles: Candlestick[];
}

/** The Candlestick representation */
export interface Candlestick {
  /**
   * The start time of the candlestick
   */
  time: string;

  /**
   * The candlestick data based on bids. Only provided if bid-based candles
   * were requested.
   */
  bid: CandlestickData;

  /**
   * The candlestick data based on asks. Only provided if ask-based candles
   * were requested.
   */
  ask: CandlestickData;

  /**
   * The candlestick data based on midpoints. Only provided if midpoint-based
   * candles were requested.
   */
  mid: CandlestickData;

  /**
   * The number of prices created during the time-range represented by the
   * candlestick.
   */
  volume: number;

  /**
   * A flag indicating if the candlestick is complete. A complete candlestick
   * is one whose ending time is not in the future.
   */
  complete: boolean;
}

/** The price data (open, high, low, close) for the Candlestick representation. */
interface CandlestickData {
  /**
   * The first (open) price in the time-range represented by the candlestick.
   */
  o: string;

  /**
   * The highest price in the time-range represented by the candlestick.
   */
  h: string;

  /**
   * The lowest price in the time-range represented by the candlestick.
   */
  l: string;

  /**
   * The last (closing) price in the time-range represented by the
   * candlestick.
   */
  c: string;
}

/**
 * The overall behaviour of the Account regarding Guaranteed Stop Loss Orders
 * for a specific Instrument.
 */
type GuaranteedStopLossOrderModeForInstrument =
  | 'DISABLED'
  | 'ALLOWED'
  | 'REQUIRED';

/**
 * A GuaranteedStopLossOrderLevelRestriction represents the total position size
 * that can exist within a given price window for Trades with guaranteed Stop
 * Loss Orders attached for a specific Instrument.
 */
interface GuaranteedStopLossOrderLevelRestriction {
  /**
   * Applies to Trades with a guaranteed Stop Loss Order attached for the
   * specified Instrument. This is the total allowed Trade volume that can
   * exist within the priceRange based on the trigger prices of the guaranteed
   * Stop Loss Orders.
   */
  volume: string;

  /**
   * The price range the volume applies to. This value is in price units.
   */
  priceRange: string;
}

/** An InstrumentCommission represents an instrument-specific commission. */
interface InstrumentCommission {
  /**
   * The commission amount in the Account's home currency) charged per unitsTraded of the instrument
   */
  commission: string;

  /**
   * @field The number of units traded that the commission amount is based on.
   */
  unitsTraded: string;

  /**
   * The minimum commission amount in the Account's home currency) that is
   * charged when an Order is filled for this instrument.
   */
  minimumCommission: string;
}

/**	Financing data for the instrument. */
interface InstrumentFinancing {
  /**
   * The financing rate to be used for a long position for the instrument. The
   * value is in decimal rather than percentage points, i.e. 5% is represented
   * as 0.05.
   */
  longRate: string;

  /**
   * The financing rate to be used for a short position for the instrument.
   * The value is in decimal rather than percentage points, i.e. 5% is
   * represented as 0.05.
   */
  shortRate: string;

  /**
   * The days of the week to debit or credit financing charges; the exact time
   * of day at which to charge the financing is set in the
   * DivisionTradingGroup for the client's account.
   */
  financingDaysOfWeek: FinancingDayOfWeek[];
}

/**
 * A FinancingDayOfWeek message defines a day of the week when financing charges
 * are debited or credited.
 */
interface FinancingDayOfWeek {
  /**
   * The day of the week to charge the financing.
   */
  dayOfWeek: DayOfWeek;

  /**
   * The number of days worth of financing to be charged on dayOfWeek.
   */
  daysCharged: number;
}

/**	The DayOfWeek provides a representation of the day of the week. */
type DayOfWeek =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

/**
 * Instruments
 */

/**	Full specification of an Instrument. */
export interface Instrument {
  /**
   * The name of the Instrument
   */
  name: string;

  /**
   * The type of the Instrument
   */
  type: InstrumentType;

  /**
   * The display name of the Instrument
   */
  displayName: string;

  /**
   * The location of the “pip” for this instrument. The decimal position of
   * the pip in this Instrument's price can be found at 10 ^ pipLocation e.g.
   * -4 pipLocation results in a decimal pip position of 10 ^ -4 = 0.0001.
   */
  pipLocation: number;

  /**
   * The number of decimal places that should be used to display prices for
   * this instrument. e.g. a displayPrecision of 5 would result in a price of
   * “1” being displayed as “1.00000”
   */
  displayPrecision: number;

  /**
   * The amount of decimal places that may be provided when specifying the
   * number of units traded for this instrument.
   */
  tradeUnitsPrecision: number;

  /**
   * The smallest number of units allowed to be traded for this instrument.
   */
  minimumTradeSize: string;

  /**
   * The maximum trailing stop distance allowed for a trailing stop loss
   * created for this instrument. Specified in price units.
   */
  maximumTrailingStopDistance: string;

  /**
   * The minimum distance allowed between the Trade's fill price and the
   * configured price for guaranteed Stop Loss Orders created for this
   * instrument. Specified in price units.
   */
  minimumGuaranteedStopLossDistance: string;

  /**
   * The minimum trailing stop distance allowed for a trailing stop loss
   * created for this instrument. Specified in price units.
   */
  minimumTrailingStopDistance: string;

  /**
   * The maximum position size allowed for this instrument. Specified in
   * units.
   */
  maximumPositionSize: string;

  /**
   * The maximum units allowed for an Order placed for this instrument.
   * Specified in units.
   */
  maximumOrderUnits: string;

  /**
   * The margin rate for this instrument.
   */
  marginRate: string;

  /**
   * The commission structure for this instrument.
   */
  commission: InstrumentCommission;

  /**
   * The current Guaranteed Stop Loss Order mode of the Account for this
   * Instrument.
   */
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderModeForInstrument;

  /**
   * The amount that is charged to the account if a guaranteed Stop Loss Order
   * is triggered and filled. The value is in price units and is charged for
   * each unit of the Trade. This field will only be present if the Account's
   * guaranteedStopLossOrderMode for this Instrument is not ‘DISABLED'.
   */
  guaranteedStopLossOrderExecutionPremium: string;

  /**
   * The guaranteed Stop Loss Order level restriction for this instrument.
   * This field will only be present if the Account's
   * guaranteedStopLossOrderMode for this Instrument is not ‘DISABLED'.
   */
  guaranteedStopLossOrderLevelRestriction: GuaranteedStopLossOrderLevelRestriction;

  /**
   * Financing data for this instrument.
   */
  financing: InstrumentFinancing;

  /**
   * The tags associated with this instrument.
   */
  tags: Tag[];
}

/** The list of tradeable instruments for the Account has been provided. */
export interface Instruments {
  /**The requested list of instruments. */
  instruments: Instrument[];

  /**	The unique Transaction identifier within each Account. */
  lastTransactionID: string;
}

/**
 * Orders
 */

/** The type of Order. */
export type OrderType =
  | 'MARKET'
  | 'LIMIT'
  | 'STOP'
  | 'MARKET_IF_TOUCHED'
  | 'TAKE_PROFIT'
  | 'STOP_LOSS'
  | 'GUARANTEED_STOP_LOSS'
  | 'TRAILING_STOP_LOSS'
  | 'FIXED_PRICE';

type OrderPositionFill =
  | 'OPEN_ONLY'
  | 'REDUCE_FIRST'
  | 'REDUCE_ONLY'
  | 'DEFAULT';

/**
 * A MarketOrderTradeClose specifies the extensions to a Market Order that has
 * been created specifically to close a Trade.
 */
interface MarketOrderTradeClose {
  /**
   * The ID of the Trade requested to be closed
   */
  tradeID: string;

  /**
   * The client ID of the Trade requested to be closed
   */
  clientTradeID: string;

  /**
   * Indication of how much of the Trade to close. Either “ALL”, or a
   * DecimalNumber reflection a partial close of the Trade.
   */
  units: string;
}

type MarketOrderMarginCloseoutReason =
  | 'MARGIN_CHECK_VIOLATION'
  | 'REGULATORY_MARGIN_CALL_VIOLATION'
  | 'REGULATORY_MARGIN_CHECK_VIOLATION';

/**
 * A MarketOrderPositionCloseout specifies the extensions to a Market Order
 * when it has been created to closeout a specific Position.
 */
export interface MarketOrderPositionCloseout {
  /**
   * The instrument of the Position being closed out.
   */
  instrument: string;

  /**
   * Indication of how much of the Position to close. Either “ALL”, or a
   * DecimalNumber reflection a partial close of the Trade. The DecimalNumber
   * must always be positive, and represent a number that doesn't exceed the
   * absolute size of the Position.
   */
  units: string;
}

interface MarketOrderMarginCloseout {
  /**
   * The reason the Market Order was created to perform a margin closeout
   */
  reason: MarketOrderMarginCloseoutReason;
}

/**
 * Details for the Market Order extensions specific to a Market Order placed
 * with the intent of fully closing a specific open trade that should have
 * already been closed but wasn't due to halted market conditions.
 */
interface MarketOrderDelayedTradeClose {
  /**
   * The ID of the Trade being closed
   */
  tradeID: string;

  /**
   * The Client ID of the Trade being closed
   */
  clientTradeID: string;

  /**
   * The Transaction ID of the DelayedTradeClosure transaction to which this
   * Delayed Trade Close belongs to
   */
  sourceTransactionID: string;
}

/**
 * TakeProfitDetails specifies the details of a Take Profit Order to be created
 * on behalf of a client. This may happen when an Order is filled that opens a
 * Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order
 * is modified directly through the Trade.
 */
export interface TakeProfitDetails {
  /**
   * The price that the Take Profit Order will be triggered at. Only one of
   * the price and distance fields may be specified.
   */
  price: string;

  /**
   * The time in force for the created Take Profit Order. This may only be
   * GTC, GTD or GFD.
   */
  timeInForce?: TimeInForce;

  /**
   * The date when the Take Profit Order will be cancelled on if timeInForce
   * is GTD.
   */
  gtdTime?: string;

  /** The Client Extensions to add to the Take Profit Order when created. */
  clientExtensions?: ClientExtensions;
}

/**
 * StopLossDetails specifies the details of a Stop Loss Order to be created on
 * behalf of a client. This may happen when an Order is filled that opens a
 * Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order
 * is modified directly through the Trade.
 */
export interface StopLossDetails {
  /**
   * The price that the Stop Loss Order will be triggered at. Only one of the
   * price and distance fields may be specified.
   */
  price?: string;

  /**
   * Specifies the distance (in price units) from the Trade's open price to
   * use as the Stop Loss Order price. Only one of the distance and price
   * fields may be specified.
   */
  distance?: string;

  /**
   * The time in force for the created Stop Loss Order. This may only be GTC,
   * GTD or GFD.
   */
  timeInForce?: TimeInForce;

  /**
   * The date when the Stop Loss Order will be cancelled on if timeInForce is
   * GTD.
   */
  gtdTime?: string;

  /** The Client Extensions to add to the Stop Loss Order when created. */
  clientExtensions?: ClientExtensions;
}

/**
 * GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss
 * Order to be created on behalf of a client. This may happen when an Order is
 * filled that opens a Trade requiring a Guaranteed Stop Loss, or when a Trade's
 * dependent Guaranteed Stop Loss Order is modified directly through the Trade.
 */
export interface GuaranteedStopLossDetails {
  /**
   * The price that the Guaranteed Stop Loss Order will be triggered at. Only
   * one of the price and distance fields may be specified.
   */
  price: string;

  /**
   * Specifies the distance (in price units) from the Trade's open price to
   * use as the Guaranteed Stop Loss Order price. Only one of the distance and
   * price fields may be specified.
   */
  distance?: string;

  /**
   * The time in force for the created Guaranteed Stop Loss Order. This may
   * only be GTC, GTD or GFD.
   */
  timeInForce?: TimeInForce;

  /**
   * The date when the Guaranteed Stop Loss Order will be cancelled on if
   * timeInForce is GTD.
   */
  gtdTime?: string;

  /**
   * The Client Extensions to add to the Guaranteed Stop Loss Order when
   * created.
   */
  clientExtensions?: ClientExtensions;
}

/**
 * TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order
 * to be created on behalf of a client. This may happen when an Order is filled
 * that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent
 * Trailing Stop Loss Order is modified directly through the Trade.
 */
export interface TrailingStopLossDetails {
  /**
   * The distance (in price units) from the Trade's fill price that the
   * Trailing Stop Loss Order will be triggered at.
   */
  distance: string;

  /**
   * The time in force for the created Trailing Stop Loss Order. This may only
   * be GTC, GTD or GFD.
   */
  timeInForce?: TimeInForce;

  /**
   * The date when the Trailing Stop Loss Order will be cancelled on if
   * timeInForce is GTD.
   */
  gtdTime?: string;

  /**
   * The Client Extensions to add to the Trailing Stop Loss Order when
   * created.
   */
  clientExtensions?: ClientExtensions;
}

/**
 * A MarketOrder is an order that is filled immediately upon creation using the
 * current market price.
 */
export interface MarketOrder
  extends Omit<
    Order,
    | 'price'
    | 'tradeState'
    | 'initialMarketPrice'
    | 'tradeID'
    | 'clientTradeID'
    | 'distance'
    | 'trailingStopValue'
    | 'replacesOrderID'
    | 'replacedByOrderID'
  > {
  /**
   * Details of the Trade requested to be closed, only provided when the
   * Market Order is being used to explicitly close a Trade.
   */
  tradeClose: MarketOrderTradeClose;

  /**
   * Details of the long Position requested to be closed out, only provided
   * when a Market Order is being used to explicitly closeout a long Position.
   */
  longPositionCloseout: MarketOrderPositionCloseout;

  /**
   * Details of the short Position requested to be closed out, only provided
   * when a Market Order is being used to explicitly closeout a short
   * Position.
   */
  shortPositionCloseout: MarketOrderPositionCloseout;

  /**
   * Details of the Margin Closeout that this Market Order was created for
   */
  marginCloseout: MarketOrderMarginCloseout;

  /**
   * Details of the delayed Trade close that this Market Order was created for
   */
  delayedTradeClose: MarketOrderDelayedTradeClose;
}

/**
 * A FixedPriceOrder is an order that is filled immediately upon creation using a
 * fixed price.
 */
export type FixedPriceOrder = Omit<
  Order,
  | 'priceBound'
  | 'initialMarketPrice'
  | 'tradeID'
  | 'clientTradeID'
  | 'distance'
  | 'trailingStopValue'
  | 'replacesOrderID'
  | 'replacedByOrderID'
>;

/**
 * A LimitOrder is an order that is created with a price threshold, and will only
 * be filled by a price that is equal to or better than the threshold.
 */
export type LimitOrder = Omit<
  Order,
  | 'priceBound'
  | 'tradeState'
  | 'initialMarketPrice'
  | 'tradeID'
  | 'clientTradeID'
  | 'distance'
  | 'trailingStopValue'
>;

/**
 * A StopOrder is an order that is created with a price threshold, and will only
 * be filled by a price that is equal to or worse than the threshold.
 */
export type StopOrder = Omit<
  Order,
  | 'tradeState'
  | 'initialMarketPrice'
  | 'tradeID'
  | 'distance'
  | 'trailingStopValue'
>;

/**
 * A MarketIfTouchedOrder is an order that is created with a price threshold, and
 * will only be filled by a market price that is touches or crosses the threshold.
 */
export type MarketIfTouchedOrder = Omit<
  Order,
  'tradeState' | 'tradeID' | 'clientTradeID' | 'distance' | 'trailingStopValue'
>;

/**
 * A TakeProfitOrder is an order that is linked to an open Trade and created with a
 * price threshold. The Order will be filled (closing the Trade) by the first price
 * that is equal to or better than the threshold. A TakeProfitOrder cannot be used
 * to open a new Position.
 */
export type TakeProfitOrder = Omit<
  Order,
  | 'instrument'
  | 'units'
  | 'priceBound'
  | 'positionFill'
  | 'takeProfitOnFill'
  | 'stopLossOnFill'
  | 'guaranteedStopLossOnFill'
  | 'trailingStopLossOnFill'
  | 'tradeClientExtensions'
  | 'distance'
  | 'trailingStopValue'
>;

/**
 * A StopLossOrder is an order that is linked to an open Trade and created with a
 * price threshold. The Order will be filled (closing the Trade) by the first price
 * that is equal to or worse than the threshold. A StopLossOrder cannot be used to
 * open a new Position.
 */
export type StopLossOrder = Omit<
  Order,
  | 'instrument'
  | 'units'
  | 'priceBound'
  | 'positionFill'
  | 'takeProfitOnFill'
  | 'stopLossOnFill'
  | 'guaranteedStopLossOnFill'
  | 'trailingStopLossOnFill'
  | 'tradeClientExtensions'
  | 'tradeState'
  | 'initialMarketPrice'
  | 'trailingStopValue'
>;

/**
 * A GuaranteedStopLossOrder is an order that is linked to an open Trade and created
 * with a price threshold which is guaranteed against slippage that may occur as the
 * market crosses the price set for that order. The Order will be filled (closing the
 * Trade) by the first price that is equal to or worse than the threshold. The price
 * level specified for the GuaranteedStopLossOrder must be at least the configured
 * minimum distance (in price units) away from the entry price for the traded
 * instrument. A GuaranteedStopLossOrder cannot be used to open a new Position.
 */
export interface GuaranteedStopLossOrder
  extends Omit<
    Order,
    | 'instrument'
    | 'units'
    | 'priceBound'
    | 'positionFill'
    | 'takeProfitOnFill'
    | 'stopLossOnFill'
    | 'guaranteedStopLossOnFill'
    | 'trailingStopLossOnFill'
    | 'tradeClientExtensions'
  > {
  /**
   * The premium that will be charged if the Guaranteed Stop Loss Order is
   * filled at the guaranteed price. It is in price units and is charged for
   * each unit of the Trade.
   */
  guaranteedExecutionPremium: string;
}

/**
 * A TrailingStopLossOrder is an order that is linked to an open Trade and created
 * with a price distance. The price distance is used to calculate a trailing stop
 * value for the order that is in the losing direction from the market price at
 * the time of the order's creation. The trailing stop value will follow the market
 * price as it moves in the winning direction, and the order will filled (closing
 * the Trade) by the first price that is equal to or worse than the trailing stop
 * value. A TrailingStopLossOrder cannot be used to open a new Position.
 */
export type TrailingStopLossOrder = Omit<
  Order,
  | 'instrument'
  | 'units'
  | 'price'
  | 'priceBound'
  | 'positionFill'
  | 'takeProfitOnFill'
  | 'stopLossOnFill'
  | 'guaranteedStopLossOnFill'
  | 'trailingStopLossOnFill'
  | 'tradeClientExtensions'
  | 'tradeState'
  | 'initialMarketPrice'
>;

/** The current state of the Order. */
type OrderState = 'PENDING' | 'FILLED' | 'TRIGGERED' | 'CANCELLED';

interface ClientExtensions {
  /**
   * The Client ID of the Order/Trade
   */
  id: string;

  /**
   * A tag associated with the Order/Trade
   */
  tag: string;

  /**
   * A comment associated with the Order/Trade
   */
  comment: string;
}

/** The granularity of a candlestick */
export enum CandlestickGranularity {
  FIVE_SECONDS = 'S5',
  TEN_SECONDS = 'S10',
  FIFTEEN_SECONDS = 'S15',
  THIRTY_SECONDS = 'S30',
  ONE_MINUTE = 'M1',
  TWO_MINUTES = 'M2',
  FOUR_MINUTES = 'M4',
  FIVE_MINUTES = 'M5',
  TEN_MINUTES = 'M10',
  FIFTEEN_MINUTES = 'M15',
  THIRTY_MINUTES = 'M30',
  ONE_HOUR = 'H1',
  TWO_HOURS = 'H2',
  THREE_HOURS = 'H3',
  FOUR_HOURS = 'H4',
  SIX_HOURS = 'H6',
  EIGHT_HOURS = 'H8',
  TWELVE_HOURS = 'H12',
  ONE_DAY = 'D',
  ONE_WEEK = 'W',
  ONE_MONTH = 'M',
}

/**	The state to filter the requested Orders by. */
export type OrderStateFilter =
  | 'PENDING'
  | 'FILLED'
  | 'TRIGGERED'
  | 'CANCELLED'
  | 'ALL';

export type PositionStateFilter = 'ALL' | 'OPEN';

/**
 * The base Order specification used when requesting that an Order be created.
 * Each specific Order-type extends this definition.
 */
export interface OrderRequest {
  /**
   * The quantity requested to be filled by the Market Order. A positive
   * number of units results in a long Order, and a negative number of units
   * results in a short Order.
   */
  units: string;
  /**
   * The Market Order's Instrument.
   */
  instrument: string;
  /**
   * The time-in-force requested for the Market Order. Restricted to FOK or
   * IOC for a MarketOrder.
   */
  timeInForce: TimeInForce;
  /**
   * The type of the Order to Create. Must be set to “MARKET” when creating a
   * Market Order.
   */
  type: string;
  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderFill;
}

type OrderFill = 'OPEN_ONLY' | 'REDUCE_FIRST' | 'REDUCE_ONLY' | 'DEFAULT';

/**
 * A MarketOrderRequest specifies the parameters that may be set when creating
 * a Market Order.
 */
export interface MarketOrderRequest extends OrderRequest {
  /**
   * The worst price that the client is willing to have the Market Order
   * filled at.
   */
  priceBound?: string;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions?: ClientExtensions;

  /**
   * TakeProfitDetails specifies the details of a Take Profit Order to be
   * created on behalf of a client. This may happen when an Order is filled
   * that opens a Trade requiring a Take Profit, or when a Trade's dependent
   * Take Profit Order is modified directly through the Trade.
   */
  takeProfitOnFill?: TakeProfitDetails;

  /**
   * StopLossDetails specifies the details of a Stop Loss Order to be created
   * on behalf of a client. This may happen when an Order is filled that opens
   * a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss
   * Order is modified directly through the Trade.
   */
  stopLossOnFill?: StopLossDetails;

  /**
   * GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Guaranteed Stop Loss, or when a
   * Trade's dependent Guaranteed Stop Loss Order is modified directly through
   * the Trade.
   */
  guaranteedStopLossOnFill?: GuaranteedStopLossDetails;

  /**
   * TrailingStopLossDetails specifies the details of a Trailing Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Trailing Stop Loss, or when a
   * Trade's dependent Trailing Stop Loss Order is modified directly through
   * the Trade.
   */
  trailingStopLossOnFill?: TrailingStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created). Do not set, modify, or delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions?: ClientExtensions;
}

/**
 * A LimitOrderRequest specifies the parameters that may be set when creating a
 * Limit Order.
 */
export interface LimitOrderRequest extends OrderRequest {
  /**
   * The price threshold specified for the Order. The Limit Order will
   * only be filled by a market price that is equal to or better than this
   * price.
   */
  price: string;

  /**
   * The date/time when the Limit Order will be cancelled if its timeInForce
   * is “GTD”.
   */
  gtdTime?: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions: ClientExtensions;

  /**
   * TakeProfitDetails specifies the details of a Take Profit Order to be
   * created on behalf of a client. This may happen when an Order is filled
   * that opens a Trade requiring a Take Profit, or when a Trade's dependent
   * Take Profit Order is modified directly through the Trade.
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * StopLossDetails specifies the details of a Stop Loss Order to be created
   * on behalf of a client. This may happen when an Order is filled that opens
   * a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss
   * Order is modified directly through the Trade.
   */
  stopLossOnFill: StopLossDetails;

  /**
   * GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Guaranteed Stop Loss, or when a
   * Trade's dependent Guaranteed Stop Loss Order is modified directly through
   * the Trade.
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * TrailingStopLossDetails specifies the details of a Trailing Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Trailing Stop Loss, or when a
   * Trade's dependent Trailing Stop Loss Order is modified directly through
   * the Trade.
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created). Do not set, modify, or delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;
}

/**
 * A StopOrderRequest specifies the parameters that may be set when creating a
 * Stop Order.
 */
export interface StopOrderRequest extends OrderRequest {
  /**
   * The price threshold specified for the Stop Order. The Stop Order will
   * only be filled by a market price that is equal to or worse than this
   * price.
   */
  price: string;

  /**
   * The worst market price that may be used to fill this Stop Order. If the
   * market gaps and crosses through both the price and the priceBound, the
   * Stop Order will be cancelled instead of being filled.
   */
  priceBound?: string;

  /**
   * The date/time when the Stop Order will be cancelled if its timeInForce is
   * “GTD”.
   */
  gtdTime?: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions?: ClientExtensions;

  /**
   * TakeProfitDetails specifies the details of a Take Profit Order to be
   * created on behalf of a client. This may happen when an Order is filled
   * that opens a Trade requiring a Take Profit, or when a Trade's dependent
   * Take Profit Order is modified directly through the Trade.
   */
  takeProfitOnFill?: TakeProfitDetails;

  /**
   * StopLossDetails specifies the details of a Stop Loss Order to be created
   * on behalf of a client. This may happen when an Order is filled that opens
   * a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss
   * Order is modified directly through the Trade.
   */
  stopLossOnFill?: StopLossDetails;

  /**
   * GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Guaranteed Stop Loss, or when a
   * Trade's dependent Guaranteed Stop Loss Order is modified directly through
   * the Trade.
   */
  guaranteedStopLossOnFill?: GuaranteedStopLossDetails;

  /**
   * TrailingStopLossDetails specifies the details of a Trailing Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Trailing Stop Loss, or when a
   * Trade's dependent Trailing Stop Loss Order is modified directly through
   * the Trade.
   */
  trailingStopLossOnFill?: TrailingStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created). Do not set, modify, or delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions?: ClientExtensions;
}

/**
 * A MarketIfTouchedOrderRequest specifies the parameters that may be set when
 * creating a Market-if-Touched Order.
 */
export interface MarketIfTouchedOrderRequest extends OrderRequest {
  /**
   * The price threshold specified for the MarketIfTouched Order. The
   * MarketIfTouched Order will only be filled by a market price that crosses
   * this price from the direction of the market price at the time when the
   * Order was created (the initialMarketPrice). Depending on the value of the
   * Order's price and initialMarketPrice, the MarketIfTouchedOrder will
   * behave like a Limit or a Stop Order.
   */
  price: string;

  /**
   * The worst market price that may be used to fill this MarketIfTouched
   * Order.
   */
  priceBound?: string;

  /**
   * The time-in-force requested for the MarketIfTouched Order. Restricted to
   * “GTC”, “GFD” and “GTD” for MarketIfTouched Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the MarketIfTouched Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions?: ClientExtensions;

  /**
   * TakeProfitDetails specifies the details of a Take Profit Order to be
   * created on behalf of a client. This may happen when an Order is filled
   * that opens a Trade requiring a Take Profit, or when a Trade's dependent
   * Take Profit Order is modified directly through the Trade.
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * StopLossDetails specifies the details of a Stop Loss Order to be created
   * on behalf of a client. This may happen when an Order is filled that opens
   * a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss
   * Order is modified directly through the Trade.
   */
  stopLossOnFill: StopLossDetails;

  /**
   * GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Guaranteed Stop Loss, or when a
   * Trade's dependent Guaranteed Stop Loss Order is modified directly through
   * the Trade.
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * TrailingStopLossDetails specifies the details of a Trailing Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Trailing Stop Loss, or when a
   * Trade's dependent Trailing Stop Loss Order is modified directly through
   * the Trade.
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created). Do not set, modify, or delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;
}

/**
 * A TakeProfitOrderRequest specifies the parameters that may be set when creating
 * a Take Profit Order.
 */
export interface TakeProfitOrderRequest extends OrderRequest {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID?: string;

  /**
   * The price threshold specified for the TakeProfit Order. The associated
   * Trade will be closed by a market price that is equal to or better than
   * this threshold.
   */
  price: string;

  /**
   * The date/time when the TakeProfit Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime?: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition?: OrderTriggerCondition;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions?: ClientExtensions;
}

/**
 * A StopLossOrderRequest specifies the parameters that may be set when creating
 * a Stop Loss Order. Only one of the price and distance fields may be specified.
 */
export interface StopLossOrderRequest extends OrderRequest {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID?: string;

  /**
   * The price threshold specified for the Stop Loss Order. The associated
   * Trade will be closed by a market price that is equal to or worse than
   * this threshold.
   */
  price: string;

  /**
   * Specifies the distance (in price units) from the Account's current price
   * to use as the Stop Loss Order price. If the Trade is short the
   * Instrument's bid price is used, and for long Trades the ask is used.
   */
  distance?: string;

  /**
   * The date/time when the StopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime?: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions: ClientExtensions;
}

/**
 * A GuaranteedStopLossOrderRequest specifies the parameters that may be set when
 * creating a Guaranteed Stop Loss Order. Only one of the price and distance
 * fields may be specified.
 */
export interface GuaranteedStopLossOrderRequest extends OrderRequest {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID?: string;

  /**
   * The price threshold specified for the Guaranteed Stop Loss Order. The
   * associated Trade will be closed at this price.
   */
  price: string;

  /**
   * Specifies the distance (in price units) from the Account's current price
   * to use as the Guaranteed Stop Loss Order price. If the Trade is short the
   * Instrument's bid price is used, and for long Trades the ask is used.
   */
  distance?: string;

  /**
   * The date/time when the GuaranteedStopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime?: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions?: ClientExtensions;
}

/**
 * A TrailingStopLossOrderRequest specifies the parameters that may be set when
 * creating a Trailing Stop Loss Order.
 */
export interface TrailingStopLossOrderRequest extends OrderRequest {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID?: string;

  /**
   * The price distance (in price units) specified for the TrailingStopLoss
   * Order.
   */
  distance: string;

  /**
   * The time-in-force requested for the TrailingStopLoss Order. Restricted to
   * “GTC”, “GFD” and “GTD” for TrailingStopLoss Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the StopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime?: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The client extensions to add to the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions: ClientExtensions;
}

/**
 * The base Order definition specifies the properties that are common to all
 * Orders.
 */
export interface Order {
  /**
   * The Order's identifier, unique within the Order's Account.
   */
  id: string;

  /**
   * A date and time value using either RFC3339 or UNIX time representation.
   */
  createTime: string;

  /** The current state of the Order. */
  state: OrderState;

  /**
   * The client extensions of the Order. Do not set, modify, or delete
   * clientExtensions if your account is associated with MT4.
   */
  clientExtensions: ClientExtensions;

  /**
   * The type of the Order. Always set to “MARKET” for Market Orders.
   */
  type: OrderType;

  /**
   * The Market Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Market Order. A positive
   * number of units results in a long Order, and a negative number of units
   * results in a short Order.
   */
  units: string;

  /**
   * The time-in-force requested for the Market Order. Restricted to FOK or
   * IOC for a MarketOrder.
   */
  timeInForce: TimeInForce;

  /**
   * The price specified for the Fixed Price Order. This price is the exact
   * price that the Fixed Price Order will be filled at.
   */
  price: string;

  /**
   * The worst price that the client is willing to have the Market Order
   * filled at.
   */
  priceBound: string;

  /**
   * The date/time when the Limit Order will be cancelled if its timeInForce
   * is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * TakeProfitDetails specifies the details of a Take Profit Order to be
   * created on behalf of a client. This may happen when an Order is filled
   * that opens a Trade requiring a Take Profit, or when a Trade's dependent
   * Take Profit Order is modified directly through the Trade.
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * StopLossDetails specifies the details of a Stop Loss Order to be created
   * on behalf of a client. This may happen when an Order is filled that opens
   * a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss
   * Order is modified directly through the Trade.
   */
  stopLossOnFill: StopLossDetails;

  /**
   * GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Guaranteed Stop Loss, or when a
   * Trade's dependent Guaranteed Stop Loss Order is modified directly through
   * the Trade.
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * TrailingStopLossDetails specifies the details of a Trailing Stop Loss
   * Order to be created on behalf of a client. This may happen when an Order
   * is filled that opens a Trade requiring a Trailing Stop Loss, or when a
   * Trade's dependent Trailing Stop Loss Order is modified directly through
   * the Trade.
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created). Do not set, modify, or delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * ID of the Transaction that filled this Order (only provided when the
   * Order's state is FILLED)
   */
  fillingTransactionID: string;

  /**
   * Date/time when the Order was filled (only provided when the Order's state
   * is FILLED)
   */
  filledTime: string;

  /**
   * Trade ID of Trade opened when the Order was filled (only provided when
   * the Order's state is FILLED and a Trade was opened as a result of the
   * fill)
   */
  tradeOpenedID: string;

  /**
   * Trade ID of Trade reduced when the Order was filled (only provided when
   * the Order's state is FILLED and a Trade was reduced as a result of the
   * fill)
   */
  tradeReducedID: string;

  /**
   * Trade IDs of Trades closed when the Order was filled (only provided when
   * the Order's state is FILLED and one or more Trades were closed as a
   * result of the fill)
   */
  tradeClosedIDs: string[];

  /**
   * ID of the Transaction that cancelled the Order (only provided when the
   * Order's state is CANCELLED)
   */
  cancellingTransactionID: string;

  /**
   * Date/time when the Order was cancelled (only provided when the state of
   * the Order is CANCELLED)
   */
  cancelledTime: string;

  /**
   * The state that the trade resulting from the Fixed Price Order should be
   * set to.
   */
  tradeState: string;

  /**
   * The Market price at the time when the MarketIfTouched Order was created.
   */
  initialMarketPrice: string;

  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * Specifies the distance (in price units) from the Account's current price
   * to use as the Stop Loss Order price. If the Trade is short the
   * Instrument's bid price is used, and for long Trades the ask is used.
   */
  distance: string;

  /**
   * ID of the Transaction that filled this Order (only provided when the
   * Order's state is FILLED)
   */

  /**
   * The trigger price for the Trailing Stop Loss Order. The trailing stop
   * value will trail (follow) the market price by the TSL order's configured
   * “distance” as the market price moves in the winning direction. If the
   * market price moves to a level that is equal to or worse than the trailing
   * stop value, the order will be filled and the Trade will be closed.
   */
  trailingStopValue: string;

  /**
   * The ID of the Order that was replaced by this Order (only provided if
   * this Order was created as part of a cancel/replace).
   */
  replacesOrderID: string;

  /**
   * The ID of the Order that replaced this Order (only provided if this Order
   * was cancelled as part of a cancel/replace).
   */
  replacedByOrderID: string;
}

/** Get a list of Orders for an Account */
export interface Orders {
  /**The list of Order detail objects */
  orders: Order[];

  /**
   * The ID of the most recent Transaction created for the Account.
   */
  lastTransactionID: string;
}

export interface SpecifiedOrder {
  /** The details of the Order requested */
  order: Order;

  /** The ID of the most recent Transaction created for the Account. */
  lastTransactionID: string;
}

/**
 * Trades
 */

/**	The current state of the Trade. */
type TradeState = 'OPEN' | 'CLOSED' | 'CLOSE_WHEN_TRADEABLE';

/**
 * The time-in-force of an Order. TimeInForce describes how long an Order should
 * remain pending before being automatically cancelled by the execution system.
 */
export type TimeInForce = 'GTC' | 'GTD' | 'GFD' | 'FOK' | 'IOC';

/**
 * Specification of which price component should be used
 * when determining if an Order should be triggered and filled. This allows Orders
 * to be triggered based on the bid, ask, mid, default ask for buy, bid for sell)
 * or inverse ask for sell, bid for buy) price depending on the desired behaviour.
 * Orders are always filled using their default price component. This feature is
 * only provided through the REST API. Clients who choose to specify a non-default
 * trigger condition will not see it reflected in any of OANDA's proprietary or
 * partner trading platforms, their transaction history or their account statements.
 * OANDA platforms always assume that an Order's trigger condition is set to the
 * default value when indicating the distance from an Order's trigger price, and
 * will always provide the default trigger condition when creating or modifying an
 * Order. A special restriction applies when creating a Guaranteed Stop Loss Order.
 * In this case the TriggerCondition value must either be “DEFAULT”, or the “natural”
 * trigger side “DEFAULT” results in. So for a Guaranteed Stop Loss Order for a long
 * trade valid values are “DEFAULT” and “BID”, and for short trades “DEFAULT” and
 * “ASK” are valid.
 */
type OrderTriggerCondition = 'DEFAULT' | 'INVERSE' | 'BID' | 'ASK' | 'MID';

export interface TradeSummary {
  /** The Trade's identifier, unique within the Trade's Account. */
  id: string;

  /** The Trade's Instrument. */
  instrument: string;

  /** The execution price of the Trade. */
  price: string;

  /** The date/time when the Trade was opened. */
  openTime: string;

  /** The current state of the Trade. */
  state: TradeState;

  /**
   * The initial size of the Trade. Negative values indicate a short Trade,
   * and positive values indicate a long Trade.
   */
  initialUnits: string;

  /**
   * The margin required at the time the Trade was created. Note, this is the
   * ‘pure' margin required, it is not the ‘effective' margin used that
   * factors in the trade risk if a GSLO is attached to the trade.
   */
  initialMarginRequired: string;

  /**
   * The number of units currently open for the Trade. This value is reduced
   * to 0.0 as the Trade is closed.
   */
  currentUnits: string;

  /** The total profit/loss realized on the closed portion of the Trade. */
  realizedPL: string;

  /** The unrealized profit/loss on the open portion of the Trade. */
  unrealizedPL: string;

  /** Margin currently used by the Trade. */
  marginUsed: string;

  /**
   * The average closing price of the Trade. Only present if the Trade has
   * been closed or reduced at least once.
   */
  averageClosePrice: string;

  /**
   * The IDs of the Transactions that have closed portions of this Trade.
   */
  closingTransactionIDs: string[];

  /** The financing paid/collected for this Trade. */
  financing: string;

  /** The dividend adjustment paid for this Trade. */
  dividendAdjustment: string;

  /**
   * The date/time when the Trade was fully closed. Only provided for Trades
   * whose state is CLOSED.
   */
  closeTime: string;

  /** The client extensions of the Trade. */
  clientExtensions: ClientExtensions;

  /**
   * ID of the Trade's Take Profit Order, only provided if such an Order
   * exists.
   */
  takeProfitOrderID: string;

  /**
   * ID of the Trade's Stop Loss Order, only provided if such an Order exists.
   */
  stopLossOrderID: string;

  /**
   * ID of the Trade's Guaranteed Stop Loss Order, only provided if such an
   * Order exists.
   */
  guaranteedStopLossOrderID: string;

  /**
   * ID of the Trade's Trailing Stop Loss Order, only provided if such an
   * Order exists.
   */
  trailingStopLossOrderID: string;
}

/**	The state to filter the Trades by */
export type TradeStateFilter =
  | 'OPEN'
  | 'CLOSED'
  | 'CLOSE_WHEN_TRADEABLE'
  | 'ALL';

/** Get a list of Orders for an Account */
export interface Trades {
  /** The list of Order detail objects */
  trades: Trade[];

  /** The ID of the most recent Transaction created for the Account. */
  lastTransactionID: string;
}

export interface SpecifiedTrade {
  /** The details of the requested trade */
  trade: Trade;

  /** The ID of the most recent Transaction created for the Account. */
  lastTransactionID: string;
}

/**
 * The specification of a Trade within an Account. This includes the
 * full representation of the Trade's dependent Orders in addition to
 * the IDs of those Orders.
 */
export interface Trade {
  /** The Trade's identifier, unique within the Trade's Account. */
  id: string;

  /** The Trade's Instrument. */
  instrument: string;

  /** The execution price of the Trade. */
  price: string;

  /** The date/time when the Trade was opened. */
  openTime: string;

  /** The current state of the Trade. */
  state: TradeState;

  /**
   * The initial size of the Trade. Negative values indicate a short Trade,
   * and positive values indicate a long Trade.
   */
  initialUnits: string;

  /**
   * The margin required at the time the Trade was created. Note, this is the
   * ‘pure' margin required, it is not the ‘effective' margin used that
   * factors in the trade risk if a GSLO is attached to the trade.
   */
  initialMarginRequired: string;

  /**
   * The number of units currently open for the Trade. This value is reduced
   * to 0.0 as the Trade is closed.
   */
  currentUnits: string;

  /** The total profit/loss realized on the closed portion of the Trade. */
  realizedPL: string;

  /** The unrealized profit/loss on the open portion of the Trade. */
  unrealizedPL: string;

  /** Margin currently used by the Trade. */
  marginUsed: string;

  /**
   * The average closing price of the Trade. Only present if the Trade has
   * been closed or reduced at least once.
   */
  averageClosePrice: string;

  /** The IDs of the Transactions that have closed portions of this Trade. */
  closingTransactionIDs: string[];

  /** The financing paid/collected for this Trade. */
  financing: string;

  /** The dividend adjustment paid for this Trade. */
  dividendAdjustment: string;

  /**
   * The date/time when the Trade was fully closed. Only provided for Trades
   * whose state is CLOSED.
   */
  closeTime: string;

  /** The client extensions of the Trade. */
  clientExtensions: ClientExtensions;

  /**
   * Full representation of the Trade's Take Profit Order, only provided if
   * such an Order exists.
   */
  takeProfitOrder: TakeProfitOrder;

  /**
   * Full representation of the Trade's Stop Loss Order, only provided if such
   * an Order exists.
   */
  stopLossOrder: StopLossOrder;

  /**
   * Full representation of the Trade's Trailing Stop Loss Order, only
   * provided if such an Order exists.
   */
  trailingStopLossOrder: TrailingStopLossOrder;
}

/**
 * Account
 */

/**
 * The current mutability and hedging settings related to guaranteed Stop Loss
 * orders.
 */
interface GuaranteedStopLossOrderParameters {
  /**
   * The current guaranteed Stop Loss Order mutability setting of the Account
   * when market is open.
   */
  mutabilityMarketOpen: GuaranteedStopLossOrderMutability;

  /**
   * The current guaranteed Stop Loss Order mutability setting of the Account
   * when market is halted.
   */
  mutabilityMarketHalted: GuaranteedStopLossOrderMutability;
}

/**
 * For Accounts that support guaranteed Stop Loss Orders, describes the actions
 * that can be be performed on guaranteed Stop Loss Orders.
 */
type GuaranteedStopLossOrderMutability =
  | 'FIXED'
  | 'REPLACEABLE'
  | 'CANCELABLE'
  | 'PRICE_WIDEN_ONLY';

/**
 * The overall behaviour of the Account regarding guaranteed Stop Loss Orders.
 */
type GuaranteedStopLossOrderMode = 'DISABLED' | 'ALLOWED' | 'REQUIRED';

export interface AccountSummaryResponse {
  /**
   * The summary of the requested Account.
   */
  account: AccountSummary;

  /**
   * The ID of the most recent Transaction created for the Account.
   */
  lastTransactionID: string;
}

/**
 * The full details of a client's Account. This includes full open Trade, open
 * Position and pending Order representation.
 */
export interface Account {
  /**
   * The Account's identifier
   */
  id: string;

  /**
   * Client-assigned alias for the Account. Only provided if the Account has
   * an alias set
   */
  alias: string;

  /**
   * The home currency of the Account
   */
  currency: string;

  /**
   * ID of the user that created the Account.
   */
  createdByUserID: number;

  /**
   * The date/time when the Account was created.
   */
  createdTime: string;

  /**
   * The current guaranteed Stop Loss Order settings of the Account. This
   * field will only be present if the guaranteedStopLossOrderMode is not
   * ‘DISABLED'.
   */
  guaranteedStopLossOrderParameters: GuaranteedStopLossOrderParameters;

  /**
   * The current guaranteed Stop Loss Order mode of the Account.
   */
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;

  /**
   * The date/time that the Account's resettablePL was last reset.
   */
  resettablePLTime: string;

  /**
   * Client-provided margin rate override for the Account. The effective
   * margin rate of the Account is the lesser of this value and the OANDA
   * margin rate for the Account's division. This value is only provided if a
   * margin rate override exists for the Account.
   */
  marginRate: string;

  /**
   * The number of Trades currently open in the Account.
   */
  openTradeCount: number;

  /**
   * The number of Positions currently open in the Account.
   */
  openPositionCount: number;

  /**
   * The number of Orders currently pending in the Account.
   */
  pendingOrderCount: number;

  /**
   * Flag indicating that the Account has hedging enabled.
   */
  hedgingEnabled: boolean;

  /**
   * The total unrealized profit/loss for all Trades currently open in the
   * Account.
   */
  unrealizedPL: string;

  /**
   * The net asset value of the Account. Equal to Account balance +
   * unrealizedPL.
   */
  NAV: string;

  /**
   * Margin currently used for the Account.
   */
  marginUsed: string;

  /**
   * Margin available for Account currency.
   */
  marginAvailable: string;

  /**
   * The value of the Account's open positions represented in the Account's
   * home currency.
   */
  positionValue: string;

  /**
   * The Account's margin closeout unrealized PL.
   */
  marginCloseoutUnrealizedPL: string;

  /**
   * The Account's margin closeout NAV.
   */
  marginCloseoutNAV: string;

  /**
   * The Account's margin closeout margin used.
   */
  marginCloseoutMarginUsed: string;

  /**
   * The Account's margin closeout percentage. When this value is 1.0 or above
   * the Account is in a margin closeout situation.
   */
  marginCloseoutPercent: string;

  /**
   * The value of the Account's open positions as used for margin closeout
   * calculations represented in the Account's home currency.
   */
  marginCloseoutPositionValue: string;

  /**
   * The current WithdrawalLimit for the account which will be zero or a
   * positive value indicating how much can be withdrawn from the account.
   */
  withdrawalLimit: string;

  /**
   * The Account's margin call margin used.
   */
  marginCallMarginUsed: string;

  /**
   * The Account's margin call percentage. When this value is 1.0 or above the
   * Account is in a margin call situation.
   */
  marginCallPercent: string;

  /**
   * The current balance of the account.
   */
  balance: string;

  /**
   * The total profit/loss realized over the lifetime of the Account.
   */
  pl: string;

  /**
   * The total realized profit/loss for the account since it was last reset by
   * the client.
   */
  resettablePL: string;

  /**
   * The total amount of financing paid/collected over the lifetime of the
   * account.
   */
  financing: string;

  /**
   * The total amount of commission paid over the lifetime of the Account.
   */
  commission: string;

  /**
   * The total amount of dividend adjustment paid over the lifetime of the
   * Account in the Account's home currency.
   */
  dividendAdjustment: string;

  /**
   * The total amount of fees charged over the lifetime of the Account for the
   * execution of guaranteed Stop Loss Orders.
   */
  guaranteedExecutionFees: string;

  /**
   * The date/time when the Account entered a margin call state. Only provided
   * if the Account is in a margin call.
   */
  marginCallEnterTime: string;

  /**
   * The number of times that the Account's current margin call was extended.
   */
  marginCallExtensionCount: number;

  /**
   * The date/time of the Account's last margin call extension.
   */
  lastMarginCallExtensionTime: string;

  /**
   * The ID of the last Transaction created for the Account.
   */
  lastTransactionID: string;

  /**
   * The details of the Trades currently open in the Account.
   */
  trades: TradeSummary[];

  /**
   * The details all Account Positions.
   */
  positions: Position[];

  /**
   * The details of the Orders currently pending in the Account.
   */
  orders: Order[];
}

export interface AccountResponse {
  /**
   * The full details of the requested Account.
   */
  account: {
    /**
     * The Account's identifier
     */
    id: string;

    /**
     * Client-assigned alias for the Account. Only provided if the Account has
     * an alias set
     */
    alias: string;

    /**
     * The home currency of the Account
     */
    currency: string;

    /**
     * ID of the user that created the Account.
     */
    createdByUserID: number;

    /**
     * The date/time when the Account was created.
     */
    createdTime: string;

    /**
     * The current guaranteed Stop Loss Order settings of the Account. This
     * field will only be present if the guaranteedStopLossOrderMode is not
     * ‘DISABLED'.
     */
    guaranteedStopLossOrderParameters: GuaranteedStopLossOrderParameters;

    /**
     * The current guaranteed Stop Loss Order mode of the Account.
     */
    guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;

    /**
     * The date/time that the Account's resettablePL was last reset.
     */
    resettablePLTime: string;

    /**
     * Client-provided margin rate override for the Account. The effective
     * margin rate of the Account is the lesser of this value and the OANDA
     * margin rate for the Account's division. This value is only provided if a
     * margin rate override exists for the Account.
     */
    marginRate: string;

    /**
     * The number of Trades currently open in the Account.
     */
    openTradeCount: number;

    /**
     * The number of Positions currently open in the Account.
     */
    openPositionCount: number;

    /**
     * The number of Orders currently pending in the Account.
     */
    pendingOrderCount: number;

    /**
     * Flag indicating that the Account has hedging enabled.
     */
    hedgingEnabled: boolean;

    /**
     * The total unrealized profit/loss for all Trades currently open in the
     * Account.
     */
    unrealizedPL: string;

    /**
     * The net asset value of the Account. Equal to Account balance +
     * unrealizedPL.
     */
    NAV: string;

    /**
     * Margin currently used for the Account.
     */
    marginUsed: string;

    /**
     * Margin available for Account currency.
     */
    marginAvailable: string;

    /**
     * The value of the Account's open positions represented in the Account's
     * home currency.
     */
    positionValue: string;

    /**
     * The Account's margin closeout unrealized PL.
     */
    marginCloseoutUnrealizedPL: string;

    /**
     * The Account's margin closeout NAV.
     */
    marginCloseoutNAV: string;

    /**
     * The Account's margin closeout margin used.
     */
    marginCloseoutMarginUsed: string;

    /**
     * The Account's margin closeout percentage. When this value is 1.0 or above
     * the Account is in a margin closeout situation.
     */
    marginCloseoutPercent: string;

    /**
     * The value of the Account's open positions as used for margin closeout
     * calculations represented in the Account's home currency.
     */
    marginCloseoutPositionValue: string;

    /**
     * The current WithdrawalLimit for the account which will be zero or a
     * positive value indicating how much can be withdrawn from the account.
     */
    withdrawalLimit: string;

    /**
     * The Account's margin call margin used.
     */
    marginCallMarginUsed: string;

    /**
     * The Account's margin call percentage. When this value is 1.0 or above the
     * Account is in a margin call situation.
     */
    marginCallPercent: string;

    /**
     * The current balance of the account.
     */
    balance: string;

    /**
     * The total profit/loss realized over the lifetime of the Account.
     */
    pl: string;

    /**
     * The total realized profit/loss for the account since it was last reset by
     * the client.
     */
    resettablePL: string;

    /**
     * The total amount of financing paid/collected over the lifetime of the
     * account.
     */
    financing: string;

    /**
     * The total amount of commission paid over the lifetime of the Account.
     */
    commission: string;

    /**
     * The total amount of dividend adjustment paid over the lifetime of the
     * Account in the Account's home currency.
     */
    dividendAdjustment: string;

    /**
     * The total amount of fees charged over the lifetime of the Account for the
     * execution of guaranteed Stop Loss Orders.
     */
    guaranteedExecutionFees: string;

    /**
     * The date/time when the Account entered a margin call state. Only provided
     * if the Account is in a margin call.
     */
    marginCallEnterTime: string;

    /**
     * The number of times that the Account's current margin call was extended.
     */
    marginCallExtensionCount: number;

    /**
     * The date/time of the Account's last margin call extension.
     */
    lastMarginCallExtensionTime: string;

    /**
     * The ID of the last Transaction created for the Account.
     */
    lastTransactionID: string;

    /**
     * The details of the Trades currently open in the Account.
     */
    trades: TradeSummary[];

    /**
     * The details all Account Positions.
     */
    positions: Position[];

    /**
     * The details of the Orders currently pending in the Account.
     */
    orders: Order[];
  };

  /**
   * The ID of the most recent Transaction created for the Account.
   */
  lastTransactionID: string;
}

/**
 * Poll an Account for its current state and changes since a specified
 * TransactionID.
 */
export interface AccountPoll {
  /**
   * The changes to the Account’s Orders, Trades and Positions since the
   * specified Transaction ID. Only provided if the sinceTransactionID is
   * supplied to the poll request.
   */
  changes: AccountChanges;

  /** The Account’s current price-dependent state. */
  state: AccountChangesState;

  /**
   * The ID of the last Transaction created for the Account.  This Transaction
   * ID should be used for future poll requests, as the client has already
   * observed all changes up to and including it.
   */
  lastTransactionID: string;
}

/**
 *
 */
export interface AccountChanges {
  /**
   * The Orders created. These Orders may have been filled, cancelled or
   * triggered in the same period.
   */
  ordersCreated: Order[];

  /** The Orders cancelled. */
  ordersCancelled: Order[];

  /** The Orders filled. */
  ordersFilled: Order[];

  /** The Orders triggered. */
  ordersTriggered: Order[];

  /** The Trades opened. */
  tradesOpened: TradeSummary[];

  /** The Trades reduced. */
  tradesReduced: TradeSummary[];

  /** The Trades closed. */
  tradesClosed: TradeSummary[];

  /** The Positions changed. */
  positions: Position[];

  /** The Transactions that have been generated. */
  transactions: Transaction[];
}

export interface AccountChangesState {
  /** The total unrealized profit/loss for all Trades currently open in the Account. */
  unrealizedPL: string;

  /** The net asset value of the Account. Equal to Account balance + unrealizedPL. */
  NAV: string;

  /** Margin currently used for the Account. */
  marginUsed: string;

  /** Margin available for Account currency. */
  marginAvailable: string;

  /**
   * The value of the Account’s open positions represented in the Account’s
   * home currency.
   */
  positionValue: string;

  /** The Account’s margin closeout unrealized PL. */
  marginCloseoutUnrealizedPL: string;

  /** The Account’s margin closeout NAV. */
  marginCloseoutNAV: string;

  /** The Account’s margin closeout margin used. */
  marginCloseoutMarginUsed: string;

  /**
   * The Account’s margin closeout percentage. When this value is 1.0 or above
   * the Account is in a margin closeout situation.
   */
  marginCloseoutPercent: string;

  /**
   * The value of the Account’s open positions as used for margin closeout
   * calculations represented in the Account’s home currency.
   */
  marginCloseoutPositionValue: string;

  /**
   * The current WithdrawalLimit for the account which will be zero or a
   * positive value indicating how much can be withdrawn from the account.
   */
  withdrawalLimit: string;

  /** The Account’s margin call margin used. */
  marginCallMarginUsed: string;

  /**
   * The Account’s margin call percentage. When this value is 1.0 or above the
   * Account is in a margin call situation.
   */
  marginCallPercent: string;

  /** The current balance of the account. */
  balance: string;

  /** The total profit/loss realized over the lifetime of the Account. */
  pl: string;

  /**
   * The total realized profit/loss for the account since it was last reset by
   * the client.
   */
  resettablePL: string;

  /**
   * The total amount of financing paid/collected over the lifetime of the
   * account.
   */
  financing: string;

  /**
   * The total amount of commission paid over the lifetime of the Account.
   */
  commission: string;

  /**
   * The total amount of dividend adjustment paid over the lifetime of the
   * Account in the Account’s home currency.
   */
  dividendAdjustment: string;

  /**
   * The total amount of fees charged over the lifetime of the Account for the
   * execution of guaranteed Stop Loss Orders.
   */
  guaranteedExecutionFees: string;

  /**
   * The date/time when the Account entered a margin call state. Only provided
   * if the Account is in a margin call.
   */
  marginCallEnterTime: string;

  /** The number of times that the Account’s current margin call was extended. */
  marginCallExtensionCount: number;

  /** The date/time of the Account’s last margin call extension. */
  lastMarginCallExtensionTime: string;

  /** The price-dependent state of each pending Order in the Account. */
  orders: DynamicOrderState[];

  /** The price-dependent state for each open Trade in the Account. */
  trades: CalculatedTradeState[];

  /** The price-dependent state for each open Position in the Account. */
  positions: CalculatedPositionState[];
}

/** The dynamic (calculated) state of a Position */
export interface CalculatedPositionState {
  /** The Position’s Instrument. */
  instrument: string;

  /** The Position’s net unrealized profit/loss */
  netUnrealizedPL: string;

  /** The unrealized profit/loss of the Position’s long open Trades */
  longUnrealizedPL: string;

  /** The unrealized profit/loss of the Position’s short open Trades */
  shortUnrealizedPL: string;

  /** Margin currently used by the Position. */
  marginUsed: string;
}

/** The dynamic (calculated) state of an open Trade */
export interface CalculatedTradeState {
  /** The Trade’s ID. */
  id: string;

  /** The Trade’s unrealized profit/loss. */
  unrealizedPL: string;

  /** Margin currently used by the Trade. */
  marginUsed: string;
}

/**
 * The dynamic state of an Order. This is only relevant to TrailingStopLoss Orders,
 * as no other Order type has dynamic state.
 */
export interface DynamicOrderState {
  /** The Order’s ID. */
  id: string;

  /** The Order’s calculated trailing stop value. */
  trailingStopValue: string;

  /**
   * The distance between the Trailing Stop Loss Order’s trailingStopValue and
   * the current Market Price. This represents the distance (in price units)
   * of the Order from a triggering price. If the distance could not be
   * determined, this value will not be set.
   */
  triggerDistance: string;

  /**
   * True if an exact trigger distance could be calculated. If false, it means
   * the provided trigger distance is a best estimate. If the distance could
   * not be determined, this value will not be set.
   */
  isTriggerDistanceExact: boolean;
}

/**
 * The full details of a client's Account. This includes full open Trade, open
 * Position and pending Order representation.
 */
export interface AccountSummary {
  /**
   * The Account's identifier
   */
  id: string;

  /**
   * Client-assigned alias for the Account. Only provided if the Account has
   * an alias set
   */
  alias: string;

  /**
   * The home currency of the Account
   */
  currency: string;

  /**
   * ID of the user that created the Account.
   */
  createdByUserID: number;

  /**
   * The date/time when the Account was created.
   */
  createdTime: string;

  /**
   * The current guaranteed Stop Loss Order settings of the Account. This
   * field will only be present if the guaranteedStopLossOrderMode is not
   * ‘DISABLED'.
   */
  guaranteedStopLossOrderParameters: GuaranteedStopLossOrderParameters;

  /**
   * The current guaranteed Stop Loss Order mode of the Account.
   */
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;

  /**
   * The date/time that the Account's resettablePL was last reset.
   */
  resettablePLTime: string;

  /**
   * Client-provided margin rate override for the Account. The effective
   * margin rate of the Account is the lesser of this value and the OANDA
   * margin rate for the Account's division. This value is only provided if a
   * margin rate override exists for the Account.
   */
  marginRate: string;

  /**
   * The number of Trades currently open in the Account.
   */
  openTradeCount: number;

  /**
   * The number of Positions currently open in the Account.
   */
  openPositionCount: number;

  /**
   * The number of Orders currently pending in the Account.
   */
  pendingOrderCount: number;

  /**
   * Flag indicating that the Account has hedging enabled.
   */
  hedgingEnabled: boolean;

  /**
   * The total unrealized profit/loss for all Trades currently open in the
   * Account.
   */
  unrealizedPL: string;

  /**
   * The net asset value of the Account. Equal to Account balance +
   * unrealizedPL.
   */
  NAV: string;

  /**
   * Margin currently used for the Account.
   */
  marginUsed: string;

  /**
   * Margin available for Account currency.
   */
  marginAvailable: string;

  /**
   * The value of the Account's open positions represented in the Account's
   * home currency.
   */
  positionValue: string;

  /**
   * The Account's margin closeout unrealized PL.
   */
  marginCloseoutUnrealizedPL: string;

  /**
   * The Account's margin closeout NAV.
   */
  marginCloseoutNAV: string;

  /**
   * The Account's margin closeout margin used.
   */
  marginCloseoutMarginUsed: string;

  /**
   * The Account's margin closeout percentage. When this value is 1.0 or above
   * the Account is in a margin closeout situation.
   */
  marginCloseoutPercent: string;

  /**
   * The value of the Account's open positions as used for margin closeout
   * calculations represented in the Account's home currency.
   */
  marginCloseoutPositionValue: string;

  /**
   * The current WithdrawalLimit for the account which will be zero or a
   * positive value indicating how much can be withdrawn from the account.
   */
  withdrawalLimit: string;

  /**
   * The Account's margin call margin used.
   */
  marginCallMarginUsed: string;

  /**
   * The Account's margin call percentage. When this value is 1.0 or above the
   * Account is in a margin call situation.
   */
  marginCallPercent: string;

  /**
   * The current balance of the account.
   */
  balance: string;

  /**
   * The total profit/loss realized over the lifetime of the Account.
   */
  pl: string;

  /**
   * The total realized profit/loss for the account since it was last reset by
   * the client.
   */
  resettablePL: string;

  /**
   * The total amount of financing paid/collected over the lifetime of the
   * account.
   */
  financing: string;

  /**
   * The total amount of commission paid over the lifetime of the Account.
   */
  commission: string;

  /**
   * The total amount of dividend adjustment paid over the lifetime of the
   * Account in the Account's home currency.
   */
  dividendAdjustment: string;

  /**
   * The total amount of fees charged over the lifetime of the Account for the
   * execution of guaranteed Stop Loss Orders.
   */
  guaranteedExecutionFees: string;

  /**
   * The date/time when the Account entered a margin call state. Only provided
   * if the Account is in a margin call.
   */
  marginCallEnterTime: string;

  /**
   * The number of times that the Account's current margin call was extended.
   */
  marginCallExtensionCount: number;

  /**
   * The date/time of the Account's last margin call extension.
   */
  lastMarginCallExtensionTime: string;

  /**
   * The ID of the last Transaction created for the Account.
   */
  lastTransactionID: string;
}

/**
 * Position
 */

/** The representation of a Position for a single direction (long or short). */
interface PositionSide {
  /**
   * Number of units in the position (negative value indicates short position,
   * positive indicates long position).
   */
  units: string;

  /**
   * Volume-weighted average of the underlying Trade open prices for the
   * Position.
   */
  averagePrice: string;

  /**
   * List of the open Trade IDs which contribute to the open Position.
   */
  tradeIDs: string[];

  /**
   * Profit/loss realized by the PositionSide over the lifetime of the
   * Account.
   */
  pl: string;

  /**
   * The unrealized profit/loss of all open Trades that contribute to this
   * PositionSide.
   */
  unrealizedPL: string;

  /**
   * Profit/loss realized by the PositionSide since the Account's resettablePL
   * was last reset by the client.
   */
  resettablePL: string;

  /**
   * The total amount of financing paid/collected for this PositionSide over
   * the lifetime of the Account.
   */
  financing: string;

  /**
   * The total amount of dividend adjustment paid for the PositionSide over
   * the lifetime of the Account.
   */
  dividendAdjustment: string;

  /**
   * The total amount of fees charged over the lifetime of the Account for the
   * execution of guaranteed Stop Loss Orders attached to Trades for this
   * PositionSide.
   */
  guaranteedExecutionFees: string;
}

/**	The specification of a Position within an Account. */
export interface Position {
  /**
   * The Position's Instrument.
   */
  instrument: string;

  /**
   * Profit/loss realized by the Position over the lifetime of the Account.
   */
  pl: string;

  /**
   * The unrealized profit/loss of all open Trades that contribute to this
   * Position.
   */
  unrealizedPL: string;

  /**
   * Margin currently used by the Position.
   */
  marginUsed: string;

  /**
   * Profit/loss realized by the Position since the Account's resettablePL was
   * last reset by the client.
   */
  resettablePL: string;

  /**
   * The total amount of financing paid/collected for this instrument over the
   * lifetime of the Account.
   */
  financing: string;

  /**
   * The total amount of commission paid for this instrument over the lifetime
   * of the Account.
   */
  commission: string;

  /**
   * The total amount of dividend adjustment paid for this instrument over the
   * lifetime of the Account.
   */
  dividendAdjustment: string;

  /**
   * The total amount of fees charged over the lifetime of the Account for the
   * execution of guaranteed Stop Loss Orders for this instrument.
   */
  guaranteedExecutionFees: string;

  /**
   * The details of the long side of the Position.
   */
  long: PositionSide;

  /**
   * The details of the short side of the Position.
   */
  short: PositionSide;
}

export interface PositionResponse {
  /**
   * The list of open Positions in the Account.
   */
  positions: Position[];

  /**
   * The ID of the most recent Transaction created for the Account
   */
  lastTransactionID: string;
}

export interface InstrumentPosition {
  /**
   * The list of open Positions in the Account.
   */
  position: Position;

  /**
   * The ID of the most recent Transaction created for the Account
   */
  lastTransactionID: string;
}

/**
 * Transactions Response
 */
export interface TransactionsResponse {
  /**
   * The details of the Transaction requested
   */
  transactions: Transaction[];

  /**
   * The ID of the most recent Transaction created for the Account
   */
  lastTransactionID: string;
}

/**
 * Transaction Response
 */
export interface TransactionResponse {
  /**
   * The details of the Transaction requested
   */
  transaction: Transaction;

  /**
   * The ID of the most recent Transaction created for the Account
   */
  lastTransactionID: string;
}

export interface Transaction {
  /**
   * The Transaction's Identifier.
   */
  id: string;

  /**
   * The Orders Instrument.
   */
  instrument: string;

  /**
   * The date/time when the Transaction was created.
   */
  time: string;

  /**
   * The ID of the user that initiated the creation of the Transaction.
   */
  userID: number;

  /**
   * The ID of the Account the Transaction was created for.
   */
  accountID: string;

  /**
   * The ID of the “batch” that the Transaction belongs to. Transactions in
   * the same batch are applied to the Account simultaneously.
   */
  batchID: string;

  /**
   * The Request ID of the request which generated the transaction.
   */
  requestID?: string;

  /**
   * The Type of the Transaction.
   */
  type: TransactionType | string;
}

/**
 * A CreateTransaction represents the creation of an Account.
 */
export interface CreateTransaction extends Transaction {
  /**
   *The ID of the Division that the Account is in
   */
  divisionID: number;

  /**
   *The ID of the Site that the Account was created at
   */
  siteID: number;

  /**
   *The ID of the user that the Account was created for
   */
  accountUserID: number;

  /**
   *The number of the Account within the site/division/user
   */
  accountNumber: number;

  /**
   *The home currency of the Account
   */
  homeCurrency: string;
}

/**
 * A ClientConfigureTransaction represents the configuration of an Account by a client.
 */
export interface ClientConfigureTransaction extends Transaction {
  /**
   * The client-provided alias for the Account.
   */
  alias: string;

  /**
   * The margin rate override for the Account.
   */
  marginRate: number;
}

/**
 * A ClientConfigureRejectTransaction represents the reject of configuration of an Account by a client.
 */
export interface ClientConfigureRejectTransaction extends Transaction {
  /**
   * The client-provided alias for the Account.
   */
  alias: string;

  /**
   * The margin rate override for the Account.
   */
  marginRate: number;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A TransferFundsTransaction represents the transfer of funds in/out of an Account.
 */
export interface TransferFundsTransaction extends Transaction {
  /**
   * The amount to deposit/withdraw from the Account in the Account's home
   * currency. A positive value indicates a deposit, a negative value
   * indicates a withdrawal.
   */
  amount: string;

  /**
   * The reason that an Account is being funded.
   */
  fundingReason: FundingReason;

  /**
   * An optional comment that may be attached to a fund transfer for audit
   * purposes
   */
  comment: string;

  /**
   * The Account's balance after funds are transferred.
   */
  accountBalance: string;
}

/**
 * A TransferFundsRejectTransaction represents the rejection of the transfer of funds in/out of an Account.
 */
export interface TransferFundsRejectTransaction extends Transaction {
  /**
   * The amount to deposit/withdraw from the Account in the Account's home
   * currency. A positive value indicates a deposit, a negative value
   * indicates a withdrawal.
   */
  amount: string;

  /**
   * The reason that an Account is being funded.
   */
  fundingReason: FundingReason;

  /**
   * An optional comment that may be attached to a fund transfer for audit
   * purposes
   */
  comment: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * The reason that an Account is being funded.
 */
export enum FundingReason {
  CLIENT_FUNDING = 'The client has initiated a funds transfer',
  ACCOUNT_TRANSFER = 'Funds are being transferred between two Accounts.',
  DIVISION_MIGRATION = 'Funds are being transferred as part of a Division migration',
  SITE_MIGRATION = 'Funds are being transferred as part of a Site migration',
  ADJUSTMENT = 'Funds are being transferred as part of an Account adjustment',
}

/**
 * A MarketOrderTransaction represents the creation of a Market Order
 * in the user's account. A Market Order is an Order that is filled
 * immediately at the current market price. Market Orders can be
 * specialized when they are created to accomplish a specific task:
 * to close a Trade, to closeout a Position or to participate in a
 * Margin closeout.
 */
export interface MarketOrderTransaction extends Transaction {
  /**
   * The Market Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Market Order. A positive
   * number of units results in a long Order, and a negative number of units
   * results in a short Order.
   */
  units: number;

  /**
   * The time-in-force requested for the Market Order. Restricted to FOK or
   * IOC for a MarketOrder.
   */
  timeInForce: TimeInForce;

  /**
   * The worst price that the client is willing to have the Market Order
   * filled at.
   */
  priceBound: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Details of the Trade requested to be closed, only provided when the
   * Market Order is being used to explicitly close a Trade.
   */
  tradeClose: MarketOrderTradeClose;

  /**
   * Details of the long Position requested to be closed out, only provided
   * when a Market Order is being used to explicitly closeout a long Position.
   */
  longPositionCloseout: MarketOrderPositionCloseout;

  /**
   * Details of the short Position requested to be closed out, only provided
   * when a Market Order is being used to explicitly closeout a short
   * Position.
   */
  shortPositionCloseout: MarketOrderPositionCloseout;

  /**
   * Details of the Margin Closeout that this Market Order was created for
   */
  marginCloseout: MarketOrderMarginCloseout;

  /**
   * Details of the delayed Trade close that this Market Order was created for
   */
  delayedTradeClose: MarketOrderDelayedTradeClose;

  /**
   * The reason that the Market Order was created
   */
  reason: MarketOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /** The specification of the Trailing Stop Loss Order that should be create
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;
}

/**
 * A MarketOrderRejectTransaction represents the rejection of the
 * creation of a Market Order.
 */
export interface MarketOrderRejectTransaction extends Transaction {
  /**
   * The Market Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Market Order. A positive
   * number of units results in a long Order, and a negative number of units
   * results in a short Order.
   */
  units: number;

  /**
   * The time-in-force requested for the Market Order. Restricted to FOK or
   * IOC for a MarketOrder.
   */
  timeInForce: TimeInForce;

  /**
   * The worst price that the client is willing to have the Market Order
   * filled at.
   */
  priceBound: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Details of the Trade requested to be closed, only provided when the
   * Market Order is being used to explicitly close a Trade.
   */
  tradeClose: MarketOrderTradeClose;

  /**
   * Details of the long Position requested to be closed out, only provided
   * when a Market Order is being used to explicitly closeout a long Position.
   */
  longPositionCloseout: MarketOrderPositionCloseout;

  /**
   * Details of the short Position requested to be closed out, only provided
   * when a Market Order is being used to explicitly closeout a short
   * Position.
   */
  shortPositionCloseout: MarketOrderPositionCloseout;

  /**
   * Details of the Margin Closeout that this Market Order was created for
   */
  marginCloseout: MarketOrderMarginCloseout;

  /**
   * Details of the delayed Trade close that this Market Order was created for
   */
  delayedTradeClose: MarketOrderDelayedTradeClose;

  /**
   * The reason that the Market Order was created
   */
  reason: MarketOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

export interface FixedPriceOrderTransaction extends Transaction {
  /**
   * The Fixed Price Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Fixed Price Order. A positive
   * number of units results in a long Order, and a negative number of units
   * results in a short Order.
   */
  units: number;

  /**
   * The price specified for the Fixed Price Order. This price is the exact
   * price that the Fixed Price Order will be filled at.
   */
  price: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * The state that the trade resulting from the Fixed Price Order should be
   * set to.
   */
  tradeState: string;

  /**
   * The reason that the Fixed Price Order was created
   */
  reason: FixedPriceOrderReason;

  /**
   * The client extensions for the Fixed Price Order.
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;
}

/**
 * A LimitOrderTransaction represents the creation of a Limit Order in the user's Account.
 */
export interface LimitOrderTransaction extends Transaction {
  /**
   * The Limit Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Limit Order. A positive number
   * of units results in a long Order, and a negative number of units results
   * in a short Order.
   */
  units: number;

  /**
   * The price threshold specified for the Order. The Limit Order will
   * only be filled by a market price that is equal to or better than this
   * price.
   */
  price: string;

  /**
   * The time-in-force requested for the Order.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the Limit Order will be cancelled if its timeInForce
   * is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Limit Order was initiated
   */
  reason: LimitOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * The ID of the Order that this Order replaces (only provided if this Order
   * replaces an existing Order).
   */
  replacesOrderID: string;

  /**
   * The ID of the Transaction that cancels the replaced Order (only provided
   * if this Order replaces an existing Order).
   */
  cancellingTransactionID: string;
}

/**
 * A LimitOrderRejectTransaction represents the rejection of the creation of a Limit Order.
 */
export interface LimitOrderRejectTransaction extends Transaction {
  /**
   * The Limit Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Limit Order. A positive number
   * of units results in a long Order, and a negative number of units results
   * in a short Order.
   */
  units: number;

  /**
   * The price threshold specified for the Order. The Limit Order will
   * only be filled by a market price that is equal to or better than this
   * price.
   */
  price: string;

  /**
   * The time-in-force requested for the Order.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the Limit Order will be cancelled if its timeInForce
   * is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Limit Order was initiated
   */
  reason: LimitOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * The ID of the Order that this Order was intended to replace (only
   * provided if this Order was intended to replace an existing Order).
   */
  intendedReplacesOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A StopOrderTransaction represents the creation of a Stop Order in the user's Account.
 */
export interface StopOrderTransaction extends Transaction {
  /**
   * The Stop Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Stop Order. A positive number
   * of units results in a long Order, and a negative number of units results
   * in a short Order.
   */
  units: number;

  /**
   * The price threshold specified for the Stop Order. The Stop Order will
   * only be filled by a market price that is equal to or worse than this
   * price.
   */
  price: string;

  /**
   * The worst market price that may be used to fill this Stop Order. If the
   * market gaps and crosses through both the price and the priceBound, the
   * Stop Order will be cancelled instead of being filled.
   */
  priceBound: string;

  /**
   * The time-in-force requested for the Stop Order.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the Stop Order will be cancelled if its timeInForce is
   * “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Stop Order was initiated
   */
  reason: StopOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * The ID of the Order that this Order replaces (only provided if this Order
   * replaces an existing Order).
   */
  replacesOrderID: string;

  /**
   * The ID of the Transaction that cancels the replaced Order (only provided
   * if this Order replaces an existing Order).
   */
  cancellingTransactionID: string;
}

/**
 * A StopOrderRejectTransaction represents the rejection of the creation of a Stop Order.
 */
export interface StopOrderRejectTransaction extends Transaction {
  /**
   * The Stop Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the Stop Order. A positive number
   * of units results in a long Order, and a negative number of units results
   * in a short Order.
   */
  units: number;

  /**
   * The price threshold specified for the Stop Order. The Stop Order will
   * only be filled by a market price that is equal to or worse than this
   * price.
   */
  price: string;

  /**
   * The worst market price that may be used to fill this Stop Order. If the
   * market gaps and crosses through both the price and the priceBound, the
   * Stop Order will be cancelled instead of being filled.
   */
  priceBound: string;

  /**
   * The time-in-force requested for the Stop Order.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the Stop Order will be cancelled if its timeInForce is
   * “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Stop Order was initiated
   */
  reason: StopOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * The ID of the Order that this Order was intended to replace (only
   * provided if this Order was intended to replace an existing Order).
   */
  intendedReplacesOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A MarketIfTouchedOrderTransaction represents the creation of a MarketIfTouched Order in the user's Account.
 */
export interface MarketIfTouchedOrderTransaction extends Transaction {
  /**
   * The MarketIfTouched Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the MarketIfTouched Order. A
   * positive number of units results in a long Order, and a negative number
   * of units results in a short Order.
   */
  units: number;

  /**
   * The price threshold specified for the MarketIfTouched Order. The
   * MarketIfTouched Order will only be filled by a market price that crosses
   * this price from the direction of the market price at the time when the
   * Order was created (the initialMarketPrice). Depending on the value of the
   * Order's price and initialMarketPrice, the MarketIfTouchedOrder will
   * behave like a Limit or a Stop Order.
   */
  price: string;

  /**
   * The worst market price that may be used to fill this MarketIfTouched
   * Order.
   */
  priceBound: string;

  /**
   * The time-in-force requested for the MarketIfTouched Order. Restricted to
   * “GTC”, “GFD” and “GTD” for MarketIfTouched Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the MarketIfTouched Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Market-if-touched Order was initiated
   */
  reason: MarketIfTouchedOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * The ID of the Order that this Order replaces (only provided if this Order
   * replaces an existing Order).
   */
  replacesOrderID: string;

  /**
   * The ID of the Transaction that cancels the replaced Order (only provided
   * if this Order replaces an existing Order).
   */
  cancellingTransactionID: string;
}

/**
 * A MarketIfTouchedOrderRejectTransaction represents the rejection of the creation of a MarketIfTouched Order.
 */
export interface MarketIfTouchedOrderRejectTransaction extends Transaction {
  /**
   * The MarketIfTouched Order's Instrument.
   */
  instrument: string;

  /**
   * The quantity requested to be filled by the MarketIfTouched Order. A
   * positive number of units results in a long Order, and a negative number
   * of units results in a short Order.
   */
  units: number;

  /**
   * The price threshold specified for the MarketIfTouched Order. The
   * MarketIfTouched Order will only be filled by a market price that crosses
   * this price from the direction of the market price at the time when the
   * Order was created (the initialMarketPrice). Depending on the value of the
   * Order's price and initialMarketPrice, the MarketIfTouchedOrder will
   * behave like a Limit or a Stop Order.
   */
  price: string;

  /**
   * The worst market price that may be used to fill this MarketIfTouched
   * Order.
   */
  priceBound: string;

  /**
   * The time-in-force requested for the MarketIfTouched Order. Restricted to
   * “GTC”, “GFD” and “GTD” for MarketIfTouched Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the MarketIfTouched Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of how Positions in the Account are modified when the Order
   * is filled.
   */
  positionFill: OrderPositionFill;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Market-if-touched Order was initiated
   */
  reason: MarketIfTouchedOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The specification of the Take Profit Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  takeProfitOnFill: TakeProfitDetails;

  /**
   * The specification of the Stop Loss Order that should be created for a
   * Trade opened when the Order is filled (if such a Trade is created).
   */
  stopLossOnFill: StopLossDetails;

  /**
   * The specification of the Trailing Stop Loss Order that should be created
   * for a Trade that is opened when the Order is filled (if such a Trade is
   * created).
   */
  trailingStopLossOnFill: TrailingStopLossDetails;

  /**
   * The specification of the Guaranteed Stop Loss Order that should be
   * created for a Trade that is opened when the Order is filled (if such a
   * Trade is created).
   */
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;

  /**
   * Client Extensions to add to the Trade created when the Order is filled
   * (if such a Trade is created).  Do not set, modify, delete
   * tradeClientExtensions if your account is associated with MT4.
   */
  tradeClientExtensions: ClientExtensions;

  /**
   * The ID of the Order that this Order was intended to replace (only
   * provided if this Order was intended to replace an existing Order).
   */
  intendedReplacesOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A TakeProfitOrderTransaction represents the creation of a TakeProfit Order in the user's Account.
 */
export interface TakeProfitOrderTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price threshold specified for the TakeProfit Order. The associated
   * Trade will be closed by a market price that is equal to or better than
   * this threshold.
   */
  price: string;

  /**
   * The time-in-force requested for the TakeProfit Order. Restricted to
   * “GTC”, “GFD” and “GTD” for TakeProfit Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the TakeProfit Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Take Profit Order was initiated
   */
  reason: TakeProfitOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order replaces (only provided if this Order
   * replaces an existing Order).
   */
  replacesOrderID: string;

  /**
   * The ID of the Transaction that cancels the replaced Order (only provided
   * if this Order replaces an existing Order).
   */
  cancellingTransactionID: string;
}

/**
 * A TakeProfitOrderRejectTransaction represents the rejection of the creation of a TakeProfit Order.
 */
export interface TakeProfitOrderRejectTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price threshold specified for the TakeProfit Order. The associated
   * Trade will be closed by a market price that is equal to or better than
   * this threshold.
   */
  price: string;

  /**
   * The time-in-force requested for the TakeProfit Order. Restricted to
   * “GTC”, “GFD” and “GTD” for TakeProfit Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the TakeProfit Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Take Profit Order was initiated
   */
  reason: TakeProfitOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order was intended to replace (only
   * provided if this Order was intended to replace an existing Order).
   */
  intendedReplacesOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A StopLossOrderTransaction represents the creation of a StopLoss Order in the user's Account.
 */
export interface StopLossOrderTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price threshold specified for the Stop Loss Order. The associated
   * Trade will be closed by a market price that is equal to or worse than
   * this threshold.
   */
  price: string;

  /**
   * Specifies the distance (in price units) from the Account's current price
   * to use as the Stop Loss Order price. If the Trade is short the
   * Instrument's bid price is used, and for long Trades the ask is used.
   */
  distance: number;

  /**
   * The time-in-force requested for the StopLoss Order. Restricted to “GTC”,
   * “GFD” and “GTD” for StopLoss Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the StopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Stop Loss Order was initiated
   */
  reason: StopLossOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order replaces (only provided if this Order
   * replaces an existing Order).
   */
  replacesOrderID: string;

  /**
   * The ID of the Transaction that cancels the replaced Order (only provided
   * if this Order replaces an existing Order).
   */
  cancellingTransactionID: string;
}

/**
 * A StopLossOrderRejectTransaction represents the rejection of the creation of a StopLoss Order.
 */
export interface StopLossOrderRejectTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * §The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price threshold specified for the Stop Loss Order. The associated
   * Trade will be closed by a market price that is equal to or worse than
   * this threshold.
   */
  price: string;

  /**
   * Specifies the distance (in price units) from the Account's current price
   * to use as the Stop Loss Order price. If the Trade is short the
   * Instrument's bid price is used, and for long Trades the ask is used.
   */
  distance: number;

  /**
   * The time-in-force requested for the StopLoss Order. Restricted to “GTC”,
   * “GFD” and “GTD” for StopLoss Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the StopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Stop Loss Order was initiated
   */
  reason: StopLossOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order was intended to replace (only
   * provided if this Order was intended to replace an existing Order).
   */
  intendedReplacesOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A GuaranteedStopLossOrderTransaction represents the creation of a GuaranteedStopLoss Order in the user's Account.
 */
export interface GuaranteedStopLossOrderTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price threshold specified for the Guaranteed Stop Loss Order. The
   * associated Trade will be closed at this price.
   */
  price: string;

  /**
   * Specifies the distance (in price units) from the Account's current price
   * to use as the Guaranteed Stop Loss Order price. If the Trade is short the
   * Instrument's bid price is used, and for long Trades the ask is used.
   */
  distance: number;

  /**
   * The time-in-force requested for the GuaranteedStopLoss Order. Restricted
   * to “GTC”, “GFD” and “GTD” for GuaranteedStopLoss Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the GuaranteedStopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The fee that will be charged if the Guaranteed Stop Loss Order is filled
   * at the guaranteed price. The value is determined at Order creation time.
   * It is in price units and is charged for each unit of the Trade.
   */
  guaranteedExecutionPremium: number;

  /**
   * The reason that the Guaranteed Stop Loss Order was initiated
   */
  reason: GuaranteedStopLossOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order replaces (only provided if this Order
   * replaces an existing Order).
   */
  replacesOrderID: string;

  /**
   * The ID of the Transaction that cancels the replaced Order (only provided
   * if this Order replaces an existing Order).
   */
  cancellingTransactionID: string;
}

/**
 * A GuaranteedStopLossOrderRejectTransaction represents the rejection of the creation of a GuaranteedStopLoss Order.
 */
export interface GuaranteedStopLossOrderRejectTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price threshold specified for the Guaranteed Stop Loss Order. The
   * associated Trade will be closed at this price.
   */
  price: string;

  /**
   * Specifies the distance (in price units) from the Account's current price
   * to use as the Guaranteed Stop Loss Order price. If the Trade is short the
   * Instrument's bid price is used, and for long Trades the ask is used.
   */
  distance: number;

  /**
   * The time-in-force requested for the GuaranteedStopLoss Order. Restricted
   * to “GTC”, “GFD” and “GTD” for GuaranteedStopLoss Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the GuaranteedStopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Guaranteed Stop Loss Order was initiated
   */
  reason: GuaranteedStopLossOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order was intended to replace (only
   * provided if this Order was intended to replace an existing Order).
   */
  intendedReplacesOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A TrailingStopLossOrderTransaction represents the creation of a TrailingStopLoss Order in the user's Account.
 */
export interface TrailingStopLossOrderTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price distance (in price units) specified for the TrailingStopLoss
   * Order.
   */
  distance: number;

  /**
   * The time-in-force requested for the TrailingStopLoss Order. Restricted to
   * “GTC”, “GFD” and “GTD” for TrailingStopLoss Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the StopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Trailing Stop Loss Order was initiated
   */
  reason: TrailingStopLossOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order replaces (only provided if this Order
   * replaces an existing Order).
   */
  replacesOrderID: string;

  /**
   * The ID of the Transaction that cancels the replaced Order (only provided
   * if this Order replaces an existing Order).
   */
  cancellingTransactionID: string;
}

/**
 * A TrailingStopLossOrderRejectTransaction represents the rejection of the creation of a TrailingStopLoss Order.
 */
export interface TrailingStopLossOrderRejectTransaction extends Transaction {
  /**
   * The ID of the Trade to close when the price threshold is breached.
   */
  tradeID: string;

  /**
   * The client ID of the Trade to be closed when the price threshold is
   * breached.
   */
  clientTradeID: string;

  /**
   * The price distance (in price units) specified for the TrailingStopLoss
   * Order.
   */
  distance: number;

  /**
   * The time-in-force requested for the TrailingStopLoss Order. Restricted to
   * “GTC”, “GFD” and “GTD” for TrailingStopLoss Orders.
   */
  timeInForce: TimeInForce;

  /**
   * The date/time when the StopLoss Order will be cancelled if its
   * timeInForce is “GTD”.
   */
  gtdTime: string;

  /**
   * Specification of which price component should be used when determining if
   * an Order should be triggered and filled. This allows Orders to be
   * triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
   * or inverse (ask for sell, bid for buy) price depending on the desired
   * behaviour. Orders are always filled using their default price component.
   * This feature is only provided through the REST API. Clients who choose to
   * specify a non-default trigger condition will not see it reflected in any
   * of OANDA's proprietary or partner trading platforms, their transaction
   * history or their account statements. OANDA platforms always assume that
   * an Order's trigger condition is set to the default value when indicating
   * the distance from an Order's trigger price, and will always provide the
   * default trigger condition when creating or modifying an Order. A special
   * restriction applies when creating a Guaranteed Stop Loss Order. In this
   * case the TriggerCondition value must either be “DEFAULT”, or the
   * “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
   * Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
   * short trades “DEFAULT” and “ASK” are valid.
   */
  triggerCondition: OrderTriggerCondition;

  /**
   * The reason that the Trailing Stop Loss Order was initiated
   */
  reason: TrailingStopLossOrderReason;

  /**
   * Client Extensions to add to the Order (only provided if the Order is
   * being created with client extensions).
   */
  clientExtensions: ClientExtensions;

  /**
   * The ID of the OrderFill Transaction that caused this Order to be created
   * (only provided if this Order was created automatically when another Order
   * was filled).
   */
  orderFillTransactionID: string;

  /**
   * The ID of the Order that this Order was intended to replace (only
   * provided if this Order was intended to replace an existing Order).
   */
  intendedReplacesOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * An OrderFillTransaction represents the filling of an Order in the client's Account.
 */
export interface OrderFillTransaction extends Transaction {
  /**
   * The ID of the Order filled.
   */
  orderID: string;

  /**
   * The client Order ID of the Order filled (only provided if the client has
   * assigned one).
   */
  clientOrderID: string;

  /**
   * The name of the filled Order's instrument.
   */
  instrument: string;

  /**
   * The number of units filled by the OrderFill.
   */
  units: number;

  /**
   * The HomeConversionFactors in effect at the time of the OrderFill.
   */
  homeConversionFactors: HomeConversionFactors;

  /**
   * The price that all of the units of the OrderFill should have been filled
   * at, in the absence of guaranteed price execution. This factors in the
   * Account's current ClientPrice, used liquidity and the units of the
   * OrderFill only. If no Trades were closed with their price clamped for
   * guaranteed stop loss enforcement, then this value will match the price
   * fields of each Trade opened, closed, and reduced, and they will all be
   * the exact same.
   */
  fullVWAP: string;

  /**
   * The price in effect for the account at the time of the Order fill.
   */
  fullPrice: ClientPrice;

  /**
   * The reason that an Order was filled
   */
  reason: OrderFillReason;

  /**
   * The profit or loss incurred when the Order was filled.
   */
  pl: string;

  /**
   * The profit or loss incurred when the Order was filled, in the
   * Instrument's quote currency.
   */
  quotePL: number;

  /**
   * The financing paid or collected when the Order was filled.
   */
  financing: string;

  /**
   * The financing paid or collected when the Order was filled, in the
   * Instrument's base currency.
   */
  baseFinancing: number;

  /**
   * The financing paid or collected when the Order was filled, in the
   * Instrument's quote currency.
   */
  quoteFinancing: number;

  /**
   * The commission charged in the Account's home currency as a result of
   * filling the Order. The commission is always represented as a positive
   * quantity of the Account's home currency, however it reduces the balance
   * in the Account.
   */
  commission: string;

  /**
   * The total guaranteed execution fees charged for all Trades opened, closed
   * or reduced with guaranteed Stop Loss Orders.
   */
  guaranteedExecutionFee: string;

  /**
   * The total guaranteed execution fees charged for all Trades opened, closed
   * or reduced with guaranteed Stop Loss Orders, expressed in the
   * Instrument's quote currency.
   */
  quoteGuaranteedExecutionFee: number;

  /**
   * The Account's balance after the Order was filled.
   */
  accountBalance: string;

  /**
   * The Trade that was opened when the Order was filled (only provided if
   * filling the Order resulted in a new Trade).
   */
  tradeOpened: TradeOpen;

  /**
   * The Trades that were closed when the Order was filled (only provided if
   * filling the Order resulted in a closing open Trades).
   */
  tradesClosed: TradeReduce[];

  /**
   * The Trade that was reduced when the Order was filled (only provided if
   * filling the Order resulted in reducing an open Trade).
   */
  tradeReduced: TradeReduce;

  /**
   * The half spread cost for the OrderFill, which is the sum of the
   * halfSpreadCost values in the tradeOpened, tradesClosed and tradeReduced
   * fields. This can be a positive or negative value and is represented in
   * the home currency of the Account.
   */
  halfSpreadCost: number;
}

/**
 * An OrderCancelTransaction represents the cancellation of an Order in the client's Account.
 */
export interface OrderCancelTransaction extends Transaction {
  /**
   * The ID of the Order cancelled
   */
  orderID: string;

  /**
   * The client ID of the Order cancelled (only provided if the Order has a
   * client Order ID).
   */
  clientOrderID: string;

  /**
   * The reason that the Order was cancelled.
   */
  reason: OrderCancelReason;

  /**
   * The ID of the Order that replaced this Order (only provided if this Order
   * was cancelled for replacement).
   */
  replacedByOrderID: string;
}

/**
 * An OrderCancelRejectTransaction represents the rejection of the cancellation of an Order in the client's Account.
 */
export interface OrderCancelRejectTransaction extends Transaction {
  /**
   * The ID of the Order intended to be cancelled
   */
  orderID: string;

  /**
   * The client ID of the Order intended to be cancelled (only provided if the
   * Order has a client Order ID).
   */
  clientOrderID: string;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A OrderClientExtensionsModifyTransaction represents the modification of an Order's Client Extensions.
 */
export interface OrderClientExtensionsModifyTransaction extends Transaction {
  /**
   * The ID of the Order who's client extensions are to be modified.
   */
  orderID: string;

  /**
   * The original Client ID of the Order who's client extensions are to be
   * modified.
   */
  clientOrderID: string;

  /**
   * The new Client Extensions for the Order.
   */
  clientExtensionsModify: ClientExtensions;

  /**
   * The new Client Extensions for the Order's Trade on fill.
   */
  tradeClientExtensionsModify: ClientExtensions;
}

/**
 * A OrderClientExtensionsModifyRejectTransaction represents the rejection of the modification of an Order's Client Extensions.
 */
export interface OrderClientExtensionsModifyRejectTransaction
  extends Transaction {
  /**
   * The ID of the Order who's client extensions are to be modified.
   */
  orderID: string;

  /**
   * The original Client ID of the Order who's client extensions are to be
   * modified.
   */
  clientOrderID: string;

  /**
   * The new Client Extensions for the Order.
   */
  clientExtensionsModify: ClientExtensions;

  /**
   * The new Client Extensions for the Order's Trade on fill.
   */
  tradeClientExtensionsModify: ClientExtensions;

  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A TradeClientExtensionsModifyTransaction represents the modification of a Trade's Client Extensions.
 */
export interface TradeClientExtensionsModifyTransaction extends Transaction {
  /**
   * The ID of the Trade who's client extensions are to be modified.
   */
  tradeID: string;

  /**
   * The original Client ID of the Trade who's client extensions are to be
   * modified.
   */
  clientTradeID: string;

  /**
   * The new Client Extensions for the Trade.
   */
  tradeClientExtensionsModify: ClientExtensions;
}

/**
 * A TradeClientExtensionsModifyRejectTransaction represents the rejection of the modification of a Trade's Client Extensions.
 */
export interface TradeClientExtensionsModifyRejectTransaction
  extends Transaction {
  /**
   * The ID of the Trade who's client extensions are to be modified.
   */
  tradeID: string;

  /**
   * The original Client ID of the Trade who's client extensions are to be
   * modified.
   */
  clientTradeID: string;

  /**
   * The new Client Extensions for the Trade.
   */
  tradeClientExtensionsModify: ClientExtensions;
  /**
   * The reason that the Reject Transaction was created
   */
  rejectReason: TransactionRejectReason;
}

/**
 * A MarginCallExtendTransaction is created when the margin call state for an Account has been extended.
 */
export interface MarginCallExtendTransaction extends Transaction {
  /**
   * The number of the extensions to the Account's current margin call that
   * have been applied. This value will be set to 1 for the first
   * MarginCallExtend Transaction
   */
  extensionNumber: number;
}

/**
 * A DelayedTradeClosure Transaction is created administratively to indicate open trades that should have been closed but weren't because the open trades' instruments were untradeable at the time. Open trades listed in this transaction will be closed once their respective instruments become tradeable.
 */
export interface DelayedTradeClosureTransaction extends Transaction {
  /**
   * The reason for the delayed trade closure
   */
  reason: MarketOrderReason;

  /**
   * List of Trade ID's identifying the open trades that will be closed when
   * their respective instruments become tradeable
   */
  tradeIDs: string;
}

/**
 * A DailyFinancingTransaction represents the daily payment/collection of financing for an Account.
 */
export interface DailyFinancingTransaction extends Transaction {
  /**
   * The amount of financing paid/collected for the Account.
   */
  financing: string;

  /**
   * The Account's balance after daily financing.
   */
  accountBalance: string;

  /**
   * The financing paid/collected for each Position in the Account.
   */
  positionFinancings: PositionFinancing[];
}

/**
 * OpenTradeFinancing is used to pay/collect daily financing charge for a Position within an Account
 */
export interface PositionFinancing {
  /**
   * The instrument of the Position that financing is being paid/collected
   * for.
   */
  instrument: string;

  /**
   * The amount of financing paid/collected for the Position.
   */
  financing: string;

  /**
   * The amount of base financing paid/collected for the Position.
   */
  baseFinancing: number;

  /**
   * The amount of quote financing paid/collected for the Position.
   */
  quoteFinancing: number;

  /**
   * The HomeConversionFactors in effect for the Position's Instrument at the
   * time of the DailyFinancing.
   */
  homeConversionFactors: HomeConversionFactors;

  /**
   * The financing paid/collected for each open Trade within the Position.
   */
  openTradeFinancings: OpenTradeFinancing[];

  /**
   * The account financing mode at the time of the daily financing.
   */
  accountFinancingMode: AccountFinancingMode;
}

/**
 * OpenTradeFinancing is used to pay/collect daily financing charge for an open Trade within an Account
 */
export interface OpenTradeFinancing {
  /**
   * The ID of the Trade that financing is being paid/collected for.
   */
  tradeID: string;

  /**
   * The amount of financing paid/collected for the Trade.
   */
  financing: string;

  /**
   * The amount of financing paid/collected in the Instrument's base currency
   * for the Trade.
   */
  baseFinancing: number;

  /**
   * The amount of financing paid/collected in the Instrument's quote currency
   * for the Trade.
   */
  quoteFinancing: number;

  /**
   * The financing rate in effect for the instrument used to calculate the the
   * amount of financing paid/collected for the Trade. This field will only be
   * set if the AccountFinancingMode at the time of the daily financing is
   * DAILY_INSTRUMENT or SECOND_BY_SECOND_INSTRUMENT. The value is in decimal
   * rather than percentage points, e.g. 5% is represented as 0.05.
   */
  financingRate: number;
}

/**
 * The financing mode of an Account
 */
export enum AccountFinancingMode {
  NO_FINANCING = 'No financing is paid/charged for open Trades in the Account',
  SECOND_BY_SECOND = 'Second-by-second financing is paid/charged for open Trades in the Account, both daily and when the the Trade is closed',
  DAILY = "A full day's worth of financing is paid/charged for open Trades in the Account daily at 5pm New York time",
}

export enum ClientOrderReason {
  CLIENT_ORDER = 'The Market Order was created at the request of a client',
  TRADE_CLOSE = 'The Market Order was created to close a Trade at the request of a client',
  POSITION_CLOSEOUT = 'The Market Order was created to close a Position at the request of a client',
  MARGIN_CLOSEOUT = 'The Market Order was created as part of a Margin Closeout',
  DELAYED_TRADE_CLOSE = 'The Market Order was created to close a trade marked for delayed closure',
}

/**
 * The reason that an Order was cancelled.
 */
export enum OrderCancelReason {
  INTERNAL_SERVER_ERROR = 'The Order was cancelled because at the time of filling, an unexpected internal server error occurred.',
  ACCOUNT_LOCKED = 'The Order was cancelled because at the time of filling the account was locked.',
  ACCOUNT_NEW_POSITIONS_LOCKED = 'The order was to be filled, however the account is configured to not allow new positions to be created.',
  ACCOUNT_ORDER_CREATION_LOCKED = "Filling the Order wasn't possible because it required the creation of a dependent Order and the Account is locked for Order creation.",
  ACCOUNT_ORDER_FILL_LOCKED = 'Filling the Order was not possible because the Account is locked for filling Orders.',
  CLIENT_REQUEST = 'The Order was cancelled explicitly at the request of the client.',
  MIGRATION = 'The Order cancelled because it is being migrated to another account.',
  MARKET_HALTED = "Filling the Order wasn't possible because the Order's instrument was halted.",
  LINKED_TRADE_CLOSED = 'The Order is linked to an open Trade that was closed.',
  TIME_IN_FORCE_EXPIRED = 'The time in force specified for this order has passed.',
  INSUFFICIENT_MARGIN = "Filling the Order wasn't possible because the Account had insufficient margin.",
  FIFO_VIOLATION = 'Filling the Order would have resulted in a a FIFO violation.',
  BOUNDS_VIOLATION = "Filling the Order would have violated the Order's price bound.",
  CLIENT_REQUEST_REPLACED = 'The Order was cancelled for replacement at the request of the client.',
  DIVIDEND_ADJUSTMENT_REPLACED = 'The Order was cancelled for replacement with an adjusted fillPrice to accommodate for the price movement caused by a dividendAdjustment.',
  INSUFFICIENT_LIQUIDITY = "Filling the Order wasn't possible because enough liquidity available.",
  TAKE_PROFIT_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'Filling the Order would have resulted in the creation of a Take Profit Order with a GTD time in the past.',
  TAKE_PROFIT_ON_FILL_LOSS = 'Filling the Order would result in the creation of a Take Profit Order that would have been filled immediately, closing the new Trade at a loss.',
  LOSING_TAKE_PROFIT = 'Filling the Order would result in the creation of a Take Profit Loss Order that would close the new Trade at a loss when filled.',
  STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'Filling the Order would have resulted in the creation of a Stop Loss Order with a GTD time in the past.',
  STOP_LOSS_ON_FILL_LOSS = 'Filling the Order would result in the creation of a Stop Loss Order that would have been filled immediately, closing the new Trade at a loss.',
  STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED = 'Filling the Order would result in the creation of a Stop Loss Order whose price would be zero or negative due to the specified distance.',
  STOP_LOSS_ON_FILL_REQUIRED = "Filling the Order would not result in the creation of Stop Loss Order, however the Account's configuration requires that all Trades have a Stop Loss Order attached to them.",
  STOP_LOSS_ON_FILL_GUARANTEED_REQUIRED = "Filling the Order would not result in the creation of a guaranteed Stop Loss Order, however the Account's configuration requires that all Trades have a guaranteed Stop Loss Order attached to them.",
  STOP_LOSS_ON_FILL_GUARANTEED_NOT_ALLOWED = "Filling the Order would result in the creation of a guaranteed Stop Loss Order, however the Account's configuration does not allow guaranteed Stop Loss Orders.",
  STOP_LOSS_ON_FILL_GUARANTEED_MINIMUM_DISTANCE_NOT_MET = 'Filling the Order would result in the creation of a guaranteed Stop Loss Order with a distance smaller than the configured minimum distance.',
  STOP_LOSS_ON_FILL_GUARANTEED_LEVEL_RESTRICTION_EXCEEDED = "Filling the Order would result in the creation of a guaranteed Stop Loss Order with trigger price and number of units that that violates the account's guaranteed Stop Loss Order level restriction.",
  STOP_LOSS_ON_FILL_GUARANTEED_HEDGING_NOT_ALLOWED = "Filling the Order would result in the creation of a guaranteed Stop Loss Order for a hedged Trade, however the Account's configuration does not allow guaranteed Stop Loss Orders for hedged Trades/Positions.",
  STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID = 'Filling the Order would result in the creation of a Stop Loss Order whose TimeInForce value is invalid. A likely cause would be if the Account requires guaranteed stop loss orders and the TimeInForce value were not GTC.',
  STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID = 'Filling the Order would result in the creation of a Stop Loss Order whose TriggerCondition value is invalid. A likely cause would be if the stop loss order is guaranteed and the TimeInForce is not TRIGGER_DEFAULT or TRIGGER_BID for a long trade, or not TRIGGER_DEFAULT or TRIGGER_ASK for a short trade.',
  GUARANTEED_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'Filling the Order would have resulted in the creation of a Guaranteed Stop Loss Order with a GTD time in the past.',
  GUARANTEED_STOP_LOSS_ON_FILL_LOSS = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order that would have been filled immediately, closing the new Trade at a loss.',
  GUARANTEED_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order whose price would be zero or negative due to the specified distance.',
  GUARANTEED_STOP_LOSS_ON_FILL_REQUIRED = "Filling the Order would not result in the creation of a Guaranteed Stop Loss Order, however the Account's configuration requires that all Trades have a Guaranteed Stop Loss Order attached to them.",
  GUARANTEED_STOP_LOSS_ON_FILL_NOT_ALLOWED = "Filling the Order would result in the creation of a Guaranteed Stop Loss Order, however the Account's configuration does not allow Guaranteed Stop Loss Orders.",
  GUARANTEED_STOP_LOSS_ON_FILL_MINIMUM_DISTANCE_NOT_MET = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order with a distance smaller than the configured minimum distance.',
  GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_VOLUME_EXCEEDED = "Filling the Order would result in the creation of a Guaranteed Stop Loss Order with trigger number of units that violates the account's Guaranteed Stop Loss Order level restriction volume.",
  GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_PRICE_RANGE_EXCEEDED = "Filling the Order would result in the creation of a Guaranteed Stop Loss Order with trigger price that violates the account's Guaranteed Stop Loss Order level restriction price range.",
  GUARANTEED_STOP_LOSS_ON_FILL_HEDGING_NOT_ALLOWED = "Filling the Order would result in the creation of a Guaranteed Stop Loss Order for a hedged Trade, however the Account's configuration does not allow Guaranteed Stop Loss Orders for hedged Trades/Positions.",
  GUARANTEED_STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order whose TimeInForce value is invalid. A likely cause would be if the Account requires guaranteed stop loss orders and the TimeInForce value were not GTC.',
  GUARANTEED_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order whose TriggerCondition value is invalid. A likely cause would be the TimeInForce is not TRIGGER_DEFAULT or TRIGGER_BID for a long trade, or not TRIGGER_DEFAULT or TRIGGER_ASK for a short trade.',
  TAKE_PROFIT_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED = 'Filling the Order would result in the creation of a Take Profit Order whose price would be zero or negative due to the specified distance.',
  TRAILING_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'Filling the Order would have resulted in the creation of a Trailing Stop Loss Order with a GTD time in the past.',
  CLIENT_TRADE_ID_ALREADY_EXISTS = 'Filling the Order would result in the creation of a new Open Trade with a client Trade ID already in use.',
  POSITION_CLOSEOUT_FAILED = "Closing out a position wasn't fully possible.",
  OPEN_TRADES_ALLOWED_EXCEEDED = 'Filling the Order would cause the maximum open trades allowed for the Account to be exceeded.',
  PENDING_ORDERS_ALLOWED_EXCEEDED = 'Filling the Order would have resulted in exceeding the number of pending Orders allowed for the Account.',
  TAKE_PROFIT_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS = 'Filling the Order would have resulted in the creation of a Take Profit Order with a client Order ID that is already in use.',
  STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS = 'Filling the Order would have resulted in the creation of a Stop Loss Order with a client Order ID that is already in use.',
  GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS = 'Filling the Order would have resulted in the creation of a Guaranteed Stop Loss Order with a client Order ID that is already in use.',
  TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS = 'Filling the Order would have resulted in the creation of a Trailing Stop Loss Order with a client Order ID that is already in use.',
  POSITION_SIZE_EXCEEDED = "Filling the Order would have resulted in the Account's maximum position size limit being exceeded for the Order's instrument.",
  HEDGING_GSLO_VIOLATION = 'Filling the Order would result in the creation of a Trade, however there already exists an opposing (hedged) Trade that has a guaranteed Stop Loss Order attached to it. Guaranteed Stop Loss Orders cannot be combined with hedged positions.',
  ACCOUNT_POSITION_VALUE_LIMIT_EXCEEDED = 'Filling the order would cause the maximum position value allowed for the account to be exceeded. The Order has been cancelled as a result.',
  INSTRUMENT_BID_REDUCE_ONLY = 'Filling the order would require the creation of a short trade, however the instrument is configured such that orders being filled using bid prices can only reduce existing positions. New short positions cannot be created, but existing long positions may be reduced or closed.',
  INSTRUMENT_ASK_REDUCE_ONLY = 'Filling the order would require the creation of a long trade, however the instrument is configured such that orders being filled using ask prices can only reduce existing positions. New long positions cannot be created, but existing short positions may be reduced or closed.',
  INSTRUMENT_BID_HALTED = 'Filling the order would require using the bid, however the instrument is configured such that the bids are halted, and so no short orders may be filled.',
  INSTRUMENT_ASK_HALTED = 'Filling the order would require using the ask, however the instrument is configured such that the asks are halted, and so no long orders may be filled.',
  STOP_LOSS_ON_FILL_GUARANTEED_BID_HALTED = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order (GSLO). Since the trade is long the GSLO would be short, however the bid side is currently halted. GSLOs cannot be created in this situation.',
  STOP_LOSS_ON_FILL_GUARANTEED_ASK_HALTED = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order (GSLO). Since the trade is short the GSLO would be long, however the ask side is currently halted. GSLOs cannot be created in this situation.',
  GUARANTEED_STOP_LOSS_ON_FILL_BID_HALTED = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order (GSLO). Since the trade is long the GSLO would be short, however the bid side is currently halted. GSLOs cannot be created in this situation.',
  GUARANTEED_STOP_LOSS_ON_FILL_ASK_HALTED = 'Filling the Order would result in the creation of a Guaranteed Stop Loss Order (GSLO). Since the trade is short the GSLO would be long, however the ask side is currently halted. GSLOs cannot be created in this situation.',
  FIFO_VIOLATION_SAFEGUARD_VIOLATION = 'Filling the Order would have resulted in a new Trade that violates the FIFO violation safeguard constraints.',
  FIFO_VIOLATION_SAFEGUARD_PARTIAL_CLOSE_VIOLATION = 'Filling the Order would have reduced an existing Trade such that the reduced Trade violates the FIFO violation safeguard constraints.',
  ORDERS_ON_FILL_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION = 'The Orders on fill would be in violation of the risk management Order mutual exclusivity configuration specifying that only one risk management Order can be attached to a Trade.',
}

/**
 * The reason that an Order was filled
 */
export enum OrderFillReason {
  LIMIT_ORDER = 'The Order filled was a Limit Order',
  STOP_ORDER = 'The Order filled was a Stop Order',
  MARKET_IF_TOUCHED_ORDER = 'The Order filled was a Market-if-touched Order',
  TAKE_PROFIT_ORDER = 'The Order filled was a Take Profit Order',
  STOP_LOSS_ORDER = 'The Order filled was a Stop Loss Order',
  GUARANTEED_STOP_LOSS_ORDER = 'The Order filled was a Guaranteed Stop Loss Order',
  TRAILING_STOP_LOSS_ORDER = 'The Order filled was a Trailing Stop Loss Order',
  MARKET_ORDER = 'The Order filled was a Market Order',
  MARKET_ORDER_TRADE_CLOSE = 'The Order filled was a Market Order used to explicitly close a Trade',
  MARKET_ORDER_POSITION_CLOSEOUT = 'The Order filled was a Market Order used to explicitly close a Position',
  MARKET_ORDER_MARGIN_CLOSEOUT = 'The Order filled was a Market Order used for a Margin Closeout',
  MARKET_ORDER_DELAYED_TRADE_CLOSE = 'The Order filled was a Market Order used for a delayed Trade close',
  FIXED_PRICE_ORDER = 'The Order filled was a Fixed Price Order',
  FIXED_PRICE_ORDER_PLATFORM_ACCOUNT_MIGRATION = 'The Order filled was a Fixed Price Order created as part of a platform account migration',
  FIXED_PRICE_ORDER_DIVISION_ACCOUNT_MIGRATION = 'The Order filled was a Fixed Price Order created to close a Trade as part of division account migration',
  FIXED_PRICE_ORDER_ADMINISTRATIVE_ACTION = 'The Order filled was a Fixed Price Order created to close a Trade administratively',
}

/**
 * The reason that the Trailing Stop Loss Order was initiated
 */
export enum TrailingStopLossOrderReason {
  CLIENT_ORDER = 'The Trailing Stop Loss Order was initiated at the request of a client',
  REPLACEMENT = 'The Trailing Stop Loss Order was initiated as a replacement for an existing Order',
  ON_FILL = 'The Trailing Stop Loss Order was initiated automatically when an Order was filled that opened a new Trade requiring a Trailing Stop Loss Order.',
}

/**
 * The reason that the Guaranteed Stop Loss Order was initiated
 */
export enum GuaranteedStopLossOrderReason {
  CLIENT_ORDER = 'The Guaranteed Stop Loss Order was initiated at the request of a client',
  REPLACEMENT = 'The Guaranteed Stop Loss Order was initiated as a replacement for an existing Order',
  ON_FILL = 'The Guaranteed Stop Loss Order was initiated automatically when an Order was filled that opened a new Trade requiring a Guaranteed Stop Loss Order.',
}

/**
 * The reason that the Stop Loss Order was initiated
 */
export enum StopLossOrderReason {
  CLIENT_ORDER = 'The Stop Loss Order was initiated at the request of a client',
  REPLACEMENT = 'The Stop Loss Order was initiated as a replacement for an existing Order',
  ON_FILL = 'The Stop Loss Order was initiated automatically when an Order was filled that opened a new Trade requiring a Stop Loss Order.',
}

/**
 * The reason that the Take Profit Order was initiated
 */
export enum TakeProfitOrderReason {
  CLIENT_ORDER = 'The Take Profit Order was initiated at the request of a client',
  REPLACEMENT = 'The Take Profit Order was initiated as a replacement for an existing Order',
  ON_FILL = 'The Take Profit Order was initiated automatically when an Order was filled that opened a new Trade requiring a Take Profit Order.',
}

/**
 * The reason that the Market-if-touched Order was initiated
 */
export enum MarketIfTouchedOrderReason {
  CLIENT_ORDER = 'The Market-if-touched Order was initiated at the request of a client',
  REPLACEMENT = 'The Market-if-touched Order was initiated as a replacement for an existing Order',
}

/**
 * The reason that the Stop Order was initiated
 */
export enum StopOrderReason {
  CLIENT_ORDER = 'The Stop Order was initiated at the request of a client',
  REPLACEMENT = 'The Stop Order was initiated as a replacement for an existing Order',
}

/**
 * The reason that the Limit Order was initiated
 */
export enum LimitOrderReason {
  CLIENT_ORDER = 'The Limit Order was initiated at the request of a client',
  REPLACEMENT = 'The Limit Order was initiated as a replacement for an existing Order',
}

/**
 * The reason that the Fixed Price Order was created
 */
export enum FixedPriceOrderReason {
  PLATFORM_ACCOUNT_MIGRATION = 'The Fixed Price Order was created as part of a platform account migration',
  TRADE_CLOSE_DIVISION_ACCOUNT_MIGRATION = 'The Fixed Price Order was created to close a Trade as part of division account migration',
  TRADE_CLOSE_ADMINISTRATIVE_ACTION = 'The Fixed Price Order was created to close a Trade administratively',
}

/**
 * The reason that the Market Order was created
 */
export enum MarketOrderReason {
  CLIENT_ORDER = 'The Market Order was created at the request of a client',
  TRADE_CLOSE = 'The Market Order was created to close a Trade at the request of a client',
  POSITION_CLOSEOUT = 'The Market Order was created to close a Position at the request of a client',
  MARGIN_CLOSEOUT = 'The Market Order was created as part of a Margin Closeout',
  DELAYED_TRADE_CLOSE = 'The Market Order was created to close a trade marked for delayed closure',
}

/**
 * The possible types of a Transaction
 */
export enum TransactionType {
  CREATE = 'Account Create Transaction',
  CLOSE = 'Account Close Transaction',
  REOPEN = 'Account Reopen Transaction',
  CLIENT_CONFIGURE = 'Client Configuration Transaction',
  CLIENT_CONFIGURE_REJECT = 'Client Configuration Reject Transaction',
  TRANSFER_FUNDS = 'Transfer Funds Transaction',
  TRANSFER_FUNDS_REJECT = 'Transfer Funds Reject Transaction',
  MARKET_ORDER = 'Market Order Transaction',
  MARKET_ORDER_REJECT = 'Market Order Reject Transaction',
  FIXED_PRICE_ORDER = 'Fixed Price Order Transaction',
  LIMIT_ORDER = 'Limit Order Transaction',
  LIMIT_ORDER_REJECT = 'Limit Order Reject Transaction',
  STOP_ORDER = 'Stop Order Transaction',
  STOP_ORDER_REJECT = 'Stop Order Reject Transaction',
  MARKET_IF_TOUCHED_ORDER = 'Market if Touched Order Transaction',
  MARKET_IF_TOUCHED_ORDER_REJECT = 'Market if Touched Order Reject Transaction',
  TAKE_PROFIT_ORDER = 'Take Profit Order Transaction',
  TAKE_PROFIT_ORDER_REJECT = 'Take Profit Order Reject Transaction',
  STOP_LOSS_ORDER = 'Stop Loss Order Transaction',
  STOP_LOSS_ORDER_REJECT = 'Stop Loss Order Reject Transaction',
  GUARANTEED_STOP_LOSS_ORDER = 'Guaranteed Stop Loss Order Transaction',
  GUARANTEED_STOP_LOSS_ORDER_REJECT = 'Guaranteed Stop Loss Order Reject Transaction',
  TRAILING_STOP_LOSS_ORDER = 'Trailing Stop Loss Order Transaction',
  TRAILING_STOP_LOSS_ORDER_REJECT = 'Trailing Stop Loss Order Reject Transaction',
  ORDER_FILL = 'Order Fill Transaction',
  ORDER_CANCEL = 'Order Cancel Transaction',
  ORDER_CANCEL_REJECT = 'Order Cancel Reject Transaction',
  ORDER_CLIENT_EXTENSIONS_MODIFY = 'Order Client Extensions Modify Transaction',
  ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT = 'Order Client Extensions Modify Reject Transaction',
  TRADE_CLIENT_EXTENSIONS_MODIFY = 'Trade Client Extensions Modify Transaction',
  TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT = 'Trade Client Extensions Modify Reject Transaction',
  MARGIN_CALL_ENTER = 'Margin Call Enter Transaction',
  MARGIN_CALL_EXTEND = 'Margin Call Extend Transaction',
  MARGIN_CALL_EXIT = 'Margin Call Exit Transaction',
  DELAYED_TRADE_CLOSURE = 'Delayed Trade Closure Transaction',
  DAILY_FINANCING = 'Daily Financing Transaction',
  DIVIDEND_ADJUSTMENT = 'Dividend Adjustment Transaction',
  RESET_RESETTABLE_PL = 'Reset Resettable PL Transaction',
}

/**
 * The reason that a Transaction was rejected.
 */
export enum TransactionRejectReason {
  INTERNAL_SERVER_ERROR = 'An unexpected internal server error has occurred',
  INSTRUMENT_PRICE_UNKNOWN = "The system was unable to determine the current price for the Order's instrument",
  ACCOUNT_NOT_ACTIVE = 'The Account is not active',
  ACCOUNT_LOCKED = 'The Account is locked',
  ACCOUNT_ORDER_CREATION_LOCKED = 'The Account is locked for Order creation',
  ACCOUNT_CONFIGURATION_LOCKED = 'The Account is locked for configuration',
  ACCOUNT_DEPOSIT_LOCKED = 'The Account is locked for deposits',
  ACCOUNT_WITHDRAWAL_LOCKED = 'The Account is locked for withdrawals',
  ACCOUNT_ORDER_CANCEL_LOCKED = 'The Account is locked for Order cancellation',
  INSTRUMENT_NOT_TRADEABLE = 'The instrument specified is not tradeable by the Account',
  PENDING_ORDERS_ALLOWED_EXCEEDED = 'Creating the Order would result in the maximum number of allowed pending Orders being exceeded',
  ORDER_ID_UNSPECIFIED = 'Neither the Order ID nor client Order ID are specified',
  ORDER_DOESNT_EXIST = 'The Order specified does not exist',
  ORDER_IDENTIFIER_INCONSISTENCY = 'The Order ID and client Order ID specified do not identify the same Order',
  TRADE_ID_UNSPECIFIED = 'Neither the Trade ID nor client Trade ID are specified',
  TRADE_DOESNT_EXIST = 'The Trade specified does not exist',
  TRADE_IDENTIFIER_INCONSISTENCY = 'The Trade ID and client Trade ID specified do not identify the same Trade',
  INSUFFICIENT_MARGIN = 'The Account had insufficient margin to perform the action specified. One possible reason for this is due to the creation or modification of a guaranteed StopLoss Order.',
  INSTRUMENT_MISSING = 'Order instrument has not been specified',
  INSTRUMENT_UNKNOWN = 'The instrument specified is unknown',
  UNITS_MISSING = 'Order units have not been not specified',
  UNITS_INVALID = 'Order units specified are invalid',
  UNITS_PRECISION_EXCEEDED = "The units specified contain more precision than is allowed for the Order's instrument",
  UNITS_LIMIT_EXCEEDED = 'The units specified exceeds the maximum number of units allowed',
  UNITS_MINIMUM_NOT_MET = 'The units specified is less than the minimum number of units required',
  PRICE_MISSING = 'The price has not been specified',
  PRICE_INVALID = 'The price specified is invalid',
  PRICE_PRECISION_EXCEEDED = 'The price specified contains more precision than is allowed for the instrument',
  PRICE_DISTANCE_MISSING = 'The price distance has not been specified',
  PRICE_DISTANCE_INVALID = 'The price distance specified is invalid',
  PRICE_DISTANCE_PRECISION_EXCEEDED = 'The price distance specified contains more precision than is allowed for the instrument',
  PRICE_DISTANCE_MAXIMUM_EXCEEDED = 'The price distance exceeds that maximum allowed amount',
  PRICE_DISTANCE_MINIMUM_NOT_MET = 'The price distance does not meet the minimum allowed amount',
  TIME_IN_FORCE_MISSING = 'The TimeInForce field has not been specified',
  TIME_IN_FORCE_INVALID = 'The TimeInForce specified is invalid',
  TIME_IN_FORCE_GTD_TIMESTAMP_MISSING = 'The TimeInForce is GTD but no GTD timestamp is provided',
  TIME_IN_FORCE_GTD_TIMESTAMP_IN_PAST = 'The TimeInForce is GTD but the GTD timestamp is in the past',
  PRICE_BOUND_INVALID = 'The price bound specified is invalid',
  PRICE_BOUND_PRECISION_EXCEEDED = "The price bound specified contains more precision than is allowed for the Order's instrument",
  ORDERS_ON_FILL_DUPLICATE_CLIENT_ORDER_IDS = 'Multiple Orders on fill share the same client Order ID',
  TRADE_ON_FILL_CLIENT_EXTENSIONS_NOT_SUPPORTED = 'The Order does not support Trade on fill client extensions because it cannot create a new Trade',
  CLIENT_ORDER_ID_INVALID = 'The client Order ID specified is invalid',
  CLIENT_ORDER_ID_ALREADY_EXISTS = 'The client Order ID specified is already assigned to another pending Order',
  CLIENT_ORDER_TAG_INVALID = 'The client Order tag specified is invalid',
  CLIENT_ORDER_COMMENT_INVALID = 'The client Order comment specified is invalid',
  CLIENT_TRADE_ID_INVALID = 'The client Trade ID specified is invalid',
  CLIENT_TRADE_ID_ALREADY_EXISTS = 'The client Trade ID specified is already assigned to another open Trade',
  CLIENT_TRADE_TAG_INVALID = 'The client Trade tag specified is invalid',
  CLIENT_TRADE_COMMENT_INVALID = 'The client Trade comment is invalid',
  ORDER_FILL_POSITION_ACTION_MISSING = 'The OrderFillPositionAction field has not been specified',
  ORDER_FILL_POSITION_ACTION_INVALID = 'The OrderFillPositionAction specified is invalid',
  TRIGGER_CONDITION_MISSING = 'The TriggerCondition field has not been specified',
  TRIGGER_CONDITION_INVALID = 'The TriggerCondition specified is invalid',
  ORDER_PARTIAL_FILL_OPTION_MISSING = 'The OrderFillPositionAction field has not been specified',
  ORDER_PARTIAL_FILL_OPTION_INVALID = 'The OrderFillPositionAction specified is invalid.',
  INVALID_REISSUE_IMMEDIATE_PARTIAL_FILL = 'When attempting to reissue an order (currently only a MarketIfTouched) that was immediately partially filled, it is not possible to create a correct pending Order.',
  ORDERS_ON_FILL_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION = 'The Orders on fill would be in violation of the risk management Order mutual exclusivity configuration specifying that only one risk management Order can be attached to a Trade.',
  ORDERS_ON_FILL_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION = 'The Orders on fill would be in violation of the risk management Order mutual exclusivity configuration specifying that if a GSLO is already attached to a Trade, no other risk management Order can be attached to a Trade.',
  TAKE_PROFIT_ORDER_ALREADY_EXISTS = 'A Take Profit Order for the specified Trade already exists',
  TAKE_PROFIT_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD = 'The Take Profit Order would cause the associated Trade to be in violation of the FIFO violation safeguard constraints.',
  TAKE_PROFIT_ON_FILL_PRICE_MISSING = 'The Take Profit on fill specified does not provide a price',
  TAKE_PROFIT_ON_FILL_PRICE_INVALID = 'The Take Profit on fill specified contains an invalid price',
  TAKE_PROFIT_ON_FILL_PRICE_PRECISION_EXCEEDED = "The Take Profit on fill specified contains a price with more precision than is allowed by the Order's instrument",
  TAKE_PROFIT_ON_FILL_TIME_IN_FORCE_MISSING = 'The Take Profit on fill specified does not provide a TimeInForce',
  TAKE_PROFIT_ON_FILL_TIME_IN_FORCE_INVALID = 'The Take Profit on fill specifies an invalid TimeInForce',
  TAKE_PROFIT_ON_FILL_GTD_TIMESTAMP_MISSING = 'The Take Profit on fill specifies a GTD TimeInForce but does not provide a GTD timestamp',
  TAKE_PROFIT_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'The Take Profit on fill specifies a GTD timestamp that is in the past',
  TAKE_PROFIT_ON_FILL_CLIENT_ORDER_ID_INVALID = 'The Take Profit on fill client Order ID specified is invalid',
  TAKE_PROFIT_ON_FILL_CLIENT_ORDER_TAG_INVALID = 'The Take Profit on fill client Order tag specified is invalid',
  TAKE_PROFIT_ON_FILL_CLIENT_ORDER_COMMENT_INVALID = 'The Take Profit on fill client Order comment specified is invalid',
  TAKE_PROFIT_ON_FILL_TRIGGER_CONDITION_MISSING = 'The Take Profit on fill specified does not provide a TriggerCondition',
  TAKE_PROFIT_ON_FILL_TRIGGER_CONDITION_INVALID = 'The Take Profit on fill specifies an invalid TriggerCondition',
  STOP_LOSS_ORDER_ALREADY_EXISTS = 'A Stop Loss Order for the specified Trade already exists',
  STOP_LOSS_ORDER_GUARANTEED_REQUIRED = 'An attempt was made to to create a non-guaranteed stop loss order in an account that requires all stop loss orders to be guaranteed.',
  STOP_LOSS_ORDER_GUARANTEED_PRICE_WITHIN_SPREAD = 'An attempt to create a guaranteed stop loss order with a price that is within the current tradeable spread.',
  STOP_LOSS_ORDER_GUARANTEED_NOT_ALLOWED = "An attempt was made to create a guaranteed Stop Loss Order, however the Account's configuration does not allow guaranteed Stop Loss Orders.",
  STOP_LOSS_ORDER_GUARANTEED_HALTED_CREATE_VIOLATION = 'An attempt was made to create a guaranteed Stop Loss Order when the market was halted.',
  STOP_LOSS_ORDER_GUARANTEED_HALTED_TIGHTEN_VIOLATION = 'An attempt was made to re-create a guaranteed Stop Loss Order with a tighter fill price when the market was halted.',
  STOP_LOSS_ORDER_GUARANTEED_HEDGING_NOT_ALLOWED = "An attempt was made to create a guaranteed Stop Loss Order on a hedged Trade (ie there is an existing open Trade in the opposing direction), however the Account's configuration does not allow guaranteed Stop Loss Orders for hedged Trades/Positions.",
  STOP_LOSS_ORDER_GUARANTEED_MINIMUM_DISTANCE_NOT_MET = "An attempt was made to create a guaranteed Stop Loss Order, however the distance between the current price and the trigger price does not meet the Account's configured minimum Guaranteed Stop Loss distance.",
  STOP_LOSS_ORDER_NOT_CANCELABLE = "An attempt was made to cancel a Stop Loss Order, however the Account's configuration requires every Trade have an associated Stop Loss Order.",
  STOP_LOSS_ORDER_NOT_REPLACEABLE = "An attempt was made to cancel and replace a Stop Loss Order, however the Account's configuration prevents the modification of Stop Loss Orders.",
  STOP_LOSS_ORDER_GUARANTEED_LEVEL_RESTRICTION_EXCEEDED = "An attempt was made to create a guaranteed Stop Loss Order, however doing so would exceed the Account's configured guaranteed StopLoss Order level restriction volume.",
  STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_SPECIFIED = 'The Stop Loss Order request contains both the price and distance fields.',
  STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_MISSING = 'The Stop Loss Order request contains neither the price nor distance fields.',
  STOP_LOSS_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD = 'The Stop Loss Order would cause the associated Trade to be in violation of the FIFO violation safeguard constraints',
  STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION = 'The Stop Loss Order would be in violation of the risk management Order mutual exclusivity configuration specifying that only one risk management order can be attached to a Trade.',
  STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION = 'The Stop Loss Order would be in violation of the risk management Order mutual exclusivity configuration specifying that if a GSLO is already attached to a Trade, no other risk management Order can be attached to the same Trade.',
  STOP_LOSS_ON_FILL_REQUIRED_FOR_PENDING_ORDER = "An attempt to create a pending Order was made with no Stop Loss Order on fill specified and the Account's configuration requires that every Trade have an associated Stop Loss Order.",
  STOP_LOSS_ON_FILL_GUARANTEED_NOT_ALLOWED = "An attempt to create a pending Order was made with a Stop Loss Order on fill that was explicitly configured to be guaranteed, however the Account's configuration does not allow guaranteed Stop Loss Orders.",
  STOP_LOSS_ON_FILL_GUARANTEED_REQUIRED = "An attempt to create a pending Order was made with a Stop Loss Order on fill that was explicitly configured to be not guaranteed, however the Account's configuration requires guaranteed Stop Loss Orders.",
  STOP_LOSS_ON_FILL_PRICE_MISSING = 'The Stop Loss on fill specified does not provide a price',
  STOP_LOSS_ON_FILL_PRICE_INVALID = 'The Stop Loss on fill specifies an invalid price',
  STOP_LOSS_ON_FILL_PRICE_PRECISION_EXCEEDED = "The Stop Loss on fill specifies a price with more precision than is allowed by the Order's instrument",
  STOP_LOSS_ON_FILL_GUARANTEED_MINIMUM_DISTANCE_NOT_MET = "An attempt to create a pending Order was made with the distance between the guaranteed Stop Loss Order on fill's price and the pending Order's price is less than the Account's configured minimum guaranteed stop loss distance.",
  STOP_LOSS_ON_FILL_GUARANTEED_LEVEL_RESTRICTION_EXCEEDED = "An attempt to create a pending Order was made with a guaranteed Stop Loss Order on fill configured, and the Order's units exceed the Account's configured guaranteed StopLoss Order level restriction volume.",
  STOP_LOSS_ON_FILL_DISTANCE_INVALID = 'The Stop Loss on fill distance is invalid',
  STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED = 'The Stop Loss on fill price distance exceeds the maximum allowed amount',
  STOP_LOSS_ON_FILL_DISTANCE_PRECISION_EXCEEDED = 'The Stop Loss on fill distance contains more precision than is allowed by the instrument',
  STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_SPECIFIED = 'The Stop Loss on fill contains both the price and distance fields.',
  STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_MISSING = 'The Stop Loss on fill contains neither the price nor distance fields.',
  STOP_LOSS_ON_FILL_TIME_IN_FORCE_MISSING = 'The Stop Loss on fill specified does not provide a TimeInForce',
  STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID = 'The Stop Loss on fill specifies an invalid TimeInForce',
  STOP_LOSS_ON_FILL_GTD_TIMESTAMP_MISSING = 'The Stop Loss on fill specifies a GTD TimeInForce but does not provide a GTD timestamp',
  STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'The Stop Loss on fill specifies a GTD timestamp that is in the past',
  STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_INVALID = 'The Stop Loss on fill client Order ID specified is invalid',
  STOP_LOSS_ON_FILL_CLIENT_ORDER_TAG_INVALID = 'The Stop Loss on fill client Order tag specified is invalid',
  STOP_LOSS_ON_FILL_CLIENT_ORDER_COMMENT_INVALID = 'The Stop Loss on fill client Order comment specified is invalid',
  STOP_LOSS_ON_FILL_TRIGGER_CONDITION_MISSING = 'The Stop Loss on fill specified does not provide a TriggerCondition',
  STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID = 'The Stop Loss on fill specifies an invalid TriggerCondition',
  GUARANTEED_STOP_LOSS_ORDER_ALREADY_EXISTS = 'A Guaranteed Stop Loss Order for the specified Trade already exists',
  GUARANTEED_STOP_LOSS_ORDER_REQUIRED = 'An attempt was made to to create a non-guaranteed stop loss order in an account that requires all stop loss orders to be guaranteed.',
  GUARANTEED_STOP_LOSS_ORDER_PRICE_WITHIN_SPREAD = 'An attempt to create a guaranteed stop loss order with a price that is within the current tradeable spread.',
  GUARANTEED_STOP_LOSS_ORDER_NOT_ALLOWED = "An attempt was made to create a Guaranteed Stop Loss Order, however the Account's configuration does not allow Guaranteed Stop Loss Orders.",
  GUARANTEED_STOP_LOSS_ORDER_HALTED_CREATE_VIOLATION = 'An attempt was made to create a Guaranteed Stop Loss Order when the market was halted.',
  GUARANTEED_STOP_LOSS_ORDER_CREATE_VIOLATION = 'An attempt was made to create a Guaranteed Stop Loss Order when the market was open.',
  GUARANTEED_STOP_LOSS_ORDER_HALTED_TIGHTEN_VIOLATION = 'An attempt was made to re-create a Guaranteed Stop Loss Order with a tighter fill price when the market was halted.',
  GUARANTEED_STOP_LOSS_ORDER_TIGHTEN_VIOLATION = 'An attempt was made to re-create a Guaranteed Stop Loss Order with a tighter fill price when the market was open.',
  GUARANTEED_STOP_LOSS_ORDER_HEDGING_NOT_ALLOWED = "An attempt was made to create a Guaranteed Stop Loss Order on a hedged Trade (ie there is an existing open Trade in the opposing direction), however the Account's configuration does not allow Guaranteed Stop Loss Orders for hedged Trades/Positions.",
  GUARANTEED_STOP_LOSS_ORDER_MINIMUM_DISTANCE_NOT_MET = "An attempt was made to create a Guaranteed Stop Loss Order, however the distance between the current price and the trigger price does not meet the Account's configured minimum Guaranteed Stop Loss distance.",
  GUARANTEED_STOP_LOSS_ORDER_NOT_CANCELABLE = "An attempt was made to cancel a Guaranteed Stop Loss Order when the market is open, however the Account's configuration requires every Trade have an associated Guaranteed Stop Loss Order.",
  GUARANTEED_STOP_LOSS_ORDER_HALTED_NOT_CANCELABLE = "An attempt was made to cancel a Guaranteed Stop Loss Order when the market is halted, however the Account's configuration requires every Trade have an associated Guaranteed Stop Loss Order.",
  GUARANTEED_STOP_LOSS_ORDER_NOT_REPLACEABLE = "An attempt was made to cancel and replace a Guaranteed Stop Loss Order when the market is open, however the Account's configuration prevents the modification of Guaranteed Stop Loss Orders.",
  GUARANTEED_STOP_LOSS_ORDER_HALTED_NOT_REPLACEABLE = "An attempt was made to cancel and replace a Guaranteed Stop Loss Order when the market is halted, however the Account's configuration prevents the modification of Guaranteed Stop Loss Orders.",
  GUARANTEED_STOP_LOSS_ORDER_LEVEL_RESTRICTION_VOLUME_EXCEEDED = "An attempt was made to create a Guaranteed Stop Loss Order, however doing so would exceed the Account's configured guaranteed StopLoss Order level restriction volume.",
  GUARANTEED_STOP_LOSS_ORDER_LEVEL_RESTRICTION_PRICE_RANGE_EXCEEDED = "An attempt was made to create a Guaranteed Stop Loss Order, however doing so would exceed the Account's configured guaranteed StopLoss Order level restriction price range.",
  GUARANTEED_STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_SPECIFIED = 'The Guaranteed Stop Loss Order request contains both the price and distance fields.',
  GUARANTEED_STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_MISSING = 'The Guaranteed Stop Loss Order request contains neither the price nor distance fields.',
  GUARANTEED_STOP_LOSS_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD = 'The Guaranteed Stop Loss Order would cause the associated Trade to be in violation of the FIFO violation safeguard constraints',
  GUARANTEED_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION = 'The Guaranteed Stop Loss Order would be in violation of the risk management Order mutual exclusivity configuration specifying that only one risk management order can be attached to a Trade.',
  GUARANTEED_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION = 'The Guaranteed Stop Loss Order would be in violation of the risk management Order mutual exclusivity configuration specifying that if a GSLO is already attached to a Trade, no other risk management Order can be attached to the same Trade.',
  GUARANTEED_STOP_LOSS_ON_FILL_REQUIRED_FOR_PENDING_ORDER = "An attempt to create a pending Order was made with no Guaranteed Stop Loss Order on fill specified and the Account's configuration requires that every Trade have an associated Guaranteed Stop Loss Order.",
  GUARANTEED_STOP_LOSS_ON_FILL_NOT_ALLOWED = "An attempt to create a pending Order was made with a Guaranteed Stop Loss Order on fill that was explicitly configured to be guaranteed, however the Account's configuration does not allow guaranteed Stop Loss Orders.",
  GUARANTEED_STOP_LOSS_ON_FILL_REQUIRED = "An attempt to create a pending Order was made with a Guaranteed Stop Loss Order on fill that was explicitly configured to be not guaranteed, however the Account's configuration requires Guaranteed Stop Loss Orders.",
  GUARANTEED_STOP_LOSS_ON_FILL_PRICE_MISSING = 'The Guaranteed Stop Loss on fill specified does not provide a price',
  GUARANTEED_STOP_LOSS_ON_FILL_PRICE_INVALID = 'The Guaranteed Stop Loss on fill specifies an invalid price',
  GUARANTEED_STOP_LOSS_ON_FILL_PRICE_PRECISION_EXCEEDED = "The Guaranteed Stop Loss on fill specifies a price with more precision than is allowed by the Order's instrument",
  GUARANTEED_STOP_LOSS_ON_FILL_MINIMUM_DISTANCE_NOT_MET = "An attempt to create a pending Order was made with the distance between the Guaranteed Stop Loss Order on fill's price and the pending Order's price is less than the Account's configured minimum guaranteed stop loss distance.",
  GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_VOLUME_EXCEEDED = "Filling the Order would result in the creation of a Guaranteed Stop Loss Order with trigger number of units that violates the account's Guaranteed Stop Loss Order level restriction volume.",
  GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_PRICE_RANGE_EXCEEDED = "Filling the Order would result in the creation of a Guaranteed Stop Loss Order with trigger price that violates the account's Guaranteed Stop Loss Order level restriction price range.",
  GUARANTEED_STOP_LOSS_ON_FILL_DISTANCE_INVALID = 'The Guaranteed Stop Loss on fill distance is invalid',
  GUARANTEED_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED = 'The Guaranteed Stop Loss on fill price distance exceeds the maximum allowed amount.',
  GUARANTEED_STOP_LOSS_ON_FILL_DISTANCE_PRECISION_EXCEEDED = 'The Guaranteed Stop Loss on fill distance contains more precision than is allowed by the instrument',
  GUARANTEED_STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_SPECIFIED = 'The Guaranteed Stop Loss on fill contains both the price and distance fields.',
  GUARANTEED_STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_MISSING = 'The Guaranteed Stop Loss on fill contains neither the price nor distance fields.',
  GUARANTEED_STOP_LOSS_ON_FILL_TIME_IN_FORCE_MISSING = 'The Guaranteed Stop Loss on fill specified does not provide a TimeInForce',
  GUARANTEED_STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID = 'The Guaranteed Stop Loss on fill specifies an invalid TimeInForce',
  GUARANTEED_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_MISSING = 'The Guaranteed Stop Loss on fill specifies a GTD TimeInForce but does not provide a GTD timestamp',
  GUARANTEED_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'The Guaranteed Stop Loss on fill specifies a GTD timestamp that is in the past.',
  GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_INVALID = 'The Guaranteed Stop Loss on fill client Order ID specified is invalid',
  GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_TAG_INVALID = 'The Guaranteed Stop Loss on fill client Order tag specified is invalid',
  GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_COMMENT_INVALID = 'The Guaranteed Stop Loss on fill client Order comment specified is invalid.',
  GUARANTEED_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_MISSING = 'The Guaranteed Stop Loss on fill specified does not provide a TriggerCondition.',
  GUARANTEED_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID = 'The Guaranteed Stop Loss on fill specifies an invalid TriggerCondition.',
  TRAILING_STOP_LOSS_ORDER_ALREADY_EXISTS = 'A Trailing Stop Loss Order for the specified Trade already exists',
  TRAILING_STOP_LOSS_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD = 'The Trailing Stop Loss Order would cause the associated Trade to be in violation of the FIFO violation safeguard constraints',
  TRAILING_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION = 'The Trailing Stop Loss Order would be in violation of the risk management Order mutual exclusivity configuration specifying that only one risk management order can be attached to a Trade.',
  TRAILING_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION = 'The Trailing Stop Loss Order would be in violation of the risk management Order mutual exclusivity configuration specifying that if a GSLO is already attached to a Trade, no other risk management Order can be attached to the same Trade.',
  TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MISSING = 'The Trailing Stop Loss on fill specified does not provide a distance',
  TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_INVALID = 'The Trailing Stop Loss on fill distance is invalid',
  TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_PRECISION_EXCEEDED = 'The Trailing Stop Loss on fill distance contains more precision than is allowed by the instrument',
  TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED = 'The Trailing Stop Loss on fill price distance exceeds the maximum allowed amount',
  TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MINIMUM_NOT_MET = 'The Trailing Stop Loss on fill price distance does not meet the minimum allowed amount',
  TRAILING_STOP_LOSS_ON_FILL_TIME_IN_FORCE_MISSING = 'The Trailing Stop Loss on fill specified does not provide a TimeInForce',
  TRAILING_STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID = 'The Trailing Stop Loss on fill specifies an invalid TimeInForce',
  TRAILING_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_MISSING = 'The Trailing Stop Loss on fill TimeInForce is specified as GTD but no GTD timestamp is provided',
  TRAILING_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST = 'The Trailing Stop Loss on fill GTD timestamp is in the past',
  TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_INVALID = 'The Trailing Stop Loss on fill client Order ID specified is invalid',
  TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_TAG_INVALID = 'The Trailing Stop Loss on fill client Order tag specified is invalid',
  TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_COMMENT_INVALID = 'The Trailing Stop Loss on fill client Order comment specified is invalid',
  TRAILING_STOP_LOSS_ORDERS_NOT_SUPPORTED = 'A client attempted to create either a Trailing Stop Loss order or an order with a Trailing Stop Loss On Fill specified, which may not yet be supported.',
  TRAILING_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_MISSING = 'The Trailing Stop Loss on fill specified does not provide a TriggerCondition',
  TRAILING_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID = 'The Tailing Stop Loss on fill specifies an invalid TriggerCondition',
  CLOSE_TRADE_TYPE_MISSING = 'The request to close a Trade does not specify a full or partial close',
  CLOSE_TRADE_PARTIAL_UNITS_MISSING = 'The request to close a Trade partially did not specify the number of units to close',
  CLOSE_TRADE_UNITS_EXCEED_TRADE_SIZE = 'The request to partially close a Trade specifies a number of units that exceeds the current size of the given Trade',
  CLOSEOUT_POSITION_DOESNT_EXIST = 'The Position requested to be closed out does not exist',
  CLOSEOUT_POSITION_INCOMPLETE_SPECIFICATION = 'The request to closeout a Position was specified incompletely',
  CLOSEOUT_POSITION_UNITS_EXCEED_POSITION_SIZE = 'A partial Position closeout request specifies a number of units that exceeds the current Position',
  CLOSEOUT_POSITION_REJECT = 'The request to closeout a Position could not be fully satisfied',
  CLOSEOUT_POSITION_PARTIAL_UNITS_MISSING = 'The request to partially closeout a Position did not specify the number of units to close.',
  MARKUP_GROUP_ID_INVALID = 'The markup group ID provided is invalid',
  POSITION_AGGREGATION_MODE_INVALID = 'The PositionAggregationMode provided is not supported/valid.',
  ADMIN_CONFIGURE_DATA_MISSING = 'No configuration parameters provided',
  MARGIN_RATE_INVALID = 'The margin rate provided is invalid',
  MARGIN_RATE_WOULD_TRIGGER_CLOSEOUT = 'The margin rate provided would cause an immediate margin closeout',
  ALIAS_INVALID = 'The account alias string provided is invalid',
  CLIENT_CONFIGURE_DATA_MISSING = 'No configuration parameters provided',
  MARGIN_RATE_WOULD_TRIGGER_MARGIN_CALL = 'The margin rate provided would cause the Account to enter a margin call state.',
  AMOUNT_INVALID = 'Funding is not possible because the requested transfer amount is invalid',
  INSUFFICIENT_FUNDS = 'The Account does not have sufficient balance to complete the funding request',
  AMOUNT_MISSING = 'Funding amount has not been specified',
  FUNDING_REASON_MISSING = 'Funding reason has not been specified',
  OCA_ORDER_IDS_STOP_LOSS_NOT_ALLOWED = 'The list of Order Identifiers provided for a One Cancels All Order contains an Order Identifier that refers to a Stop Loss Order. OCA groups cannot contain Stop Loss Orders.',
  CLIENT_EXTENSIONS_DATA_MISSING = 'Neither Order nor Trade on Fill client extensions were provided for modification',
  REPLACING_ORDER_INVALID = 'The Order to be replaced has a different type than the replacing Order.',
  REPLACING_TRADE_ID_INVALID = 'The replacing Order refers to a different Trade than the Order that is being replaced.',
  ORDER_CANCEL_WOULD_TRIGGER_CLOSEOUT = 'Canceling the order would cause an immediate margin closeout.',
}

/**
 * A filter that can be used when fetching Transactions
 */
export enum TransactionFilter {
  ORDER = 'Order-related Transactions. These are the Transactions that create, cancel, fill or trigger Orders',
  FUNDING = 'Funding-related Transactions',
  ADMIN = 'Administrative Transactions',
  CREATE = 'Account Create Transaction',
  CLOSE = 'Account Close Transaction',
  REOPEN = 'Account Reopen Transaction',
  CLIENT_CONFIGURE = 'Client Configuration Transaction',
  CLIENT_CONFIGURE_REJECT = 'Client Configuration Reject Transaction',
  TRANSFER_FUNDS = 'Transfer Funds Transaction',
  TRANSFER_FUNDS_REJECT = 'Transfer Funds Reject Transaction',
  MARKET_ORDER = 'Market Order Transaction',
  MARKET_ORDER_REJECT = 'Market Order Reject Transaction',
  LIMIT_ORDER = 'Limit Order Transaction',
  LIMIT_ORDER_REJECT = 'Limit Order Reject Transaction',
  STOP_ORDER = 'Stop Order Transaction',
  STOP_ORDER_REJECT = 'Stop Order Reject Transaction',
  MARKET_IF_TOUCHED_ORDER = 'Market if Touched Order Transaction',
  MARKET_IF_TOUCHED_ORDER_REJECT = 'Market if Touched Order Reject Transaction',
  TAKE_PROFIT_ORDER = 'Take Profit Order Transaction',
  TAKE_PROFIT_ORDER_REJECT = 'Take Profit Order Reject Transaction',
  STOP_LOSS_ORDER = 'Stop Loss Order Transaction',
  STOP_LOSS_ORDER_REJECT = 'Stop Loss Order Reject Transaction',
  GUARANTEED_STOP_LOSS_ORDER = 'Guaranteed Stop Loss Order Transaction',
  GUARANTEED_STOP_LOSS_ORDER_REJECT = 'Guaranteed Stop Loss Order Reject Transaction',
  TRAILING_STOP_LOSS_ORDER = 'Trailing Stop Loss Order Transaction',
  TRAILING_STOP_LOSS_ORDER_REJECT = 'Trailing Stop Loss Order Reject Transaction',
  ONE_CANCELS_ALL_ORDER = 'One Cancels All Order Transaction',
  ONE_CANCELS_ALL_ORDER_REJECT = 'One Cancels All Order Reject Transaction',
  ONE_CANCELS_ALL_ORDER_TRIGGERED = 'One Cancels All Order Trigger Transaction',
  ORDER_FILL = 'Order Fill Transaction',
  ORDER_CANCEL = 'Order Cancel Transaction',
  ORDER_CANCEL_REJECT = 'Order Cancel Reject Transaction',
  ORDER_CLIENT_EXTENSIONS_MODIFY = 'Order Client Extensions Modify Transaction',
  ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT = 'Order Client Extensions Modify Reject Transaction',
  TRADE_CLIENT_EXTENSIONS_MODIFY = 'Trade Client Extensions Modify Transaction',
  TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT = 'Trade Client Extensions Modify Reject Transaction',
  MARGIN_CALL_ENTER = 'Margin Call Enter Transaction',
  MARGIN_CALL_EXTEND = 'Margin Call Extend Transaction',
  MARGIN_CALL_EXIT = 'Margin Call Exit Transaction',
  DELAYED_TRADE_CLOSURE = 'Delayed Trade Closure Transaction',
  DAILY_FINANCING = 'Daily Financing Transaction',
  RESET_RESETTABLE_PL = 'Reset Resettable PL Transaction',
}

export const transactionFilterList: {
  key: string;
  value: string;
}[] = Object.entries(TransactionFilter).map(([key, value]) => ({ key, value }));

export interface TransactionFilterList {
  key: TransactionFilter | string;
  value: string;
}

/**
 * A TradeReduce object represents a Trade for an instrument that was reduced
 * (either partially or fully) in an Account. It is found embedded in Transactions
 * that affect the position of an instrument in the account, specifically the
 * OrderFill Transaction.
 */
export interface TradeReduce {
  /**
   * The ID of the Trade that was reduced or closed
   */
  tradeID: string;

  /**
   * The number of units that the Trade was reduced by
   */
  units: number;

  /**
   * The average price that the units were closed at. This price may be
   * clamped for guaranteed Stop Loss Orders.
   */
  price: string;

  /**
   * The PL realized when reducing the Trade
   */
  realizedPL: string;

  /**
   * The financing paid/collected when reducing the Trade
   */
  financing: string;

  /**
   * The base financing paid/collected when reducing the Trade
   */
  baseFinancing: number;

  /**
   * The quote financing paid/collected when reducing the Trade
   */
  quoteFinancing: number;

  /**
   * The financing rate in effect for the instrument used to calculate the
   * amount of financing paid/collected when reducing the Trade. This field
   * will only be set if the AccountFinancingMode at the time of the order
   * fill is SECOND_BY_SECOND_INSTRUMENT. The value is in decimal rather than
   * percentage points, e.g. 5% is represented as 0.05.
   */
  financingRate: number;

  /**
   * This is the fee that is charged for closing the Trade if it has a
   * guaranteed Stop Loss Order attached to it.
   */
  guaranteedExecutionFee: string;

  /**
   * This is the fee that is charged for closing the Trade if it has a
   * guaranteed Stop Loss Order attached to it, expressed in the Instrument's
   * quote currency.
   */
  quoteGuaranteedExecutionFee: number;

  /**
   * The half spread cost for the trade reduce/close. This can be a positive
   * or negative value and is represented in the home currency of the Account.
   */
  halfSpreadCost: string;
}

/**
 * A TradeOpen object represents a Trade for an instrument that was opened in an Account.
 * It is found embedded in Transactions that affect the position of an instrument in the
 * Account, specifically the OrderFill Transaction.
 */
export interface TradeOpen {
  /**
   * The ID of the Trade that was opened
   */
  tradeID: string;

  /**
   * The number of units opened by the Trade
   */
  units: number;

  /**
   * The average price that the units were opened at.
   */
  price: string;

  /**
   * This is the fee charged for opening the trade if it has a guaranteed Stop
   * Loss Order attached to it.
   */
  guaranteedExecutionFee: string;

  /**
   * This is the fee charged for opening the trade if it has a guaranteed Stop
   * Loss Order attached to it, expressed in the Instrument's quote currency.
   */
  quoteGuaranteedExecutionFee: number;

  /**
   * The client extensions for the newly opened Trade
   */
  clientExtensions: ClientExtensions;

  /**
   * The half spread cost for the trade open. This can be a positive or
   * negative value and is represented in the home currency of the Account.
   */
  halfSpreadCost: string;

  /**
   * The margin required at the time the Trade was created. Note, this is the
   * ‘pure' margin required, it is not the ‘effective' margin used that
   * factors in the trade risk if a GSLO is attached to the trade.
   */
  initialMarginRequired: string;
}

/**
 * The specification of an Account-specific Price.
 */
export interface ClientPrice {
  /**
   * The string “PRICE”. Used to identify the a Price object when found in a
   * stream.
   */
  type: string;

  /**
   * The Price's Instrument.
   */
  instrument: string;

  /**
   * The date/time when the Price was created
   */
  time: string;

  /**
   * Flag indicating if the Price is tradeable or not
   */
  tradeable: boolean;

  /**
   * The list of prices and liquidity available on the Instrument's bid side.
   * It is possible for this list to be empty if there is no bid liquidity
   * currently available for the Instrument in the Account.
   */
  bids: PriceBucket[];

  /**
   * The list of prices and liquidity available on the Instrument's ask side.
   * It is possible for this list to be empty if there is no ask liquidity
   * currently available for the Instrument in the Account.
   */
  asks: PriceBucket[];

  /**
   * The closeout bid Price. This Price is used when a bid is required to
   * closeout a Position (margin closeout or manual) yet there is no bid
   * liquidity. The closeout bid is never used to open a new position.
   */
  closeoutBid: string;

  /**
   * The closeout ask Price. This Price is used when a ask is required to
   * closeout a Position (margin closeout or manual) yet there is no ask
   * liquidity. The closeout ask is never used to open a new position.
   */
  closeoutAsk: string;
}

/**
 * A PriceBucket represents a price available for an amount of liquidity
 */
export interface PriceBucket {
  /**
   * The Price offered by the PriceBucket
   */
  price: string;

  /**
   * The amount of liquidity offered by the PriceBucket
   */
  liquidity?: number;
}

/**
 * HomeConversions represents the factors to use to convert quantities of a given
 * currency into the Account's home currency. The conversion factor depends on the
 * scenario the conversion is required for.
 */
export interface HomeConversionFactors {
  /**
   * The ConversionFactor in effect for the Account for converting any gains
   * realized in Instrument quote units into units of the Account's home
   * currency.
   */
  gainQuoteHome: ConversionFactor;

  /**
   * The ConversionFactor in effect for the Account for converting any losses
   * realized in Instrument quote units into units of the Account's home
   * currency.
   */
  lossQuoteHome: ConversionFactor;

  /**
   * The ConversionFactor in effect for the Account for converting any gains
   * realized in Instrument base units into units of the Account's home
   * currency.
   */
  gainBaseHome: ConversionFactor;

  /**
   * The ConversionFactor in effect for the Account for converting any losses
   * realized in Instrument base units into units of the Account's home
   * currency.
   */
  lossBaseHome: ConversionFactor;
}

/**
 * A ConversionFactor contains information used to convert an amount, from an
 * Instrument's base or quote currency, to the home currency of an Account.
 */
export interface ConversionFactor {
  factor: number;
}
