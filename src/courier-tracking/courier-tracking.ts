import { CourierTrackingConfig } from '../../typings/config';
import { TrackingUpdate } from '../../typings/tracking-update';
import { ClickPost } from './couriers/click-post/click-post';
import { Delhivery } from './couriers/delhivery/delhivery';

let clickPost: ClickPost;
let delhivery: Delhivery;

export class CourierTracking {
  constructor(config: CourierTrackingConfig) {
    if (config.ClickPost?.enable) {
      clickPost = new ClickPost();
    }
    if (config.Delhivery?.enable) {
      delhivery = new Delhivery();
    }
  }

  clickPostHandler(body: Record<string, unknown>): TrackingUpdate {
    return clickPost.webhook(body);
  }

  delhiveryHandler(body: Record<string, unknown>): TrackingUpdate {
    return delhivery.webhook(body);
  }
}
