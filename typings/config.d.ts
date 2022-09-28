import { Courier } from '../src/courier-tracking/constant/courier';
export declare interface CourierTrackingConfig {
    [Courier.ClickPost]?: {
        enable: true;
    };
    [Courier.Delhivery]?: {
        enable: true;
    };
}
