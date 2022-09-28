"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierTrackingExpress = void 0;
const express_1 = __importDefault(require("express"));
const courier_tracking_1 = require("./courier-tracking");
class CourierTrackingExpress {
    constructor(config, callback) {
        this.config = config;
        this.callback = callback;
        this.courierTracking = new courier_tracking_1.CourierTracking(config);
    }
    generateExpressRoutes() {
        var _a, _b;
        const router = express_1.default.Router();
        if ((_a = this.config.ClickPost) === null || _a === void 0 ? void 0 : _a.enable) {
            router.post('/clickpost/webhook', (req, res) => {
                const { body } = req;
                this.callback(this.courierTracking.clickPostHandler(body), body);
                res.send('success');
            });
        }
        if ((_b = this.config.Delhivery) === null || _b === void 0 ? void 0 : _b.enable) {
            router.post('/delhivery/webhook', (req, res) => {
                const { body } = req;
                this.callback(this.courierTracking.delhiveryHandler(body), body);
                res.send('success');
            });
        }
        return router;
    }
}
exports.CourierTrackingExpress = CourierTrackingExpress;
//# sourceMappingURL=courier-tracking-express.js.map