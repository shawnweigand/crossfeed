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

        $spotifySearch = $spotify->search($search)['shows']['items'];
        $youtubeSearch = $youtube->search($search)['items'];

        $response = [];

        // transform spotify
        foreach ($spotifySearch as $item) {
            array_push($response, [
                'type' => 'Spotify',
                'source_id' => $item['id'],
                'name' => $item['name'],
                'description' => $item['description'],
                'thumbnail' => $item['images'][0]['url'],
                'link' => $item['external_urls']['spotify'],
                'publisher' => $item['publisher'],
            ]);
        }

        // transform youtube
        foreach ($youtubeSearch as $item) {
            array_push($response, [
                'type' => 'YouTube',
                    'source_id' => $item['snippet']['channelId'],
                    'name' => $item['snippet']['channelTitle'],
                    'description' => $item['snippet']['description'],
                    'thumbnail' => $item['snippet']['thumbnails']['default']['url'],
                    'link' => '',
                    'publisher' => ''
                ]);
        }

        return response()->json($response);
    }
}
