# Dumabingo SDK exists test

import pytest
from dumabingo_sdk import DumabingoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DumabingoSDK.test(None, None)
        assert testsdk is not None
