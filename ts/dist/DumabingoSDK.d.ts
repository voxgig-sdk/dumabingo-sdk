import { DeputyProfileEntity } from './entity/DeputyProfileEntity';
import { LawDraftEntity } from './entity/LawDraftEntity';
import { LobbyGroupEntity } from './entity/LobbyGroupEntity';
import { LobbyistEntity } from './entity/LobbyistEntity';
import { PersonEntity } from './entity/PersonEntity';
import { SenatorProfileEntity } from './entity/SenatorProfileEntity';
import { SuccessRateEntity } from './entity/SuccessRateEntity';
export type * from './DumabingoTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DumabingoEntityBase } from './DumabingoEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class DumabingoSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    DeputyProfile(entopts?: Record<string, any>): DeputyProfileEntity;
    LawDraft(entopts?: Record<string, any>): LawDraftEntity;
    LobbyGroup(entopts?: Record<string, any>): LobbyGroupEntity;
    Lobbyist(entopts?: Record<string, any>): LobbyistEntity;
    Person(entopts?: Record<string, any>): PersonEntity;
    SenatorProfile(entopts?: Record<string, any>): SenatorProfileEntity;
    SuccessRate(entopts?: Record<string, any>): SuccessRateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DumabingoSDK;
    tester(testopts?: any, sdkopts?: any): DumabingoSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DumabingoSDK;
export { stdutil, config, BaseFeature, DumabingoEntityBase, DumabingoSDK, SDK, };
export type { DirectResult };
