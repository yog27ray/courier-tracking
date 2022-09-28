"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageMap = void 0;
const stage_1 = require("../../constant/stage");
const StageMap = {
    1: stage_1.Stage.OrderPlaced,
    2: stage_1.Stage.PickupPending,
    3: stage_1.Stage.PickupFailed,
    4: stage_1.Stage.PickedUp,
    5: stage_1.Stage.InTransit,
    6: stage_1.Stage.OutForDelivery,
    7: stage_1.Stage.NotServiceable,
    8: stage_1.Stage.Delivered,
    9: stage_1.Stage.DeliveryFailed,
    10: stage_1.Stage.OrderCancelled,
    11: stage_1.Stage.RTORequested,
    12: stage_1.Stage.RTO,
    13: stage_1.Stage.RTOOutForDelivery,
    14: stage_1.Stage.RTODelivered,
    15: stage_1.Stage.RTODeliveryFailed,
    16: stage_1.Stage.Lost,
    17: stage_1.Stage.Damaged,
    18: stage_1.Stage.ShipmentDelayed,
    19: stage_1.Stage.ShipmentDelayed,
    20: stage_1.Stage.ShipmentHeld,
    21: stage_1.Stage.RTOInTransit,
    25: stage_1.Stage.OutForPickup,
    27: stage_1.Stage.RTOShipmentDelayed,
    28: stage_1.Stage.AWBGenerated,
    30: stage_1.Stage.ExchangePickUp,
    31: stage_1.Stage.ExchangeInTransit,
    32: stage_1.Stage.ExchangeDelivered,
    101: stage_1.Stage.ReturnOrderPlaced,
};
exports.StageMap = StageMap;
//# sourceMappingURL=stage-map.js.map