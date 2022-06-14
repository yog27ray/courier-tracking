import { ValueOf } from '../../../../typings/common';
import { Courier } from '../../constant/courier';

const CourierMap: { [key: number]: ValueOf<typeof Courier> } = {
  3: Courier.EcomExpress,
  4: Courier.Delhivery,
  5: Courier.BlueDart,
  55: Courier.Ekart,
};

export { CourierMap };
