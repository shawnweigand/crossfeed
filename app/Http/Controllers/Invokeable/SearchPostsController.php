<?php

namespace App\Http\Controllers\Invokeable;

use App\Data\ChannelData;
use App\Http\Controllers\Controller;
use App\Models\Feed;
use App\Services\SpotifyService;
use App\Services\YouTubeService;
use Illuminate\Http\Request;

class SearchPostsController extends Controller
{

    protected $spotify;
    protected $youtube;

    public function __construct()
    {
        $this->spotify = new SpotifyService;
        $this->youtube = new YouTubeService;
    }

    public function __invoke(Feed $feed)
    {
        $channels = ChannelData::collect($feed->channels);
        $posts = [];

        foreach ($channels as $channel) {
            if ($channel->type === 'Spotify') {
                $spotify_posts = $this->spotify->episodes($channel->source_id)['items'];
                foreach ($spotify_posts as $post) {
                    // array_push($posts, $post);
                    array_push($posts, [
                        'type' => 'Spotify',
                        'source_id' => $post['id'],
                        'title' => $post['name'],
                        'description' => $post['description'],
                        'image' => $post['images'][0]['url'],
                        'link' => $post['external_urls']['spotify'],
                        'timestamp' => $post['release_date'],
                        'channel' => $channel,
                    ]);
                }
            } else if ($channel->type === 'YouTube') {
                $youtube_posts = $this->youtube->videos($channel->source_id)['items'];
                foreach ($youtube_posts as $post) {
                    // array_push($posts, $post);
                    array_push($posts, [
                        'type' => 'YouTube',
                        'source_id' => $post['id']['videoId'],
                        'title' => $post['snippet']['title'],
                        'description' => $post['snippet']['description'],
                        'image' => $post['snippet']['thumbnails']['high']['url'],
                        'link' => '',
                        'timestamp' => '', // find this out with new quota
                        'channel' => $channel,
                    ]);
                }
            }
        }

        return response()->json($posts);
    }
}
