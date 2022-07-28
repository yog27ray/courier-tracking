import { Courier, Stage } from '../src/courier-tracking';
import { Group } from '../src/courier-tracking/constant/group';
import { ValueOf } from './common';

export declare interface TrackingUpdate {
  serviceProvider: ValueOf<typeof Courier>;
  courier: ValueOf<typeof Courier>;
  awb: string;
  orderId: string;
  stage: ValueOf<typeof Stage>;
  note: string;
  stageGroup: ValueOf<typeof Group>;
  expectedDateOfDelivery: string;
}
