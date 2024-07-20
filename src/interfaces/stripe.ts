export interface CurrencyOptions {
  custom_unit_amount: null;
  tax_behavior: string;
  unit_amount: number;
  unit_amount_decimal: number;
}

export interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  currency_options: {
    [key: string]: CurrencyOptions;
  };
  custom_unit_amount: null;
  livemode: boolean;
  lookup_key: null;
  metadata: Record<string, unknown>;
  nickname: null;
  product: string;
  recurring: {
    aggregate_usage: null;
    interval: string;
    interval_count: number;
    trial_period_days: null;
    usage_type: string;
  };
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface Product {
  id: string;
  object: string;
  active: boolean;
  attributes: string[];
  created: number;
  default_price: string;
  description: string;
  features: ProductFeatures[];
  images: string[];
  livemode: boolean;
  metadata: Record<string, unknown>;
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: string;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
}

export interface ProductWithPrices {
  product: Product;
  prices: Price[];
}

export interface ProductFeatures {
  name: string
}

export interface Invoice {
  account_country: string;
  account_name: string;
  amount_due: number;
  amount_paid: number;
  currency: string
}