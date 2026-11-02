import { DumabingoEntityBase } from '../DumabingoEntityBase';
import type { DumabingoSDK } from '../DumabingoSDK';
import type { Control } from '../types';
import type { Lobbyist, LobbyistListMatch } from '../DumabingoTypes';
declare class LobbyistEntity extends DumabingoEntityBase<Lobbyist> {
    constructor(client: DumabingoSDK, entopts: any);
    make(this: LobbyistEntity): LobbyistEntity;
    list(this: any, reqmatch?: LobbyistListMatch, ctrl?: Control): Promise<LobbyistEntity[]>;
}
export { LobbyistEntity };
