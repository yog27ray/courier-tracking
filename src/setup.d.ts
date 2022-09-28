import { Express } from 'express';
import { CourierTrackingCallback } from '../typings/callback';
declare const app: Express;
declare const TestConfig: {
    callback: CourierTrackingCallback;
};
export { app, TestConfig };
