"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delhivery = void 0;
const courier_1 = require("../../constant/courier");
const stage_group_map_1 = require("../../constant/stage-group-map");
const courier_tracking_1 = require("../courier-tracking");
const stage_map_1 = require("./stage-map");
class Delhivery extends courier_tracking_1.CourierTracking {
    transformBodyToTrackingUpdate(body) {
        const { AWB, ReferenceNo, Status: { Instructions, Status, StatusType } } = body.Shipment;
        const stage = `${StatusType}_${Status}`.replace(/ /g, '');
        return {
            awb: AWB,
            courier: courier_1.Courier.Delhivery,
            note: Instructions,
            orderId: ReferenceNo,
            serviceProvider: courier_1.Courier.Delhivery,
            stage: stage_map_1.StageMap[stage],
            stageGroup: stage_group_map_1.StageGroupMap[stage_map_1.StageMap[stage]],
            expectedDateOfDelivery: undefined,
        };
    }
}
exports.Delhivery = Delhivery;
//# sourceMappingURL=delhivery.js.map