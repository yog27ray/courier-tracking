"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const node_fetch_1 = __importDefault(require("node-fetch"));
const sinon_1 = __importDefault(require("sinon"));
const setup_1 = require("../../../setup");
const test_env_1 = require("../../../test-env");
describe('Delhivery', () => {
    context('webhook handler at different updates', () => {
        let callbackSpy;
        beforeEach(() => {
            callbackSpy = sinon_1.default.spy(setup_1.TestConfig, 'callback');
        });
        it('should process the event of delhivery status UD (In Transit)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'In Transit',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'UD',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Bag Received at Facility',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Bag Received at Facility',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'InTransit',
                stageGroup: 'InTransit',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status UD (Pending)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'Pending',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'UD',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Delayed due to weather conditions',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Delayed due to weather conditions',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'InTransit',
                stageGroup: 'InTransit',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status UD (Dispatched)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'Dispatched',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'UD',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Call placed to consignee',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Call placed to consignee',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'OutForDelivery',
                stageGroup: 'OutForDelivery',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status UD (Manifested)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'Manifested',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'UD',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Pickup scheduled',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Pickup scheduled',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'PickupPending',
                stageGroup: 'OrderPlaced',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status UD (Not Picked)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'Not Picked',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'UD',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Package not picked/received from client',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Package not picked/received from client',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'PickupFailed',
                stageGroup: 'OrderPlaced',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status RT (In Transit)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'In Transit',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'RT',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Added to Bag',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Added to Bag',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'RTOInTransit',
                stageGroup: 'Returned',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status RT (Dispatched)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'Dispatched',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'RT',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Dispatched for RTO',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Dispatched for RTO',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'RTOOutForDelivery',
                stageGroup: 'Returned',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status RT (Pending)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'Pending',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'RT',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'Shipment Received at Facility',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'Shipment Received at Facility',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'RTOInTransit',
                stageGroup: 'Returned',
                expectedDateOfDelivery: undefined,
            });
        });
        it('should process the event of delhivery status RT (RTO)', async () => {
            const response = await (0, node_fetch_1.default)(`${test_env_1.Env.URL}/api/delhivery/webhook`, {
                method: 'POST',
                body: JSON.stringify({
                    Shipment: {
                        AWB: '1111111111',
                        ReferenceNo: 'orderId',
                        PickUpDate: '2022-06-06T17:57:51',
                        Sortcode: 'JJR/PLC',
                        NSLCode: 'X-ILL1F',
                        Status: {
                            Status: 'RTO',
                            StatusDateTime: '2022-06-14T21:27:29.301000',
                            StatusType: 'RT',
                            StatusLocation: 'Gurgaon_Tauru_GW (Haryana)',
                            Instructions: 'RTO Delivered',
                        },
                    },
                }),
            });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(callbackSpy.calledOnce).to.be.true;
            (0, chai_1.expect)(callbackSpy.args[0].length).to.equal(2);
            (0, chai_1.expect)(callbackSpy.args[0][0]).to.deep.equal({
                awb: '1111111111',
                courier: 'Delhivery',
                note: 'RTO Delivered',
                orderId: 'orderId',
                serviceProvider: 'Delhivery',
                stage: 'RTODelivered',
                stageGroup: 'Returned',
                expectedDateOfDelivery: undefined,
            });
        });
        afterEach(() => callbackSpy.restore());
    });
});
//# sourceMappingURL=delhivery.spec.js.map