# Dumabingo SDK utility: make_context

from dumabingo_sdk.core.context import DumabingoContext


def make_context_util(ctxmap, basectx):
    return DumabingoContext(ctxmap, basectx)
