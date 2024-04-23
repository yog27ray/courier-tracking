import { ValueOf } from '../../../../typings/common';
import { Stage } from '../../constant/stage';

const StageMap: { [key: number]: ValueOf<typeof Stage> } = {
  1: Stage.OrderPlaced,
  2: Stage.PickupPending,
  3: Stage.PickupFailed,
  4: Stage.PickedUp,
  5: Stage.InTransit,
  6: Stage.OutForDelivery,
  7: Stage.NotServiceable,
  8: Stage.Delivered,
  9: Stage.DeliveryFailed,
  10: Stage.OrderCancelled,
  11: Stage.RTORequested,
  12: Stage.RTO,
  13: Stage.RTOOutForDelivery,
  14: Stage.RTODelivered,
  15: Stage.RTODeliveryFailed,
  16: Stage.Lost,
  17: Stage.Damaged,
  18: Stage.ShipmentDelayed,
  19: Stage.ShipmentDelayed,
  20: Stage.ShipmentHeld,
  21: Stage.RTOInTransit,
  25: Stage.OutForPickup,
  26: Stage.RTO,
  27: Stage.RTOShipmentDelayed,
  28: Stage.AWBGenerated,
  30: Stage.ExchangePickUp,
  31: Stage.ExchangeInTransit,
  32: Stage.ExchangeDelivered,
  101: Stage.ReturnOrderPlaced,
  1004: Stage.InTransit,
  1005: Stage.InTransit,
  1006: Stage.InTransit,
};

export { StageMap };
