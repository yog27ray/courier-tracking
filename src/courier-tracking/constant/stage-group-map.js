"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageGroupMap = void 0;
const group_1 = require("./group");
const StageGroupMap = {
    AWBGenerated: group_1.Group.OrderPlaced,
    OrderPlaced: group_1.Group.OrderPlaced,
    PickupPending: group_1.Group.OrderPlaced,
    PickupFailed: group_1.Group.OrderPlaced,
    PickedUp: group_1.Group.Dispatched,
    OutForPickup: group_1.Group.OrderPlaced,
    InTransit: group_1.Group.InTransit,
    OutForDelivery: group_1.Group.OutForDelivery,
    NotServiceable: group_1.Group.FailedDelivery,
    Delivered: group_1.Group.Delivered,
    DeliveryFailed: group_1.Group.FailedDelivery,
    OrderCancelled: group_1.Group.OrderPlaced,
    ShipmentDelayed: group_1.Group.InTransit,
    RTORequested: group_1.Group.Returned,
    RTO: group_1.Group.Returned,
    RTOInTransit: group_1.Group.Returned,
    RTOOutForDelivery: group_1.Group.Returned,
    RTODelivered: group_1.Group.Returned,
    RTODeliveryFailed: group_1.Group.Returned,
    RTOShipmentDelayed: group_1.Group.Returned,
    ReturnOrderPlaced: group_1.Group.OrderPlaced,
    ExchangePickUp: group_1.Group.OrderPlaced,
    ExchangeInTransit: group_1.Group.InTransit,
    ExchangeDelivered: group_1.Group.Delivered,
    Lost: group_1.Group.Lost,
    Damaged: group_1.Group.Damaged,
    ShipmentHeld: group_1.Group.InTransit,
};
exports.StageGroupMap = StageGroupMap;
//# sourceMappingURL=stage-group-map.js.map