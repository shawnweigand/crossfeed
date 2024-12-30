<?php

namespace App\Models;

use App\Enums\SourceTypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Channel extends Model
{
    protected $fillable = [
        'name',
        'source_id',
        'type',
        'description',
        'thumbnail',
        'link',
        'publisher',
    ];

    protected function casts(): array
    {
        return [
            'type' => SourceTypeEnum::class,
        ];
    }

    public function feeds(): BelongsToMany
    {
        return $this->belongsToMany(Feed::class, 'followings')->as('followings')->withTimestamps();
    }
}
