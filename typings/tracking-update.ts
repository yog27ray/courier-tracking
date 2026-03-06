import { Courier, Stage } from '../src/courier-tracking';
import { Group } from '../src/courier-tracking/constant/group';
import { ValueOf } from './common';

export declare interface TrackingUpdate {
  awb: string;
  courier: ValueOf<typeof Courier>;
  expectedDateOfDelivery: string;
  note: string;
  orderId: string;
  serviceProvider: ValueOf<typeof Courier>;
  stage: ValueOf<typeof Stage>;
  stageGroup: ValueOf<typeof Group>;
}
