import { CourierTrackingConfig } from '../../typings/config';
import { TrackingUpdate } from '../../typings/tracking-update';
export declare class CourierTracking {
    constructor(config: CourierTrackingConfig);
    clickPostHandler(body: Record<string, unknown>): TrackingUpdate;
    delhiveryHandler(body: Record<string, unknown>): TrackingUpdate;
}
