<?php

namespace App\Http\Controllers;

use App\Models\Feed;
use App\Rules\LessThanFiveFeeds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'name' => [ 'required', 'string', 'unique:feeds', 'max:255', new LessThanFiveFeeds ],
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
            'feed' => Feed::find($id)
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
        //
    }
}
