<?php

use App\Services\SpotifyService;
use App\Services\YouTubeService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
    // $show = $spotify->search($term)['shows']['items'][0];
    $show = ['id' => '73TygG2cEGJPWbOGPB2CZ0'];
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

// Cron jobs
Schedule::call(function () {
    // Call on the DB weekly to prevent Supabase from locking

    DB::table('migrations')->first();
    // DB::table('channels')->where('id', 3)->update(['name' => Str::random()]);
    dump('Database called');

})->name('supabase')->weekly()->mondays()->at('06:00');//->everyFifteenSeconds();
