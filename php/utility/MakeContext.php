<?php
declare(strict_types=1);

// Dumabingo SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DumabingoMakeContext
{
    public static function call(array $ctxmap, ?DumabingoContext $basectx): DumabingoContext
    {
        return new DumabingoContext($ctxmap, $basectx);
    }
}
