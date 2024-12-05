<?php

use App\Services\SpotifyService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;

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

Artisan::command('spotify:episode {term}', function (string $term) {
    $spotify = new SpotifyService();
    $show = $spotify->search($term)['shows']['items'][0];
    $episodes = $spotify->episodes(($show['id']));
    $this->comment(json_encode($episodes['items']));
});
