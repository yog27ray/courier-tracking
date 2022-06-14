import { TrackingUpdate } from '../../../typings/tracking-update';

export abstract class CourierTracking {
  webhook(body: Record<string, unknown>): TrackingUpdate {
    return this.transformBodyToTrackingUpdate(body);
  }

  abstract transformBodyToTrackingUpdate(body: Record<string, unknown>): TrackingUpdate;
}
