"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierTracking = void 0;
class CourierTracking {
    webhook(body) {
        return this.transformBodyToTrackingUpdate(body);
    }
}
exports.CourierTracking = CourierTracking;
//# sourceMappingURL=courier-tracking.js.map