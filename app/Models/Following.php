<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Following extends Model
{
    protected $fillable = [
        'feed_id',
        'channel_id ',
    ];
}
