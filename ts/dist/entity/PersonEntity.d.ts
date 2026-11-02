import { DumabingoEntityBase } from '../DumabingoEntityBase';
import type { DumabingoSDK } from '../DumabingoSDK';
import type { Control } from '../types';
import type { Person, PersonListMatch } from '../DumabingoTypes';
declare class PersonEntity extends DumabingoEntityBase<Person> {
    constructor(client: DumabingoSDK, entopts: any);
    make(this: PersonEntity): PersonEntity;
    list(this: any, reqmatch?: PersonListMatch, ctrl?: Control): Promise<PersonEntity[]>;
}
export { PersonEntity };
