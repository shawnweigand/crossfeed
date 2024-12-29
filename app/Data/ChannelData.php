<?php

namespace App\Data;

use App\Enums\SourceTypeEnum;
use App\Models\Channel;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Data;

class ChannelData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $source_id,
        #[Enum(SourceTypeEnum::class)]
        public string $type,
        public string $description,
        public string $thumbnail,
        public string $link,
        public ?string $publisher,
        public string $created_at,
        public string $updated_at
    ) {}

    public static function fromModel(Channel $channel): self
    {
        return new self(
            $channel->id,
            $channel->name,
            $channel->source_id,
            $channel->type,
            $channel->description,
            $channel->thumbnail,
            $channel->link,
            $channel->publisher,
            $channel->created_at->toDateTimeString(),
            $channel->updated_at->toDateTimeString()
        );
    }
}
