<?php

use App\Services\SpotifyService;
use App\Services\YouTubeService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('spotify:token', function () {
    $spotify = new SpotifyService();
    $this->comment(json_encode($spotify->getToken()));
});

Artisan::command('spotify:search {term}', function (string $term) {
    $spotify = new SpotifyService();
    $this->comment(json_encode($spotify->search($term)));
});

Artisan::command('spotify:episodes {term}', function (string $term) {
    $spotify = new SpotifyService();
    $show = $spotify->search($term)['shows']['items'][0];
    $episodes = $spotify->episodes(($show['id']));
    $this->comment(json_encode($episodes['items']));
});

Artisan::command('youtube:search {term}', function (string $term) {
    $youtube = new YouTubeService();
    $this->comment(json_encode($youtube->search($term)));
});

Artisan::command('youtube:videos {term}', function (string $term) {
    $youtube = new YouTubeService();
    $channel = $youtube->search($term)['items'][0];
    $videos = $youtube->videos($channel['id']['channelId']);
    $this->comment(json_encode($videos['items']));
});
