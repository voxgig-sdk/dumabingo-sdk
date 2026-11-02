# Dumabingo SDK feature factory

from dumabingo_sdk.feature.base_feature import DumabingoBaseFeature
from dumabingo_sdk.feature.ratelimit_feature import DumabingoRatelimitFeature
from dumabingo_sdk.feature.retry_feature import DumabingoRetryFeature
from dumabingo_sdk.feature.test_feature import DumabingoTestFeature
from dumabingo_sdk.feature.timeout_feature import DumabingoTimeoutFeature


_FEATURES = {
    "base": lambda: DumabingoBaseFeature(),
    "ratelimit": lambda: DumabingoRatelimitFeature(),
    "retry": lambda: DumabingoRetryFeature(),
    "test": lambda: DumabingoTestFeature(),
    "timeout": lambda: DumabingoTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
