<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('spotify:token', function () {
    $url = 'https://accounts.spotify.com/api/token';
    $auth = base64_encode(env('SPOTIFY_CLIENT_ID') . ':' . env('SPOTIFY_CLIENT_SECRET'));
    $response = Http::asForm()->withHeaders([
        'Authorization' => 'Basic ' . $auth
    ])->post($url, [
        'grant_type' => 'client_credential'
    ]);

    if ($response->successful()) {
        $body = $response->json();
        $token = $body['access_token'];
        // Use the token as needed
        $this->comment("Access Token: $token");
    } else {
        // Handle the error
        print_r([
            'status' => $response->status(),
            'message' => $response->json()
        ]);
    }
});

Artisan::command('spotify:search {term}', function (string $term) {
    $base_url = 'https://api.spotify.com/v1';
    $endpoint = '/search';
    $response = Http::withToken(
        'BQC8YArzrqfGH4a-z5-Xfj8fQwkAphUK-nIySAO1xglVgrfxFDwlCwcp3ka04E9Ci98Eg5vhvureEC_HylApV-7jJa5tM6fwQvhfwDTCI3Qg1Y5Wciw'
    )->withQueryParameters([
        'type' => 'show',
        'q' => $term,
        'market' => 'US',
        'limit' => 20
    ])->get($base_url . $endpoint);

    if ($response->successful()) {
        $this->comment($response);
    } else {
        $this->comment("Error: " . $response->status());
        print_r($response->json());
    }
});
