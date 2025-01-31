<?php

namespace App\Models;

use App\Enums\IconColorEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Feed extends Model
{
    protected $fillable = [
        'name',
        'user_id',
        'selected',
        'icon_bg_color',
        'icon_text_color',
    ];

    protected function casts(): array
    {
        return [
            'icon_bg_color' => IconColorEnum::class,
            'icon_text_color' => IconColorEnum::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function channels(): BelongsToMany
    {
        return $this->belongsToMany(Channel::class, 'followings')->as('followings')->withTimestamps();
    }
}
