import { expect } from 'chai';
import fetch from 'node-fetch';
import sinon, { SinonSpy } from 'sinon';

import { TestConfig } from '../../../setup';
import { Env } from '../../../test-env';

describe('Delhivery', () => {
  context('webhook handler at different updates', () => {
    let callbackSpy: SinonSpy;

    beforeEach(() => {
      callbackSpy = sinon.spy(TestConfig, 'callback');
    });

    it('should process the event of delhivery status UD (In Transit)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Bag Received at Facility',
              Status: 'In Transit',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'UD',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Bag Received at Facility',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'InTransit',
        stageGroup: 'InTransit',
      });
    });

    it('should process the event of delhivery status UD (Pending)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Delayed due to weather conditions',
              Status: 'Pending',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'UD',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Delayed due to weather conditions',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'InTransit',
        stageGroup: 'InTransit',
      });
    });

    it('should process the event of delhivery status UD (Dispatched)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Call placed to consignee',
              Status: 'Dispatched',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'UD',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Call placed to consignee',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'OutForDelivery',
        stageGroup: 'OutForDelivery',
      });
    });

    it('should process the event of delhivery status UD (Manifested)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Pickup scheduled',
              Status: 'Manifested',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'UD',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Pickup scheduled',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'PickupPending',
        stageGroup: 'OrderPlaced',
      });
    });

    it('should process the event of delhivery status UD (Not Picked)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Package not picked/received from client',
              Status: 'Not Picked',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'UD',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Package not picked/received from client',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'PickupFailed',
        stageGroup: 'OrderPlaced',
      });
    });

    it('should process the event of delhivery status RT (In Transit)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Added to Bag',
              Status: 'In Transit',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'RT',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Added to Bag',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'RTOInTransit',
        stageGroup: 'Returned',
      });
    });

    it('should process the event of delhivery status RT (Dispatched)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Dispatched for RTO',
              Status: 'Dispatched',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'RT',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Dispatched for RTO',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'RTOOutForDelivery',
        stageGroup: 'Returned',
      });
    });

    it('should process the event of delhivery status RT (Pending)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'Shipment Received at Facility',
              Status: 'Pending',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'RT',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'Shipment Received at Facility',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'RTOInTransit',
        stageGroup: 'Returned',
      });
    });

    it('should process the event of delhivery status RT (RTO)', async () => {
      const response = await fetch(`${Env.URL}/api/delhivery/webhook`, {
        body: JSON.stringify({
          Shipment: {
            AWB: '1111111111',
            NSLCode: 'X-ILL1F',
            PickUpDate: '2022-06-06T17:57:51',
            ReferenceNo: 'orderId',
            Sortcode: 'JJR/PLC',
            Status: {
              Instructions: 'RTO Delivered',
              Status: 'RTO',
              StatusDateTime: '2022-06-14T21:27:29.301000',
              StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
              StatusType: 'RT',
            },
          },
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: undefined,
        note: 'RTO Delivered',
        orderId: 'orderId',
        serviceProvider: 'Delhivery',
        stage: 'RTODelivered',
        stageGroup: 'Returned',
      });
    });

    afterEach(() => callbackSpy.restore());
  });
});
