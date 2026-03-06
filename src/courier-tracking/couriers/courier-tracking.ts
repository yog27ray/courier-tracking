import { TrackingUpdate } from '../../../typings/tracking-update';

export abstract class CourierTracking {
  abstract transformBodyToTrackingUpdate(body: Record<string, unknown>): TrackingUpdate;

  webhook(body: Record<string, unknown>): TrackingUpdate {
    return this.transformBodyToTrackingUpdate(body);
  }
}
