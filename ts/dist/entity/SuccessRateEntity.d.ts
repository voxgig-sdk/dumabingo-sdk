import { DumabingoEntityBase } from '../DumabingoEntityBase';
import type { DumabingoSDK } from '../DumabingoSDK';
import type { Control } from '../types';
import type { SuccessRate, SuccessRateLoadMatch } from '../DumabingoTypes';
declare class SuccessRateEntity extends DumabingoEntityBase<SuccessRate> {
    constructor(client: DumabingoSDK, entopts: any);
    make(this: SuccessRateEntity): SuccessRateEntity;
    load(this: any, reqmatch?: SuccessRateLoadMatch, ctrl?: Control): Promise<SuccessRateEntity>;
}
export { SuccessRateEntity };
