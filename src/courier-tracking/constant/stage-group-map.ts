import { ValueOf } from '../../../typings/common';
import { Group } from './group';
import { Stage } from './stage';

const StageGroupMap: { [key in ValueOf<typeof Stage>]: ValueOf<typeof Group> } = {
  AWBGenerated: Group.OrderPlaced,
  OrderPlaced: Group.OrderPlaced,
  PickupPending: Group.OrderPlaced,
  PickupFailed: Group.OrderPlaced,
  PickedUp: Group.Dispatched,
  OutForPickup: Group.OrderPlaced,
  InTransit: Group.InTransit,
  OutForDelivery: Group.OutForDelivery,
  NotServiceable: Group.FailedDelivery,
  Delivered: Group.Delivered,
  DeliveryFailed: Group.FailedDelivery,
  OrderCancelled: Group.OrderPlaced,
  ShipmentDelayed: Group.InTransit,
  RTORequested: Group.Returned,
  RTO: Group.Returned,
  RTOInTransit: Group.Returned,
  RTOOutForDelivery: Group.Returned,
  RTODelivered: Group.Returned,
  RTODeliveryFailed: Group.Returned,
  RTOShipmentDelayed: Group.Returned,
  ReturnOrderPlaced: Group.OrderPlaced,
  ExchangePickUp: Group.OrderPlaced,
  ExchangeInTransit: Group.InTransit,
  ExchangeDelivered: Group.Delivered,
  Lost: Group.Lost,
  Damaged: Group.Damaged,
  ShipmentHeld: Group.InTransit,
};

export { StageGroupMap };
