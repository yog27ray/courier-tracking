import { ValueOf } from '../../../../typings/common';
import { Courier } from '../../constant/courier';

const CourierMap: { [key: number]: ValueOf<typeof Courier> } = {
  1: Courier.Fedex,
  2: Courier.Aramex,
  3: Courier.EcomExpress,
  4: Courier.Delhivery,
  5: Courier.BlueDart,
  6: Courier.XpressBees,
  8: Courier.DTDC,
  9: Courier.ShadowFax,
  22: Courier.DotZot,
  30: Courier.Pickrr,
  55: Courier.Ekart,
  105: Courier.ShipRocket,
  118: Courier.Dunzo,
  129: Courier.BlueDart,
  212: Courier.AmazonTransportService,
  250: Courier.Smartr,
  207: Courier.GrowSimplee,
  1001: Courier.IndiaPost,
};

export { CourierMap };
