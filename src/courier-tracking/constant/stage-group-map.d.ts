import { ValueOf } from '../../../typings/common';
import { Group } from './group';
import { Stage } from './stage';
declare const StageGroupMap: {
    [key in ValueOf<typeof Stage>]: ValueOf<typeof Group>;
};
export { StageGroupMap };
