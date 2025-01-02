<?php

namespace App\Http\Controllers;

use App\Data\ChannelData;
use App\Data\FeedData;
use App\Models\Feed;
use App\Rules\LessThanFiveFeeds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FeedController extends Controller
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
        $request->validate([
            'name' => [ 'required', 'string', 'max:255', new LessThanFiveFeeds,
                Rule::unique('feeds')->where(function ($query) use ($request) {
                    return $query->where('user_id', $request->user()->id);
                })
            ],
        ]);

        Feed::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id,
            'selected' => false
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Feed/Show/Page', [
            'feed' => FeedData::from(Feed::find($id)),
            'channels' => ChannelData::collect(Feed::find($id)->channels)
        ]);
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
    public function destroy(string $id)
    {
        $feed = Feed::find($id);

        if ($feed->user_id !== Auth::user()->id) {
            abort(403); // Prevent unauthorized deletions
        }

        $feed->delete();
        return redirect()->route('dashboard')->with('success', 'Feed deleted successfully.');
    }
}
