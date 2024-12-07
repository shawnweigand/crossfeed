<?php

namespace App\Models;

use App\Enums\SourceTypeEnum;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    protected $fillable = [
        'name',
        'source_id',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'type' => SourceTypeEnum::class,
        ];
    }
}
