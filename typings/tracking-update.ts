import { Courier } from '../src/courier-tracking/constant/courier';
import { Stage } from '../src/courier-tracking/constant/stage';
import { ValueOf } from './common';

export declare interface TrackingUpdate {
  serviceProvider: ValueOf<typeof Courier>;
  courier: ValueOf<typeof Courier>;
  awb: string;
  orderId: string;
  stage: ValueOf<typeof Stage>;
  note: string;
  stageGroup: string;
  expectedDateOfDelivery: string;
}
