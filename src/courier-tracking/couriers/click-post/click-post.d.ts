import { TrackingUpdate } from '../../../../typings/tracking-update';
import { CourierTracking } from '../courier-tracking';
export declare class ClickPost extends CourierTracking {
    transformBodyToTrackingUpdate(body: Record<string, unknown>): TrackingUpdate;
}
