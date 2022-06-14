import express, { Express, Router, Request, Response } from 'express';
import { CourierTrackingConfig } from '../../typings/config';
import { CourierTrackingCallback } from '../../typings/callback';
import { CourierTracking } from './courier-tracking';

export class CourierTrackingExpress {
  private readonly callback: CourierTrackingCallback;
  private readonly courierTracking: CourierTracking;

  constructor(app: Express, config: CourierTrackingConfig, callback: CourierTrackingCallback, pathPrefix?: string) {
    this.callback = callback
    this.courierTracking = new CourierTracking(config);
    this.setUpWithExpressApp(app, config, pathPrefix);
  }

  setUpWithExpressApp(app: Express, config: CourierTrackingConfig, pathPrefix: string = '/'): void {
    const router = this.generateExpressRoutes(config);
    app.use(pathPrefix, router)
  }

  private generateExpressRoutes(config: CourierTrackingConfig): Router {
    const router = express.Router();
    if (config.ClickPost?.enable) {
      router.post('/clickpost/webhook', (req: Request, res: Response) => {
        this.callback(this.courierTracking.clickPostHandler(req.body), req.body);
        res.send('success');
      })
    }
    if (config.Delhivery?.enable) {
      router.post('/delhivery/webhook', (req: Request, res: Response) => {
        this.callback(this.courierTracking.delhiveryHandler(req.body), req.body);
        res.send('success');
      })
    }
    return router;
  }
}
