<?php

namespace App\Rules;

use App\Models\Feed;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Auth;

class LessThanFiveFeeds implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $count = Feed::where('user_id', Auth::user()->id)->count();
        if ($count >= 5) $fail('You may not exceed limit of 5 feeds.');
    }
}
