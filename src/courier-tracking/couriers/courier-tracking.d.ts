import { TrackingUpdate } from '../../../typings/tracking-update';
export declare abstract class CourierTracking {
    webhook(body: Record<string, unknown>): TrackingUpdate;
    abstract transformBodyToTrackingUpdate(body: Record<string, unknown>): TrackingUpdate;
}
