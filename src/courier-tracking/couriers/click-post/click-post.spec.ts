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
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            order_id: 'orderId',
            latest_status: {
              status: '1340',
              clickpost_status_description: 'PickupPending',
              clickpost_status_bucket: 1,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Order Placed',
              remark: 'Pickup Failed, Shipment Not Handed Over',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 2,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: '1340',
          clickpost_city: 'City',
          clickpost_status_code: 2,
          clickpost_status_description: 'PickupPending',
          cp_id: 3,
          remark: 'Pickup Failed, Shipment Not Handed Over',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        note: 'Pickup Failed, Shipment Not Handed Over',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'OrderPlaced',
        stage: 'PickupPending',
        expectedDateOfDelivery: undefined,
      });
    });

    it('should process the event of clickPost status code 4 (PickedUp)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            order_id: 'orderId',
            latest_status: {
              status: '0011',
              clickpost_status_description: 'PickedUp',
              clickpost_status_bucket: 2,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Shipped',
              remark: 'Shipment Picked Up',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 4,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: '0011',
          clickpost_city: 'City',
          clickpost_status_code: 4,
          clickpost_status_description: 'PickedUp',
          cp_id: 3,
          remark: 'Shipment Picked Up',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        note: 'Shipment Picked Up',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'Dispatched',
        stage: 'PickedUp',
        expectedDateOfDelivery: undefined,
      });
    });

    it('should process the event of clickPost status code 5 (InTransit)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: '003',
              clickpost_status_description: 'InTransit',
              clickpost_status_bucket: 3,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'In transit',
              remark: 'Bag scanned at Hub',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 5,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: '003',
          clickpost_city: 'City',
          clickpost_status_code: 5,
          clickpost_status_description: 'InTransit',
          cp_id: 3,
          remark: 'Bag scanned at Hub',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        note: 'Bag scanned at Hub',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'InTransit',
        stage: 'InTransit',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 6 (OutForDelivery)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: 'Dispatched',
              clickpost_status_description: 'OutForDelivery',
              clickpost_status_bucket: 4,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Out for delivery',
              remark: 'Call placed to consignee',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 6,
            },
            is_rvp: false,
            account_code: 'delhivery',
          },
          status: 'Dispatched',
          clickpost_city: 'City',
          clickpost_status_code: 6,
          clickpost_status_description: 'OutForDelivery',
          cp_id: 4,
          remark: 'Call placed to consignee',
          account_code: 'delhivery',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        note: 'Call placed to consignee',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'OutForDelivery',
        stage: 'OutForDelivery',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 8 (Delivered)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: 'Delivered',
              clickpost_status_description: 'Delivered',
              clickpost_status_bucket: 6,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Delivered',
              remark: 'Delivered to consignee',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 8,
            },
            is_rvp: false,
            account_code: 'delhivery',
          },
          status: 'Delivered',
          clickpost_city: 'City',
          clickpost_status_code: 8,
          clickpost_status_description: 'Delivered',
          cp_id: 4,
          remark: 'Delivered to consignee',
          account_code: 'delhivery',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        note: 'Delivered to consignee',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'Delivered',
        stage: 'Delivered',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 9 (FailedDelivery)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: 'Pending',
              clickpost_status_description: 'FailedDelivery',
              clickpost_status_bucket: 5,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Failed delivery',
              remark: 'Consignee Unavailable',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 9,
            },
            is_rvp: false,
            account_code: 'delhivery',
          },
          status: 'Pending',
          clickpost_city: 'City',
          clickpost_status_code: 9,
          clickpost_status_description: 'FailedDelivery',
          cp_id: 4,
          remark: 'Consignee Unavailable',
          account_code: 'delhivery',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        note: 'Consignee Unavailable',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'FailedDelivery',
        stage: 'DeliveryFailed',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 11 (RTORequested)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: '77',
              clickpost_status_description: 'RTO-Requested',
              clickpost_status_bucket: 7,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Returned',
              remark: 'Shipment RTO Lock',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 11,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: 'RTO-Requested',
          clickpost_city: 'City',
          clickpost_status_code: 11,
          clickpost_status_description: 'RTO-Requested',
          cp_id: 3,
          remark: 'Shipment RTO Lock',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        note: 'Shipment RTO Lock',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'Returned',
        stage: 'RTORequested',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 12 (RTO)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: '777',
              clickpost_status_description: 'RTO-Marked',
              clickpost_status_bucket: 6,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Returned',
              remark: '777 - RTS - Return To Shipper',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 12,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: '777',
          clickpost_city: 'City',
          clickpost_status_code: 12,
          clickpost_status_description: 'RTO-Marked',
          cp_id: 3,
          remark: '777 - RTS - Return To Shipper',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        note: '777 - RTS - Return To Shipper',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'Returned',
        stage: 'RTO',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 13 (RTOOutForDelivery)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: 'Dispatched',
              clickpost_status_description: 'RTO-OutForDelivery',
              clickpost_status_bucket: 7,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Returned',
              remark: 'Out for delivery',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 13,
            },
            is_rvp: false,
            account_code: 'delhivery',
          },
          status: 'Dispatched',
          clickpost_city: 'City',
          clickpost_status_code: 13,
          clickpost_status_description: 'Returned',
          cp_id: 4,
          remark: 'Out for delivery',
          account_code: 'delhivery',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        note: 'Out for delivery',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'Returned',
        stage: 'RTOOutForDelivery',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 14 (RTODelivered)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: '999',
              clickpost_status_description: 'RTO-Delivered',
              clickpost_status_bucket: 7,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'Returned',
              remark: '999 - Delivered',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 14,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: '999',
          clickpost_city: 'City',
          clickpost_status_code: 14,
          clickpost_status_description: 'RTO-Delivered',
          cp_id: 3,
          remark: '999 - Delivered',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        note: '999 - Delivered',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'Returned',
        stage: 'RTODelivered',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost status code 18 (ShipmentDelayed)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            order_id: 'orderId',
            latest_status: {
              status: '30401',
              clickpost_status_description: 'ShipmentDelayed',
              clickpost_status_bucket: 3,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'In transit',
              remark: '30401 - Network Delay',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 18,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: '30401',
          clickpost_city: 'City',
          clickpost_status_code: 18,
          clickpost_status_description: 'ShipmentDelayed',
          cp_id: 4,
          remark: '30401 - Network Delay',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Delhivery',
        note: '30401 - Network Delay',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'InTransit',
        stage: 'ShipmentDelayed',
        expectedDateOfDelivery: undefined,
      });
    });

    it('should process the event of clickPost status code 19 (ShipmentDelayed)', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          location: 'CITY-HUB',
          additional: {
            courier_partner_edd: '2022-06-16',
            order_id: 'orderId',
            latest_status: {
              status: '321',
              clickpost_status_description: 'ContactCustomerCare',
              clickpost_status_bucket: 3,
              reference_number: 'orderId',
              clickpost_status_bucket_description: 'In transit',
              remark: '321 - Contact Customer Service',
              timestamp: '2022-06-14T15:03:00Z',
              location: 'CITY-HUB',
              clickpost_city: 'City',
              clickpost_status_code: 19,
            },
            is_rvp: false,
            account_code: 'ecomexpress',
          },
          status: '321',
          clickpost_city: 'City',
          clickpost_status_code: 19,
          clickpost_status_description: 'ContactCustomerCare',
          cp_id: 3,
          remark: '321 - Contact Customer Service',
          account_code: 'ecomexpress',
          waybill: '1111111111',
          timestamp: '2022-06-14T15:03:00Z',
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: '1111111111',
        courier: 'Ecom Express',
        note: '321 - Contact Customer Service',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'InTransit',
        stage: 'ShipmentDelayed',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    it('should process the event of clickPost for track-order api', async () => {
      const response = await fetch(`${Env.URL}/api/clickpost/webhook`, {
        method: 'POST',
        body: JSON.stringify({
          latest_status: {
            timestamp: '2022-09-28 15:16:14',
            location: '',
            remark: 'Delivered/RTO/Return',
            status: 'Delivered/RTO/Return',
            clickpost_status_code: 8,
            clickpost_status_description: 'Delivered',
            clickpost_status_bucket: 6,
            clickpost_status_bucket_description: 'Delivered',
            created_at: '2022-09-28 02:36:38',
          },
          scans: [
            {
              timestamp: '2022-09-28 15:16:14',
              location: '',
              remark: 'Delivered/RTO/Return',
              status: 'Delivered/RTO/Return',
              clickpost_status_code: 8,
              checkpoint_id: 8535731117,
              tracking_id: 456126943,
              created_at: '2022-09-28 11:20:47',
              clickpost_status_description: 'Delivered',
              clickpost_status_bucket: 6,
              clickpost_status_bucket_description: 'Delivered',
            },
            {
              timestamp: '2022-09-28 13:45:42',
              location: '',
              remark: 'Last Mile',
              status: 'Last Mile',
              clickpost_status_code: 6,
              checkpoint_id: 8532187349,
              tracking_id: 456126943,
              created_at: '2022-09-28 09:23:57',
              clickpost_status_description: 'OutForDelivery',
              clickpost_status_bucket: 4,
              clickpost_status_bucket_description: 'Out for delivery',
            },
            {
              timestamp: '2022-09-28 12:44:18',
              location: '',
              remark: 'Last Mile',
              status: 'Last Mile',
              clickpost_status_code: 5,
              checkpoint_id: 8529506365,
              tracking_id: 456126943,
              created_at: '2022-09-28 07:25:01',
              clickpost_status_description: 'InTransit',
              clickpost_status_bucket: 3,
              clickpost_status_bucket_description: 'In transit',
            },
            {
              timestamp: '2022-09-28 12:31:54',
              location: '',
              remark: 'In-Transit',
              status: 'In-Transit',
              clickpost_status_code: 4,
              checkpoint_id: 8529506367,
              tracking_id: 456126943,
              created_at: '2022-09-28 07:25:01',
              clickpost_status_description: 'PickedUp',
              clickpost_status_bucket: 2,
              clickpost_status_bucket_description: 'Shipped',
            },
            {
              timestamp: '2022-09-28 08:06:35',
              location: '',
              remark: 'Fulfilment',
              status: 'Fulfilment',
              clickpost_status_code: 28,
              checkpoint_id: 8527265789,
              tracking_id: 456126943,
              created_at: '2022-09-28 05:28:37',
              clickpost_status_description: 'Awb Registered',
              clickpost_status_bucket: 1,
              clickpost_status_bucket_description: 'Order placed',
            },
          ],
          valid: true,
          additional: {
            is_stuck: false,
            order_id: 'orderId',
            sku: ['wYvUWChFfn', 'SZ0YmCVie3'],
            edd: { max_sla: 5, min_sla: 2, exact_sla: undefined },
            invoice_number: 'invoiceNumber',
            pickup_city: 'Bengaluru',
            drop_city: 'Bangalore',
            cod_value: 857,
            currency_code: 'INR',
            courier_partner_edd: '2022-06-16',
            channel_name: 'App',
            qc_images: [],
            dest_hub_inscan: false,
            rto_intransit_timestamp: undefined,
            courier_partner_id: 207,
            courier_partner_name: 'Grow Simplee',
          },
        }),
      });
      expect(response.status).to.equal(200);
      expect(callbackSpy.calledOnce).to.be.true;
      expect(callbackSpy.args[0].length).to.equal(2);
      expect(callbackSpy.args[0][0]).to.deep.equal({
        awb: undefined,
        courier: 'Grow Simplee',
        note: 'Delivered/RTO/Return',
        orderId: 'orderId',
        serviceProvider: 'ClickPost',
        stageGroup: 'Delivered',
        stage: 'Delivered',
        expectedDateOfDelivery: '2022-06-16',
      });
    });

    afterEach(() => callbackSpy.restore());
  });
});
