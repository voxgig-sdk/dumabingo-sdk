package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDeputyProfileEntityFunc func(client *DumabingoSDK, entopts map[string]any) DumabingoEntityBase

var NewLawDraftEntityFunc func(client *DumabingoSDK, entopts map[string]any) DumabingoEntityBase

var NewLobbyGroupEntityFunc func(client *DumabingoSDK, entopts map[string]any) DumabingoEntityBase

var NewLobbyistEntityFunc func(client *DumabingoSDK, entopts map[string]any) DumabingoEntityBase

var NewPersonEntityFunc func(client *DumabingoSDK, entopts map[string]any) DumabingoEntityBase

var NewSenatorProfileEntityFunc func(client *DumabingoSDK, entopts map[string]any) DumabingoEntityBase

var NewSuccessRateEntityFunc func(client *DumabingoSDK, entopts map[string]any) DumabingoEntityBase

