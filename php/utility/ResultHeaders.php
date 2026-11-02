<?php
declare(strict_types=1);

// Dumabingo SDK utility: result_headers

class DumabingoResultHeaders
{
    public static function call(DumabingoContext $ctx): ?DumabingoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
