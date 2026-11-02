import { DumabingoEntityBase } from '../DumabingoEntityBase';
import type { DumabingoSDK } from '../DumabingoSDK';
import type { Control } from '../types';
import type { SenatorProfile, SenatorProfileLoadMatch } from '../DumabingoTypes';
declare class SenatorProfileEntity extends DumabingoEntityBase<SenatorProfile> {
    constructor(client: DumabingoSDK, entopts: any);
    make(this: SenatorProfileEntity): SenatorProfileEntity;
    load(this: any, reqmatch?: SenatorProfileLoadMatch, ctrl?: Control): Promise<SenatorProfileEntity>;
}
export { SenatorProfileEntity };
