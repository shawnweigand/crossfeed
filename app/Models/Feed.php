<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feed extends Model
{
    protected $fillable = [
        'name',
        'user_id',
        'selected',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}