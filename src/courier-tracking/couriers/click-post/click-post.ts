import { TrackingUpdate } from '../../../../typings/tracking-update';
import { Courier } from '../../constant/courier';
import { StageGroupMap } from '../../constant/stage-group-map';
import { CourierTracking } from '../courier-tracking';
import { CourierMap } from './courier-map';
import { StageMap } from './stage-map';

export class ClickPost extends CourierTracking {
  transformBodyToTrackingUpdate(body: Record<string, unknown>): TrackingUpdate {
    if (body.latest_status) {
      return {
        awb: undefined,
        courier: CourierMap[(body.additional as { courier_partner_id: number }).courier_partner_id],
        note: (body.latest_status as { remark: string }).remark,
        orderId: (body.additional as { order_id: string }).order_id,
        serviceProvider: Courier.ClickPost,
        stageGroup: StageGroupMap[StageMap[(body.latest_status as { clickpost_status_code: number }).clickpost_status_code]],
        stage: StageMap[(body.latest_status as { clickpost_status_code: number }).clickpost_status_code],
        expectedDateOfDelivery: (body.additional as { courier_partner_edd: string })?.courier_partner_edd,
      };
    }
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
