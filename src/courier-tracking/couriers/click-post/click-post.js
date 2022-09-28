"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickPost = void 0;
const courier_1 = require("../../constant/courier");
const stage_group_map_1 = require("../../constant/stage-group-map");
const courier_tracking_1 = require("../courier-tracking");
const courier_map_1 = require("./courier-map");
const stage_map_1 = require("./stage-map");
class ClickPost extends courier_tracking_1.CourierTracking {
    transformBodyToTrackingUpdate(body) {
        var _a, _b;
        if (body.latest_status) {
            return {
                awb: undefined,
                courier: courier_map_1.CourierMap[body.additional.courier_partner_id],
                note: body.latest_status.remark,
                orderId: body.additional.order_id,
                serviceProvider: courier_1.Courier.ClickPost,
                stageGroup: stage_group_map_1.StageGroupMap[stage_map_1.StageMap[body.latest_status.clickpost_status_code]],
                stage: stage_map_1.StageMap[body.latest_status.clickpost_status_code],
                expectedDateOfDelivery: (_a = body.additional) === null || _a === void 0 ? void 0 : _a.courier_partner_edd,
            };
        }
        return {
            awb: body.waybill,
            courier: courier_map_1.CourierMap[body.cp_id],
            note: body.remark,
            orderId: body.additional.order_id,
            serviceProvider: courier_1.Courier.ClickPost,
            stageGroup: stage_group_map_1.StageGroupMap[stage_map_1.StageMap[body.clickpost_status_code]],
            stage: stage_map_1.StageMap[body.clickpost_status_code],
            expectedDateOfDelivery: (_b = body.additional) === null || _b === void 0 ? void 0 : _b.courier_partner_edd,
        };
    }
}
exports.ClickPost = ClickPost;
//# sourceMappingURL=click-post.js.map