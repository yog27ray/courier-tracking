import { TrackingUpdate } from '../../../../typings/tracking-update';
import { Courier } from '../../constant/courier';
import { StageGroupMap } from '../../constant/stage-group-map';
import { CourierTracking } from '../courier-tracking';
import { CourierMap } from './courier-map';
import { StageMap } from './stage-map';

export class ClickPost extends CourierTracking {
  transformBodyToTrackingUpdate(body: Record<string, unknown>): TrackingUpdate {
    return {
      awb: body.waybill as string,
      courier: CourierMap[body.cp_id as number],
      note: body.remark as string,
      orderId: (body.additional as { order_id: string }).order_id,
      serviceProvider: Courier.ClickPost,
      stageGroup: StageGroupMap[StageMap[body.clickpost_status_code as number]],
      stage: StageMap[body.clickpost_status_code as number],
      expectedDateOfDelivery: (body.additional as { courier_partner_edd: string })?.courier_partner_edd,
    };
  }
}
