<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Feed;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $channel = Channel::updateOrCreate([
            'name' => $request->name,
            'source_id' => $request->source_id,
            'type' => $request->type,
            'description' => $request->description ?? '',
            'thumbnail' => $request->thumbnail,
            'link' => $request->link,
            'publisher' => $request->publisher,
        ]);
        $channel->feeds()->attach($request->feed_id);
        return to_route('feed.show', $request->feed_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $source_id)
    {
        $channel = Channel::where('source_id', $source_id)->first();
        $channel->feeds()->detach($request->feed_id);
        return to_route('feed.show', $request->feed_id);
    }
}
