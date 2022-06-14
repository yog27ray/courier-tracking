import { CourierTracking } from '../courier-tracking';
import { TrackingUpdate } from '../../../../typings/tracking-update';
import { StageMap } from './stage-map';
import { Courier } from '../../constant/courier';
import { StageGroupMap } from '../../constant/stage-group-map';

export class Delhivery extends CourierTracking {
  transformBodyToTrackingUpdate(body: Record<string, unknown>): TrackingUpdate {
    const { AWB, ReferenceNo, Status: { Instructions, Status, StatusType } } = body.Shipment as {
      AWB: string;
      ReferenceNo: string;
      Status: { Instructions: string; Status: string; StatusType: string; };
    };
    const stage = `${StatusType}_${Status}`.replace(new RegExp(' ', 'g'), '');
    return {
      awb: AWB,
      courier: Courier.Delhivery,
      note: Instructions,
      orderId: ReferenceNo,
      serviceProvider: Courier.Delhivery,
      stage: StageMap[stage],
      stageGroup: StageGroupMap[StageMap[stage]],
      expectedDateOfDelivery: undefined,
    };
  }
}
