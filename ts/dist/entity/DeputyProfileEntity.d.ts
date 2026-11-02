import { DumabingoEntityBase } from '../DumabingoEntityBase';
import type { DumabingoSDK } from '../DumabingoSDK';
import type { Control } from '../types';
import type { DeputyProfile, DeputyProfileLoadMatch } from '../DumabingoTypes';
declare class DeputyProfileEntity extends DumabingoEntityBase<DeputyProfile> {
    constructor(client: DumabingoSDK, entopts: any);
    make(this: DeputyProfileEntity): DeputyProfileEntity;
    load(this: any, reqmatch?: DeputyProfileLoadMatch, ctrl?: Control): Promise<DeputyProfileEntity>;
}
export { DeputyProfileEntity };
