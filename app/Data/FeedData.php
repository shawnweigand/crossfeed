<?php

namespace App\Data;

use App\Models\Feed;
use App\Models\User;
use Spatie\LaravelData\Data;

class FeedData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public int $user_id,
        public ?User $user = null, // Include related user if needed
        public bool $selected,
        public string $created_at,
        public string $updated_at
    ) {
    }

    public static function fromModel(Feed $feed): self
    {
        return new self(
            $feed->id,
            $feed->name,
            $feed->user_id,
            $feed->relationLoaded('user') ? $feed->user : null, // Include user if loaded
            $feed->selected,
            $feed->created_at->toDateTimeString(),
            $feed->updated_at->toDateTimeString()
        );
    }
}
