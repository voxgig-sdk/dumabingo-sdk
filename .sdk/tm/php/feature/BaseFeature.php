<?php
declare(strict_types=1);

// Dumabingo SDK base feature

class DumabingoBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DumabingoContext $ctx, array $options): void {}
    public function PostConstruct(DumabingoContext $ctx): void {}
    public function PostConstructEntity(DumabingoContext $ctx): void {}
    public function SetData(DumabingoContext $ctx): void {}
    public function GetData(DumabingoContext $ctx): void {}
    public function GetMatch(DumabingoContext $ctx): void {}
    public function SetMatch(DumabingoContext $ctx): void {}
    public function PrePoint(DumabingoContext $ctx): void {}
    public function PreSpec(DumabingoContext $ctx): void {}
    public function PreRequest(DumabingoContext $ctx): void {}
    public function PreResponse(DumabingoContext $ctx): void {}
    public function PreResult(DumabingoContext $ctx): void {}
    public function PreDone(DumabingoContext $ctx): void {}
    public function PreUnexpected(DumabingoContext $ctx): void {}
}
