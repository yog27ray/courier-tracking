"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageMap = void 0;
const stage_1 = require("../../constant/stage");
const StageMap = {
    UD_NotPicked: stage_1.Stage.PickupFailed,
    UD_Manifested: stage_1.Stage.PickupPending,
    UD_Pending: stage_1.Stage.InTransit,
    UD_InTransit: stage_1.Stage.InTransit,
    UD_Dispatched: stage_1.Stage.OutForDelivery,
    UD_Delivered: stage_1.Stage.Delivered,
    RT_InTransit: stage_1.Stage.RTOInTransit,
    RT_Pending: stage_1.Stage.RTOInTransit,
    RT_Dispatched: stage_1.Stage.RTOOutForDelivery,
    RT_RTO: stage_1.Stage.RTODelivered,
};
exports.StageMap = StageMap;
//# sourceMappingURL=stage-map.js.map