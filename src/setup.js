"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestConfig = exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const courier_tracking_1 = require("./courier-tracking");
const logger_1 = require("./courier-tracking/common/logger/logger");
const test_env_1 = require("./test-env");
const log = logger_1.logger.instance('TestServer');
const app = (0, express_1.default)();
exports.app = app;
// app.use(morgan('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json({ type: 'text/plain' }));
app.use(body_parser_1.default.json());
if (process.env.PORT) {
    test_env_1.Env.PORT = Number(process.env.PORT);
    test_env_1.Env.URL = `http://127.0.0.1:${test_env_1.Env.PORT}`;
}
const TestConfig = {
    callback: () => 0,
};
exports.TestConfig = TestConfig;
before(async () => {
    app.use('/api', new courier_tracking_1.CourierTrackingExpress({ ClickPost: { enable: true }, Delhivery: { enable: true } }, (update, body) => TestConfig.callback(update, body)).generateExpressRoutes());
    const server = http_1.default.createServer(app);
    await new Promise((resolve) => {
        server.listen(test_env_1.Env.PORT, '0.0.0.0', () => {
            log.info('Express server listening on %d, in test mode', test_env_1.Env.PORT);
            resolve();
        });
    });
});
//# sourceMappingURL=setup.js.map