import { Router } from 'express';
import { CourierTrackingCallback } from '../../typings/callback';
import { CourierTrackingConfig } from '../../typings/config';
export declare class CourierTrackingExpress {
    private readonly config;
    private readonly callback;
    private readonly courierTracking;
    constructor(config: CourierTrackingConfig, callback: CourierTrackingCallback);
    generateExpressRoutes(): Router;
}
