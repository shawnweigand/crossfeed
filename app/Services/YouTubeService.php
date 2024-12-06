<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class YouTubeService
{

    protected $base_url;
    protected $api_key;

    public function __construct()
    {
        $this->base_url = config('services.youtube.base_url');
        $this->api_key = config('services.youtube.api_key');
    }

    public function search($term) {
        $endpoint = '/search';
        $url = $this->base_url . $endpoint;

        $response = Http::withQueryParameters([
            'key' => $this->api_key,
            'part' => 'snippet,id',
            'type' => 'channel',
            'q' => $term,
        ])->get($url);

        if ($response->successful()) return $response->json();
        else return $response->json();
    }

    public function videos($channelId) {
        $endpoint = "/search";
        $url = $this->base_url . $endpoint;

        $response = Http::withQueryParameters([
            'key' => $this->api_key,
            'part' => 'snippet,id',
            'type' => 'video',
            'channelId' => $channelId,
            'order' => 'date',
        ])->get($url);

        if ($response->successful()) return $response->json();
        else return $response->json();
    }

}
