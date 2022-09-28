"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierTracking = void 0;
const click_post_1 = require("./couriers/click-post/click-post");
const delhivery_1 = require("./couriers/delhivery/delhivery");
let clickPost;
let delhivery;
class CourierTracking {
    constructor(config) {
        var _a, _b;
        if ((_a = config.ClickPost) === null || _a === void 0 ? void 0 : _a.enable) {
            clickPost = new click_post_1.ClickPost();
        }
        if ((_b = config.Delhivery) === null || _b === void 0 ? void 0 : _b.enable) {
            delhivery = new delhivery_1.Delhivery();
        }
    }
    clickPostHandler(body) {
        return clickPost.webhook(body);
    }
    delhiveryHandler(body) {
        return delhivery.webhook(body);
    }
}
exports.CourierTracking = CourierTracking;
//# sourceMappingURL=courier-tracking.js.map