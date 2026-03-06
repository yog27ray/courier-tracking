import { ValueOf } from '../../../../typings/common';
import { Stage } from '../../constant/stage';

const StageMap: Record<string, ValueOf<typeof Stage>> = {
  RT_Dispatched: Stage.RTOOutForDelivery,
  RT_InTransit: Stage.RTOInTransit,
  RT_Pending: Stage.RTOInTransit,
  RT_RTO: Stage.RTODelivered,
  UD_Delivered: Stage.Delivered,
  UD_Dispatched: Stage.OutForDelivery,
  UD_InTransit: Stage.InTransit,
  UD_Manifested: Stage.PickupPending,
  UD_NotPicked: Stage.PickupFailed,
  UD_Pending: Stage.InTransit,
};

export { StageMap };
