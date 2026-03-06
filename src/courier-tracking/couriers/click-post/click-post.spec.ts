import { expect } from 'chai';
import fetch from 'node-fetch';
import sinon, { SinonSpy } from 'sinon';

import { TestConfig } from '../../../setup';
import { Env } from '../../../test-env';

describe('ClickPost', () => {
  context('webhook handler at different updates', () => {
    let callbackSpy: SinonSpy;

    beforeEach(() => {
      callbackSpy = sinon.spy(TestConfig, 'callback');
    });

    it('should process the event of clickPost status code 2 (PickupPending)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 1,
              clickpost_status_bucket_description: 'Order Placed',
              clickpost_status_code: 2,
              clickpost_status_description: 'PickupPending',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Pickup Failed, Shipment Not Handed Over',
              status: '1340',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 2,
          clickpost_status_description: 'PickupPending',
          cp_id: 3,
          location: 'CITY-HUB',
          remark: 'Pickup Failed, Shipment Not Handed Over',
          status: '1340',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        expectedDateOfDelivery: undefined,
        note: 'Pickup Failed, Shipment Not Handed Over',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'PickupPending',
        stageGroup: 'OrderPlaced',
      });
    });

    it('should process the event of clickPost status code 4 (PickedUp)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 2,
              clickpost_status_bucket_description: 'Shipped',
              clickpost_status_code: 4,
              clickpost_status_description: 'PickedUp',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Shipment Picked Up',
              status: '0011',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 4,
          clickpost_status_description: 'PickedUp',
          cp_id: 3,
          location: 'CITY-HUB',
          remark: 'Shipment Picked Up',
          status: '0011',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        expectedDateOfDelivery: undefined,
        note: 'Shipment Picked Up',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'PickedUp',
        stageGroup: 'Dispatched',
      });
    });

    it('should process the event of clickPost status code 5 (InTransit)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 3,
              clickpost_status_bucket_description: 'In transit',
              clickpost_status_code: 5,
              clickpost_status_description: 'InTransit',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Bag scanned at Hub',
              status: '003',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 5,
          clickpost_status_description: 'InTransit',
          cp_id: 3,
          location: 'CITY-HUB',
          remark: 'Bag scanned at Hub',
          status: '003',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        expectedDateOfDelivery: '2022-06-16',
        note: 'Bag scanned at Hub',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'InTransit',
        stageGroup: 'InTransit',
      });
    });

    it('should process the event of clickPost status code 6 (OutForDelivery)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'delhivery',
          additional: {
            account_code: 'delhivery',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 4,
              clickpost_status_bucket_description: 'Out for delivery',
              clickpost_status_code: 6,
              clickpost_status_description: 'OutForDelivery',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Call placed to consignee',
              status: 'Dispatched',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 6,
          clickpost_status_description: 'OutForDelivery',
          cp_id: 4,
          location: 'CITY-HUB',
          remark: 'Call placed to consignee',
          status: 'Dispatched',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: '2022-06-16',
        note: 'Call placed to consignee',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'OutForDelivery',
        stageGroup: 'OutForDelivery',
      });
    });

    it('should process the event of clickPost status code 8 (Delivered)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'delhivery',
          additional: {
            account_code: 'delhivery',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 6,
              clickpost_status_bucket_description: 'Delivered',
              clickpost_status_code: 8,
              clickpost_status_description: 'Delivered',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Delivered to consignee',
              status: 'Delivered',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 8,
          clickpost_status_description: 'Delivered',
          cp_id: 4,
          location: 'CITY-HUB',
          remark: 'Delivered to consignee',
          status: 'Delivered',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: '2022-06-16',
        note: 'Delivered to consignee',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'Delivered',
        stageGroup: 'Delivered',
      });
    });

    it('should process the event of clickPost status code 9 (FailedDelivery)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'delhivery',
          additional: {
            account_code: 'delhivery',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 5,
              clickpost_status_bucket_description: 'Failed delivery',
              clickpost_status_code: 9,
              clickpost_status_description: 'FailedDelivery',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Consignee Unavailable',
              status: 'Pending',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 9,
          clickpost_status_description: 'FailedDelivery',
          cp_id: 4,
          location: 'CITY-HUB',
          remark: 'Consignee Unavailable',
          status: 'Pending',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: '2022-06-16',
        note: 'Consignee Unavailable',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'DeliveryFailed',
        stageGroup: 'FailedDelivery',
      });
    });

    it('should process the event of clickPost status code 11 (RTORequested)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 7,
              clickpost_status_bucket_description: 'Returned',
              clickpost_status_code: 11,
              clickpost_status_description: 'RTO-Requested',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Shipment RTO Lock',
              status: '77',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 11,
          clickpost_status_description: 'RTO-Requested',
          cp_id: 3,
          location: 'CITY-HUB',
          remark: 'Shipment RTO Lock',
          status: 'RTO-Requested',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        expectedDateOfDelivery: '2022-06-16',
        note: 'Shipment RTO Lock',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'RTORequested',
        stageGroup: 'Returned',
      });
    });

    it('should process the event of clickPost status code 12 (RTO)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 6,
              clickpost_status_bucket_description: 'Returned',
              clickpost_status_code: 12,
              clickpost_status_description: 'RTO-Marked',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: '777 - RTS - Return To Shipper',
              status: '777',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 12,
          clickpost_status_description: 'RTO-Marked',
          cp_id: 3,
          location: 'CITY-HUB',
          remark: '777 - RTS - Return To Shipper',
          status: '777',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        expectedDateOfDelivery: '2022-06-16',
        note: '777 - RTS - Return To Shipper',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'RTO',
        stageGroup: 'Returned',
      });
    });

    it('should process the event of clickPost status code 13 (RTOOutForDelivery)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'delhivery',
          additional: {
            account_code: 'delhivery',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 7,
              clickpost_status_bucket_description: 'Returned',
              clickpost_status_code: 13,
              clickpost_status_description: 'RTO-OutForDelivery',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: 'Out for delivery',
              status: 'Dispatched',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 13,
          clickpost_status_description: 'Returned',
          cp_id: 4,
          location: 'CITY-HUB',
          remark: 'Out for delivery',
          status: 'Dispatched',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        expectedDateOfDelivery: '2022-06-16',
        note: 'Out for delivery',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'RTOOutForDelivery',
        stageGroup: 'Returned',
      });
    });

    it('should process the event of clickPost status code 14 (RTODelivered)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 7,
              clickpost_status_bucket_description: 'Returned',
              clickpost_status_code: 14,
              clickpost_status_description: 'RTO-Delivered',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: '999 - Delivered',
              status: '999',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 14,
          clickpost_status_description: 'RTO-Delivered',
          cp_id: 3,
          location: 'CITY-HUB',
          remark: '999 - Delivered',
          status: '999',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        expectedDateOfDelivery: '2022-06-16',
        note: '999 - Delivered',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'RTODelivered',
        stageGroup: 'Returned',
      });
    });

    it('should process the event of clickPost status code 18 (ShipmentDelayed)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 3,
              clickpost_status_bucket_description: 'In transit',
              clickpost_status_code: 18,
              clickpost_status_description: 'ShipmentDelayed',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: '30401 - Network Delay',
              status: '30401',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 18,
          clickpost_status_description: 'ShipmentDelayed',
          cp_id: 4,
          location: 'CITY-HUB',
          remark: '30401 - Network Delay',
          status: '30401',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
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
        note: '30401 - Network Delay',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'ShipmentDelayed',
        stageGroup: 'InTransit',
      });
    });

    it('should process the event of clickPost status code 19 (ShipmentDelayed)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          account_code: 'ecomexpress',
          additional: {
            account_code: 'ecomexpress',
            courier_partner_edd: '2022-06-16',
            is_rvp: false,
            latest_status: {
              clickpost_city: 'City',
              clickpost_status_bucket: 3,
              clickpost_status_bucket_description: 'In transit',
              clickpost_status_code: 19,
              clickpost_status_description: 'ContactCustomerCare',
              location: 'CITY-HUB',
              reference_number: 'orderId',
              remark: '321 - Contact Customer Service',
              status: '321',
              timestamp: '2022-06-14T15:03:00Z',
            },
            order_id: 'orderId',
          },
          clickpost_city: 'City',
          clickpost_status_code: 19,
          clickpost_status_description: 'ContactCustomerCare',
          cp_id: 3,
          location: 'CITY-HUB',
          remark: '321 - Contact Customer Service',
          status: '321',
          timestamp: '2022-06-14T15:03:00Z',
          waybill: '1111111111',
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        expectedDateOfDelivery: '2022-06-16',
        note: '321 - Contact Customer Service',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'ShipmentDelayed',
        stageGroup: 'InTransit',
      });
    });

    it('should process the event of clickPost for track-order api', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        body: JSON.stringify({
          additional: {
            channel_name: 'App',
            cod_value: 857,
            courier_partner_edd: '2022-06-16',
            courier_partner_id: 207,
            courier_partner_name: 'Grow Simplee',
            currency_code: 'INR',
            dest_hub_inscan: false,
            drop_city: 'Bangalore',
            edd: { exact_sla: undefined, max_sla: 5, min_sla: 2 },
            invoice_number: 'invoiceNumber',
            is_stuck: false,
            order_id: 'orderId',
            pickup_city: 'Bengaluru',
            qc_images: [],
            rto_intransit_timestamp: undefined,
            sku: ['wYvUWChFfn', 'SZ0YmCVie3'],
          },
          latest_status: {
            clickpost_status_bucket: 6,
            clickpost_status_bucket_description: 'Delivered',
            clickpost_status_code: 8,
            clickpost_status_description: 'Delivered',
            created_at: '2022-09-28 02:36:38',
            location: '',
            remark: 'Delivered/RTO/Return',
            status: 'Delivered/RTO/Return',
            timestamp: '2022-09-28 15:16:14',
          },
          scans: [
            {
              checkpoint_id: 8535731117,
              clickpost_status_bucket: 6,
              clickpost_status_bucket_description: 'Delivered',
              clickpost_status_code: 8,
              clickpost_status_description: 'Delivered',
              created_at: '2022-09-28 11:20:47',
              location: '',
              remark: 'Delivered/RTO/Return',
              status: 'Delivered/RTO/Return',
              timestamp: '2022-09-28 15:16:14',
              tracking_id: 456126943,
            },
            {
              checkpoint_id: 8532187349,
              clickpost_status_bucket: 4,
              clickpost_status_bucket_description: 'Out for delivery',
              clickpost_status_code: 6,
              clickpost_status_description: 'OutForDelivery',
              created_at: '2022-09-28 09:23:57',
              location: '',
              remark: 'Last Mile',
              status: 'Last Mile',
              timestamp: '2022-09-28 13:45:42',
              tracking_id: 456126943,
            },
            {
              checkpoint_id: 8529506365,
              clickpost_status_bucket: 3,
              clickpost_status_bucket_description: 'In transit',
              clickpost_status_code: 5,
              clickpost_status_description: 'InTransit',
              created_at: '2022-09-28 07:25:01',
              location: '',
              remark: 'Last Mile',
              status: 'Last Mile',
              timestamp: '2022-09-28 12:44:18',
              tracking_id: 456126943,
            },
            {
              checkpoint_id: 8529506367,
              clickpost_status_bucket: 2,
              clickpost_status_bucket_description: 'Shipped',
              clickpost_status_code: 4,
              clickpost_status_description: 'PickedUp',
              created_at: '2022-09-28 07:25:01',
              location: '',
              remark: 'In-Transit',
              status: 'In-Transit',
              timestamp: '2022-09-28 12:31:54',
              tracking_id: 456126943,
            },
            {
              checkpoint_id: 8527265789,
              clickpost_status_bucket: 1,
              clickpost_status_bucket_description: 'Order placed',
              clickpost_status_code: 28,
              clickpost_status_description: 'Awb Registered',
              created_at: '2022-09-28 05:28:37',
              location: '',
              remark: 'Fulfilment',
              status: 'Fulfilment',
              timestamp: '2022-09-28 08:06:35',
              tracking_id: 456126943,
            },
          ],
          valid: true,
        }),
        method: 'POST',
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: undefined,
        courier: 'Grow Simplee',
        expectedDateOfDelivery: '2022-06-16',
        note: 'Delivered/RTO/Return',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stage: 'Delivered',
        stageGroup: 'Delivered',
      });
    });

    afterEach(() => callbackSpy.restore());
  });
});
