import { ValueOf } from '../../../../typings/common';
import { Stage } from '../../constant/stage';

const StageMap: { [key: string]: ValueOf<typeof Stage> } = {
  UD_NotPicked: Stage.PickupFailed,
  UD_Manifested: Stage.PickupPending,
  UD_Pending: Stage.InTransit,
  UD_InTransit: Stage.InTransit,
  UD_Dispatched: Stage.OutForDelivery,
  UD_Delivered: Stage.Delivered,
  RT_InTransit: Stage.RTOInTransit,
  RT_Pending: Stage.RTOInTransit,
  RT_Dispatched: Stage.RTOOutForDelivery,
  RT_RTO: Stage.RTODelivered,
};

export { StageMap };
