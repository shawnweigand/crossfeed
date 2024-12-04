<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SpotifyService
{

    protected $token_url;
    protected $base_url;
    protected $client_id;
    protected $client_secret;
    protected $token;

    public function __construct()
    {
        $this->token_url = config('services.spotify.token_url');
        $this->base_url = config('services.spotify.base_url');
        $this->client_id = config('services.spotify.client_id');
        $this->client_id = config('services.spotify.client_secret');
        $this->token = $this->getToken();
    }

    public function getToken() {
        $auth = base64_encode($this->client_id . ':' . $this->client_secret);
        $response = Http::asForm()->withHeaders([
            'Authorization' => 'Basic ' . $auth
        ])->post($this->token_url, [
            'grant_type' => 'client_credentials'
        ]);

        if ($response->successful()) return $response->json()['access_token'];
    }

    public function search($term) {
        $endpoint = '/search';
        $url = $this->base_url . $endpoint;
        if (!$this->token) $this->getToken();
        $response = Http::withToken($this->token)
        ->withQueryParameters([
            'type' => 'show',
            'q' => $term,
            'market' => 'US',
            'limit' => 20
        ])->get($url);

        if ($response->successful()) return $response->json();
    }

}
