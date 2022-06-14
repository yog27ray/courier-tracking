import bodyParser from 'body-parser';
import express, { Express } from 'express';
import http from 'http';
// import morgan from 'morgan';
import { CourierTrackingCallback } from '../typings/callback';
import { TrackingUpdate } from '../typings/tracking-update';
import { CourierTrackingExpress } from './courier-tracking';
import { logger } from './courier-tracking/common/logger/logger';
import { Env } from './test-env';

const log = logger.instance('TestServer');

const app: Express = express();
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bodyParser.json());

if (process.env.PORT) {
  Env.PORT = Number(process.env.PORT);
  Env.URL = `http://127.0.0.1:${Env.PORT}`;
}
const TestConfig: { callback: CourierTrackingCallback } = {
  callback: () => 0,
};

before(async () => {
  app.use('/api', new CourierTrackingExpress(
    { ClickPost: { enable: true }, Delhivery: { enable: true } },
    (update: TrackingUpdate, body: Record<string, unknown>) => TestConfig.callback(update, body)).generateExpressRoutes());
  const server = http.createServer(app);
  await new Promise((resolve: (item?: undefined) => void) => {
    server.listen(Env.PORT, '0.0.0.0', () => {
      log.info('Express server listening on %d, in test mode', Env.PORT);
      resolve();
    });
  });
});

// Expose app
export { app, TestConfig };
