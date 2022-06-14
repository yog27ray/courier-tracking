import express, { Request, Response, Router } from 'express';
import { CourierTrackingCallback } from '../../typings/callback';
import { CourierTrackingConfig } from '../../typings/config';
import { CourierTracking } from './courier-tracking';

export class CourierTrackingExpress {
  private readonly callback: CourierTrackingCallback;

  private readonly courierTracking: CourierTracking;

  constructor(private readonly config: CourierTrackingConfig, callback: CourierTrackingCallback) {
    this.callback = callback;
    this.courierTracking = new CourierTracking(config);
  }

  generateExpressRoutes(): Router {
    const router = express.Router();
    if (this.config.ClickPost?.enable) {
      router.post('/clickpost/webhook', (req: Request, res: Response) => {
        const { body } = req as { body: Record<string, unknown>; };
        this.callback(this.courierTracking.clickPostHandler(body), body);
        res.send('success');
      });
    }
    if (this.config.Delhivery?.enable) {
      router.post('/delhivery/webhook', (req: Request, res: Response) => {
        const { body } = req as { body: Record<string, unknown>; };
        this.callback(this.courierTracking.delhiveryHandler(body), body);
        res.send('success');
      });
    }
    return router;
  }
}
