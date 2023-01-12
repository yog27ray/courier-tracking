import { ValueOf } from '../../../../typings/common';
import { Courier } from '../../constant/courier';

const CourierMap: { [key: number]: ValueOf<typeof Courier> } = {
  3: Courier.EcomExpress,
  4: Courier.Delhivery,
  5: Courier.BlueDart,
  30: Courier.Pickrr,
  55: Courier.Ekart,
  212: Courier.AmazonTransportService,
  250: Courier.Smartr,
  207: Courier.GrowSimplee,
};

export { CourierMap };
