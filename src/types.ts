// Type for a property subscription with options
import type { SubscriptionConfiguration } from '@disguise-one/vue-liveupdate';

export interface PropertySubscriptionConfig {
  property: string;
  options?: SubscriptionConfiguration;
}