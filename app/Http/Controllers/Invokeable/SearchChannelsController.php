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

        $youtubeSearch = $youtube->search($search)['items'];
        $spotifySearch = $spotify->search($search)['shows']['items'];

        $response = [];

        // transform youtube
        foreach ($youtubeSearch as $item) {
            $response += [
                'type' => 'YOUTUBE',
                'id' => $item['snippet']['channelId'],
                'name' => $item['snippet']['channelTitle'],
                'description' => $item['snippet']['description'],
                'thumbnail' => $item['snippet']['thumbnails']['default'],
                'link' => '',
                'publisher' => ''
            ];
        }

        // transform spotify
        foreach ($spotifySearch as $item) {
            $response += [
                'type' => 'SPOTIFY',
                'id' => $item['id'],
                'name' => $item['name'],
                'description' => $item['description'],
                'thumbnail' => $item['images'][0]['url'],
                'link' => $item['href'],
                'publisher' => $item['publisher'],
            ];
        }

        return response()->json($response);
    }
}
