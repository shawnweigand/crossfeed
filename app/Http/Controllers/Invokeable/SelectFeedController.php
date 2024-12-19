<?php

namespace App\Http\Controllers\Invokeable;

use App\Http\Controllers\Controller;
use App\Models\Feed;
use Illuminate\Http\Request;

class SelectFeedController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        Feed::query()->update(['selected' => false]);
        $new = Feed::find($request->feed['id']);
        $new->update(['selected' => true]);
    }
}
