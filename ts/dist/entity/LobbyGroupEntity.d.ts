import { DumabingoEntityBase } from '../DumabingoEntityBase';
import type { DumabingoSDK } from '../DumabingoSDK';
import type { Control } from '../types';
import type { LobbyGroup, LobbyGroupListMatch } from '../DumabingoTypes';
declare class LobbyGroupEntity extends DumabingoEntityBase<LobbyGroup> {
    constructor(client: DumabingoSDK, entopts: any);
    make(this: LobbyGroupEntity): LobbyGroupEntity;
    list(this: any, reqmatch?: LobbyGroupListMatch, ctrl?: Control): Promise<LobbyGroupEntity[]>;
}
export { LobbyGroupEntity };
