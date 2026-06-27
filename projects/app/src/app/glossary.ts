export const glossary = {
  account: {
    id: "The Account's identifier",
    alias:
      'Client-assigned alias for the Account. Only provided if the Account has an alias set',
    currency: 'The home currency of the Account',
    createdByUserID: 'ID of the user that created the Account.',
    createdTime: 'The date/time when the Account was created.',
    guaranteedStopLossOrderParameters: `The current guaranteed Stop Loss Order settings of the Account. This
    field will only be present if the guaranteedStopLossOrderMode is not
    'DISABLED'.`,
    guaranteedStopLossOrderMode:
      'The current guaranteed Stop Loss Order mode of the Account.',
    resettablePLTime:
      "The date/time that the Account's resettablePL was last reset.",
    marginRate: `Client-provided margin rate override for the Account. The effective
    margin rate of the Account is the lesser of this value and the OANDA
    margin rate for the Account's division. This value is only provided if a
    margin rate override exists for the Account.`,
    openTradeCount: 'The number of Trades currently open in the Account.',
    openPositionCount: 'The number of Positions currently open in the Account.',
    pendingOrderCount: 'The number of Orders currently pending in the Account.',
    hedgingEnabled: 'Flag indicating that the Account has hedging enabled.',
    unrealizedPL: `The total unrealized profit/loss for all Trades currently open in the
    Account.`,
    NAV: 'The net asset value of the Account. Equal to Account balance + unrealizedPL.',
    marginUsed: 'Margin currently used for the Account.',
    marginAvailable: 'Margin available for Account currency.',
    positionValue: `The value of the Account's open positions represented in the Account's
    home currency.`,
    marginCloseoutUnrealizedPL: "The Account's margin closeout unrealized PL.",
    marginCloseoutNAV: "The Account's margin closeout NAV.",
    marginCloseoutMarginUsed: "The Account's margin closeout margin used.",
    marginCloseoutPercent: `The Account's margin closeout percentage. When this value is 1.0 or above
    the Account is in a margin closeout situation.`,
    marginCloseoutPositionValue: `The value of the Account's open positions as used for margin closeout
    calculations represented in the Account's home currency.`,
    withdrawalLimit: `The current WithdrawalLimit for the account which will be zero or a
    positive value indicating how much can be withdrawn from the account.`,
    marginCallMarginUsed: "The Account's margin call margin used.",
    marginCallPercent: `The Account's margin call percentage. When this value is 1.0 or above the
    Account is in a margin call situation.`,
    balance: 'The current balance of the account.',
    pl: 'The total profit/loss realized over the lifetime of the Account.',
    resettablePL: `The total realized profit/loss for the account since it was last reset by
    the client.`,
    financing: `The total amount of financing paid/collected over the lifetime of the
    account.`,
    commission:
      'The total amount of commission paid over the lifetime of the Account.',
    dividendAdjustment: `The total amount of dividend adjustment paid over the lifetime of the
    Account in the Accounts' home currency.`,
    guaranteedExecutionFees: `The total amount of fees charged over the lifetime of the Account for the
    execution of guaranteed Stop Loss Orders.`,
    marginCallEnterTime: `The date/time when the Account entered a margin call state. Only provided
    if the Account is in a margin call.`,
    marginCallExtensionCount:
      "The number of times that the Account's current margin call was extended.",
    lastMarginCallExtensionTime:
      "The date/time of the Account's last margin call extension.",
    lastTransactionID:
      'The ID of the last Transaction created for the Account.',
    trades: 'The details of the Trades currently open in the Account.',
    positions: 'The details all Account Positions.',
    orders: 'The details of the Orders currently pending in the Account.',
  },

  /**
   * AccountChangesState
   *
   * An AccountState Object is used to represent an Account's current price-dependent state.
   * Price-dependent Account state is dependent on OANDA's current Prices, and includes things
   * like unrealized PL, NAV and Trailing Stop Loss Order state. Fields will be omitted if their
   * value has not changed since the specified transaction ID.
   */

  accountChangesState: {
    unrealizedPL: `The total unrealized profit/loss for all Trades currently open in the
      Account.`,
    NAV: `The net asset value of the Account. Equal to Account balance +
      unrealizedPL.`,
    marginUsed: 'Margin currently used for the Account.',
    marginAvailable: 'Margin available for Account currency.',
    positionValue: `The value of the Account's open positions represented in the Account's
      home currency.`,
    marginCloseoutUnrealizedPL: "The Account's margin closeout unrealized PL.",
    marginCloseoutNAV: "The Account's margin closeout NAV.",
    marginCloseoutMarginUsed: "The Account's margin closeout margin used.",
    marginCloseoutPercent: `The Account's margin closeout percentage. When this value is 1.0 or above
      the Account is in a margin closeout situation.`,
    marginCloseoutPositionValue: `The value of the Account's open positions as used for margin closeout
      calculations represented in the Account's home currency.`,
    withdrawalLimit: `The current WithdrawalLimit for the account which will be zero or a
      positive value indicating how much can be withdrawn from the account.`,
    marginCallMarginUsed: "The Account's margin call margin used.",
    marginCallPercent: `The Account's margin call percentage. When this value is 1.0 or above the
      Account is in a margin call situation.`,
    balance: 'The current balance of the account.',
    pl: 'The total profit/loss realized over the lifetime of the Account.',
    resettablePL: `The total realized profit/loss for the account since it was last reset by
      the client.`,
    financing: `The total amount of financing paid/collected over the lifetime of the
      account.`,
    commission:
      'The total amount of commission paid over the lifetime of the Account.',
    dividendAdjustment: `The total amount of dividend adjustment paid over the lifetime of the
      Account in the Account's home currency.`,
    guaranteedExecutionFees: `The total amount of fees charged over the lifetime of the Account for the
      execution of guaranteed Stop Loss Orders.`,
    marginCallEnterTime: `The date/time when the Account entered a margin call state. Only provided
      if the Account is in a margin call.`,
    marginCallExtensionCount:
      "The number of times that the Account's current margin call was extended.",
    lastMarginCallExtensionTime:
      "The date/time of the Account's last margin call extension.",
    orders: 'The price-dependent state of each pending Order in the Account.',
    trades: 'The price-dependent state for each open Trade in the Account.',
    positions:
      'The price-dependent state for each open Position in the Account.',
  },

  /**
   * AccountProperties
   *
   * Properties related to an Account.
   */

  accountProperties: {
    id: "The Account's identifier",
    mt4AccountID: `The Account's associated MT4 Account ID. This field will not be present
      if the Account is not an MT4 account.`,
    tags: "The Account's tags",
  },

  /**
   * GuaranteedStopLossOrderParameters
   *
   * The current mutability and hedging settings related to guaranteed Stop Loss orders.
   */

  guaranteedStopLossOrderParameters: {
    mutabilityMarketOpen: `The current guaranteed Stop Loss Order mutability setting of the Account
      when market is open.`,
    mutabilityMarketHalted: `The current guaranteed Stop Loss Order mutability setting of the Account
      when market is halted.`,
  },

  // GuaranteedStopLossOrderMode	The overall behaviour of the Account regarding guaranteed Stop Loss Orders.
  // Value	Description
  // DISABLED	The Account is not permitted to create guaranteed Stop Loss Orders.
  // ALLOWED	The Account is able, but not required to have guaranteed Stop Loss Orders for open Trades.
  // REQUIRED	The Account is required to have guaranteed Stop Loss Orders for all open Trades.

  // GuaranteedStopLossOrderMutability	For Accounts that support guaranteed Stop Loss Orders, describes the actions that can be be performed on guaranteed Stop Loss Orders.
  // Value	Description
  // FIXED	Once a guaranteed Stop Loss Order has been created it cannot be replaced or cancelled.
  // REPLACEABLE	An existing guaranteed Stop Loss Order can only be replaced, not cancelled.
  // CANCELABLE	Once a guaranteed Stop Loss Order has been created it can be either replaced or cancelled.
  // PRICE_WIDEN_ONLY	An existing guaranteed Stop Loss Order can only be replaced to widen the gap from the current price, not cancelled.

  /**
   * AccountSummary
   *
   * A summary representation of a client's Account. The AccountSummary does not provide to full
   * specification of pending Orders, open Trades and Positions.
   *
   * Implemented by: Account
   */

  accountSummary: {
    id: "The Account's identifier",
    alias: `Client-assigned alias for the Account. Only provided if the Account has
      an alias set.`,
    currency: 'The home currency of the Account.',
    createdByUserID: 'ID of the user that created the Account.',
    createdTime: 'The date/time when the Account was created.',
    guaranteedStopLossOrderParameters: `The current guaranteed Stop Loss Order settings of the Account. This
      field will only be present if the guaranteedStopLossOrderMode is not
      'DISABLED'.`,
    guaranteedStopLossOrderMode:
      'The current guaranteed Stop Loss Order mode of the Account.',
    resettablePLTime:
      "The date/time that the Account's resettablePL was last reset.",
    marginRate: `Client-provided margin rate override for the Account. The effective
      margin rate of the Account is the lesser of this value and the OANDA
      margin rate for the Account's division. This value is only provided if a
      margin rate override exists for the Account.`,
    openTradeCount: 'The number of Trades currently open in the Account.',
    openPositionCount: 'The number of Positions currently open in the Account.',
    pendingOrderCount: 'The number of Orders currently pending in the Account.',
    hedgingEnabled: 'Flag indicating that the Account has hedging enabled.',
    unrealizedPL: `The total unrealized profit/loss for all Trades currently open in the
      Account.`,
    NAV: `The net asset value of the Account. Equal to Account balance +
      unrealizedPL.`,
    marginUsed: 'Margin currently used for the Account.',
    marginAvailable: 'Margin available for Account currency.',
    positionValue: `The value of the Account's open positions represented in the Account's
      home currency.`,
    marginCloseoutUnrealizedPL: "The Account's margin closeout unrealized PL.",
    marginCloseoutNAV: "The Account's margin closeout NAV.",
    marginCloseoutMarginUsed: "The Account's margin closeout margin used.",
    marginCloseoutPercent: `The Account's margin closeout percentage. When this value is 1.0 or above
      the Account is in a margin closeout situation.`,
    marginCloseoutPositionValue: `The value of the Account's open positions as used for margin closeout
      calculations represented in the Account's home currency.`,
    withdrawalLimit: `The current WithdrawalLimit for the account which will be zero or a
      positive value indicating how much can be withdrawn from the account.`,
    marginCallMarginUsed: "The Account's margin call margin used.",
    marginCallPercent: `The Account's margin call percentage. When this value is 1.0 or above the
      Account is in a margin call situation.`,
    balance: 'The current balance of the account.',
    pl: 'The total profit/loss realized over the lifetime of the Account.',
    resettablePL: `The total realized profit/loss for the account since it was last reset by
      the client.`,
    financing: `The total amount of financing paid/collected over the lifetime of the
      account.`,
    commission:
      'The total amount of commission paid over the lifetime of the Account.',
    dividendAdjustment: `The total amount of dividend adjustment paid over the lifetime of the
      Account in the Account's home currency.`,
    guaranteedExecutionFees: `The total amount of fees charged over the lifetime of the Account for the
      execution of guaranteed Stop Loss Orders.`,
    marginCallEnterTime: `The date/time when the Account entered a margin call state. Only provided
      if the Account is in a margin call.`,
    marginCallExtensionCount: `The number of times that the Account's current margin call was extended.`,
    lastMarginCallExtensionTime:
      "The date/time of the Account's last margin call extension.",
    lastTransactionID:
      'The ID of the last Transaction created for the Account.',
  },

  /**
   * AccumulatedAccountState
   *
   * The mutable state of a client's Account.
   *
   * Implemented by: AccountSummary, AccountChangesState
   */

  accumulatedAccountState: {
    balance: 'The current balance of the account.',
    pl: 'The total profit/loss realized over the lifetime of the Account.',
    resettablePL: `The total realized profit/loss for the account since it was last reset by
      the client.`,
    financing: `The total amount of financing paid/collected over the lifetime of the
      account.`,
    commission:
      'The total amount of commission paid over the lifetime of the Account.',
    dividendAdjustment: `The total amount of dividend adjustment paid over the lifetime of the
      Account in the Account's home currency.`,
    guaranteedExecutionFees: `The total amount of fees charged over the lifetime of the Account for the
      execution of guaranteed Stop Loss Orders.`,
    marginCallEnterTime: `The date/time when the Account entered a margin call state. Only provided
      if the Account is in a margin call.`,
    marginCallExtensionCount:
      "The number of times that the Account's current margin call was extended.",
    lastMarginCallExtensionTime:
      "The date/time of the Account's last margin call extension.",
  },

  /**
   * CalculatedAccountState
   *
   * The dynamically calculated state of a client's Account.
   *
   * Implemented by: AccountSummary, AccountChangesState
   */

  calculatedAccountState: {
    unrealizedPL: `The total unrealized profit/loss for all Trades currently open in the
      Account.`,
    NAV: `The net asset value of the Account. Equal to Account balance +
      unrealizedPL.`,
    marginUsed: 'Margin currently used for the Account.',
    marginAvailable: 'Margin available for Account currency.',
    positionValue: `The value of the Account's open positions represented in the Account's
      home currency.`,
    marginCloseoutUnrealizedPL: "The Account's margin closeout unrealized PL.",
    marginCloseoutNAV: "The Account's margin closeout NAV.",
    marginCloseoutMarginUsed: "The Account's margin closeout margin used.",
    marginCloseoutPercent: `The Account's margin closeout percentage. When this value is 1.0 or above
      the Account is in a margin closeout situation.`,
    marginCloseoutPositionValue: `The value of the Account's open positions as used for margin closeout
      calculations represented in the Account's home currency.`,
    withdrawalLimit: `The current WithdrawalLimit for the account which will be zero or a
      positive value indicating how much can be withdrawn from the account.`,
    marginCallMarginUsed: "The Account's margin call margin used.",
    marginCallPercent: `The Account's margin call percentage. When this value is 1.0 or above the
      Account is in a margin call situation.`,
  },

  /**
   * AccountChanges
   *
   * An AccountChanges Object is used to represent the changes to an Account's Orders,
   * Trades and Positions since a specified Account TransactionID in the past.
   */

  accountChanges: {
    ordersCreated: `The Orders created. These Orders may have been filled, cancelled or
      triggered in the same period.`,
    ordersCancelled: 'The Orders cancelled.',
    ordersFilled: 'The Orders filled.',
    ordersTriggered: 'The Orders triggered.',
    tradesOpened: 'The Trades opened.',
    tradesReduced: 'The Trades reduced.',
    tradesClosed: 'The Trades closed.',
    positions: 'The Positions changed.',
    transactions: 'The Transactions that have been generated.',
  },

  // AccountFinancingMode	The financing mode of an Account
  // Value	Description
  // NO_FINANCING	No financing is paid/charged for open Trades in the Account
  // SECOND_BY_SECOND	Second-by-second financing is paid/charged for open Trades in the Account, both daily and when the the Trade is closed
  // DAILY	A full day's worth of financing is paid/charged for open Trades in the Account daily at 5pm New York time

  /**
   * UserAttributes
   *
   * Contains the attributes of a user.
   */

  userAttributes: {
    userID: "The user's OANDA-assigned user ID.",
    username: 'The user-provided username.',
    title: "The user's title.",
    name: "The user's name.",
    email: "The user's email address.",
    divisionAbbreviation: 'The OANDA division the user belongs to.',
    languageAbbreviation: "The user's preferred language.",
    homeCurrency: 'The home currency of the Account.',
  },

  // PositionAggregationMode	The way that position values for an Account are calculated and aggregated.
  // Value	Description
  // ABSOLUTE_SUM	The Position value or margin for each side (long and short) of the Position are computed independently and added together.
  // MAXIMAL_SIDE	The Position value or margin for each side (long and short) of the Position are computed independently. The Position value or margin chosen is the maximal absolute value of the two.
  // NET_SUM	The units for each side (long and short) of the Position are netted together and the resulting value (long or short) is used to compute the Position value or margin.
  // };

  /**
   * CandlestickGranularity
   *
   * The granularity of a candlestick
   */
  candlestickGranularity: {
    S5: '5 second candlesticks, minute alignment',
    S10: '10 second candlesticks, minute alignment',
    S15: '15 second candlesticks, minute alignment',
    S30: '30 second candlesticks, minute alignment',
    M1: '1 minute candlesticks, minute alignment',
    M2: '2 minute candlesticks, hour alignment',
    M4: '4 minute candlesticks, hour alignment',
    M5: '5 minute candlesticks, hour alignment',
    M10: '10 minute candlesticks, hour alignment',
    M15: '15 minute candlesticks, hour alignment',
    M30: '30 minute candlesticks, hour alignment',
    H1: '1 hour candlesticks, hour alignment',
    H2: '2 hour candlesticks, day alignment',
    H3: '3 hour candlesticks, day alignment',
    H4: '4 hour candlesticks, day alignment',
    H6: '6 hour candlesticks, day alignment',
    H8: '8 hour candlesticks, day alignment',
    H12: '12 hour candlesticks, day alignment',
    D: '1 day candlesticks, day alignment',
    W: '1 week candlesticks, aligned to start of week',
    M: '1 month candlesticks, aligned to first day of the month}',
  },

  /**
   * Candlestick
   *
   * The Candlestick representation
   */
  candlestick: {
    time: 'The start time of the candlestick',
    bid: `The candlestick data based on bids. Only provided if bid-based candles were requested.`,
    ask: `The candlestick data based on asks. Only provided if ask-based candles were requested.`,
    mid: `The candlestick data based on midpoints. Only provided if midpoint-based candles were requested.`,
    volume: `The number of prices created during the time-range represented by the candlestick.`,
    complete: `A flag indicating if the candlestick is complete. A complete candlestick is one whose ending time is not in the future.`,
  },

  /**
   * CandlestickData
   *
   * The price data (open, high, low, close) for the Candlestick representation.
   */

  candlestickData: {
    o: 'The first (open) price in the time-range represented by the candlestick.',
    h: 'The highest price in the time-range represented by the candlestick.',
    l: 'The lowest price in the time-range represented by the candlestick.',
    c: 'The last (closing) price in the time-range represented by the candlestick.',
  },

  /**
   * CandlestickResponse
   *
   * Response containing instrument, granularity, and list of candles.
   */
  candlestickResponse: {
    instrument:
      'The instrument whose Prices are represented by the candlesticks.',
    granularity: 'The granularity of the candlesticks provided.',
    candles: 'The list of candlesticks that satisfy the request.',
  },

  /**
   * OrderBook
   *
   * The representation of an instrument's order book at a point in time
   */
  orderBook: {
    instrument: "The order book's instrument",
    time: 'The time when the order book snapshot was created.',
    price: `The price (midpoint) for the order book's instrument at the time of the order book snapshot`,
    bucketWidth: `The price width for each bucket. Each bucket covers the price range from the bucket's price to the bucket's price + bucketWidth.`,
    buckets: `The partitioned order book, divided into buckets using a default bucket
        width. These buckets are only provided for price ranges which actually
        contain order or position data.`,
  },

  /**
   * OrderBookBucket
   *
   * The order book data for a partition of the instrument's prices.
   */

  orderBookBucket: {
    price: `The lowest price (inclusive) covered by the bucket. The bucket covers the
        price range from the price to price + the order book's bucketWidth.`,
    longCountPercent: `The percentage of the total number of orders represented by the long
        orders found in this bucket.`,
    shortCountPercent: `The percentage of the total number of orders represented by the short
        orders found in this bucket.`,
  },

  /**
   * PositionBook
   *
   * The representation of an instrument's position book at a point in time
   */
  positionBook: {
    instrument: "The position book's instrument",
    time: 'The time when the position book snapshot was created',
    price: `The price (midpoint) for the position book's instrument at the time of
        the position book snapshot`,
    bucketWidth: `The price width for each bucket. Each bucket covers the price range from
        the bucket's price to the bucket's price + bucketWidth.`,
    buckets: `The partitioned position book, divided into buckets using a default
        bucket width. These buckets are only provided for price ranges which
        actually contain order or position data.`,
  },

  /**
   * PositionBookBucket
   *
   * The position book data for a partition of the instrument's prices.
   */
  positionBookBucket: {
    price: `The lowest price (inclusive) covered by the bucket. The bucket covers the
        price range from the price to price + the position book's bucketWidth.`,
    longCountPercent: `The percentage of the total number of positions represented by the long
        positions found in this bucket.`,
    shortCountPercent: `The percentage of the total number of positions represented by the short
        positions found in this bucket.`,
  },

  /**
   * Order
   *
   * The base Order definition specifies the properties that are common to all Orders.
   *
   * Implemented by: MarketOrder, FixedPriceOrder, LimitOrder, StopOrder, MarketIfTouchedOrder,
   * TakeProfitOrder, StopLossOrder, GuaranteedStopLossOrder, TrailingStopLossOrder
   */
  order: {
    id: "The Order's identifier, unique within the Order's Account.",
    tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    createTime: 'The time when the Order was created.',
    state: 'The current state of the Order.',
    clientExtensions: `The client extensions of the Order. Do not set, modify, or delete
    clientExtensions if your account is associated with MT4.`,
    type: 'The type of the Order',
    instrument: "The Order's Instrument.",
    units: `The quantity requested to be filled by the Order. A positive
    number of units results in a long Order, and a negative number of units
    results in a short Order.`,
    timeInForce: 'The time-in-force requested for the Order.',
    gtdTime: `The date/time when the Order will be cancelled if its timeInForce
    is “GTD”.`,
    price: `The price threshold specified for the Order. The Limit Order will
    only be filled by a market price that is equal to or better than this
    price.`,
    priceBound:
      'The worst price that the client is willing to have the Order filled at.',
    distance: `Specifies the distance (in price units) from the Account's current price
    to use as the Stop Loss Order price. If the Trade is short the
    Instrument's bid price is used, and for long Trades the ask is used.`,
    positionFill: `Specification of how Positions in the Account are modified when the Order
    is filled.`,
    tradeClose: `Details of the Trade requested to be closed, only provided when the
     Order is being used to explicitly close a Trade.`,
    longPositionCloseout: `Details of the long Position requested to be closed out, only provided
    when a Order is being used to explicitly closeout a long Position.`,
    shortPositionCloseout: `Details of the short Position requested to be closed out, only provided
    when a Order is being used to explicitly closeout a short
    Position.`,
    marginCloseout: `Details of the Margin Closeout that this Order was created for`,
    delayedTradeClose: `Details of the delayed Trade close that this Market Order was created for`,
    takeProfitOnFill: `Specifies the details of a Take Profit Order to be
    created on behalf of a client. This may happen when an Order is filled
    that opens a Trade requiring a Take Profit, or when a Trade's dependent
    Take Profit Order is modified directly through the Trade.`,
    stopLossOnFill: `Specifies the details of a Stop Loss Order to be created
    on behalf of a client. This may happen when an Order is filled that opens
    a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss
    Order is modified directly through the Trade.`,
    guaranteedStopLossOnFill: `GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss
    Order to be created on behalf of a client. This may happen when an Order
    is filled that opens a Trade requiring a Guaranteed Stop Loss, or when a
    Trade's dependent Guaranteed Stop Loss Order is modified directly through
    the Trade.`,
    trailingStopLossOnFill: `Specifies the details of a Trailing Stop Loss
    Order to be created on behalf of a client. This may happen when an Order
    is filled that opens a Trade requiring a Trailing Stop Loss, or when a
    Trade's dependent Trailing Stop Loss Order is modified directly through
    the Trade.`,
    tradeClientExtensions: `Client Extensions to add to the Trade created when the Order is filled
    (if such a Trade is created). Do not set, modify, or delete
    tradeClientExtensions if your account is associated with MT4.`,
    fillingTransactionID: `ID of the Transaction that filled this Order (only provided when the
        Orders' state is FILLED)`,
    filledTime: `Date/time when the Order was filled (only provided when the Order's state
        is FILLED)`,
    tradeOpenedID: `Trade ID of Trade opened when the Order was filled (only provided when
        the Orders' state is FILLED and a Trade was opened as a result of the
        fill)`,
    tradeReducedID: `Trade ID of Trade reduced when the Order was filled (only provided when
        the Orders' state is FILLED and a Trade was reduced as a result of the
        fill)`,
    tradeClosedIDs: `Trade IDs of Trades closed when the Order was filled (only provided when
        the Orders' state is FILLED and one or more Trades were closed as a
        result of the fill)`,
    cancellingTransactionID: `ID of the Transaction that cancelled the Order (only provided when the
        Orders' state is CANCELLED)`,
    cancelledTime: `Date/time when the Order was cancelled (only provided when the state of
        the Order is CANCELLED)`,
    tradeState: `The state that the trade resulting from the Fixed Price Order should be
    set to.`,
    triggerCondition: `Specification of which price component should be used when determining if
    an Order should be triggered and filled. This allows Orders to be
    triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
    or inverse (ask for sell, bid for buy) price depending on the desired
    behaviour. Orders are always filled using their default price component.
    This feature is only provided through the REST API. Clients who choose to
    specify a non-default trigger condition will not see it reflected in any
    of OANDA's proprietary or partner trading platforms, their transaction
    history or their account statements. OANDA platforms always assume that
    an Order's trigger condition is set to the default value when indicating
    the distance from an Order's trigger price, and will always provide the
    default trigger condition when creating or modifying an Order. A special
    restriction applies when creating a Guaranteed Stop Loss Order. In this
    case the TriggerCondition value must either be “DEFAULT”, or the
    “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
    Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
    short trades “DEFAULT” and “ASK” are valid.`,
    replacesOrderID: `The ID of the Order that was replaced by this Order (only provided if this Order was created as part of a cancel/replace).`,
    replacedByOrderID: `The ID of the Order that replaced this Order (only provided if this Order
    was cancelled as part of a cancel/replace).`,
    initialMarketPrice: `The Market price at the time when the MarketIfTouched Order was created.`,
    clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    trailingStopValue: `The trigger price for the Trailing Stop Loss Order. The trailing stop
    value will trail (follow) the market price by the TSL order's configured
    “distance” as the market price moves in the winning direction. If the
    market price moves to a level that is equal to or worse than the trailing
    stop value, the order will be filled and the Trade will be closed.`,
    guaranteedExecutionPremium: `The premium that will be charged if the Guaranteed Stop Loss Order is
    filled at the guaranteed price. It is in price units and is charged for
    each unit of the Trade.`,
  },

  /**
   * StopLossDetails
   *
   * StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client.
   * This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's
   * dependent Stop Loss Order is modified directly through the Trade.
   */
  stopLossDetails: {
    price: `The price that the Stop Loss Order will be triggered at. Only one of the
    price and distance fields may be specified.`,
    distance: `Specifies the distance (in price units) from the Trade's open price to
    use as the Stop Loss Order price. Only one of the distance and price
    fields may be specified.`,
    timeInForce: `The time in force for the created Stop Loss Order. This may only be GTC,
    GTD or GFD.`,
    gtdTime: `The date when the Stop Loss Order will be cancelled on if timeInForce is
    GTD.`,
    clientExtensions: `The Client Extensions to add to the Stop Loss Order when created.`,
  },

  /**
   * TrailingStopLossDetails
   *
   * TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client.
   * This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's
   * dependent Trailing Stop Loss Order is modified directly through the Trade.
   */
  trailingStopLossDetails: {
    distance: `The distance (in price units) from the Trade's fill price that the
    Trailing Stop Loss Order will be triggered at.`,
    timeInForce: `The time in force for the created Trailing Stop Loss Order. This may only
    be GTC, GTD or GFD.`,
    gtdTime: `The date when the Trailing Stop Loss Order will be cancelled on if
    timeInForce is GTD.`,
    clientExtensions: `The Client Extensions to add to the Trailing Stop Loss Order when
    created.`,
    trailingStopValue: `The trigger price for the Trailing Stop Loss Order. The trailing stop value will trail (follow) the market price by the TSL order's configured “distance” as the market price moves in the winning direction. If the market price moves to a level that is equal to or worse than the trailing stop value, the order will be filled and the Trade will be closed.`,
  },

  /**
   * TakeProfitDetails
   *
   * TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client.
   * This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's
   * dependent Take Profit Order is modified directly through the Trade.
   */
  takeProfitDetails: {
    price: `The price that the Take Profit Order will be triggered at. Only one of
    the price and distance fields may be specified.`,
    timeInForce: `The time in force for the created Take Profit Order. This may only be
    GTC, GTD or GFD.`,
    gtdTime: `The date when the Take Profit Order will be cancelled on if timeInForce
    is GTD.`,
    clientExtensions: `The Client Extensions to add to the Take Profit Order when created.`,
  },

  /**
   * GuaranteedStopLossDetails
   *
   * GuaranteedStopLossDetails specifies the details of a Guaranteed Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Guaranteed Stop Loss, or when a Trade’s dependent Guaranteed Stop Loss Order is modified directly through the Trade.
   */
  guaranteedStopLossDetails: {
    price: `The price that the Guaranteed Stop Loss Order will be triggered at. Only
    one of the price and distance fields may be specified.`,

    distance: `Specifies the distance (in price units) from the Trade's open price to
    use as the Guaranteed Stop Loss Order price. Only one of the distance and
    price fields may be specified.`,

    timeInForce: `The time in force for the created Guaranteed Stop Loss Order. This may
    only be GTC, GTD or GFD.`,

    gtdTime: `The date when the Guaranteed Stop Loss Order will be cancelled on if
    timeInForce is GTD.`,

    clientExtensions: `The Client Extensions to add to the Guaranteed Stop Loss Order when
    created.`,
  },

  /**
   * Trade
   *
   * The specification of a Trade within an Account. This includes the full representation of the
   * Trade's dependent Orders in addition to the IDs of those Orders.
   */
  trade: {
    id: "The Trade's identifier, unique within the Trade's Account.",
    instrument: "The Trade's Instrument.",
    price: 'The execution price of the Trade.',
    openTime: 'The date/time when the Trade was opened.',
    state: 'The current state of the Trade.',
    initialUnits: `The initial size of the Trade. Negative values indicate a short Trade,
    and positive values indicate a long Trade.`,
    initialMarginRequired: `The margin required at the time the Trade was created. Note, this is the
    'pure' margin required, it is not the 'effective' margin used that
    factors in the trade risk if a GSLO is attached to the trade.`,
    currentUnits: `The number of units currently open for the Trade. This value is reduced
    to 0.0 as the Trade is closed.`,
    realizedPL:
      'The total profit/loss realized on the closed portion of the Trade.',
    unrealizedPL:
      'The unrealized profit/loss on the open portion of the Trade.',
    marginUsed: 'Margin currently used by the Trade.',

    averageClosePrice: `The average closing price of the Trade. Only present if the Trade has
    been closed or reduced at least once.`,
    closingTransactionIDs:
      'The IDs of the Transactions that have closed portions of this Trade.',
    financing: 'The financing paid/collected for this Trade.',
    dividendAdjustment: 'The dividend adjustment paid for this Trade.',
    closeTime: `The date/time when the Trade was fully closed. Only provided for Trades
    whose state is CLOSED.`,
    clientExtensions: `The client extensions of the Trade.`,
    takeProfitOrder: `Full representation of the Trade's Take Profit Order, only provided if
    such an Order exists.`,
    stopLossOrder: `Full representation of the Trade's Stop Loss Order, only provided if such
    an Order exists.`,
    trailingStopLossOrder: `Full representation of the Trade's Trailing Stop Loss Order, only
    provided if such an Order exists.`,
  },

  /**
   * TradeSummary
   *
   * The summary of a Trade within an Account. This representation does not provide
   * the full details of the Trade's dependent Orders.
   */
  tradeSummary: {
    id: "The Trade's identifier, unique within the Trade's Account.",
    instrument: "The Trade's Instrument.",
    price: 'The execution price of the Trade.',
    openTime: 'The date/time when the Trade was opened.',
    state: 'The current state of the Trade.',
    initialUnits: `The initial size of the Trade. Negative values indicate a short Trade,
    and positive values indicate a long Trade.`,
    initialMarginRequired: `The margin required at the time the Trade was created. Note, this is the
    'pure' margin required, it is not the 'effective' margin used that
    factors in the trade risk if a GSLO is attached to the trade.`,
    currentUnits: `The number of units currently open for the Trade. This value is reduced
    to 0.0 as the Trade is closed.`,
    realizedPL:
      'The total profit/loss realized on the closed portion of the Trade.',
    unrealizedPL:
      'The unrealized profit/loss on the open portion of the Trade.',
    marginUsed: 'Margin currently used by the Trade.',
    averageClosePrice: `The average closing price of the Trade. Only present if the Trade has
    been closed or reduced at least once.`,
    closingTransactionIDs:
      'The IDs of the Transactions that have closed portions of this Trade.',
    financing: 'The financing paid/collected for this Trade.',
    dividendAdjustment: 'The dividend adjustment paid for this Trade.',
    closeTime: `The date/time when the Trade was fully closed. Only provided for Trades
    whose state is CLOSED.`,
    clientExtensions: 'The client extensions of the Trade.',
    takeProfitOrderID: `ID of the Trade's Take Profit Order, only provided if such an Order
    exists.`,
    stopLossOrderID: `ID of the Trade's Stop Loss Order, only provided if such an Order exists.`,
    guaranteedStopLossOrderID: `ID of the Trade's Guaranteed Stop Loss Order, only provided if such an
    Order exists.`,
    trailingStopLossOrderID: `ID of the Trade's Trailing Stop Loss Order, only provided if such an
    Order exists.`,
  },

  /**
   * DynamicOrderState
   */
  dynamicOrderState: {
    id: "The Orders' ID.",
    trailingStopValue: "The Orders' calculated trailing stop value.",
    triggerDistance: `The distance between the Trailing Stop Loss Orders' trailingStopValue and
    the current Market Price. This represents the distance (in price units)
    of the Order from a triggering price. If the distance could not be
    determined, this value will not be set.`,
    isTriggerDistanceExact: `True if an exact trigger distance could be calculated. If false, it means
    the provided trigger distance is a best estimate. If the distance could
    not be determined, this value will not be set.`,
  },

  /**
   * CalculatedTradeState
   *
   * The dynamic (calculated) state of an open Trade
   */

  calculatedTradeState: {
    id: "The Trades' ID.",
    unrealizedPL: "The Trades' unrealized profit/loss.",
    marginUsed: 'Margin currently used by the Trade.',
  },

  /**
   * Position
   *
   * The specification of a Position within an Account.
   */
  position: {
    instrument: "The Position's Instrument.",
    pl: 'Profit/loss realized by the Position over the lifetime of the Account.',
    unrealizedPL: `The unrealized profit/loss of all open Trades that contribute to this
    Position.`,
    marginUsed: 'Margin currently used by the Position.',
    resettablePL: `Profit/loss realized by the Position since the Account's resettablePL was
    last reset by the client.`,
    financing: `The total amount of financing paid/collected for this instrument over the
    lifetime of the Account.`,
    commission: `The total amount of commission paid for this instrument over the lifetime
    of the Account.`,
    dividendAdjustment: `The total amount of dividend adjustment paid for this instrument over the
    lifetime of the Account.`,
    guaranteedExecutionFees: `The total amount of fees charged over the lifetime of the Account for the
    execution of guaranteed Stop Loss Orders for this instrument.`,
    long: 'The details of the long side of the Position.',
    short: 'The details of the short side of the Position.',
  },

  /**
   * PositionSide
   *
   * The representation of a Position for a single direction (long or short).
   */
  positionSide: {
    units: `Number of units in the position (negative value indicates short position,
        positive indicates long position).`,
    averagePrice: `Volume-weighted average of the underlying Trade open prices for the
    Position.`,
    tradeIDs:
      'List of the open Trade IDs which contribute to the open Position.',
    pl: 'Profit/loss realized by the Position Side over the lifetime of the Account.',
    unrealizedPL:
      'The unrealized profit/loss of all open Trades that contribute to this Position Side.',
    resettablePL:
      "Profit/loss realized by the Position Side since the Account's resettablePL was last reset by the client.",
    financing:
      'The total amount of financing paid/collected for this Position Side over the lifetime of the Account.',
    dividendAdjustment:
      'The total amount of dividend adjustment paid for the Position Side over the lifetime of the Account.',
    guaranteedExecutionFees: `The total amount of fees charged over the lifetime of the Account for the
    execution of guaranteed Stop Loss Orders attached to Trades for this
    Position Side.`,
  },

  /**
   * CalculatedPositionState
   *
   * The dynamic (calculated) state of a Position
   */
  calculatedPositionState: {
    instrument: "The Position's Instrument.",
    netUnrealizedPL: "The Position's net unrealized profit/loss",
    longUnrealizedPL:
      "The unrealized profit/loss of the Position's long open Trades",
    shortUnrealizedPL:
      "The unrealized profit/loss of the Position's short open Trades",
    marginUsed: 'Margin currently used by the Position.',
  },

  /**
   * Instrument
   *
   * Full specification of an Instrument.
   */
  instrument: {
    name: 'The name of the Instrument',
    type: 'The type of the Instrument',
    displayName: 'The display name of the Instrument.',
    pipLocation: `The location of the “pip” for this instrument. The decimal position of
    the pip in this Instrument's price can be found at 10 ^ pipLocation (e.g.
    -4 pipLocation results in a decimal pip position of 10 ^ -4 = 0.0001).`,
    displayPrecision: `The number of decimal places that should be used to display prices for
    this instrument. (e.g. a displayPrecision of 5 would result in a price of
    “1” being displayed as “1.00000”)`,
    tradeUnitsPrecision: `The amount of decimal places that may be provided when specifying the
    number of units traded for this instrument.`,
    minimumTradeSize:
      'The smallest number of units allowed to be traded for this instrument.',
    maximumTrailingStopDistance: `The maximum trailing stop distance allowed for a trailing stop loss
    created for this instrument. Specified in price units.`,
    minimumGuaranteedStopLossDistance: `The minimum distance allowed between the Trade's fill price and the
    configured price for guaranteed Stop Loss Orders created for this
    instrument. Specified in price units.`,
    minimumTrailingStopDistance: `The minimum trailing stop distance allowed for a trailing stop loss
    created for this instrument. Specified in price units.`,
    maximumPositionSize: `The maximum position size allowed for this instrument. Specified in
    units.`,
    maximumOrderUnits: `The maximum units allowed for an Order placed for this instrument.
    Specified in units.`,
    marginRate: 'The margin rate for this instrument.',
    commission: 'The commission structure for this instrument.',
    guaranteedStopLossOrderMode: `The current Guaranteed Stop Loss Order mode of the Account for this
    Instrument.`,
    guaranteedStopLossOrderExecutionPremium: `The amount that is charged to the account if a guaranteed Stop Loss Order
    is triggered and filled. The value is in price units and is charged for
    each unit of the Trade. This field will only be present if the Account's
    guaranteedStopLossOrderMode for this Instrument is not 'DISABLED'.`,
    guaranteedStopLossOrderLevelRestriction: `The guaranteed Stop Loss Order level restriction for this instrument.
    This field will only be present if the Account's
    guaranteedStopLossOrderMode for this Instrument is not 'DISABLED'.`,
    financing: 'Financing data for this instrument.',
    tags: 'The tags associated with this instrument.',
  },

  /**
   * Transaction
   *
   * The base Transaction specification. Specifies properties that are common between all Transaction.
   */
  transaction: {
    id: "The Transaction's Identifier.",
    time: 'The date/time when the Transaction was created.',
    userID:
      'The ID of the user that initiated the creation of the Transaction.',
    accountID: 'The ID of the Account the Transaction was created for.',
    batchID: `The ID of the “batch” that the Transaction belongs to. Transactions in
    the same batch are applied to the Account simultaneously.`,
    requestID: 'The Request ID of the request which generated the transaction.',
    type: 'The Type of the Transaction.',
    divisionID: 'The ID of the Division that the Account is in.',
    siteID: 'The ID of the Site that the Account was created at.',
    accountUserID: 'The ID of the user that the Account was created for.',
    accountNumber: 'The number of the Account within the site/division/user',
    homeCurrency: 'The home currency of the Account,',
    alias: 'The client-provided alias for the Account.',
    marginRate: 'The margin rate override for the Account.',
    rejectReason: 'The reason that the Reject Transaction was created',
    amount: `The amount to deposit/withdraw from the Account in the Account's home
    currency. A positive value indicates a deposit, a negative value
    indicates a withdrawal.`,
    distance:
      'The price distance (in price units) specified for the TrailingStopLoss Order.',
    fundingReason: 'The reason that an Account is being funded.',
    comment: `An optional comment that may be attached to a fund transfer for audit
    purposes.`,
    accountBalance: "The Account's balance after the transaction activity.",
    instrument: "The Order's Instrument.",
    units: `The quantity requested to be filled by the Order. A positive
    number of units results in a long Order, and a negative number of units
    results in a short Order.`,
    timeInForce: 'The time-in-force requested for the Order.',
    priceBound: `The worst price that the client is willing to have the Order
    filled at.`,
    positionFill: `Specification of how Positions in the Account are modified when the Order
    is filled.`,
    tradeClose: `Details of the Trade requested to be closed, only provided when the
    Order is being used to explicitly close a Trade.`,
    longPositionCloseout: `Details of the long Position requested to be closed out, only provided
    when a Order is being used to explicitly closeout a long Position.`,
    shortPositionCloseout: `Details of the short Position requested to be closed out, only provided
    when a Order is being used to explicitly closeout a short
    Position.`,
    marginCloseout:
      'Details of the Margin Closeout that this Order was created for',
    delayedTradeClose:
      'Details of the delayed Trade close that this Order was created for',
    reason: 'The reason that the Order was created',
    clientExtensions: `Client Extensions to add to the Order (only provided if the Order is
      being created with client extensions).`,
    takeProfitOnFill: `The specification of the Take Profit Order that should be created for a
    Trade opened when the Order is filled (if such a Trade is created).`,
    stopLossOnFill: `The specification of the Stop Loss Order that should be created for a
    Trade opened when the Order is filled (if such a Trade is created).`,
    trailingStopLossOnFill: `The specification of the Trailing Stop Loss Order that should be created
    for a Trade that is opened when the Order is filled (if such a Trade is
    created).`,
    guaranteedStopLossOnFill: `The specification of the Guaranteed Stop Loss Order that should be
    created for a Trade that is opened when the Order is filled (if such a
    Trade is created).`,
    tradeClientExtensions: `Client Extensions to add to the Trade created when the Order is filled
    (if such a Trade is created).  Do not set, modify, delete
    tradeClientExtensions if your account is associated with MT4.`,
    price: `The price specified for the Order. This price is the exact
    price that the Order will be filled at.`,
    tradeState: `The state that the trade resulting from the Order should be
    set to.`,
    gtdTime: `The date/time when the Order will be cancelled if its timeInForce
    is “GTD”.`,
    triggerCondition: `Specification of which price component should be used when determining if
    an Order should be triggered and filled. This allows Orders to be
    triggered based on the bid, ask, mid, default (ask for buy, bid for sell)
    or inverse (ask for sell, bid for buy) price depending on the desired
    behaviour. Orders are always filled using their default price component.
    This feature is only provided through the REST API. Clients who choose to
    specify a non-default trigger condition will not see it reflected in any
    of OANDA's proprietary or partner trading platforms, their transaction
    history or their account statements. OANDA platforms always assume that
    an Order's trigger condition is set to the default value when indicating
    the distance from an Order's trigger price, and will always provide the
    default trigger condition when creating or modifying an Order. A special
    restriction applies when creating a Guaranteed Stop Loss Order. In this
    case the TriggerCondition value must either be “DEFAULT”, or the
    “natural” trigger side “DEFAULT” results in. So for a Guaranteed Stop
    Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for
    short trades “DEFAULT” and “ASK” are valid.`,
    replacesOrderID: `The ID of the Order that this Order replaces (only provided if this Order
      replaces an existing Order).`,
    cancellingTransactionID: `The ID of the Transaction that cancels the replaced Order (only provided
      if this Order replaces an existing Order).`,
    intendedReplacesOrderID: `The ID of the Order that this Order was intended to replace (only
      provided if this Order was intended to replace an existing Order).`,
    TAKE_PROFIT_ORDER_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    TAKE_PROFIT_ORDER_REJECT_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    STOP_LOSS_ORDER_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    STOP_LOSS_ORDER_REJECT_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    GUARANTEED_STOP_LOSS_ORDER_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    GUARANTEED_STOP_LOSS_ORDER_REJECT_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    TRAILING_STOP_LOSS_ORDER_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    TRAILING_STOP_LOSS_ORDER_REJECT_tradeID:
      'The ID of the Trade to close when the price threshold is breached.',
    TRADE_CLIENT_EXTENSIONS_MODIFY_tradeID:
      'The ID of the Trade whose client extensions are to be modified.',
    TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT_tradeID:
      'The ID of the Trade whose client extensions are to be modified.',
    TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT_clientTradeID:
      'The original Client ID of the Trade whose client extensions are to be modified.',
    TRADE_CLIENT_EXTENSIONS_MODIFY_clientTradeID:
      'The original Client ID of the Trade whose client extensions are to be modified.',
    TAKE_PROFIT_ORDER_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    TAKE_PROFIT_ORDER_REJECT_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    STOP_LOSS_ORDER_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    STOP_LOSS_ORDER_REJECT_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    GUARANTEED_STOP_LOSS_ORDER_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    GUARANTEED_STOP_LOSS_ORDER_REJECT_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    TRAILING_STOP_LOSS_ORDER_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    TRAILING_STOP_LOSS_ORDER_REJECT_clientTradeID:
      'The client ID of the Trade to be closed when the price threshold is breached.',
    orderFillTransactionID: `The ID of the OrderFill Transaction that caused this Order to be created
    (only provided if this Order was created automatically when another Order
    was filled).`,
    guaranteedExecutionPremium: `The fee that will be charged if the Guaranteed Stop Loss Order is filled
      at the guaranteed price. The value is determined at Order creation time.
      It is in price units and is charged for each unit of the Trade.`,
    ORDER_FILL_orderID: 'The ID of the Order filled.',
    ORDER_CANCEL_orderID: 'The ID of the Order cancelled.',
    ORDER_CANCEL_REJECT_orderID:
      'The ID of the Order intended to be cancelled.',
    ORDER_CLIENT_EXTENSIONS_MODIFY_orderID:
      'The ID of the Order whose client extensions are to be modified.',
    ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT_orderID: `The ID of the Order whose client extensions are to be modified.`,
    ORDER_FILL_clientOrderID: `The client Order ID of the Order filled (only provided if the client has
      assigned one).`,
    fullVWAP: `The price that all of the units of the OrderFill should have been filled
    at, in the absence of guaranteed price execution. This factors in the
    Accounts' current ClientPrice, used liquidity and the units of the
    OrderFill only. If no Trades were closed with their price clamped for
    guaranteed stop loss enforcement, then this value will match the price
    fields of each Trade opened, closed, and reduced, and they will all be
    the exact same.`,
    fullPrice:
      'The price in effect for the account at the time of the Order fill.',
    pl: 'The profit or loss incurred when the Order was filled.',
    quotePL: `The profit or loss incurred when the Order was filled, in the
    Instruments' quote currency.`,
    STOP_LOSS_ORDER_distance: `Specifies the distance (in price units) from the Account's current price
    to use as the Stop Loss Order price. If the Trade is short the
    Instrument's bid price is used, and for long Trades the ask is used.`,
    STOP_LOSS_ORDER_REJECT_distance: `Specifies the distance (in price units) from the Account's current price
    to use as the Stop Loss Order price. If the Trade is short the
    Instrument's bid price is used, and for long Trades the ask is used.`,
    GUARANTEED_STOP_LOSS_ORDER_distance: `Specifies the distance (in price units) from the Account's current price
    to use as the Stop Loss Order price. If the Trade is short the
    Instrument's bid price is used, and for long Trades the ask is used.`,
    GUARANTEED_STOP_LOSS_ORDER_REJECT_distance: `Specifies the distance (in price units) from the Account's current price
    to use as the Stop Loss Order price. If the Trade is short the
    Instrument's bid price is used, and for long Trades the ask is used.`,
    TRAILING_STOP_LOSS_ORDER_distance: `The price distance (in price units) specified for the Trailing Stop Loss
    Order.`,
    TRAILING_STOP_LOSS_ORDER_REJECT_distance: `The price distance (in price units) specified for the Trailing Stop Loss
    Order.`,

    // The price threshold specified for the Stop Loss Order. The associated
    // Trade will be closed by a market price that is equal to or worse than
    // this threshold.

    // price: (PriceValue, required),

    // The price threshold specified for the Guaranteed Stop Loss Order. The
    // associated Trade will be closed at this price.

    // price: (PriceValue, required),

    // Specifies the distance (in price units) from the Account's current price
    // to use as the Guaranteed Stop Loss Order price. If the Trade is short the
    // Instrument's bid price is used, and for long Trades the ask is used.

    // distance: (DecimalNumber),

    // The price distance (in price units) specified for the TrailingStopLoss
    // Order.

    // distance: (DecimalNumber, required),

    // The price distance (in price units) specified for the TrailingStopLoss
    // Order.

    // distance: (DecimalNumber, required),

    financing: 'The financing paid or collected when the Order was filled.',
    baseFinancing: `The financing paid or collected when the Order was filled, in the
    Instrument's base currency.`,
    quoteFinancing: `The financing paid or collected when the Order was filled, in the
    Instrument's quote currency.`,
    commission: `The commission charged in the Account's home currency as a result of
    filling the Order. The commission is always represented as a positive
    quantity of the Account's home currency, however it reduces the balance
    in the Account.`,
    guaranteedExecutionFee: `The total guaranteed execution fees charged for all Trades opened, closed
    or reduced with guaranteed Stop Loss Orders.`,
    quoteGuaranteedExecutionFee: `The total guaranteed execution fees charged for all Trades opened, closed
    or reduced with guaranteed Stop Loss Orders, expressed in the
    Instrument's quote currency.`,
    tradeOpened: `The Trade that was opened when the Order was filled (only provided if
      filling the Order resulted in a new Trade).`,
    tradesClosed: `The Trades that were closed when the Order was filled (only provided if
      filling the Order resulted in a closing open Trades).`,
    tradeReduced: `The Trade that was reduced when the Order was filled (only provided if
      filling the Order resulted in reducing an open Trade).`,
    halfSpreadCost: `The half spread cost for the OrderFill, which is the sum of the
    halfSpreadCost values in the tradeOpened, tradesClosed and tradeReduced
    fields. This can be a positive or negative value and is represented in
    the home currency of the Account.`,
    ORDER_CANCEL_clientOrderID: `The client ID of the Order cancelled (only provided if the Order has a client Order ID).`,
    ORDER_CANCEL_REJECT_clientOrderID: `The client ID of the Order intended to be cancelled (only provided if the
      Order has a client Order ID).`,
    ORDER_CLIENT_EXTENSIONS_MODIFY_clientOrderID: `The original Client ID of the Order who's client extensions are to be
    modified.`,
    ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT_clientOrderID: `The original Client ID of the Order who's client extensions are to be modified.`,
    clientExtensionsModify: 'The new Client Extensions for the Order.',
    extensionNumber: `The number of the extensions to the Account's current margin call that
    have been applied. This value will be set to 1 for the first
    MarginCallExtend Transaction`,
    tradeIDs: `List of Trade ID's identifying the open trades that will be closed when
    their respective instruments become tradeable`,
    positionFinancings:
      'The financing paid/collected for each Position in the Account.',
    dividendAdjustment: `The total dividend adjustment amount paid or collected in the Account's
    home currency for the Account as a result of applying the
    Dividend Adjustment Transaction. This is the sum of the dividend
    adjustments paid/collected for each Open Trade Dividend Adjustment found
    within the Transaction.`,
    quoteDividendAdjustment: `The total dividend adjustment amount paid or collected in the
    Instrument's quote currency for the Account as a result of applying the
    Dividend Adjustment Transaction. This is the sum of the quote dividend
    adjustments paid/collected for each Open Trade Dividend Adjustment found
    within the Transaction.`,
    homeConversionFactors: `The HomeConversionFactors in effect at the time of the
    DividendAdjustment.`,
    openTradeDividendAdjustments: `The dividend adjustment payment/collection details for each open Trade,
    within the Account, for which a dividend adjustment is to be paid or
    collected.`,
  },
};
