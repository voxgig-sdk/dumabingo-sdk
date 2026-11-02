import { DumabingoEntityBase } from '../DumabingoEntityBase';
import type { DumabingoSDK } from '../DumabingoSDK';
import type { Control } from '../types';
import type { LawDraft, LawDraftLoadMatch } from '../DumabingoTypes';
declare class LawDraftEntity extends DumabingoEntityBase<LawDraft> {
    constructor(client: DumabingoSDK, entopts: any);
    make(this: LawDraftEntity): LawDraftEntity;
    load(this: any, reqmatch?: LawDraftLoadMatch, ctrl?: Control): Promise<LawDraftEntity>;
}
export { LawDraftEntity };
