<?php

namespace App\Data;

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

    public static function fromModel(\App\Models\Feed $feed): self
    {
        return new self(
            id: $feed->id,
            name: $feed->name,
            user_id: $feed->user_id,
            user: $feed->relationLoaded('user') ? $feed->user : null, // Include user if loaded
            selected: $feed->selected,
            created_at: $feed->created_at->toDateTimeString(),
            updated_at: $feed->updated_at->toDateTimeString()
        );
    }
}
