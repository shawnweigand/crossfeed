<?php

namespace App\Http\Controllers\Invokeable;

use App\Http\Controllers\Controller;
use App\Services\SpotifyService;
use App\Services\YouTubeService;
use Illuminate\Http\Request;

class SearchChannelsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $search = $request->query('search', '');

        $youtube = new YouTubeService;
        $spotify = new SpotifyService;

        $youtubeSearch = $youtube->search($search)['items']; // 5
        $spotifySearch = $spotify->search($search)['shows']['items']; // 20

        // make results per page equal for both


        return response()->json([
            'channels' => $spotifySearch
        ]);
    }
}
