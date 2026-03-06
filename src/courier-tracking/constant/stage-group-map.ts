import { ValueOf } from '../../../typings/common';
import { Group } from './group';
import { Stage } from './stage';

const StageGroupMap: Record<ValueOf<typeof Stage>, ValueOf<typeof Group>> = {
  AWBGenerated: Group.OrderPlaced,
  Damaged: Group.Damaged,
  Delivered: Group.Delivered,
  DeliveryFailed: Group.FailedDelivery,
  ExchangeDelivered: Group.Delivered,
  ExchangeInTransit: Group.InTransit,
  ExchangePickUp: Group.OrderPlaced,
  InTransit: Group.InTransit,
  Lost: Group.Lost,
  NotServiceable: Group.FailedDelivery,
  OrderCancelled: Group.OrderPlaced,
  OrderPlaced: Group.OrderPlaced,
  OutForDelivery: Group.OutForDelivery,
  OutForPickup: Group.OrderPlaced,
  PickedUp: Group.Dispatched,
  PickupFailed: Group.OrderPlaced,
  PickupPending: Group.OrderPlaced,
  ReturnOrderPlaced: Group.OrderPlaced,
  RTO: Group.Returned,
  RTODelivered: Group.Returned,
  RTODeliveryFailed: Group.Returned,
  RTOInTransit: Group.Returned,
  RTOOutForDelivery: Group.Returned,
  RTORequested: Group.Returned,
  RTOShipmentDelayed: Group.Returned,
  ShipmentDelayed: Group.InTransit,
  ShipmentHeld: Group.InTransit,
};

export { StageGroupMap };
