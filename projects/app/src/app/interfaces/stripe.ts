export interface Customer {
  id: 'cus_OLrfrncYOVyVr1';
  object: 'customer';
  address: null;
  balance: 0;
  created: 1690624765;
  currency: null;
  default_source: null;
  delinquent: false;
  description: null;
  discount: null;
  email: 'briandmuguluma@gmail.com';
  invoice_prefix: '6951EDA6';
  invoice_settings: {
    custom_fields: null;
    default_payment_method: null;
    footer: null;
    rendering_options: null;
  };
  livemode: false;
  metadata: {
    firebaseUID: 'ylBV7hUNEjRlVrwYvYH6Nl5TndA3';
  };
  name: null;
  phone: null;
  preferred_locales: [];
  shipping: null;
  subscriptions: {
    object: string;
    data: Subscription[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  tax_exempt: 'none';
  test_clock: null;
}

export interface Subscription {
  id: string;
  object: string;
  application: null;
  application_fee_percent: null;
  automatic_tax: {
    enabled: false;
  };
  billing_cycle_anchor: number;
  billing_thresholds: null;
  cancel_at: null;
  cancel_at_period_end: false;
  canceled_at: null;
  cancellation_details: {
    comment: null;
    feedback: null;
    reason: null;
  };
  collection_method: string;
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due: null;
  default_payment_method: string;
  default_source: null;
  description: null;
  discount: null;
  ended_at: null;
  items: {
    object: 'list';
    data: [
      {
        id: 'si_OLYwluf9exH9KC';
        object: 'subscription_item';
        billing_thresholds: null;
        created: 1690555103;
        metadata: {};
        plan: {
          id: 'price_1NRvDdKSmfQQuJd1CvrKY4As';
          object: 'plan';
          active: true;
          aggregate_usage: null;
          amount: 9999;
          amount_decimal: '9999';
          billing_scheme: 'per_unit';
          created: 1688899917;
          currency: 'gbp';
          interval: 'month';
          interval_count: 1;
          livemode: false;
          metadata: {};
          nickname: 'Micro account';
          product: 'prod_OENz0Vze7ZXVuu';
          tiers_mode: null;
          transform_usage: null;
          trial_period_days: null;
          usage_type: 'licensed';
        };
        price: {
          id: 'price_1NRvDdKSmfQQuJd1CvrKY4As';
          object: 'price';
          active: true;
          billing_scheme: 'per_unit';
          created: 1688899917;
          currency: 'gbp';
          custom_unit_amount: null;
          livemode: false;
          lookup_key: null;
          metadata: {};
          nickname: 'Micro account';
          product: 'prod_OENz0Vze7ZXVuu';
          recurring: {
            aggregate_usage: null;
            interval: 'month';
            interval_count: 1;
            trial_period_days: null;
            usage_type: 'licensed';
          };
          tax_behavior: 'unspecified';
          tiers_mode: null;
          transform_quantity: null;
          type: 'recurring';
          unit_amount: 9999;
          unit_amount_decimal: '9999';
        };
        quantity: 1;
        subscription: 'sub_1NYroBKSmfQQuJd1jfGUJeK8';
        tax_rates: [];
      },
    ];
    has_more: false;
    total_count: 1;
    url: '/v1/subscription_items?subscription=sub_1NYroBKSmfQQuJd1jfGUJeK8';
  };
  latest_invoice: string;
  livemode: false;
  metadata: {};
  next_pending_invoice_item_invoice: null;
  on_behalf_of: null;
  pause_collection: null;
  payment_settings: {
    payment_method_options: null;
    payment_method_types: null;
    save_default_payment_method: 'off';
  };
  pending_invoice_item_interval: null;
  pending_setup_intent: null;
  pending_update: null;
  plan: {
    id: string;
    object: 'plan';
    active: true;
    aggregate_usage: null;
    amount: number;
    amount_decimal: '9999';
    billing_scheme: 'per_unit';
    created: number;
    currency: string;
    interval: RecurringInterval;
    interval_count: 1;
    livemode: false;
    metadata: {};
    nickname: 'Micro account';
    product: string;
    tiers_mode: null;
    transform_usage: null;
    trial_period_days: null;
    usage_type: string;
  };
  quantity: 1;
  schedule: null;
  start_date: number;
  status: string;
  test_clock: null;
  transfer_data: null;
  trial_end: null;
  trial_settings: {
    end_behavior: {
      missing_payment_method: string;
    };
  };
  trial_start: null;
}

export type RecurringInterval = 'day' | 'week' | 'year' | 'month';
